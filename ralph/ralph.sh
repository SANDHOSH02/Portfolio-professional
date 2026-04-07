# Script

Quick commands and checklist to scaffold and run the Vite + React migration.

## Recommended commands

```bash
# create a branch
git checkout -b migrate/vite-react

# scaffold Vite React in the repo root (or run in `client/` if you prefer)
npm create vite@latest . -- --template react

# install deps
npm install

# optional: add react-router if multiple pages
npm install react-router-dom

# dev server
npm run dev

# build
npm run build

# preview built site
npm run preview

# commit migration work
git add .
git commit -m "Migrate static portfolio to React + Vite (preserve UI/styles)"
```

## Migration checklist
- [ ] Create `migrate/vite-react` branch
- [ ] Scaffold Vite React and confirm dev server runs
- [ ] Copy `index.css` and `assets/` into the React project (preserve paths)
- [ ] Convert `index.html` and other HTML pages to JSX components (preserve class names)
- [ ] Refactor JS behavior into React hooks/components
- [ ] Add routing if needed and verify URLs
- [ ] Run visual comparison and fix any CSS regressions
- [ ] Document run/build instructions in README

## Notes
- Preserve all CSS values; avoid refactoring styles during initial migration.
- If third-party scripts are necessary, clearly document why.

## Git push & record steps

# When a task is completed, append a record to the progress file and a timestamped entry to the migration log,
# commit changes, and push to the GitHub repo for account SANDHOSH02 (replace URL if needed).

# Example: record a completed step
# echo "- [x] Scaffolding Vite React app — $(date -u)" >> ralph/progress.md
# echo "$(date -u) - Scaffolding Vite React app completed" >> ralph/migration.log

# Example: commit and push (SSH remote example)
# git add .
# git commit -m "Migrate: scaffolding Vite React and copy CSS/assets"
# git remote add origin git@github.com:SANDHOSH02/Portfolio-professional.git  # run once if remote not set
# git push -u origin migrate/vite-react

# If you prefer HTTPS remote (and to authenticate with username/password or token):
# git remote add origin https://github.com/SANDHOSH02/Portfolio-professional.git
# git push -u origin migrate/vite-react

# Automation snippet: run after you finish a migration step to record+push
# (uncomment and run interactively; ensure SSH keys or credentials are configured):

# step_desc="Scaffold Vite React and copy CSS/assets"
# echo "- [x] $step_desc — $(date -u)" >> ralph/progress.md
# echo "$(date -u) - $step_desc" >> ralph/migration.log
# git add ralph/progress.md ralph/migration.log
# git add .
# git commit -m "progress: $step_desc"
# git push origin HEAD

