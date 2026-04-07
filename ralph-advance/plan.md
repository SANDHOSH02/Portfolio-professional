# Task-by-Task Plan

Convert the end-to-end plan into an actionable task list. Each task is atomic, estimated, and includes acceptance criteria.

-- Task 1: Repository audit (0.5 day)
   - Actions:
     - List all HTML pages, CSS files, JS scripts, and `assets/` images.
     - Note inline scripts and global DOM dependencies.
   - Deliverable: `ralph-advance/audit.md` with inventory and refactor notes.
   - Acceptance: audit file created and reviewed.

-- Task 2: Create branch & scaffold (0.25 day)
   - Actions:
     - Create branch `feature/business-mode`.
     - Scaffold Vite + React in `client/` if not present.
     - Install `react-router-dom`.
   - Deliverable: branch exists; `client/package.json` with dependencies.
   - Acceptance: `npm run dev` starts without errors.

-- Task 3: Import global styles & assets (0.5 day)
   - Actions:
     - Copy `index.css` and `assets/` into `client/` preserving paths.
     - Add design-system file exporting CSS vars (no value changes).
   - Deliverable: `client/src/styles` contains CSS and design-system.
   - Acceptance: site renders using original styles.

-- Task 4: Implement ModeContext and Header toggle (0.75 day)
   - Actions:
     - Create `ModeContext` to store `personal|business` mode.
     - Add a sticky header with accessible `Personal / Business` toggle.
     - Sync mode to URL (`/business` or `?mode=business`).
   - Deliverable: `client/src/context/ModeContext.jsx`, `client/src/components/Header.jsx`.
   - Acceptance: toggling updates URL and displayed content.

-- Task 5: Create route scaffold for business pages (0.5 day)
   - Actions:
     - Add routes: `/business`, `/business/services`, `/business/projects`, `/business/pricing`, `/business/contact`, `/business/testimonials`.
     - Add placeholder components with mapped `assets/` images.
   - Deliverable: route files and placeholder components.
   - Acceptance: each route renders placeholder content.

-- Task 6: Implement Business Home & Services (1 day)
   - Actions:
     - Build `BusinessHome` hero + CTA.
     - Build `Services` listing with icons and descriptions.
   - Deliverable: `BusinessHome.jsx`, `Services.jsx`.
   - Acceptance: components match visual style and CTAs route to Contact.

-- Task 7: Implement Projects / Case Studies (1 day)
   - Actions:
     - Create a categorized projects grid (construction, shops, colleges).
     - Use existing `assets/` images as placeholders and add lazy loading.
   - Deliverable: `Projects.jsx` with categories and modal/detail view.
   - Acceptance: grid is responsive and images lazy-load.

-- Task 8: Implement Pricing & Testimonials (0.75 day)
   - Actions:
     - Create pricing tier cards with CTAs.
     - Add testimonials grid or carousel (CSS-first approach).
   - Deliverable: `Pricing.jsx`, `Testimonials.jsx`.
   - Acceptance: cards and testimonials match style and are accessible.

-- Task 9: Implement Contact / Lead form (0.75 day)
   - Actions:
     - Add a lead capture form with validation.
     - Wire to a webhook placeholder URL; show success/failure states.
   - Deliverable: `Contact.jsx`; `client/.env.example` with webhook placeholder.
   - Acceptance: form validates and POSTs to stub endpoint (simulate response).

-- Task 10: Port personal-js behaviors into React (1 day)
   - Actions:
     - Refactor any DOM-driven scripts into hooks (`useEffect`, `useRef`).
     - Preserve original class names to keep CSS working.
   - Deliverable: refactored hooks and updated components.
   - Acceptance: interactive behaviors work as before.

-- Task 11: Add animations & microinteractions (0.5 day)
   - Actions:
     - Add CSS transitions for hovers and focus states.
     - Optionally add `framer-motion` for page transitions behind a flag.
     - Respect `prefers-reduced-motion`.
   - Deliverable: animation helpers and optional motion components.
   - Acceptance: motion is subtle, performant, and respects user prefs.

-- Task 12: Testing, visual diffing & accessibility fixes (0.5–1 day)
   - Actions:
     - Run visual diff (manual screenshots or tool).
     - Run Lighthouse and axe; fix critical issues.
   - Deliverable: test report and fixes committed.
   - Acceptance: no major regressions; accessibility issues addressed.

-- Task 13: Build, preview & deploy (0.5 day)
   - Actions:
     - Run `npm run build`, test `npm run preview`.
     - Deploy to Vercel or GitHub Pages; document steps.
   - Deliverable: deployment in chosen platform and README update.
   - Acceptance: production site serves business-mode routes.

-- Task 14: Merge & release (0.25 day)
   - Actions:
     - Create PR, request review, merge to `main`.
     - Tag release and update `ralph/progress.md` and `ralph/migration.log`.
   - Deliverable: merged PR and release tag.
   - Acceptance: code merged and documented.

## Quick checklist (copy to `ralph/progress.md` as tasks complete)
- [ ] Task 1: Repository audit
- [ ] Task 2: Create branch & scaffold
- [ ] Task 3: Import global styles & assets
- [ ] Task 4: Implement ModeContext and Header toggle
- [ ] Task 5: Create business route scaffold
- [ ] Task 6: Business Home & Services
- [ ] Task 7: Projects / Case Studies
- [ ] Task 8: Pricing & Testimonials
- [ ] Task 9: Contact / Lead form
- [ ] Task 10: Port personal behaviors
- [ ] Task 11: Animations & microinteractions
- [ ] Task 12: Testing & QA
- [ ] Task 13: Build & Deploy
- [ ] Task 14: Merge & release

### Notes
- Keep CSS values unchanged; scope business-only utilities under `.business-mode` to avoid collisions.
- Prefer incremental commits and small PRs for easier review.

