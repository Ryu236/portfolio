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

collect_tree() {
  local root="$1"
  verify_pid_alive "$root" || return 0
  local children child
  children="$(ps -o pid= --ppid "$root" 2>/dev/null | awk '{print $1}' || true)"
  for child in $children; do
    collect_tree "$child"
  done
  printf '%s\n' "$root"
}

kill_tree() {
  local root="$1"
  local pids p any
  pids="$(collect_tree "$root" | sort -u)"
  [[ -n "$pids" ]] || return 0
  for p in $pids; do
    kill "$p" 2>/dev/null || true
  done
  for _ in $(seq 1 20); do
    any=0
    for p in $pids; do
      if verify_pid_alive "$p"; then
        any=1
        break
      fi
    done
    [[ "$any" == "0" ]] && return 0
    sleep 0.2
  done
  for p in $pids; do
    if verify_pid_alive "$p"; then
      kill -9 "$p" 2>/dev/null || true
    fi
  done
  for _ in $(seq 1 10); do
    any=0
    for p in $pids; do
      if verify_pid_alive "$p"; then
        any=1
        break
      fi
    done
    [[ "$any" == "0" ]] && return 0
    sleep 0.1
  done
}

if [[ -n "$PID" ]]; then
  kill_tree "$PID"
  if verify_pid_alive "$PID"; then
    printf 'verify-portfolio cleanup: pid %s still alive after SIGKILL\n' "$PID" >&2
    exit 1
  fi
fi

LOCK="$(verify_lock_path)"
quoted_run_dir="$(printf '%q' "$RUN_DIR")"
if [[ -f "$LOCK" ]] && grep -Fq "PORTFOLIO_VERIFY_RUN_DIR=$quoted_run_dir" "$LOCK"; then
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
