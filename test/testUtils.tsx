import { render } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'

const Providers = ({ children }: { children: any }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  )
}

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
