# In-page navigation

In-page navigation lets a visitor jump between the hero, Work, and Contact on the same URL using the header mark and the Primary nav, without leaving `/`.

## Sub-features

- `nav-primary` exposes a navigation named `Primary` with `Work` and `Contact`.
- `nav-work` moves the view to the Work heading via `#work`.
- `nav-contact` moves the view to the Contact heading via `#contact`.
- `nav-top` returns to the hero via the `RK` mark (`#top`).
- `nav-hash-url` can be opened directly as `/#work` or `/#contact`.

## How to get to it (user POV)

- Choose `Work` in the header Primary nav.
- Choose `Contact` in the header Primary nav.
- Choose `RK` in the header.
- Open `$PORTFOLIO_VERIFY_URL/#work` or `$PORTFOLIO_VERIFY_URL/#contact` as a URL.

## Driving it with verify-portfolio

Preconditions:

- Portfolio is healthy at `$PORTFOLIO_VERIFY_URL`.
- `scripts/doctor.sh` has passed.
- Theme is default dark unless this recipe says otherwise.

- **See Primary nav.** Snapshot `/`. Run `.cursor/skills/verify-portfolio/scripts/browser.sh snapshot --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/in-page-navigation/baseline"`. `ax.txt` includes `navigation: Primary`, `link: Work`, `link: Contact`, and `link: RK`.
- **Jump to Work.** Choose `Work`. Run `.cursor/skills/verify-portfolio/scripts/browser.sh click --role link --name "Work" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/in-page-navigation/work"`. `after.json` has `hash` equal to `#work` and `workHeading` true. The screenshot includes heading `Work` and `UPSIDER, Inc.`
- **Jump to Contact.** Choose `Contact`. Run `.cursor/skills/verify-portfolio/scripts/browser.sh click --role link --name "Contact" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/in-page-navigation/contact"`. `after.json` has `hash` equal to `#contact` and `contactHeading` true. The screenshot includes heading `Contact` and `ryu.adv.2360@gmail.com`.
- **Return to top.** Choose `RK`. Run `.cursor/skills/verify-portfolio/scripts/browser.sh click --role link --name "RK" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/in-page-navigation/top"`. `after.json` has `hash` equal to `#top` and `h1` equal to `Ryutaro Kobayashi`.
- **Direct hash.** Open Work by URL. Run `.cursor/skills/verify-portfolio/scripts/browser.sh snapshot --url "$PORTFOLIO_VERIFY_URL/#work" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/in-page-navigation/hash-work"`. `state.json` `hash` is `#work` and the screenshot still identifies Portfolio.
- **Proof.** Keep the click `before.json`/`after.json` pairs and screenshots for the entry point used. A snapshot of `/` alone does not prove the jumps.

## Gotchas

- Pathname stays `/`. Assert `location.hash`, not a new route.
- CSS `uppercase` on Primary nav can make `ax.txt` say `WORK` / `CONTACT`. Click `--name "Work"` and `--name "Contact"` (DOM text), not the AX capitalisation.
- `browser.sh click` starts at `/` unless `--url` is passed. To prove Contact after Work in one session, use `--url "$PORTFOLIO_VERIFY_URL/#work"` then click `Contact`, or run separate click commands (each command is a fresh Chrome on the shared profile; hash from a previous command does not carry unless you pass `--url`).
- Smooth scrolling is on unless the visitor asked for reduced motion. Wait for `hash` and the target heading, not a fixed sleep alone (`click` already waits briefly after the click).
- `#education` exists but has no header link. Do not report Education as covered by Primary nav.
