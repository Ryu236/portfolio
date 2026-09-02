import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const SunIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="4" />
    <path
      d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6.05 6.05l1.4 1.4M16.55 16.55l1.4 1.4M6.05 17.95l1.4-1.4M16.55 7.45l1.4-1.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
)

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="currentColor"
  >
    <path d="M20.2 15.3A8.2 8.2 0 0 1 8.7 3.8 7.1 7.1 0 1 0 20.2 15.3Z" />
  </svg>
)

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && theme === 'light'

  return (
    <button
      type="button"
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--toggle)] text-[var(--toggle-icon)]"
    >
      <span className="hidden dark:inline-flex">
        <SunIcon />
      </span>
      <span className="inline-flex dark:hidden">
        <MoonIcon />
      </span>
    </button>
  )
}
