import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Resume } from '../components/parts/resume'

{
  /*
const Sun = ({fill}) => (
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

const Moon = ({fill}) => (
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
*/
}

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
  {
    /*
  let theme: string

  const [dark, useDark] = useState(false)
  */
  }
  const dark = false

  {
    /*
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
  */
  }

  const GithubIcon = () => {
    if (dark) {
      return <Image src="/github_icon_large_white.svg" width={60} height={60} />
    } else {
      return <Image src="/github_icon_large_dark.svg" width={60} height={60} />
    }
  }

  return (
    <div className="flex flex-col mx-auto min-h-screen">
      <Head>
        <title>ryu236.com</title>
      </Head>
      <main className="flex flex-col py-16 items-center">
        <h1 className="leading-3 sm:leading-5 text-4xl sm:text-5xl mb-4 sm:mb-6">
          Ryu236
        </h1>

        <p className="text-xl mt-3">
          Hi, my name is Ryutaro Kobayashi.
          <br />I am a software engineer in Japan.
        </p>

        {/*
        <div className="switch flex relative mt-5">
          <Sun fill={dark ? 'gray' : 'orange'} />
          <input
            id="toggle"
            className="toggle-input"
            type="checkbox"
            onChange={SwitchTheme}
            autoComplete="off"
          />
          <label
            htmlFor="toggle"
            className="toggle-label relative inline-block"
          />
          <Moon fill={dark ? '#FCD707' : 'gray'} />
        </div>
        */}

        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center max-w-4xl my-10">
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
        <Resume />
      </main>

      <footer className="w-full h-20 flex justify-center border-t">
        <a
          className="flex items-center"
          href="https://twitter.com/Ryuk236"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2021 Ryutaro Kobayashi
        </a>
      </footer>

      <style jsx>{`
        .card {
          @apply m-4 p-6 w-auto md:w-5/12 flex-shrink-0 flex-grow text-left border-2 border-gray-200 rounded-xl;
        }

        .card:hover,
        .card:focus,
        .card:active {
          @apply text-blue-500 border-blue-500;
        }

        .card h3 {
          @apply mb-4 text-2xl;
        }

        .card p {
          @apply m-0 text-xl leading-6;
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
