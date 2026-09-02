import React from 'react'
import { render, screen } from '../testUtils'
import { Home } from '../../pages/index'
import { socialLinks } from '../../components/social-links'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the editorial hero', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Ryutaro Kobayashi' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Software engineer.')).toBeInTheDocument()
    expect(
      screen.getByText(
        /Payments is the through-line — card processing, platforms, and the boring work that keeps money safe. Fukuoka, Japan./,
      ),
    ).toBeInTheDocument()
  })

  it('renders chrome without the old resume template', () => {
    render(<Home />)

    expect(screen.getByText('RK')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'href',
      '#work',
    )
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument()
    expect(screen.queryByText('Resume')).not.toBeInTheDocument()
    expect(screen.queryByText('Writing')).not.toBeInTheDocument()
    expect(screen.queryByText('Experience')).not.toBeInTheDocument()
  })

  it('renders the now section', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: 'Now' })).toBeInTheDocument()
    expect(
      screen.getByText(
        'I work on payment safety — fraud, processing, the systems nobody notices until they fail.',
      ),
    ).toBeInTheDocument()
  })

  it('renders nested UPSIDER roles and quieter jobs', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: 'Work' })).toBeInTheDocument()
    expect(screen.getByText('Mar 2023 — Present')).toBeInTheDocument()
    expect(screen.getAllByText('UPSIDER, Inc.').length).toBeGreaterThan(0)
    expect(screen.getByText('Tech Lead, Anti-Fraud')).toBeInTheDocument()
    expect(
      screen.getByText('Engineering Manager, Anti-Fraud'),
    ).toBeInTheDocument()
    expect(screen.getByText('Software Engineer, Processor')).toBeInTheDocument()
    expect(screen.getByText('Shiftbase, Inc.')).toBeInTheDocument()
    expect(screen.getByText('DMM.com LLC')).toBeInTheDocument()
    expect(screen.getByText('GANGAN, Inc.')).toBeInTheDocument()
    expect(screen.getByText('Eureka, Inc.')).toBeInTheDocument()
    expect(screen.getByText('Sony Corporation')).toBeInTheDocument()
    expect(screen.getByText('Android application.')).toBeInTheDocument()
    expect(screen.getByText('Embedded system.')).toBeInTheDocument()
  })

  it('renders education and contact', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { name: 'Education' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('M.S. Electrical and Computer Engineering'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('B.S. Computer Science and Engineering'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'ryu.adv.2360@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:ryu.adv.2360@gmail.com')
    expect(screen.getByText('© 2026 Ryutaro Kobayashi')).toBeInTheDocument()
  })

  it('uses text social links instead of brand icons', () => {
    render(<Home />)

    for (const link of socialLinks) {
      const matches = screen.getAllByRole('link', { name: link.label })
      expect(matches.length).toBeGreaterThan(0)
      matches.forEach((anchor) => {
        expect(anchor).toHaveAttribute('href', link.href)
        expect(anchor.querySelector('svg')).toBeNull()
      })
    }

    expect(screen.queryByText('Wantedly')).not.toBeInTheDocument()
  })
})
