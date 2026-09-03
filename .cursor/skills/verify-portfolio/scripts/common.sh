# Shared helpers for verify-portfolio. Source from sibling scripts; do not execute.

if [[ -n "${VERIFY_PORTFOLIO_COMMON_LOADED:-}" ]]; then
  return 0 2>/dev/null || exit 0
fi
VERIFY_PORTFOLIO_COMMON_LOADED=1

VERIFY_SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERIFY_SKILL_DIR="$(cd "$VERIFY_SCRIPTS_DIR/.." && pwd)"

verify_repo_root() {
  if [[ -n "${PORTFOLIO_VERIFY_REPO:-}" && -d "$PORTFOLIO_VERIFY_REPO" ]]; then
    printf '%s\n' "$PORTFOLIO_VERIFY_REPO"
    return 0
  fi
  git -C "$VERIFY_SCRIPTS_DIR" rev-parse --show-toplevel
}

verify_run_root() {
  printf '%s\n' "${PORTFOLIO_VERIFY_RUN_ROOT:-/tmp/portfolio-verify-run}"
}

verify_evidence_root() {
  printf '%s\n' "${PORTFOLIO_VERIFY_EVIDENCE_ROOT:-/tmp/portfolio-verify-evidence}"
}

verify_default_port() {
  printf '%s\n' "${PORTFOLIO_VERIFY_PORT:-4370}"
}

verify_die() {
  printf 'verify-portfolio: %s\n' "$*" >&2
  exit 1
}

verify_find_chrome() {
  if [[ -n "${PORTFOLIO_VERIFY_CHROME_BIN:-}" && -x "${PORTFOLIO_VERIFY_CHROME_BIN}" ]]; then
    printf '%s\n' "$PORTFOLIO_VERIFY_CHROME_BIN"
    return 0
  fi
  local candidate
  for candidate in /opt/google/chrome/google-chrome /usr/bin/google-chrome-stable /usr/bin/chromium /usr/bin/chromium-browser; do
    if [[ -x "$candidate" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  return 1
}

verify_chrome_bin() {
  local bin
  bin="$(verify_find_chrome || true)"
  if [[ -z "$bin" ]]; then
    verify_die "no Chrome/Chromium binary found (looked for /opt/google/chrome/google-chrome and google-chrome-stable). Do not use PATH google-chrome if it wraps a shared --user-data-dir."
  fi
  printf '%s\n' "$bin"
}

verify_listen_pids() {
  local port="$1"
  local pids
  pids="$(lsof -nP -t -iTCP:"$port" -sTCP:LISTEN 2>/dev/null | sort -u || true)"
  if [[ -n "$pids" ]]; then
    printf '%s\n' "$pids"
    return 0
  fi
  # Some environments hide sockets from lsof; netstat still sees next-server.
  if command -v netstat >/dev/null 2>&1; then
    pids="$(netstat -tlnp 2>/dev/null | awk -v port="$port" '
      $6 == "LISTEN" {
        n = split($4, a, ":")
        if (a[n] == port) {
          split($7, b, "/")
          if (b[1] ~ /^[0-9]+$/) print b[1]
        }
      }
    ' | sort -u)"
    if [[ -n "$pids" ]]; then
      printf '%s\n' "$pids"
      return 0
    fi
  fi
  python3 - "$port" <<'PY'
import glob
import os
import sys

port = int(sys.argv[1])

def inodes(path):
    found = []
    try:
        lines = open(path).read().splitlines()[1:]
    except FileNotFoundError:
        return found
    for line in lines:
        parts = line.split()
        local, state, inode = parts[1], parts[3], parts[9]
        if state != "0A":
            continue
        p = int(local.rsplit(":", 1)[1], 16)
        if p == port:
            found.append(inode)
    return found

want = set(inodes("/proc/net/tcp") + inodes("/proc/net/tcp6"))
pids = set()
for fd in glob.glob("/proc/[0-9]*/fd/[0-9]*"):
    try:
        target = os.readlink(fd)
    except OSError:
        continue
    if not target.startswith("socket:[") or not target.endswith("]"):
        continue
    inode = target[len("socket:[") : -1]
    if inode in want:
        pids.add(fd.split("/")[2])
for pid in sorted(pids, key=int):
    print(pid)
PY
}

verify_pid_alive() {
  local pid="$1"
  [[ -n "$pid" && -d "/proc/$pid" ]]
}

verify_pid_in_tree() {
  local target="$1"
  local ancestor="$2"
  local pid="$target"
  local ppid
  while [[ -n "$pid" && "$pid" != "0" && "$pid" != "1" ]]; do
    if [[ "$pid" == "$ancestor" ]]; then
      return 0
    fi
    ppid="$(ps -o ppid= -p "$pid" 2>/dev/null | tr -d ' ')"
    [[ -n "$ppid" && "$ppid" != "$pid" ]] || return 1
    pid="$ppid"
  done
  return 1
}

verify_repo_key() {
  local repo
  repo="$(verify_repo_root)"
  printf '%s' "$repo" | sha256sum | awk '{print $1}'
}

verify_lock_path() {
  printf '%s/locks/%s\n' "$(verify_run_root)" "$(verify_repo_key)"
}

verify_load_env() {
  local run_dir="${PORTFOLIO_VERIFY_RUN_DIR:-}"
  local latest
  if [[ -z "$run_dir" ]]; then
    latest="$(verify_run_root)/latest"
    if [[ -d "$latest" ]]; then
      run_dir="$latest"
    elif [[ -L "$latest" ]]; then
      run_dir="$(readlink -f "$latest")"
    fi
  fi
  [[ -n "$run_dir" && -f "$run_dir/env" ]] || verify_die "no instance env found. Run scripts/launch.sh first (set PORTFOLIO_VERIFY_RUN_DIR if several runs exist)."
  # shellcheck disable=SC1091
  set -a
  # shellcheck disable=SC1090
  source "$run_dir/env"
  set +a
  PORTFOLIO_VERIFY_RUN_DIR="$run_dir"
  export PORTFOLIO_VERIFY_RUN_DIR
}

verify_next_bin() {
  local repo
  repo="$(verify_repo_root)"
  if [[ -x "$repo/node_modules/.bin/next" ]]; then
    printf '%s\n' "$repo/node_modules/.bin/next"
    return 0
  fi
  return 1
}

verify_ensure_deps() {
  local repo
  repo="$(verify_repo_root)"
  if verify_next_bin >/dev/null; then
    return 0
  fi
  printf 'verify-portfolio: installing dependencies in %s\n' "$repo" >&2
  if command -v bun >/dev/null 2>&1; then
    (cd "$repo" && bun install)
  elif command -v npm >/dev/null 2>&1; then
    (cd "$repo" && HUSKY=0 npm ci)
  else
    verify_die "need bun or npm to install dependencies"
  fi
  verify_next_bin >/dev/null || verify_die "next binary still missing after install"
}
