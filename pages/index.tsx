import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

let isDarkMode = false
let theme: string

const SwitchTheme = () => {
  theme = document.documentElement.dataset.theme
  //console.log(theme)
  //console.log(isDarkMode)
  if (theme === 'dark') {
    isDarkMode = true
    document.documentElement.dataset.theme = 'light'
  } else {
    isDarkMode = false
    document.documentElement.dataset.theme = 'dark'
  }
}

const GithubIcon = () => {
  if (isDarkMode) {
    return <Image src="/github_icon_large_white.svg" width={60} height={60} />
  } else {
    return <Image src="/github_icon_large_dark.svg" width={60} height={60} />
  }
}

const BlogIcon = () => {
  if (isDarkMode) {
    return <Image src="/hatenablog-logo.svg" width={60} height={60} />
  } else {
    return <Image src="/hatenablog-logo.svg" width={60} height={60} />
  }
}

/*
const SwitchTheme = () => {
  theme = document.documentElement.dataset.theme
  console.log(theme)
  console.log(isDarkMode)
  if (theme === 'dark') {
    isDarkMode = true
    document.documentElement.dataset.theme = 'light'
  } else {
    isDarkMode = false
    document.documentElement.dataset.theme = 'dark'
  }
}
*/

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

/*
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 312.999 312.999" fill={fill} width="30px" height="30px">
    <path d="M305.6,178.053c-3.2-0.8-6.4,0-9.2,2c-10.4,8.8-22.4,16-35.6,20.8c-12.4,4.8-26,7.2-40.4,7.2c-32.4,0-62-13.2-83.2-34.4
      c-21.2-21.2-34.4-50.8-34.4-83.2c0-13.6,2.4-26.8,6.4-38.8c4.4-12.8,10.8-24.4,19.2-34.4c3.6-4.4,2.8-10.8-1.6-14.4
      c-2.8-2-6-2.8-9.2-2c-34,9.2-63.6,29.6-84.8,56.8c-20.4,26.8-32.8,60-32.8,96.4c0,43.6,17.6,83.2,46.4,112s68.4,46.4,112,46.4
      c36.8,0,70.8-12.8,98-34c27.6-21.6,47.6-52.4,56-87.6C314.4,184.853,311.2,179.253,305.6,178.053z M244.4,261.653
      c-23.2,18.4-52.8,29.6-85.2,29.6c-38,0-72.4-15.6-97.2-40.4c-24.8-24.8-40.4-59.2-40.4-97.2c0-31.6,10.4-60.4,28.4-83.6
      c12.4-16,28-29.2,46-38.4c-2,4.4-4,8.8-5.6,13.6c-5.2,14.4-7.6,29.6-7.6,45.6c0,38,15.6,72.8,40.4,97.6s59.6,40.4,97.6,40.4
      c16.8,0,32.8-2.8,47.6-8.4c5.2-2,10.4-4,15.2-6.4C274,232.453,260.8,248.853,244.4,261.653z"/>
  </svg>
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 302.4 302.4" fill={fill} width="30px" height="30px">
    <path d="M204.8,97.6C191.2,84,172,75.2,151.2,75.2s-40,8.4-53.6,22.4c-13.6,13.6-22.4,32.8-22.4,53.6s8.8,40,22.4,53.6
			c13.6,13.6,32.8,22.4,53.6,22.4s40-8.4,53.6-22.4c13.6-13.6,22.4-32.8,22.4-53.6S218.8,111.2,204.8,97.6z M190.4,190.4
			c-10,10-24,16-39.2,16s-29.2-6-39.2-16s-16-24-16-39.2s6-29.2,16-39.2s24-16,39.2-16s29.2,6,39.2,16s16,24,16,39.2
			S200.4,180.4,190.4,190.4z"/>
    <path d="M292,140.8h-30.8c-5.6,0-10.4,4.8-10.4,10.4c0,5.6,4.8,10.4,10.4,10.4H292c5.6,0,10.4-4.8,10.4-10.4
			C302.4,145.6,297.6,140.8,292,140.8z"/>
    <path d="M151.2,250.8c-5.6,0-10.4,4.8-10.4,10.4V292c0,5.6,4.8,10.4,10.4,10.4c5.6,0,10.4-4.8,10.4-10.4v-30.8
			C161.6,255.6,156.8,250.8,151.2,250.8z"/>
    <path d="M258,243.6l-22-22c-3.6-4-10.4-4-14.4,0s-4,10.4,0,14.4l22,22c4,4,10.4,4,14.4,0S262,247.6,258,243.6z" />
    <path d="M151.2,0c-5.6,0-10.4,4.8-10.4,10.4v30.8c0,5.6,4.8,10.4,10.4,10.4c5.6,0,10.4-4.8,10.4-10.4V10.4
			C161.6,4.8,156.8,0,151.2,0z"/>
    <path d="M258.4,44.4c-4-4-10.4-4-14.4,0l-22,22c-4,4-4,10.4,0,14.4c3.6,4,10.4,4,14.4,0l22-22C262.4,54.8,262.4,48.4,258.4,44.4z"
    />
    <path d="M41.2,140.8H10.4c-5.6,0-10.4,4.8-10.4,10.4s4.4,10.4,10.4,10.4h30.8c5.6,0,10.4-4.8,10.4-10.4
			C51.6,145.6,46.8,140.8,41.2,140.8z"/>
    <path d="M80.4,221.6c-3.6-4-10.4-4-14.4,0l-22,22c-4,4-4,10.4,0,14.4s10.4,4,14.4,0l22-22C84.4,232,84.4,225.6,80.4,221.6z" />
    <path d="M80.4,66.4l-22-22c-4-4-10.4-4-14.4,0s-4,10.4,0,14.4l22,22c4,4,10.4,4,14.4,0S84.4,70.4,80.4,66.4z" />
  </svg>
  */

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
            <Sun fill={isDarkMode ? 'gray' : 'orange'} />
            <input
              id="toggle"
              className="toggle-input"
              type="checkbox"
              onChange={SwitchTheme}
            />
            <label htmlFor="toggle" className="toggle-label" />
            <Moon fill={isDarkMode ? 'gray' : '#FCD707'} />
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
}

export default Home
