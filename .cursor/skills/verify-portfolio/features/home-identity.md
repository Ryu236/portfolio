# Home identity

Home identity is the first screen a visitor gets at `/`: the name **Ryutaro Kobayashi**, the payments-focused intro, the Now note, the RK mark, and the footer copyright, all on a dark page unless the visitor has already chosen light theme.

## Sub-features

- `home-load` serves `/` with document title `Ryutaro Kobayashi`.
- `home-hero` shows heading level 1 `Ryutaro Kobayashi` and the software-engineer intro.
- `home-now` shows heading `Now` and the payment-safety sentence.
- `home-mark` shows the `RK` link to `#top` in the header.
- `home-footer` shows `© 2026 Ryutaro Kobayashi`.

## How to get to it (user POV)

- Open `http://127.0.0.1:4370/` (or `$PORTFOLIO_VERIFY_URL/`).
- Choose the `RK` mark while already on the page (returns to `#top`).

## Driving it with verify-portfolio

Preconditions:

- Portfolio is healthy at `$PORTFOLIO_VERIFY_URL` (default `http://127.0.0.1:4370`).
- `scripts/doctor.sh` reports that URL, pid, and title `Ryutaro Kobayashi`.
- Theme is default dark (`html` class includes `dark`; theme button named `Switch to light theme`).

- **Open home.** Load `/`. Run `.cursor/skills/verify-portfolio/scripts/dump-home.sh "$PORTFOLIO_VERIFY_EVIDENCE_DIR/home-identity/http"`. Exit 0, HTTP 200, and `landmarks.txt` lines for `title`, `h1`, `rk_home`, and `footer` are `OK`.
- **Hydrate hero.** Capture the painted page. Run `.cursor/skills/verify-portfolio/scripts/browser.sh snapshot --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/home-identity/browser"`. `state.json` has `h1` equal to `Ryutaro Kobayashi`, `title` equal to `Ryutaro Kobayashi`, `href` ending in `/`, and `themeButton` equal to `Switch to light theme`.
- **Now copy.** In the same snapshot, `ax.txt` or the screenshot contains heading `Now` and the sentence `I work on payment safety — fraud, processing, the systems nobody notices until they fail.`
- **RK mark.** Confirm the header mark. The hydrated page has a link named `RK` with `href="#top"` (`state.json` field `rkHref` is `#top`).
- **Footer.** Scroll or read the dump; `© 2026 Ryutaro Kobayashi` is present in `home.html` and on the full page.
- **Proof.** Keep `home-identity/http/landmarks.txt`, `home-identity/browser/screenshot.png`, and `home-identity/browser/ax.txt`. The screenshot shows **Ryutaro Kobayashi** or **RK**.

## Gotchas

- Dev SSR HTML includes `body{display:none}` until JS runs. `dump-home.sh` proving landmarks is not visual proof; always take the hydrated snapshot.
- Next.js may draw an `N` overlay on `next dev`. Ignore it; it is not product chrome.
- Primary nav labels are CSS `uppercase`. Chrome AX dumps may show `WORK` / `CONTACT`; `browser.sh click` still uses DOM text `Work` / `Contact`.
- Title in HTML is `<title data-next-head="">Ryutaro Kobayashi</title>`, not a bare `<title>Ryutaro Kobayashi</title>`.
- Do not treat Jest snapshots as this feature’s proof.
