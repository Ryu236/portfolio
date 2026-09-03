# Work and education

Work and education are the resume sections on the same page: a Work timeline (featured UPSIDER roles, then quieter jobs) and an Education list for Shinshu University.

## Sub-features

- `work-heading` shows heading `Work` in `#work`.
- `work-upsider` shows `UPSIDER, Inc.` with dates `Mar 2023 — Present` and nested roles including `Tech Lead, Anti-Fraud`.
- `work-quiet` shows `Shiftbase, Inc.`, `DMM.com LLC`, `GANGAN, Inc.`, `Eureka, Inc.`, and `Sony Corporation`.
- `edu-heading` shows heading `Education` in `#education`.
- `edu-degrees` shows both Shinshu University degrees.

## How to get to it (user POV)

- Scroll to Work on `/`.
- Choose `Work` in the Primary nav (`#work`).
- Scroll past Work to Education (`#education` has no header link).

## Driving it with verify-portfolio

Preconditions:

- Portfolio is healthy at `$PORTFOLIO_VERIFY_URL`.
- `scripts/doctor.sh` has passed.

- **Open Work.** Jump to the section. Run `.cursor/skills/verify-portfolio/scripts/browser.sh click --role link --name "Work" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/work-and-education/work"`. `after.json` `hash` is `#work`. Screenshot and `ax.txt` include heading `Work` and `UPSIDER, Inc.`
- **Featured roles.** From that evidence, confirm `Tech Lead, Anti-Fraud`, `Engineering Manager, Anti-Fraud`, `Software Engineer, Processor`, and `Software Engineer` appear with UPSIDER. HTTP fallback: `.cursor/skills/verify-portfolio/scripts/dump-home.sh "$PORTFOLIO_VERIFY_EVIDENCE_DIR/work-and-education/http"` landmark `upsider` is `OK` and `home.html` contains those role strings.
- **Quieter jobs.** Same dump or snapshot contains `Shiftbase, Inc.`, `DMM.com LLC`, `GANGAN, Inc.`, `Eureka, Inc.`, `Sony Corporation`, plus `Android application.` and `Embedded system.`
- **Open Education.** Snapshot the education target. Run `.cursor/skills/verify-portfolio/scripts/browser.sh snapshot --url "$PORTFOLIO_VERIFY_URL/#education" --dir "$PORTFOLIO_VERIFY_EVIDENCE_DIR/work-and-education/education"`. Screenshot includes heading `Education`, `Shinshu University`, `M.S. Electrical and Computer Engineering`, and `B.S. Computer Science and Engineering`.
- **Proof.** Keep the Work click screenshot (action = nav to Work, state = UPSIDER visible) and the Education snapshot (second read-only view further down the page). Dump-only proof without a hydrated screenshot does not show the visitor’s view.

## Gotchas

- Education is not in Primary nav. Reaching it by scrolling or `/#education` is the user path; do not invent a header link.
- Company names are headings. Assert the visible strings above, not CSS grid columns.
- UPSIDER is the only featured (larger) company. Absence of nested roles on Shiftbase/DMM is expected, not a failure.
- Dates use an em dash (`—`), not a hyphen. Match the page, not a normalized ASCII dash.
