#!/usr/bin/env bash
set -euo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

verify_load_env

fail=0
note() { printf 'doctor: %s\n' "$*"; }
bad() { printf 'doctor FAIL: %s\n' "$*" >&2; fail=1; }

note "run dir ${PORTFOLIO_VERIFY_RUN_DIR}"
note "url ${PORTFOLIO_VERIFY_URL}"
note "pid ${PORTFOLIO_VERIFY_PID}"

if ! verify_pid_alive "$PORTFOLIO_VERIFY_PID"; then
  bad "recorded pid $PORTFOLIO_VERIFY_PID is not alive"
else
  cmd="$(ps -o args= -p "$PORTFOLIO_VERIFY_PID" || true)"
  note "cmdline $cmd"
  if ! grep -q 'next' <<<"$cmd"; then
    bad "recorded pid $PORTFOLIO_VERIFY_PID cmdline does not look like next: $cmd"
  fi
  if ! grep -q "$PORTFOLIO_VERIFY_PORT" <<<"$cmd"; then
    bad "recorded pid $PORTFOLIO_VERIFY_PID is not bound to port $PORTFOLIO_VERIFY_PORT"
  fi
fi

LISTEN_PIDS="$(verify_listen_pids "$PORTFOLIO_VERIFY_PORT" || true)"
if [[ -z "$LISTEN_PIDS" ]]; then
  bad "nothing is listening on $PORTFOLIO_VERIFY_PORT"
else
  owned=0
  for lp in $LISTEN_PIDS; do
    if [[ "$lp" == "$PORTFOLIO_VERIFY_PID" ]] || verify_pid_in_tree "$lp" "$PORTFOLIO_VERIFY_PID"; then
      owned=1
      note "listen pid $lp is in our process tree"
    else
      bad "port $PORTFOLIO_VERIFY_PORT is also owned by unrelated pid $lp"
    fi
  done
  if [[ "$owned" != "1" ]]; then
    bad "port $PORTFOLIO_VERIFY_PORT is not owned by pid $PORTFOLIO_VERIFY_PID or its children"
  fi
fi

tmp_html="$(mktemp)"
tmp_hdr="$(mktemp)"
trap 'rm -f "$tmp_html" "$tmp_hdr"' EXIT
code="$(curl -sS -D "$tmp_hdr" -o "$tmp_html" -w '%{http_code}' --max-time 5 "${PORTFOLIO_VERIFY_URL}/" || true)"
if [[ "$code" != "200" ]]; then
  bad "GET ${PORTFOLIO_VERIFY_URL}/ returned HTTP $code"
else
  note "GET / -> 200"
fi

if ! grep -q 'X-Powered-By: Next.js' "$tmp_hdr"; then
  bad "response is missing X-Powered-By: Next.js"
fi

if ! grep -q 'Ryutaro Kobayashi' "$tmp_html"; then
  bad "HTML does not contain 'Ryutaro Kobayashi'"
fi
if ! grep -q '<title[^>]*>Ryutaro Kobayashi</title>' "$tmp_html"; then
  bad "HTML title is not Ryutaro Kobayashi"
fi
if ! grep -q 'aria-label="Primary"' "$tmp_html"; then
  bad "HTML is missing nav aria-label=\"Primary\""
fi
if ! grep -q 'id="work"' "$tmp_html" || ! grep -q 'id="contact"' "$tmp_html"; then
  bad "HTML is missing #work or #contact"
fi

if [[ "$fail" != "0" ]]; then
  printf 'doctor: instance is NOT safe to drive\n' >&2
  exit 1
fi

printf 'doctor: instance is healthy\n'
printf '  url:      %s\n' "$PORTFOLIO_VERIFY_URL"
printf '  pid:      %s\n' "$PORTFOLIO_VERIFY_PID"
printf '  evidence: %s\n' "$PORTFOLIO_VERIFY_EVIDENCE_DIR"
exit 0
