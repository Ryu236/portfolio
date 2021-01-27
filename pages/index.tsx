import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

let isDarkMode: boolean
let theme: string

const SwitchTheme = function () {
  theme = document.documentElement.dataset.theme
  if (theme === 'dark') {
    isDarkMode = false
    document.documentElement.dataset.theme = 'light'
  } else {
    isDarkMode = true
    document.documentElement.dataset.theme = 'dark'
  }
}

const GithubIcon = function () {
  if (isDarkMode) {
    return <Image src="/github_icon_large_white.svg" width={60} height={60} />
  } else {
    return <Image src="/github_icon_large_dark.svg" width={60} height={60} />
  }
}

const BlogIcon = function () {
  if (isDarkMode) {
    return <Image src="/hatenablog-logo.svg" width={60} height={60} />
  } else {
    return <Image src="/hatenablog-logo.svg" width={60} height={60} />
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Head>
          <title>ryu236.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Ryu236</h1>

          <p className="description">
            Hi, my name is Ryutaro Kobayashi.
            <br />I am a software engineer in Japan.
          </p>

          <div className="switch">
            <input id="toggle" type="checkbox" onChange={SwitchTheme} />
            <label htmlFor="toggle">Switch theme</label>
          </div>

          <div className="grid">
            <a href="https://blog.ryu236.com" className="card">
              <BlogIcon />
              <h3>Blog &rarr;</h3>
              <p>This is my blog. This blog is written by Japanese.</p>
            </a>

            <a href="https://github.com/Ryu236/" className="card">
              <GithubIcon />
              <h3>GitHub &rarr;</h3>
              <p>This is my github page. You can see my projects and code.</p>
            </a>

            <a href="https://twitter.com/Ryuk236" className="card">
              <Image
                src="/Twitter_Social_Icon_Circle_Color.svg"
                width={60}
                height={60}
              />
              <h3>Twitter &rarr;</h3>
              <p>My twitter id is Ryuk236. Please follow me!</p>
            </a>

            <a href="https://www.wantedly.com/id/ryu236" className="card">
              <Image src="/wantedly_mark.svg" width={60} height={60} />
              <h3>Wantedly &rarr;</h3>
              <p>My profile page in Wantedly. Please check this.</p>
            </a>
          </div>
        </main>

        <footer>
          <a
            href="https://twitter.com/Ryuk236"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2021 Ryutaro Kobayashi
          </a>
        </footer>

        <style jsx>{`
          .container {
            min-height: 100vh;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid var(--border-color);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: var(--active-color);
            border-color: var(--active-color);
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .logo {
            height: 1em;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>

        <style jsx global>{`
          :root {
            --active-color: #0070f3;
            --border-color: #eaeaea;
          }
          [data-theme='dark'] {
            --bg-color: #121212;
            --text-color: #f4f4f6;
            --active-color: #369bff;
            --border-color: #5d6d7e;
          }

          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          main,
          container,
          footer {
            background: var(--bg-color);
            color: var(--text-color);
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}

export default Home
