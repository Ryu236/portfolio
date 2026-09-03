# Portfolio verification map

This directory is the maintained source for verifying the user-facing behavior of Portfolio (the Ryutaro Kobayashi single-page site). Read the index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch Portfolio at `http://127.0.0.1:4370` via `.cursor/skills/verify-portfolio/scripts/launch.sh` (override with `PORTFOLIO_VERIFY_PORT` only when 4370 is taken **and** this run owns the replacement).
- Bind is `127.0.0.1`. One `next dev` per checkout; a second launch in the same tree is refused.
- No seed data and no auth. Default theme is dark (`localStorage` key `theme` unset or `dark`).
- Source `/tmp/portfolio-verify-run/latest/env` (or the env path launch printed) and run `scripts/doctor.sh`.
- Never drive an instance that was not started by this verification run.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise. After a theme mutation, restore dark before a recipe that assumes default chrome.
- Prefer accessible names and the handles in this map (`Primary` nav, `RK`, `Work`, `Contact`, theme button names, heading text) over CSS selectors or coordinates.
- Treat every command as literal. Keep quoted names and flags unchanged.
- Run HTTP checks through `scripts/dump-home.sh`.
- Run browser actions through `scripts/browser.sh`.
- Keep proof artifacts under `$PORTFOLIO_VERIFY_EVIDENCE_DIR`. Cleanup must not remove them.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes an ARIA dump (`ax.txt`) and a screenshot with Portfolio identity visible (`Ryutaro Kobayashi` or `RK`).
- HTTP proof includes status, headers, and the landmark file from `dump-home.sh`.
- Mutation proof includes a second read-only view (`browser.sh snapshot` or a second `dump-home.sh`) of the stored value.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with verify-portfolio` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Home identity](./home-identity.md) covers the hero, Now blurb, title, RK mark, and footer identity on `/`.
- [In-page navigation](./in-page-navigation.md) covers Primary nav, RK home mark, and hash targets `#work`, `#contact`, `#top`.
- [Theme toggle](./theme-toggle.md) covers dark/light switching, button names, and `theme` persistence.
- [Work and education](./work-and-education.md) covers the Work timeline, nested UPSIDER roles, quieter jobs, and Education.
- [Contact and social](./contact-and-social.md) covers the mailto link and GitHub, X, Blog, and LinkedIn in hero and contact.
