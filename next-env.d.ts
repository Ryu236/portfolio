/// <reference types="next" />
/// <reference types="next/types/global" />

interface Window {
  // For pageview
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string })
  // For event
  gtag(
    type: 'event',
    eventAction: string,
    fieldObject: {
      event_label: string
      event_category: string
      value?: number
    }
  )
}
