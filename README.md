# Portfolio - Sandhosh

Personal portfolio website for **Sandhosh** — AI Model Developer & Full Stack Enthusiast.

## Tech Stack

- **HTML5 & CSS3**
- **Vanilla JavaScript** (custom cursor with sparkle trail, physics-based floating skill icons, video preview controls, lightbox for achievements)
- **Bootstrap 3 & jQuery** (tooltips & lightbox dependencies)

## Features

- **Hero Section**: Profile overview with social links (GitHub, LinkedIn, LeetCode).
- **Projects**: Interactive video showcase featuring PyLab Arena, IQ Arena, Result Portal, Hackathon Management, Safety Gear Detection, and Retail Monitoring.
- **Skills**: Interactive floating physics icon wall with animated floating skill badges.
- **About Me**: Professional introduction and background.
- **Experience**: Internship experience at WG Tech Solutions & Syed Ammal Engineering College.
- **Competitions**: Hackathon and challenge awards gallery with modal lightbox view.
- **Resume**: Interactive timeline and downloadable resume PDF.

## How to Run

Simply open `index.html` in any web browser, or serve it using any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```


## MCP Endpoint (Vercel)

This repository includes a Vercel serverless MCP endpoint at:

- `/api/mcp`
- Rewrite alias: `/mcp` -> `/api/mcp`

### Connector URL for Claude:
- `https://sandhosh.vercel.app/api/mcp`

### Supported Tools:
- `portfolio_profile`
- `portfolio_projects`
- `portfolio_contact`
