---
name: verify-portfolio
description: Drive the Ryutaro Kobayashi portfolio web UI (Next.js single-page site) and prove user-visible behavior. Use when verifying this repo in a real browser, checking hero/nav/theme/work/contact, or proving a change against the live page rather than Jest.
---

# Verify Portfolio

This skill is the control surface for the **portfolio** site in this repo (public title **Ryutaro Kobayashi**, live origin `https://www.ryu236.com/`). A later agent should read this cold and drive the **web UI** the way a visitor does.

Other surfaces exist but are not the primary control path:

- Jest + Testing Library (`npm test` / `bun run test`) exercises `pages/index.tsx` in jsdom. That is not live proof.
- There is no CLI, no authenticated area, and no app-owned HTTP API beyond Next serving `/`.

Feature recipes live in [`features/`](features/README.md). Read the index, then the matching feature file, before driving.

## Isolation

Two Next.js verify instances **must not** share one checkout. `next dev` writes `.next/` in the repo; a second launcher in the same tree is refused by a lock under `/tmp/portfolio-verify-run/locks/`.

Side-by-side runs are allowed only with **separate worktrees** (or checkouts) **and** different `PORTFOLIO_VERIFY_PORT` values. Default port is **4370** (not 3000) so a human `next dev` on 3000 is left alone.

Never attach to a server this run did not start. If something already answers on the chosen port, `launch.sh` exits without killing it.

Browser state is isolated with a Chrome `--user-data-dir` under the run directory. Theme lives in `localStorage` key `theme`; a shared profile would leak light/dark across runs.

Call the **real** Chrome binary (`/opt/google/chrome/google-chrome` or `/usr/bin/google-chrome-stable`). Do **not** use a PATH `google-chrome` wrapper that forces `--user-data-dir=/home/ubuntu/.config/google-chrome` and `--remote-debugging-port=9222`.

## Launch

From the repo root:

```bash
export PORTFOLIO_VERIFY_PORT=4370   # optional; default 4370
.cursor/skills/verify-portfolio/scripts/launch.sh
set -a && source /tmp/portfolio-verify-run/latest/env && set +a
```

What it does:

1. Installs deps if `node_modules/.bin/next` is missing (`bun install` if bun exists, otherwise `HUSKY=0 npm ci`).
2. Starts `next dev --hostname 127.0.0.1 --port $PORT` with `NEXT_TELEMETRY_DISABLED=1`.
3. Waits until the log contains `Ready` **and** `GET http://127.0.0.1:$PORT/` returns 200.

Ready signals (observed on Next 15.3.3 in this repo):

- Log: `▲ Next.js 15.3.3` then `- Local: http://127.0.0.1:<port>` then `✓ Ready in …ms`
- HTTP: `200`, `X-Powered-By: Next.js`, HTML title `Ryutaro Kobayashi`

No env vars, seed data, or auth are required. `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is optional; when empty, the GA scripts are not injected. Do not set it for verification.

Dev overlay: screenshots from `next dev` may show the Next.js `N` badge. Ignore it. Do not treat it as product UI.

Teardown is **only** `scripts/cleanup.sh` against the instance env this run created (see Cleanup).

## Doctor

Read-only. Run before the first drive, after any failed drive, and whenever the page looks off.

```bash
set -a && source /tmp/portfolio-verify-run/latest/env && set +a
.cursor/skills/verify-portfolio/scripts/doctor.sh
```

Pass means all of:

- Recorded pid is alive and its cmdline contains `next` and the instance port
- The TCP listener on that port is that pid or a child (the `next-server` worker)
- `GET $PORTFOLIO_VERIFY_URL/` is 200 with `X-Powered-By: Next.js`
- HTML contains `<title…>Ryutaro Kobayashi</title>`, `aria-label="Primary"`, `id="work"`, and `id="contact"`

On failure: do not drive. Run Cleanup for **this** instance, then Launch again. Never `pkill next` / `killall node`.

## Drive

There is no Playwright/Cypress in this repo. Drive with the shipped helpers (HTTP + Chrome CDP). Cursor browser tools are acceptable **only** against `$PORTFOLIO_VERIFY_URL` for an instance this run launched.

```bash
SCRIPTS=.cursor/skills/verify-portfolio/scripts
$SCRIPTS/dump-home.sh "$PORTFOLIO_VERIFY_EVIDENCE_DIR/home-identity/http"
$SCRIPTS/browser.sh snapshot --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/home-identity/browser"
$SCRIPTS/browser.sh click --role button --name "Switch to light theme" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/theme-toggle/light"
$SCRIPTS/browser.sh click --role link --name "Work" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/nav/work"
$SCRIPTS/browser.sh eval --js "location.hash" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/nav/eval"
```

`browser.sh` waits until `<h1>Ryutaro Kobayashi</h1>` is present and `document.body` is not `display:none` (Next injects a FOUC `body{display:none}` stylesheet in dev HTML; curl of SSR source is not a visual proof).

Stable handles (from `pages/index.tsx`, `components/theme-toggle.tsx`, `components/social-links.tsx`, `components/work.tsx`):

| User-facing control | Handle |
|---|---|
| Home identity | heading level 1 `Ryutaro Kobayashi`; document title `Ryutaro Kobayashi` |
| Site mark | link named `RK`, `href="#top"` |
| Primary nav | `navigation` named `Primary` |
| Work jump | link named `Work`, `href="#work"` |
| Contact jump | link named `Contact`, `href="#contact"` |
| Theme (default dark) | button named `Switch to light theme` |
| Theme (light on) | button named `Switch to dark theme` |
| Work heading | heading `Work` inside `#work` |
| Education heading | heading `Education` inside `#education` |
| Contact heading | heading `Contact` inside `#contact` |
| Email | link named `ryu.adv.2360@gmail.com`, `href="mailto:ryu.adv.2360@gmail.com"` |
| GitHub | link named `GitHub`, `href="https://github.com/Ryu236/"` (two copies: hero and contact) |
| X | link named `X`, `href="https://x.com/Ryuk236"` |
| Blog | link named `Blog`, `href="https://blog.ryu236.com"` |
| LinkedIn | link named `LinkedIn`, `href="https://www.linkedin.com/in/ryu236/"` |

Default theme is **dark** (`html` class `dark`, `ThemeProvider` `defaultTheme="dark"`, `enableSystem={false}`, `storageKey="theme"`). First paint of the toggle is named `Switch to light theme` until a click (and after hydration).

Do not prove the live site by opening Jest, by calling React setters, or by hitting `/_next/` internals.

## Evidence

Root: **`$PORTFOLIO_VERIFY_EVIDENCE_DIR`** which is `/tmp/portfolio-verify-evidence/<run-id>/`.

Launch creates that directory. Cleanup **must not** delete it.

Proof standards:

- Exercise the real visitor path: `GET /`, in-page `#work` / `#contact` / `#top`, the theme button, visible copy and `href`s.
- Capture the **action and the resulting state**. A final screenshot without the click/hash/HTTP artifact is incomplete.
- UI proof = hydrated screenshot **and** AX dump from `browser.sh snapshot` or `click`, plus `state.json` (`htmlClass`, `theme` localStorage, `h1`, theme button name, `hash`). The screenshot must show **Ryutaro Kobayashi** or **RK** so the app identity is visible.
- HTTP proof (`dump-home.sh`) captures SSR source + landmark grep. Pair it with a hydrated snapshot; SSR HTML in dev includes `body{display:none}` until JS runs.
- Mutation proof for theme: `html` class and button accessible name **after** the click, and `localStorage.theme` in `after.json`. Re-open a new `browser.sh snapshot` on the same Chrome profile to confirm persistence. Then restore dark if later recipes assume default.
- Side effects that are **not** in-app: `mailto:` and `target="_blank"` social URLs. Prove the `href`, `target`, and `rel="noopener noreferrer"` in the document. Do **not** require github.com / x.com / LinkedIn / the OS mailer to load. Those are production boundaries.
- Mocks: none in this app. Do not stub theme or nav to fake a pass.
- GA/Vercel Analytics: local verification does not need third-party beacons. Empty `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` skips gtag; do not treat missing GA network calls as a product failure.

Record the feature ID (filename in `features/`) in the evidence subdirectory name.

## Cleanup

```bash
.cursor/skills/verify-portfolio/scripts/cleanup.sh
```

This kills the recorded pid **and its children** (the `next-server` worker), then deletes **`$PORTFOLIO_VERIFY_RUN_DIR`** (logs, pid, Chrome profile, lock).

It never deletes **`$PORTFOLIO_VERIFY_EVIDENCE_DIR`**. After cleanup, `ls` that evidence path; if it is gone, cleanup is wrong.

Never kill by process name (`pkill next`, `killall chrome`, `pkill node`).

Run cleanup after every **failed** iteration as well, so port 4370 and `.next` are not stranded.

Cleanup does not unset `PORTFOLIO_VERIFY_*` in your current shell. `launch.sh` ignores those variables when the recorded pid is already dead so a relaunch gets a new run id.

## Helpers

All under `.cursor/skills/verify-portfolio/scripts/`. They are executable. Source instance env before doctor/drive/cleanup (launch prints the `source …/env` line).

| Script | Purpose |
|---|---|
| `launch.sh` | Start `next dev` on 127.0.0.1, wait for Ready+200, write env |
| `doctor.sh` | Read-only health of **this** instance |
| `dump-home.sh [dir]` | `GET /` HTML, headers, landmark grep |
| `browser.sh snapshot --dir DIR` | Hydrated screenshot, AX dump, `state.json` |
| `browser.sh click --role button\|link --name NAME --dir DIR` | Click by accessible name; writes before/after state |
| `browser.sh eval --js EXPR --dir DIR` | `Runtime.evaluate` on the hydrated page |
| `cleanup.sh` | Tear down this instance; keep evidence |

`browser.sh` execs `chrome-drive.mjs` (Node 22 WebSocket + Chrome CDP). Do not invoke `chrome-drive.mjs` without the env `browser.sh` exports.
