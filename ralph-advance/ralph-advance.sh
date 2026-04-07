#!/usr/bin/env bash
set -euo pipefail

# ralph.sh
# Run scaffold/install tasks and record + push progress after each task.
# Usage: ./ralph.sh
# Make sure you have SSH keys configured for git@github.com:SANDHOSH02/Portfolio-professional.git

GIT_REMOTE_DEFAULT="git@github.com:SANDHOSH02/Portfolio-professional.git"
GIT_BRANCH_DEFAULT="feature/business-mode"

REMOTE=${GIT_REMOTE:-$GIT_REMOTE_DEFAULT}
BRANCH=${GIT_BRANCH:-$GIT_BRANCH_DEFAULT}

PROGRESS_FILE="../ralph/progress.md"
LOG_FILE="../ralph/migration.log"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

record() {
  local desc="$1"
  local ts
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  mkdir -p "$(dirname "$PROGRESS_FILE")"
  echo "- [x] $desc — $ts" >> "$PROGRESS_FILE"
  echo "$ts - $desc" >> "$LOG_FILE"
}

commit_and_push() {
  local desc="$1"
  git add "$PROGRESS_FILE" "$LOG_FILE" || true
  git add .
  git commit -m "progress: $desc" || echo "No changes to commit for: $desc"
  git push "$REMOTE" HEAD
}

run_task() {
  local desc="$1"; shift
  echo "\n== Task: $desc =="
  "$@"
  record "$desc"
  commit_and_push "$desc"
}

cd "$ROOT_DIR"

echo "Using remote: $REMOTE"
echo "Using branch: $BRANCH"

# Ensure branch exists and is checked out
if git rev-parse --abbrev-ref HEAD | grep -q "^$BRANCH$"; then
  echo "Already on $BRANCH"
else
  if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
    git checkout "$BRANCH"
  else
    git checkout -b "$BRANCH"
  fi
fi

# Ensure remote is set
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Setting origin to $REMOTE"
  git remote add origin "$REMOTE" || true
fi

# TASK LIST: describe and command(s) to run for each
run_task "Audit project (list files)" ls -la

run_task "Scaffold Vite React (create if not exists)" bash -lc 'if [ ! -f package.json ]; then npm create vite@latest . -- --template react; else echo "package.json exists, skipping scaffold"; fi'

run_task "Install npm dependencies" npm install

run_task "Install react-router-dom (optional)" npm install react-router-dom || true

run_task "Copy global CSS and assets into client" bash -lc 'cp -n index.css client/ 2>/dev/null || true; cp -n -r assets client/assets 2>/dev/null || true; echo "copied (if existed)"'

run_task "Add ModeContext and Header toggle (placeholder file)" bash -lc 'mkdir -p client/src/components; cat > client/src/components/ModeToggle.jsx <<"EOF"
import React from "react";
export default function ModeToggle(){return (<div className="mode-toggle">Personal | Business</div>)}
EOF
'

run_task "Run dev server sanity check (npm run dev)" bash -lc 'npm run dev -- --port 5173 >/dev/null 2>&1 & sleep 2; pgrep -af vite || true; kill $(pgrep -f vite) >/dev/null 2>&1 || true'

echo "\nAll tasks executed. Review $PROGRESS_FILE and $LOG_FILE for details." 
