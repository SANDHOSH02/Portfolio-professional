# Business-mode Prompt

Convert the existing portfolio into a dual-mode site that supports both "Personal Portfolio" and a full "Business" presentation focused on freelance services (construction sites, shops, colleges/schools, small business websites). Implement a top-level, prominent toggle/switch that flips the whole site between Personal and Business modes.

- Goal: Add a business-mode that, when activated, replaces or switches the visible content to a professional business site showcasing services, projects, case studies, pricing, and contact/lead capture — while keeping the original personal portfolio intact and easily switchable.
- Inputs: The current static site files and assets; existing UI and CSS should be preserved. New content may be added under a `business/` or `business-mode` section.
- Features & Requirements:
	1. Toggle UI: a top-of-page switch (sticky header) labeled `Personal / Business`. When the user clicks `Business`, the site should transition to business-mode (client-facing pages). Clicking `Personal` returns to the original portfolio.
 2. Seamless transition: Use a subtle animated transition (fade/slide) that respects existing styling and `prefers-reduced-motion`.
 3. Business pages: implement the following business sections/pages:
		 - Home: concise hero describing freelance business services (web development for construction, retail shops, colleges & schools).
		 - Services: list service offerings (site builds, maintenance, e-commerce for shops, booking pages for schools, portfolio for construction projects).
		 - Projects / Case Studies: show grouped examples (construction sites, shops, colleges) with images, brief descriptions, and outcomes.
		 - Pricing / Packages: simple tiered pricing or service packages with clear CTAs.
		 - Contact / Lead form: capture leads (name, email, project type, message) and optionally integrate with email or webhook.
		 - Testimonials / Clients: short quotes and logos.
	4. Preserve look-and-feel: do not change color palette, spacing, or fonts. Reuse existing CSS classes where possible.
	5. Maintain separate content: personal portfolio content remains unchanged and reachable via the switch; business content can be stored in separate components or HTML fragments.
	6. Accessibility & SEO: ensure semantic markup, proper headings, and crawlable links for business pages.
	7. Implementation notes: prefer building business-mode as React routes/components (or separate HTML entry if not migrating yet) that reuse global styles; store switch state in URL (e.g., `?mode=business` or `/business/*`) so links are shareable.

- UX details for the switch:
	- Position: sticky top-right or top-left of header, always visible.
	- Label: `Personal | Business` or a single toggle with accessible labels.
	- Behavior: toggling updates content and URL, preserves scroll position where possible, and is animated.

- Acceptance criteria:
	- The site has a visible toggle that switches to a business-focused presentation.
	- Business pages contain the sections above with placeholder content and images mapped from `assets/`.
	- Visual parity: core styling (colors, fonts, spacing) is unchanged.
	- The switchable mode is bookmarkable via URL.

- Deliverables:
	- Updated prompt and plan documents describing the business-mode.
	- Implementation approach: either (A) add business-mode pages to the migrated React app with routing and components, or (B) create a separate `business/` folder with HTML that the toggle links to, preserving CSS.
	- A short migration checklist mapping personal pages -> business components and listing assets to reuse.

Example short prompt for a developer or AI agent:

"Add a top-level `Personal / Business` switch that toggles the entire site into a business-focused mode. The business mode must present Home, Services, Projects, Pricing, Contact, and Testimonials pages using the existing CSS and assets. Transitions should be subtle and respect `prefers-reduced-motion`. The switch should update the URL (`?mode=business` or `/business`) so the business view is shareable. Do not change colors, spacing, or typography. Reuse as many existing class names and assets as possible; implement business pages as components or separate HTML entrypoints, and include a contact lead form connected to a webhook placeholder."

