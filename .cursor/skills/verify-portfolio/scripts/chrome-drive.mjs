#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

function arg(flag, fallback = undefined) {
  const i = process.argv.indexOf(flag)
  if (i === -1) return fallback
  return process.argv[i + 1]
}

function has(flag) {
  return process.argv.includes(flag)
}

function usage() {
  return `Usage:
  browser.sh snapshot --dir <dir>
  browser.sh click --role button|link --name <accessible name> [--dir <dir>]
  browser.sh eval --js <expression> [--dir <dir>]
  browser.sh goto --url <url> --dir <dir>

Env (from launch.sh): PORTFOLIO_VERIFY_URL, PORTFOLIO_VERIFY_CHROME_BIN,
PORTFOLIO_VERIFY_CHROME_PROFILE, PORTFOLIO_VERIFY_EVIDENCE_DIR`
}

function die(msg) {
  console.error(`chrome-drive: ${msg}`)
  process.exit(1)
}

function freePort() {
  return new Promise((res, rej) => {
    const s = createServer()
    s.listen(0, '127.0.0.1', () => {
      const addr = s.address()
      const port = typeof addr === 'object' && addr ? addr.port : 0
      s.close((err) => (err ? rej(err) : res(port)))
    })
    s.on('error', rej)
  })
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

class Cdp {
  constructor(ws) {
    this.ws = ws
    this.n = 0
    this.pending = new Map()
    this.handlers = new Map()
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(String(ev.data))
      if (msg.id != null && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        if (msg.error) reject(new Error(`${msg.error.message || JSON.stringify(msg.error)}`))
        else resolve(msg.result)
        return
      }
      if (msg.method && this.handlers.has(msg.method)) {
        for (const h of this.handlers.get(msg.method)) h(msg.params)
      }
    })
  }

  on(method, fn) {
    const list = this.handlers.get(method) || []
    list.push(fn)
    this.handlers.set(method, list)
  }

  off(method, fn) {
    const list = (this.handlers.get(method) || []).filter((h) => h !== fn)
    this.handlers.set(method, list)
  }

  waitEvent(method) {
    return new Promise((resolve) => {
      const fn = (params) => {
        this.off(method, fn)
        resolve(params)
      }
      this.on(method, fn)
    })
  }

  send(method, params = {}) {
    const id = ++this.n
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        this.pending.delete(id)
        reject(new Error(`CDP timeout: ${method}`))
      }, 20000)
      this.pending.set(id, {
        resolve: (v) => {
          clearTimeout(t)
          resolve(v)
        },
        reject: (e) => {
          clearTimeout(t)
          reject(e)
        },
      })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }
}

async function waitOpen(ws) {
  if (ws.readyState === WebSocket.OPEN) return
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', () => reject(new Error('websocket error')), { once: true })
  })
}

async function waitCdp(port) {
  const deadline = Date.now() + 15000
  let last = ''
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`)
      if (r.ok) return await r.json()
      last = `HTTP ${r.status}`
    } catch (e) {
      last = e instanceof Error ? e.message : String(e)
    }
    await sleep(100)
  }
  throw new Error(`chrome CDP not ready on ${port}: ${last}`)
}

async function pageWsUrl(port, targetUrl) {
  const deadline = Date.now() + 10000
  while (Date.now() < deadline) {
    const r = await fetch(`http://127.0.0.1:${port}/json/list`)
    const tabs = await r.json()
    const page = tabs.find(
      (t) => t.type === 'page' && typeof t.webSocketDebuggerUrl === 'string',
    )
    if (page) return page.webSocketDebuggerUrl
    await sleep(100)
  }
  throw new Error(`no page target for ${targetUrl}`)
}

function flattenAx(node, lines, depth = 0) {
  if (!node) return
  const role = node.role?.value || node.role || ''
  const name = node.name?.value || node.name || ''
  const interesting = [
    'RootWebArea',
    'heading',
    'link',
    'button',
    'navigation',
    'banner',
    'main',
    'contentinfo',
    'article',
  ]
  if (interesting.includes(role) || name) {
    lines.push(`${'  '.repeat(depth)}${role}${name ? `: ${name}` : ''}`)
  }
  for (const child of node.children || []) flattenAx(child, lines, depth + 1)
}

function flattenAxNodes(nodes) {
  const lines = []
  if (!nodes || !nodes.length) return lines
  if (nodes[0].children) {
    flattenAx(nodes[0], lines, 0)
    return lines
  }
  const byId = new Map(nodes.map((n) => [n.nodeId, n]))
  const walk = (node, depth) => {
    if (!node) return
    flattenAx({ ...node, children: [] }, lines, depth)
    for (const id of node.childIds || []) walk(byId.get(id), depth + 1)
  }
  walk(nodes[0], 0)
  return lines
}

const FIND_EL = `(role, name) => {
  const norm = (s) => (s || '').replace(/\\s+/g, ' ').trim()
  if (role === 'button') {
    return [...document.querySelectorAll('button')].find((el) =>
      norm(el.getAttribute('aria-label') || el.textContent) === name
    )
  }
  if (role === 'link') {
    return [...document.querySelectorAll('a')].find((el) =>
      norm(el.getAttribute('aria-label') || el.textContent) === name
    )
  }
  if (role === 'heading') {
    return [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].find((el) =>
      norm(el.textContent) === name
    )
  }
  return null
}`

async function evalJson(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  })
  if (result.exceptionDetails) {
    const text =
      result.exceptionDetails.exception?.description ||
      result.exceptionDetails.text ||
      'Runtime.evaluate failed'
    throw new Error(text)
  }
  return result.result?.value
}

function isContextGone(err) {
  const msg = err instanceof Error ? err.message : String(err)
  return /Execution context was destroyed|Cannot find context|session closed|Inspected target navigated/i.test(
    msg,
  )
}

async function waitHydrated(cdp) {
  const deadline = Date.now() + 15000
  let last = new Error('page did not hydrate')
  while (Date.now() < deadline) {
    try {
      const ok = await evalJson(
        cdp,
        `(() => {
          const h1 = document.querySelector('h1')
          const shown = document.body && getComputedStyle(document.body).display !== 'none'
          return !!(h1 && shown && h1.textContent.includes('Ryutaro Kobayashi'))
        })()`,
      )
      if (ok) return
    } catch (err) {
      last = err instanceof Error ? err : new Error(String(err))
      if (!isContextGone(last) && !/Cannot find context/i.test(last.message)) {
        // keep retrying during navigation; other errors also retry until deadline
      }
    }
    await sleep(100)
  }
  throw last
}

async function pageState(cdp) {
  return evalJson(
    cdp,
    `({
      href: location.href,
      hash: location.hash,
      title: document.title,
      htmlClass: document.documentElement.className,
      theme: localStorage.getItem('theme'),
      h1: document.querySelector('h1') && document.querySelector('h1').textContent.trim(),
      themeButton: (() => {
        const b = document.querySelector('button[aria-label*="theme"]')
        return b ? b.getAttribute('aria-label') : null
      })(),
      workHeading: !!document.querySelector('#work h2'),
      contactHeading: !!document.querySelector('#contact h2'),
      rkHref: (() => {
        const a = [...document.querySelectorAll('a')].find((el) => el.textContent.trim() === 'RK')
        return a ? a.getAttribute('href') : null
      })()
    })`,
  )
}

async function screenshot(cdp, outPath) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 1600,
    deviceScaleFactor: 1,
    mobile: false,
  })
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png' })
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, Buffer.from(shot.data, 'base64'))
}

async function axDump(cdp, outPath) {
  await cdp.send('Accessibility.enable')
  const tree = await cdp.send('Accessibility.getFullAXTree')
  const nodes = tree.nodes || []
  const lines = flattenAxNodes(nodes)
  if (!lines.length) lines.push(JSON.stringify(tree).slice(0, 4000))
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, lines.join('\n') + '\n')
}

async function withPage(url, fn) {
  const chromeBin = process.env.PORTFOLIO_VERIFY_CHROME_BIN
  const profile = process.env.PORTFOLIO_VERIFY_CHROME_PROFILE
  if (!chromeBin) die('PORTFOLIO_VERIFY_CHROME_BIN is unset')
  if (!profile) die('PORTFOLIO_VERIFY_CHROME_PROFILE is unset')

  const debugPort = await freePort()
  const chrome = spawn(
    chromeBin,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--remote-debugging-port=${debugPort}`,
      `--remote-debugging-address=127.0.0.1`,
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--window-size=1280,1600',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )
  let stderr = ''
  chrome.stderr.on('data', (d) => {
    stderr += String(d)
  })
  let ws
  try {
    await waitCdp(debugPort)
    const pageUrl = await pageWsUrl(debugPort, url)
    ws = new WebSocket(pageUrl)
    await waitOpen(ws)
    const cdp = new Cdp(ws)
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    const loaded = cdp.waitEvent('Page.loadEventFired')
    await cdp.send('Page.navigate', { url })
    await Promise.race([loaded, sleep(10000)])
    await waitHydrated(cdp)
    return await fn(cdp)
  } finally {
    try {
      if (ws && ws.readyState === WebSocket.OPEN) ws.close()
    } catch {}
    if (chrome.pid && !chrome.killed) {
      chrome.kill('SIGTERM')
      await sleep(300)
      if (!chrome.killed) chrome.kill('SIGKILL')
    }
    if (stderr.includes('Failed to listen') || stderr.includes('already in use')) {
      console.error(stderr)
    }
  }
}

function writeDir(dir, files) {
  mkdirSync(dir, { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    if (body == null) continue
    const path = resolve(dir, name)
    if (typeof body === 'string' || Buffer.isBuffer(body)) writeFileSync(path, body)
    else writeFileSync(path, JSON.stringify(body, null, 2) + '\n')
  }
}

async function main() {
  const cmd = process.argv[2]
  if (!cmd || has('--help')) {
    console.log(usage())
    process.exit(cmd ? 0 : 1)
  }
  const url = arg('--url', process.env.PORTFOLIO_VERIFY_URL || '')
  if (!url) die('no --url and PORTFOLIO_VERIFY_URL is unset')
  const evidenceDefault = process.env.PORTFOLIO_VERIFY_EVIDENCE_DIR || '/tmp/portfolio-verify-evidence'
  const dir = arg('--dir', `${evidenceDefault}/browser`)

  if (cmd === 'snapshot' || cmd === 'goto') {
    await withPage(url, async (cdp) => {
      const state = await pageState(cdp)
      await screenshot(cdp, resolve(dir, 'screenshot.png'))
      await axDump(cdp, resolve(dir, 'ax.txt'))
      writeDir(dir, {
        'state.json': state,
        'url.txt': `${state.href}\n`,
      })
      console.log(`chrome-drive snapshot -> ${dir}`)
      console.log(JSON.stringify(state))
    })
    return
  }

  if (cmd === 'click') {
    const role = arg('--role', 'button')
    const name = arg('--name')
    if (!name) die('click requires --name')
    await withPage(url, async (cdp) => {
      const before = await pageState(cdp)
      const clicked = await evalJson(
        cdp,
        `(() => {
          const find = ${FIND_EL}
          const el = find(${JSON.stringify(role)}, ${JSON.stringify(name)})
          if (!el) return { ok: false }
          el.click()
          return { ok: true, tag: el.tagName, href: el.getAttribute && el.getAttribute('href') }
        })()`,
      )
      if (!clicked || !clicked.ok) {
        throw new Error(`no ${role} named ${JSON.stringify(name)}`)
      }
      await sleep(400)
      const after = await pageState(cdp)
      await screenshot(cdp, resolve(dir, 'screenshot.png'))
      await axDump(cdp, resolve(dir, 'ax.txt'))
      writeDir(dir, {
        'before.json': before,
        'after.json': after,
        'click.json': { role, name, ...clicked },
      })
      console.log(`chrome-drive click ${role} ${JSON.stringify(name)} -> ${dir}`)
      console.log(JSON.stringify({ before, after, click: clicked }))
    })
    return
  }

  if (cmd === 'eval') {
    const js = arg('--js')
    if (!js) die('eval requires --js')
    await withPage(url, async (cdp) => {
      const value = await evalJson(cdp, js)
      writeDir(dir, { 'eval.json': { js, value } })
      console.log(JSON.stringify({ js, value }))
    })
    return
  }

  die(`unknown command ${cmd}\n${usage()}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
