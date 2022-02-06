import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Resume } from '../components/resume'

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

export const Home: React.VFC = () => {
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

  const GithubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60px"
      height="60px"
      viewBox="0 0 120.775 117.794"
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
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 400 400"
      width="60px"
      height="60px"
    >
      <g id="Dark_Blue">
        <circle fill="#1DA1F2" cx="200" cy="200" r="200" />
      </g>
      <g id="Logo__x2014__FIXED">
        <path
          fill="#FFF"
          d="M163.4,305.5c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25
		c-8.6,3.8-17.9,6.4-27.7,7.6c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2
		c-26.6,0-48.2,21.6-48.2,48.2c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2
		c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7
		c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7
		C110.8,297.5,136.2,305.5,163.4,305.5"
        />
      </g>
    </svg>
  )

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

        <div className="flex flex-row items-center justify-center max-w-4xl my-10">
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
            <Hatena fill={dark ? '#EEE' : '#333'} />
          </a>
          <a
            className="sm:mx-3"
            href="https://www.wantedly.com/id/ryu236"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/Wantedly_Mark_LightBG.svg" width={80} height={80} />
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
    </div>
  )
}

export default Home
