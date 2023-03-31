import { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics, usePageView } from '../lib/gtag'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  usePageView()

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default App
