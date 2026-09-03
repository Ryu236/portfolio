import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren, ReactElement } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
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

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { ...options, wrapper: Providers })

export * from '@testing-library/react'

export { customRender as render }
