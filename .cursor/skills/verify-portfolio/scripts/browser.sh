#!/usr/bin/env bash
set -euo pipefail
# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

verify_load_env
export PORTFOLIO_VERIFY_URL PORTFOLIO_VERIFY_CHROME_PROFILE PORTFOLIO_VERIFY_CHROME_BIN
export PORTFOLIO_VERIFY_EVIDENCE_DIR PORTFOLIO_VERIFY_RUN_DIR
exec node "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/chrome-drive.mjs" "$@"
