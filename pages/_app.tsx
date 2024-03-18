import { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics, usePageView } from '../lib/gtag'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'

const App = ({ Component, pageProps }: AppProps) => {
  usePageView()

  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  )
}

export default App
