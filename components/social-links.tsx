import React from 'react'

export const socialLinks = [
  { href: 'https://github.com/Ryu236/', label: 'GitHub' },
  { href: 'https://x.com/Ryuk236', label: 'X' },
  { href: 'https://blog.ryu236.com', label: 'Blog' },
  { href: 'https://www.linkedin.com/in/ryu236/', label: 'LinkedIn' },
] as const

type SocialLinksProps = {
  className?: string
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className }) => {
  return (
    <ul
      className={`flex flex-wrap items-center text-[15px] leading-relaxed text-ink ${
        className ?? ''
      }`}
    >
      {socialLinks.map((link, index) => (
        <li key={link.href} className="flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="px-2 text-muted">
              ·
            </span>
          )}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-muted underline-offset-[3px] transition-colors hover:text-ink hover:decoration-ink"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
