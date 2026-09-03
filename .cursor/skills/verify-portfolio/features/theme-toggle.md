# Theme toggle

Theme toggle lets a visitor flip the page between dark (default) and light from the header control, see the invert on the page, and keep that choice on the next load in the same browser profile.

## Sub-features

- `theme-default-dark` starts in dark with button name `Switch to light theme`.
- `theme-to-light` switches to light, renaming the button to `Switch to dark theme`.
- `theme-to-dark` switches back to dark from light.
- `theme-persist` keeps `localStorage` key `theme` across a new page load on the same Chrome profile.

## How to get to it (user POV)

- Choose the circular theme button in the header (right of Primary nav).
- Reload `/` after a previous choice in this browser profile.

## Driving it with verify-portfolio

Preconditions:

- Portfolio is healthy at `$PORTFOLIO_VERIFY_URL`.
- `scripts/doctor.sh` has passed.
- Chrome profile is this run’s `$PORTFOLIO_VERIFY_CHROME_PROFILE` (empty or `theme=dark`). If a prior recipe left light on, restore dark first.

- **Default dark.** Snapshot `/`. Run `.cursor/skills/verify-portfolio/scripts/browser.sh snapshot --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/theme-toggle/default"`. `state.json` has `htmlClass` containing `dark`, `theme` null or `dark`, and `themeButton` equal to `Switch to light theme`. Screenshot is a dark page with light text and identity `Ryutaro Kobayashi`.
- **Switch to light.** Choose the theme button. Run `.cursor/skills/verify-portfolio/scripts/browser.sh click --role button --name "Switch to light theme" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/theme-toggle/light"`. `after.json` has `htmlClass` containing `light`, `theme` equal to `light`, and `themeButton` equal to `Switch to dark theme`. Screenshot is a light page; identity still reads `Ryutaro Kobayashi`.
- **Confirm persistence.** Open a new load on the same profile. Run `.cursor/skills/verify-portfolio/scripts/browser.sh snapshot --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/theme-toggle/persisted"`. `state.json` still has `theme` `light` and `themeButton` `Switch to dark theme` without clicking.
- **Switch to dark.** Choose the button again. Run `.cursor/skills/verify-portfolio/scripts/browser.sh click --role button --name "Switch to dark theme" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/theme-toggle/dark"`. `after.json` has `htmlClass` containing `dark`, `theme` equal to `dark`, and `themeButton` equal to `Switch to light theme`.
- **Proof.** Keep default, after-click, and persisted snapshots. A light screenshot without `after.json` / persisted `theme` is incomplete.

## Gotchas

- The button has no visible text; the accessible name is the `aria-label`. Click by that name, not by icon shape.
- Before hydration the label is already `Switch to light theme` on the default page. `browser.sh` waits for hydration; do not click during FOUC.
- `enableSystem` is off. The visitor’s OS color scheme must not change the default. If `theme` is `system` in an old profile, the page itself rewrites that to `dark` on load; start from this run’s empty profile instead of arguing with leftover keys.
- Each `browser.sh` command is a new Chrome process sharing the profile directory. Persistence is the second load, not a second tab in the same process.
- Restore dark before recipes that screenshot default chrome.
