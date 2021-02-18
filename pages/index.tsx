import React, { useState } from 'react'
import Image from 'next/image'
import { Footer } from '../components/parts/footer'

const Sun = ({ fill }) => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="30px"
    height="30px"
    viewBox="0 0 45.16 45.16"
    fill={fill}
  >
    <path
      d="M22.58,11.269c-6.237,0-11.311,5.075-11.311,11.312s5.074,11.312,11.311,11.312c6.236,0,11.311-5.074,11.311-11.312
S28.816,11.269,22.58,11.269z"
    />
    <path
      d="M22.58,7.944c-1.219,0-2.207-0.988-2.207-2.206V2.207C20.373,0.988,21.361,0,22.58,0c1.219,0,2.207,0.988,2.207,2.207
v3.531C24.787,6.956,23.798,7.944,22.58,7.944z"
    />
    <path
      d="M22.58,37.215c-1.219,0-2.207,0.988-2.207,2.207v3.53c0,1.22,0.988,2.208,2.207,2.208c1.219,0,2.207-0.988,2.207-2.208
v-3.53C24.787,38.203,23.798,37.215,22.58,37.215z"
    />
    <path
      d="M32.928,12.231c-0.861-0.862-0.861-2.259,0-3.121l2.497-2.497c0.861-0.861,2.259-0.861,3.121,0
c0.862,0.862,0.862,2.26,0,3.121l-2.497,2.497C35.188,13.093,33.791,13.093,32.928,12.231z"
    />
    <path
      d="M12.231,32.93c-0.862-0.863-2.259-0.863-3.121,0l-2.497,2.496c-0.861,0.861-0.862,2.26,0,3.121
c0.862,0.861,2.26,0.861,3.121,0l2.497-2.498C13.093,35.188,13.093,33.79,12.231,32.93z"
    />
    <path
      d="M37.215,22.58c0-1.219,0.988-2.207,2.207-2.207h3.531c1.219,0,2.207,0.988,2.207,2.207c0,1.219-0.988,2.206-2.207,2.206
h-3.531C38.203,24.786,37.215,23.799,37.215,22.58z"
    />
    <path
      d="M7.944,22.58c0-1.219-0.988-2.207-2.207-2.207h-3.53C0.988,20.373,0,21.361,0,22.58c0,1.219,0.988,2.206,2.207,2.206
h3.531C6.956,24.786,7.944,23.799,7.944,22.58z"
    />
    <path
      d="M32.928,32.93c0.862-0.861,2.26-0.861,3.121,0l2.497,2.497c0.862,0.86,0.862,2.259,0,3.12s-2.259,0.861-3.121,0
l-2.497-2.497C32.066,35.188,32.066,33.791,32.928,32.93z"
    />
    <path
      d="M12.231,12.231c0.862-0.862,0.862-2.259,0-3.121L9.734,6.614c-0.862-0.862-2.259-0.862-3.121,0
c-0.862,0.861-0.862,2.259,0,3.12l2.497,2.497C9.972,13.094,11.369,13.094,12.231,12.231z"
    />
  </svg>
)

const Moon = ({ fill }) => (
  <svg
    width="30px"
    height="30px"
    viewBox="-12 0 448 448.04455"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
  >
    <path d="m224.023438 448.03125c85.714843.902344 164.011718-48.488281 200.117187-126.230469-22.722656 9.914063-47.332031 14.769531-72.117187 14.230469-97.15625-.109375-175.890626-78.84375-176-176 .972656-65.71875 37.234374-125.832031 94.910156-157.351562-15.554688-1.980469-31.230469-2.867188-46.910156-2.648438-123.714844 0-224.0000005 100.289062-224.0000005 224 0 123.714844 100.2851565 224 224.0000005 224zm0 0" />
  </svg>
)

const Hatena = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60px"
    height="60px"
    viewBox="0 0 100 100"
  >
    <path
      fill={fill}
      d="M50.1 100.2C22.5 100.2 0 77.7 0 50.1S22.5 0 50.1 0s50.1 22.5 50.1 50.1c-.1 27.6-22.5 50.1-50.1 50.1zm0-93.8C26 6.4 6.4 26 6.4 50.1S26 93.8 50.1 93.8s43.7-19.6 43.7-43.7S74.2 6.4 50.1 6.4z"
    />
    <path
      fill={fill}
      d="M55.9 25.3c-2.4-5-3.9-9.8-4.7-12.6v35.5c1.2.5 2.1 1.6 2.1 3 0 1.8-1.5 3.3-3.3 3.3-1.8 0-3.3-1.5-3.3-3.3 0-1.5 1-2.7 2.3-3.1V12.7c-.8 2.8-2.2 7.6-4.7 12.6-3.8 7.8-8.6 14.6-8.6 14.6l3.1 41.8s2.9 3.2 11.3 3.2 11.3-3.2 11.3-3.2l3.1-41.8s-4.8-6.8-8.6-14.6z"
    />
  </svg>
)

export const Home = () => {
  let theme: string

  const [dark, useDark] = useState(false)

  const SwitchTheme = () => {
    theme = document.documentElement.dataset.theme
    //console.log(theme)
    //console.log(isDarkMode)
    if (theme === 'dark') {
      useDark(false)
      document.documentElement.dataset.theme = 'light'
    } else {
      useDark(true)
      document.documentElement.dataset.theme = 'dark'
    }
  }

  const GithubIcon = () => {
    if (dark) {
      return <Image src="/github_icon_large_white.svg" width={60} height={60} />
    } else {
      return <Image src="/github_icon_large_dark.svg" width={60} height={60} />
    }
  }

  return (
    <div className="container">
      <main>
        <h1 className="title">Ryu236</h1>

        <p className="description">
          Hi, my name is Ryutaro Kobayashi.
          <br />I am a software engineer in Japan.
        </p>

        <div className="switch">
          <Sun fill={dark ? 'gray' : 'orange'} />
          <input
            id="toggle"
            className="toggle-input"
            type="checkbox"
            onChange={SwitchTheme}
            autoComplete="off"
          />
          <label htmlFor="toggle" className="toggle-label" />
          <Moon fill={dark ? '#FCD707' : 'gray'} />
        </div>

        <div className="grid">
          <a href="https://blog.ryu236.com" className="card">
            <Hatena fill={dark ? '#EEE' : '#333'} />
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

      <Footer />

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

        .toggle-switch {
          position: relative;
          width: 75px;
          height: 42px;
          margin: auto;
        }

        .toggle-label {
          width: 68px;
          height: 30px;
          background: #ccc;
          position: relative;
          display: inline-block;
          border-radius: 46px;
          transition: 0.4s;
          box-sizing: border-box;
          margin: 0 10px;
        }

        .toggle-label:after {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 100%;
          left: 0;
          top: 0;
          z-index: 2;
          background: #fff;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          transition: 0.4s;
        }

        .toggle-input {
          display: none;
        }
        .toggle-input:checked + .toggle-label {
          background-color: #4bd865;
        }
        .toggle-input:checked + .toggle-label:after {
          left: 40px;
        }

        .sun svg {
          fill: gray;
        }

        .moon {
          fill: yellow;
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

export default Home
