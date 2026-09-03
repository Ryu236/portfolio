# Contact and social

Contact and social let a visitor start email or open GitHub, X, Blog, and LinkedIn. The same four social links appear under the hero and again under Contact; email appears only in Contact.

## Sub-features

- `contact-heading` shows heading `Contact` in `#contact`.
- `contact-mail` exposes `ryu.adv.2360@gmail.com` as a `mailto:` link.
- `social-hero` shows GitHub, X, Blog, and LinkedIn under the intro.
- `social-contact` shows the same four links again under Contact.
- `social-new-tab` opens social destinations in a new tab (`target="_blank"`).

## How to get to it (user POV)

- Read the hero social row on `/`.
- Choose `Contact` in the Primary nav or open `/#contact`.
- Choose the email address or a social name.

## Driving it with verify-portfolio

Preconditions:

- Portfolio is healthy at `$PORTFOLIO_VERIFY_URL`.
- `scripts/doctor.sh` has passed.

- **Hero socials.** Snapshot `/`. Run `.cursor/skills/verify-portfolio/scripts/dump-home.sh "$PORTFOLIO_VERIFY_EVIDENCE_DIR/contact-and-social/http"` and `.cursor/skills/verify-portfolio/scripts/browser.sh snapshot --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/contact-and-social/hero"`. Landmarks `github`, `x`, `blog`, `linkedin` are `OK`. `ax.txt` contains `link: GitHub`, `link: X`, `link: Blog`, `link: LinkedIn`. Screenshot shows those four names under the intro.
- **Open Contact.** Choose `Contact`. Run `.cursor/skills/verify-portfolio/scripts/browser.sh click --role link --name "Contact" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/contact-and-social/contact"`. `after.json` `hash` is `#contact`. Screenshot shows heading `Contact`, the email, and the social row.
- **Mailto.** In `contact-and-social/http/home.html` (or the contact screenshot’s AX dump) the link named `ryu.adv.2360@gmail.com` has `href="mailto:ryu.adv.2360@gmail.com"`. Do not launch a mail client.
- **Social hrefs.** Same HTML contains exactly:
  - `https://github.com/Ryu236/`
  - `https://x.com/Ryuk236`
  - `https://blog.ryu236.com`
  - `https://www.linkedin.com/in/ryu236/`
  Each social anchor also has `target="_blank"` and `rel="noopener noreferrer"`.
- **Two copies.** `dump-home` HTML contains two anchors for each social `href` (hero + contact). Proving only the first `GitHub` link leaves the Contact copy unverified.
- **Proof.** Keep the hero snapshot, the Contact click after-state, and the HTTP file that shows `mailto` and the four hrefs. Do not load the external sites.

## Gotchas

- `browser.sh click --role link --name "GitHub"` hits the **first** GitHub in document order (hero). To inspect Contact’s copy, snapshot `/#contact` or read HTML; do not report the hero click as the Contact entry point.
- External sites and the OS mailer are outside this app. A 404 on github.com is not a Portfolio failure. Prove attributes, not the destination document.
- Social labels are plain text (`GitHub`, `X`, `Blog`, `LinkedIn`), not icon-only controls. Wantedly is not present.
- `X` is a one-letter accessible name. Use the quoted `--name "X"` exactly.
