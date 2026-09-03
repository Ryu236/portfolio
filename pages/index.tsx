import React from 'react'
import Head from 'next/head'
import { ThemeToggle } from '../components/theme-toggle'
import { SocialLinks } from '../components/social-links'
import { Education, Work } from '../components/work'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Head>
        <title>Ryutaro Kobayashi</title>
        <meta
          name="description"
          content="Software engineer in Fukuoka, Japan. Payments, card processing, and the systems that keep money safe."
        />
      </Head>

      <div className="mx-auto w-full max-w-page px-6">
        <header className="flex items-center justify-between pt-8">
          <a
            href="#top"
            className="font-serif text-[1.375rem] font-medium leading-none text-ink no-underline"
          >
            RK
          </a>
          <div className="flex items-center gap-6">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-5">
                <li>
                  <a
                    href="#work"
                    className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted no-underline hover:text-ink"
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted no-underline hover:text-ink"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <main id="top">
          <section className="pb-16 pt-20">
            <h1 className="font-serif text-[2.625rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              Ryutaro Kobayashi
            </h1>
            <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-[1.7] text-ink">
              <strong className="font-medium">Software engineer.</strong>{' '}
              Payments is the through-line — card processing, platforms, and the
              boring work that keeps money safe. Fukuoka, Japan.
            </p>
            <SocialLinks className="mt-8" />
          </section>

          <section className="pb-16">
            <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
              Now
            </h2>
            <div className="border-t border-rule pt-6">
              <p className="text-[1.0625rem] leading-[1.7] text-ink">
                I work on payment safety — fraud, processing, the systems nobody
                notices until they fail.
              </p>
            </div>
          </section>

          <Work />

          <div className="pt-16">
            <Education />
          </div>

          <section id="contact" className="scroll-mt-8 pt-16">
            <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              Contact
            </h2>
            <div className="border-t border-rule pt-6">
              <a
                href="mailto:ryu.adv.2360@gmail.com"
                className="text-[1.0625rem] leading-relaxed text-ink underline decoration-muted underline-offset-[3px] hover:decoration-ink"
              >
                ryu.adv.2360@gmail.com
              </a>
              <SocialLinks className="mt-5" />
            </div>
          </section>
        </main>

        <footer className="pb-16 pt-20">
          <p className="text-[13px] text-muted">© 2026 Ryutaro Kobayashi</p>
        </footer>
      </div>
    </div>
  )
}

export default Home
