module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
      },
      maxWidth: {
        page: '720px',
      },
      width: {
        date: '168px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
