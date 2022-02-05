import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Script from 'next/script'

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

// Check GA id
export const existsGaId = GA_ID !== ''

// Count page views
export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path, // eslint-disable-line
  })
}

type GaEventProps = {
  action: string
  category: string
  label: string
  value?: string
}

// Track GA event
export const event = ({ action, category, label, value }: GaEventProps) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category, // eslint-disable-line
    event_label: label, // eslint-disable-line
    value: value,
  })
}

export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (!existsGaId) {
      return
    }

    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

// Load in _app.tsx
export const GoogleAnalytics = () => (
  <>
    {existsGaId && (
      <>
        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
          strategy="afterInteractive"
        />
      </>
    )}
  </>
)
