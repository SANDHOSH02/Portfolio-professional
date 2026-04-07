# Plan

This plan outlines the migration from the current static HTML/CSS/JS portfolio to a React application using Vite, preserving the UI and styles.

## Objectives
- Keep visual appearance identical (colors, spacing, typography).
- Migrate structure to React components and Vite build system.
- Preserve and reuse existing CSS and assets.
- Improve the frontend with advanced UI patterns and motion design (microinteractions, subtle animations) while preserving core styles.

## Steps
1. Audit current project
	- Inventory HTML files, CSS files, JS behaviors, and assets.
	- Note any inline scripts, globals, or DOM-dependent code that will need refactoring.
2. Create branch and scaffold
	- Create a migration branch (e.g., `migrate/vite-react`).
	- Scaffold a Vite React app in the repo root (or `client/`) using the official template.
3. Integrate CSS & assets
	- Copy existing CSS files and `assets/` into the React project.
	- Keep original filenames and classnames to maintain parity.
4. Convert pages to components
	- Map `index.html` to `App` + page components, and other HTML pages to additional components/routes.
	- Preserve DOM structure and class attributes when creating JSX.
	- Where appropriate, extract reusable UI pieces (buttons, cards, nav) into a small component library.
5. Design system & animations
	- Define a minimal design-system checklist: color variables, spacing scale, typographic scale (do not change values).
	- Choose an approach for animations: CSS transitions for simple effects, and a small library like `framer-motion` for complex motion.
	- Implement microinteractions (hover, focus, button presses, link transitions) preserving look but enhancing UX with motion.
	- Respect `prefers-reduced-motion` and provide motion fallbacks.
6. Port JS behavior into React
	- Move functional scripts into component lifecycle/hooks (e.g., `useEffect`, event handlers).
	- Replace direct DOM queries with refs where necessary.
	- Ensure animated behaviors are coordinated with React state to avoid layout thrash.
5. Port JS behavior into React
	- Move functional scripts into component lifecycle/hooks (e.g., `useEffect`, event handlers).
	- Replace direct DOM queries with refs where necessary.
7. Routing and multi-page handling
	- If multiple pages are present, add `react-router` to replicate separate pages and URL paths.
8. Test visual & functional parity
	- Run the dev server, compare screenshots, and verify interactive behavior.
	- Run accessibility checks (axe or Lighthouse) to maintain contrast, semantics, and keyboard navigation.
9. Build, optimize, and document
	- Configure build and preview scripts, test `npm run build`, and add README notes.
	- Add short migration notes mapping old JS files to new components/hooks and list any animation libraries used.

## Timeline (estimates)
- Audit: 1–2 hours
- Scaffold & integrate CSS/assets: 1–2 hours
- Component conversion & behavior porting: 3–6 hours (depends on JS complexity)
- Testing & polish: 1–2 hours

## Notes
- Keep copy of original static site for visual diffing.
- Prioritize preserving class names to avoid CSS regressions.
- When adding animations, prefer non-invasive wrappers and CSS variables so core CSS values remain unchanged.
- Test performance impact of animations; prefer GPU-accelerated transforms (translate, opacity) over layout-triggering properties.
