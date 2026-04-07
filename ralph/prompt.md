# Prompt

Migrate this static portfolio (HTML, CSS, JS) into a React application scaffolded with Vite while preserving the existing UI, layout, and visual styling (colors, spacing, typography).

- Goal: Convert the project to React + Vite without changing the visual appearance or CSS values; produce a production-ready frontend that matches the original site.
- Inputs: The repository root containing `index.html`, `other-side.html`, `index.css`, existing JS files, and the `assets/` folder.
- Expected output:
	- A Vite-powered React app that reproduces the same pages and visuals.
	- Existing CSS files and class names preserved and applied in React components where possible.
	- Existing JS behaviors ported into React components/hooks without changing UX.
	- Standard npm scripts: `dev`, `build`, `preview`.
- Constraints / Notes:
	- Do NOT change colors, spacing, typography, or visible UI behaviors.
	- Minimize dependency additions; prefer vanilla React and Vite defaults.
	- If multiple HTML pages exist, implement client-side routing (React Router) or preserve separate entrypoints while keeping identical URLs where feasible.

- Acceptance criteria:
	1. Visual parity: rendered pages match original static HTML pages with no styling regressions.
	2. Functional parity: interactive behavior (navigation, toggles, animations) works equivalently.
	3. Project builds and runs using Vite commands.

Deliverables:
- Updated repository with React + Vite scaffold and migration notes mapping old files to new components.
- A short README section that explains dev/start/build steps.


