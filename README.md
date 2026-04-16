Portfolio
---------

Personal portfolio site for Sandhosh — AI model developer & Full Stack Enthusiast.

## React + Vite App

The portfolio has been migrated to a React + Vite application located in the `client/` directory.

### Getting Started

```bash
cd client
npm install
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build to client/dist/
npm run preview  # Preview the production build locally
```

### Environment Variables

Create a `.env` file in `client/` with:

```
VITE_OPENROUTER_API_KEY=your_api_key_here
```

This powers the AI chat assistant widget on the homepage.

### File Mapping (Old → New)

| Original File        | React Component(s)                              |
|----------------------|-------------------------------------------------|
| `index.html`         | `src/pages/HomePage.jsx` + child components     |
| `index.css`          | `src/styles/index.css` (unchanged)              |
| `chat-agent.js`      | `src/components/ChatWidget.jsx`                  |
| `other-side.html`    | `src/pages/OtherSidePage.jsx` + `src/styles/other-side.css` |
| Inline flip card JS  | `src/components/Hero.jsx` (useEffect)            |
| Inline floating icons JS | `src/hooks/useFloatingIcons.js`              |
| Inline custom cursor JS  | `src/hooks/useCustomCursor.js`               |
| Inline lightbox JS   | `src/components/Lightbox.jsx`                    |
| Inline project video JS | `src/components/Projects.jsx` (useEffect)     |

### Routes

- `/` — Main portfolio page
- `/other-side` — "Other Side of Me" page (password-protected)

## MCP Endpoint (Vercel)

This repo now includes a Vercel serverless MCP endpoint at:

- `/api/mcp`

And a rewrite alias:

- `/mcp` -> `/api/mcp`

### Connector URL

Use this in Claude connector:

- `https://sandhosh.vercel.app/api/mcp`

The endpoint returns MCP JSON-RPC responses and includes portfolio tools:

- `portfolio_profile`
- `portfolio_projects`
- `portfolio_contact`

### Quick Validation

Run:

```bash
curl -i https://sandhosh.vercel.app/api/mcp
```

Expected for GET is `405 Method not allowed` JSON (not HTML), which confirms the API route exists.
