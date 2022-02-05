import { AppProps } from 'next/app'
import { GoogleAnalytics, usePageView } from '../lib/gtag'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  usePageView()

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  )
}

export default App
