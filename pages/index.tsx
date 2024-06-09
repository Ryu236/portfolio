import React from 'react'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { Resume } from '../components/resume'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

export const Home: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const ThemeChanger = () => {
    const changeTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
      <button
        className="items-center p-2 pb-1 bg-black dark:bg-white rounded-full"
        onClick={changeTheme}
      >
        {theme === 'light' ? (
          <FontAwesomeIcon className="w-5 h-5" color="white" icon={faMoon} />
        ) : (
          <FontAwesomeIcon className="w-5 h-5" color="#ea580c" icon={faSun} />
        )}
      </button>
    )
  }

  const GithubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60px"
      height="60px"
      viewBox="0 0 120.775 117.794"
      filter={theme !== 'light' ? 'invert(1)' : ''}
    >
      <g
        id="Group_1"
        data-name="Group 1"
        transform="translate(-290.221 -58.431)"
      >
        <path
          id="Path_2"
          data-name="Path 2"
          d="M350.609,58.431a60.394,60.394,0,0,0-19.091,117.69c3.018.558,4.126-1.311,4.126-2.906,0-1.439-.056-6.2-.082-11.243-16.8,3.654-20.345-7.125-20.345-7.125-2.747-6.979-6.705-8.836-6.705-8.836-5.479-3.748.413-3.671.413-3.671,6.064.426,9.257,6.224,9.257,6.224,5.386,9.231,14.127,6.563,17.573,5.02.542-3.9,2.107-6.568,3.834-8.076-13.413-1.526-27.513-6.705-27.513-29.844A23.37,23.37,0,0,1,318.3,99.456c-.627-1.522-2.694-7.663.585-15.982,0,0,5.071-1.622,16.611,6.191a57.254,57.254,0,0,1,30.243,0c11.526-7.813,16.59-6.191,16.59-6.191,3.287,8.319,1.219,14.46.592,15.982a23.324,23.324,0,0,1,6.215,16.208c0,23.195-14.127,28.3-27.574,29.8,2.166,1.875,4.1,5.549,4.1,11.183,0,8.08-.07,14.583-.07,16.572,0,1.608,1.087,3.491,4.148,2.9A60.4,60.4,0,0,0,350.609,58.431Z"
          fill="#0f0c0d"
          fillRule="evenodd"
        />
        <path
          id="Path_3"
          data-name="Path 3"
          d="M313.093,145.134c-.133.3-.6.391-1.035.185s-.684-.607-.542-.907.6-.4,1.04-.189.689.611.537.911Zm-.743-.55"
          fill="#0f0c0d"
        />
        <path
          id="Path_4"
          data-name="Path 4"
          d="M315.539,147.863c-.288.266-.851.142-1.233-.279a.923.923,0,0,1-.177-1.255c.3-.267.843-.142,1.239.279s.472.984.171,1.255Zm-.576-.618"
          fill="#0f0c0d"
        />
        <path
          id="Path_5"
          data-name="Path 5"
          d="M317.92,151.34c-.37.258-.975.017-1.349-.52s-.37-1.182.008-1.44.971-.025,1.35.507.369,1.191-.009,1.453Zm0,0"
          fill="#0f0c0d"
        />
        <path
          id="Path_6"
          data-name="Path 6"
          d="M321.182,154.7c-.331.365-1.036.266-1.552-.232a1.161,1.161,0,0,1-.343-1.543c.335-.365,1.044-.262,1.564.232s.684,1.181.331,1.543Zm0,0"
          fill="#0f0c0d"
        />
        <path
          id="Path_7"
          data-name="Path 7"
          d="M325.682,156.652c-.146.472-.825.687-1.509.486s-1.13-.761-.992-1.238.824-.7,1.513-.485,1.13.755.988,1.237Zm0,0"
          fill="#0f0c0d"
        />
        <path
          id="Path_8"
          data-name="Path 8"
          d="M330.624,157.013c.017.5-.563.911-1.281.92s-1.306-.387-1.314-.877.567-.911,1.289-.924,1.306.387,1.306.881Zm0,0"
          fill="#0f0c0d"
        />
        <path
          id="Path_9"
          data-name="Path 9"
          d="M335.223,156.231c.086.485-.413.984-1.126,1.117s-1.35-.172-1.439-.653c-.087-.5.421-1,1.121-1.126s1.353.168,1.444.662Zm0,0"
          fill="#0f0c0d"
        />
      </g>
    </svg>
  )

  const TwitterIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="25 -60 230 400"
      width="60px"
      height="60px"
    >
      <g>
        <circle fill="#071C25FF" cx="140" cy="140" r="200" />
      </g>
      <g transform="scale(0.23,0.23)">
        <path
          d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
          fill="white"
        />
      </g>
    </svg>
  )
  const Hatena = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60px"
      height="60px"
      viewBox="0 0 100 100"
    >
      <path
        fill={theme !== 'light' ? '#EEE' : '#333'}
        d="M50.1 100.2C22.5 100.2 0 77.7 0 50.1S22.5 0 50.1 0s50.1 22.5 50.1 50.1c-.1 27.6-22.5 50.1-50.1 50.1zm0-93.8C26 6.4 6.4 26 6.4 50.1S26 93.8 50.1 93.8s43.7-19.6 43.7-43.7S74.2 6.4 50.1 6.4z"
      />
      <path
        fill={theme !== 'light' ? '#EEE' : '#333'}
        d="M55.9 25.3c-2.4-5-3.9-9.8-4.7-12.6v35.5c1.2.5 2.1 1.6 2.1 3 0 1.8-1.5 3.3-3.3 3.3-1.8 0-3.3-1.5-3.3-3.3 0-1.5 1-2.7 2.3-3.1V12.7c-.8 2.8-2.2 7.6-4.7 12.6-3.8 7.8-8.6 14.6-8.6 14.6l3.1 41.8s2.9 3.2 11.3 3.2 11.3-3.2 11.3-3.2l3.1-41.8s-4.8-6.8-8.6-14.6z"
      />
    </svg>
  )

  const Wantedly = () => (
    <svg
      id="Logo"
      xmlns="http://www.w3.org/2000/svg"
      width="85px"
      height="85px"
      viewBox="0 0 500 394"
    >
      <defs></defs>
      <circle className="cls-1" fill="#21bddb" cx="375" cy="122.95" r="38.98" />
      <path
        className="cls-2"
        fill={theme !== 'light' ? '#fff' : '#282828'}
        fillRule="evenodd"
        d="M217.17,234.77c-2.34-1.52-9-10.45-27.42-54.44-1.15-2.76-2.22-5.14-3.23-7.18l-3.77-9.08L150.47,86.12H85.89l32.29,77.95,32.29,78,29.82,72a2.68,2.68,0,0,0,4.94,0l32.45-77.68A1.34,1.34,0,0,0,217.17,234.77Z"
      />
      <path
        className="cls-2"
        fill={theme !== 'light' ? '#fff' : '#282828'}
        fillRule="evenodd"
        d="M338.15,234.77c-2.34-1.52-9-10.45-27.42-54.44-1.15-2.76-2.23-5.14-3.24-7.19l-3.75-9.07L271.45,86.12H206.87l32.29,77.95,32.29,78,29.82,72a2.68,2.68,0,0,0,4.94,0l32.45-77.67A1.36,1.36,0,0,0,338.15,234.77Z"
      />
    </svg>
  )

  const Linkedin = () => (
    <svg
      width="60px"
      height="60px"
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
          fill={theme !== 'light' ? '' : '#007EBB'}
        />
        <path
          d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
          fill="#FFF"
        />
      </g>
    </svg>
  )

  return (
    <div className="flex flex-col mx-auto min-h-screen dark:text-white dark:bg-black">
      <Head>
        <title>ryu236.com</title>
      </Head>
      <main className="flex flex-col py-16 items-center">
        <ThemeChanger />
        <h1 className="leading-3 sm:leading-5 text-4xl sm:text-5xl mt-16 sm:mt-16">
          Ryu236
        </h1>

        <p className="text-2xl mt-16">
          Hi, my name is Ryutaro Kobayashi.
          <br />I am a software engineer in Japan.
        </p>

        <div className="flex flex-row items-center justify-center max-w-4xl mt-16">
          <a
            className="sm:mx-6 mx-3"
            href="https://github.com/Ryu236/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
          <a
            className="sm:mx-6 mx-3"
            href="https://twitter.com/Ryuk236"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
          <a
            className="sm:mx-6 mx-3"
            href="https://blog.ryu236.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Hatena />
          </a>
          <a
            className="sm:mx-3"
            href="https://www.wantedly.com/id/ryu236"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Wantedly />
          </a>
          <a
            className="sm:mx-6 mx-3"
            href="https://www.linkedin.com/in/ryu236/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
        </div>
        <Resume />
      </main>

      <footer className="w-full h-20 flex justify-center border-t mt-10">
        <a
          className="flex items-center"
          href="https://twitter.com/Ryuk236"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2021 Ryutaro Kobayashi
        </a>
      </footer>
    </div>
  )
}

export default Home
