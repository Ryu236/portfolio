import React from 'react'

export const Footer = () => {
  return (
    <>
      <footer>
        <a
          href="https://twitter.com/Ryuk236"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2021 Ryutaro Kobayashi
        </a>
      </footer>

      <style jsx global>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}
