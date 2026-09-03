#!/usr/bin/env bash
set -euo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

if [[ -z "${PORTFOLIO_VERIFY_RUN_DIR:-}" || ! -f "${PORTFOLIO_VERIFY_RUN_DIR}/env" ]]; then
  if [[ -f "$(verify_run_root)/latest/env" ]]; then
    PORTFOLIO_VERIFY_RUN_DIR="$(readlink -f "$(verify_run_root)/latest")"
  fi
fi

if [[ -z "${PORTFOLIO_VERIFY_RUN_DIR:-}" || ! -f "${PORTFOLIO_VERIFY_RUN_DIR}/env" ]]; then
  printf 'verify-portfolio cleanup: no instance env found; nothing to tear down\n'
  printf 'evidence root (untouched): %s\n' "$(verify_evidence_root)"
  exit 0
fi

# shellcheck disable=SC1090
set -a
source "${PORTFOLIO_VERIFY_RUN_DIR}/env"
set +a

EVIDENCE_DIR="${PORTFOLIO_VERIFY_EVIDENCE_DIR:-}"
PID="${PORTFOLIO_VERIFY_PID:-}"
RUN_DIR="${PORTFOLIO_VERIFY_RUN_DIR}"

kill_tree() {
  local root="$1"
  verify_pid_alive "$root" || return 0
  local children
  children="$(ps -o pid= --ppid "$root" 2>/dev/null | tr -d ' ' || true)"
  local child
  for child in $children; do
    kill_tree "$child"
  done
  kill "$root" 2>/dev/null || true
}

if [[ -n "$PID" ]]; then
  kill_tree "$PID"
  for _ in $(seq 1 20); do
    verify_pid_alive "$PID" || break
    sleep 0.2
  done
  if verify_pid_alive "$PID"; then
    kill -9 "$PID" 2>/dev/null || true
    sleep 0.2
  fi
  if verify_pid_alive "$PID"; then
    printf 'verify-portfolio cleanup: pid %s still alive after SIGKILL\n' "$PID" >&2
    exit 1
  fi
fi

LOCK="$(verify_lock_path)"
if [[ -f "$LOCK" ]] && grep -q "PORTFOLIO_VERIFY_RUN_DIR=$RUN_DIR" "$LOCK"; then
  rm -f "$LOCK"
fi

LATEST="$(verify_run_root)/latest"
if [[ -L "$LATEST" ]]; then
  target="$(readlink -f "$LATEST" || true)"
  if [[ "$target" == "$(readlink -f "$RUN_DIR")" ]]; then
    rm -f "$LATEST"
  fi
fi

rm -rf "$RUN_DIR"

printf 'verify-portfolio cleanup: removed instance %s\n' "$RUN_DIR"
if [[ -n "$EVIDENCE_DIR" ]]; then
  if [[ -d "$EVIDENCE_DIR" ]]; then
    printf 'evidence still present: %s\n' "$EVIDENCE_DIR"
    ls -la "$EVIDENCE_DIR"
  else
    printf 'warning: evidence dir missing after cleanup: %s\n' "$EVIDENCE_DIR" >&2
  fi
else
  printf 'evidence root (untouched): %s\n' "$(verify_evidence_root)"
fi
