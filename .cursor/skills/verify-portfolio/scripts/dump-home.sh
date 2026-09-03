#!/usr/bin/env bash
set -euo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

verify_load_env

OUT_DIR="${1:-$PORTFOLIO_VERIFY_EVIDENCE_DIR/http}"
mkdir -p "$OUT_DIR"

HTML="$OUT_DIR/home.html"
HDR="$OUT_DIR/headers.txt"
LAND="$OUT_DIR/landmarks.txt"

code="$(curl -sS -D "$HDR" -o "$HTML" -w '%{http_code}' --max-time 10 "${PORTFOLIO_VERIFY_URL}/")"
[[ "$code" == "200" ]] || verify_die "GET ${PORTFOLIO_VERIFY_URL}/ returned HTTP $code"

if ! command -v python3 >/dev/null 2>&1; then
  verify_die "dump-home requires python3 on PATH"
fi

python3 - "$HTML" "$LAND" <<'PY'
import re
import sys
from pathlib import Path

html = Path(sys.argv[1]).read_text(encoding="utf-8", errors="replace")
out = Path(sys.argv[2])

needles = [
    ("title", r"<title[^>]*>Ryutaro Kobayashi</title>"),
    ("h1", r"<h1[^>]*>Ryutaro Kobayashi</h1>"),
    ("rk_home", r'href="#top"[^>]*>RK</a>'),
    ("nav_primary", r'aria-label="Primary"'),
    ("nav_work", r'href="#work"[^>]*>Work</a>'),
    ("nav_contact", r'href="#contact"[^>]*>Contact</a>'),
    ("theme_button", r'aria-label="Switch to light theme"'),
    ("section_work", r'id="work"'),
    ("section_education", r'id="education"'),
    ("section_contact", r'id="contact"'),
    ("mailto", r'href="mailto:ryu\.adv\.2360@gmail\.com"'),
    ("github", r'href="https://github.com/Ryu236/"'),
    ("x", r'href="https://x.com/Ryuk236"'),
    ("blog", r'href="https://blog.ryu236.com"'),
    ("linkedin", r'href="https://www.linkedin.com/in/ryu236/"'),
    ("upsider", r"UPSIDER, Inc\."),
    ("shinshu", r"Shinshu University"),
    ("footer", r"© 2026 Ryutaro Kobayashi"),
]

lines = []
missing = []
for name, pattern in needles:
    ok = re.search(pattern, html) is not None
    lines.append(f"{'OK' if ok else 'MISSING'}\t{name}\t{pattern}")
    if not ok:
        missing.append(name)

out.write_text("\n".join(lines) + "\n", encoding="utf-8")
if missing:
    raise SystemExit("dump-home missing landmarks: " + ", ".join(missing))
print(f"dump-home: {len(needles)} landmarks present")
PY

printf 'dump-home wrote %s\n' "$OUT_DIR"
printf '  html:      %s (%s bytes)\n' "$HTML" "$(wc -c <"$HTML")"
printf '  headers:   %s\n' "$HDR"
printf '  landmarks: %s\n' "$LAND"
