export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path, // eslint-disable-line
  })
}

type GaEventProps = {
  action: string
  category: string
  label: string
  value?: number
}

export const event = ({ action, category, label, value }: GaEventProps) => {
  window.gtag('event', action, {
    event_category: category, // eslint-disable-line
    event_label: label, // eslint-disable-line
    value: value,
  })
}
