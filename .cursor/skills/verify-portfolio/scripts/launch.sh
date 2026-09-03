#!/usr/bin/env bash
set -euo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

# A previous cleanup in this shell leaves PORTFOLIO_VERIFY_* exported. Do not
# reuse that run id or pid if the process is already gone.
if [[ -n "${PORTFOLIO_VERIFY_PID:-}" ]] && ! verify_pid_alive "$PORTFOLIO_VERIFY_PID"; then
  unset PORTFOLIO_VERIFY_RUN_ID PORTFOLIO_VERIFY_RUN_DIR PORTFOLIO_VERIFY_EVIDENCE_DIR
  unset PORTFOLIO_VERIFY_PID PORTFOLIO_VERIFY_URL PORTFOLIO_VERIFY_PORT
  unset PORTFOLIO_VERIFY_LOG PORTFOLIO_VERIFY_CHROME_PROFILE PORTFOLIO_VERIFY_REPO
fi

REPO="$(verify_repo_root)"
PORT="$(verify_default_port)"
RUN_ROOT="$(verify_run_root)"
EVIDENCE_ROOT="$(verify_evidence_root)"
RUN_ID="${PORTFOLIO_VERIFY_RUN_ID:-$(date +%Y%m%dT%H%M%S)-$$}"
RUN_DIR="${PORTFOLIO_VERIFY_RUN_DIR:-$RUN_ROOT/$RUN_ID}"
EVIDENCE_DIR="${PORTFOLIO_VERIFY_EVIDENCE_DIR:-$EVIDENCE_ROOT/$RUN_ID}"
URL="http://127.0.0.1:${PORT}"
LOCK="$(verify_lock_path)"
LOG="$RUN_DIR/next.log"
PID_FILE="$RUN_DIR/pid"

if [[ -f "$LOCK" ]]; then
  # shellcheck disable=SC1090
  source "$LOCK"
  if verify_pid_alive "${PORTFOLIO_VERIFY_PID:-}"; then
    verify_die "this checkout already has a verify instance (pid ${PORTFOLIO_VERIFY_PID}, ${PORTFOLIO_VERIFY_URL:-unknown}). Do not double-drive. Run scripts/cleanup.sh on that instance, or use a separate worktree."
  fi
  rm -f "$LOCK"
fi

LISTEN_PIDS="$(verify_listen_pids "$PORT" || true)"
if [[ -n "$LISTEN_PIDS" ]]; then
  verify_die "port $PORT is already in use by pid(s): $LISTEN_PIDS. Set PORTFOLIO_VERIFY_PORT to a free port, or clean up the owner if it is a leftover verify instance."
fi

verify_ensure_deps
NEXT_BIN="$(verify_next_bin)"

mkdir -p "$RUN_DIR" "$EVIDENCE_DIR" "$RUN_DIR/chrome-profile" "$(dirname "$LOCK")"
: >"$LOG"

export NEXT_TELEMETRY_DISABLED=1
(
  cd "$REPO"
  exec "$NEXT_BIN" dev --hostname 127.0.0.1 --port "$PORT"
) >>"$LOG" 2>&1 &
PID=$!
echo "$PID" >"$PID_FILE"

cleanup_failed_launch() {
  if verify_pid_alive "$PID"; then
    kill "$PID" 2>/dev/null || true
    sleep 0.5
    if verify_pid_alive "$PID"; then
      kill -9 "$PID" 2>/dev/null || true
    fi
  fi
}

READY=0
for _ in $(seq 1 60); do
  if ! verify_pid_alive "$PID"; then
    cleanup_failed_launch
    verify_die "next exited before Ready. Last log lines:\n$(tail -n 40 "$LOG")"
  fi
  if grep -q 'Ready' "$LOG" 2>/dev/null; then
    code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 2 "$URL/" || true)"
    if [[ "$code" == "200" ]]; then
      READY=1
      break
    fi
  fi
  sleep 0.5
done

if [[ "$READY" != "1" ]]; then
  cleanup_failed_launch
  verify_die "timed out waiting for Ready on $URL. Log: $LOG"
fi

cat >"$RUN_DIR/env" <<EOF
PORTFOLIO_VERIFY_RUN_ID=$RUN_ID
PORTFOLIO_VERIFY_RUN_DIR=$RUN_DIR
PORTFOLIO_VERIFY_EVIDENCE_DIR=$EVIDENCE_DIR
PORTFOLIO_VERIFY_PORT=$PORT
PORTFOLIO_VERIFY_URL=$URL
PORTFOLIO_VERIFY_PID=$PID
PORTFOLIO_VERIFY_LOG=$LOG
PORTFOLIO_VERIFY_REPO=$REPO
PORTFOLIO_VERIFY_CHROME_PROFILE=$RUN_DIR/chrome-profile
PORTFOLIO_VERIFY_CHROME_BIN=$(verify_chrome_bin)
EOF

cp "$RUN_DIR/env" "$LOCK"
ln -sfn "$RUN_DIR" "$RUN_ROOT/latest"

printf 'verify-portfolio launched\n'
printf '  url:      %s\n' "$URL"
printf '  pid:      %s\n' "$PID"
printf '  run dir:  %s\n' "$RUN_DIR"
printf '  evidence: %s\n' "$EVIDENCE_DIR"
printf '  log:      %s\n' "$LOG"
printf 'Source the instance env before doctor/drive/cleanup:\n'
printf '  set -a && source %s/env && set +a\n' "$RUN_DIR"
