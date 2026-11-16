## 2026-11-17 · Removed old pill start page and unused media
- What: moved choose.html (red/blue pill page), assets/pill/ and unused root media (3 mp4s, my1.jpg, download.jpeg, glitch_portrait.png, colorized jpeg) to Downloads/portfolio-removed/; /choose.html redirects to /.
- Files: `vercel.json`
- Why: portfolio is the only main page now.
- Tests: headless render of index.html before push.

## 2026-11-17 · Portfolio is now the main page (index.html)
- What: portfolio.html -> index.html; old red/blue pill page -> choose.html; pill red link and other-side "Back to Portfolio" now point to index.html; vercel.json redirects /portfolio.html and /portfolio to /.
- Files: `index.html`, `choose.html`, `other-side.html`, `vercel.json`
- Why: user wants the portfolio as the Vercel home page.
- Tests: grep for leftover portfolio.html links (none); vercel.json parses.

## 2026-11-17 · Hero slide order: swapped 2 and 4
- What: "Agents Never Sleep" (desk photo) is now slide 2; "AI Agent Engineer" (portrait) is now slide 4.
- Files: `portfolio.html`
- Why: user request.
- Tests: checked slide order in the markup.

## 2026-11-17 · Sharper glitch video
- What: not-real.mp4 now uses the original video stream (no re-encode, audio stripped, 4.8 Mbps, 5.1MB) and is shown at natural size (object-fit: contain + soft radial mask) instead of being stretched 1.5-2x to fill the wide slide. Phones still use cover.
- Files: `assets/video/not-real.mp4`, `portfolio.html`
- Why: user reported poor quality.
- Tests: real Chrome via localhost, zoomed screenshot mid-dissolve is sharp.

## 2026-11-17 · Glitch video on the first slide
- What: slide 1 ("The Art of Automation") now plays not-real.mp4 (pixel dissolve) as its background on load, 8s slide; desk photo moved to slide 4 with new title "Agents Never Sleep". Video starts from script only (skipped under reduced motion).
- Files: `portfolio.html`
- Why: user request.
- Tests: real Chrome via localhost: video playing on load (t=4.1s at 5s), slide 4 renders with desk photo.

## 2026-11-17 · Hero starts on "The Art of Automation"
- What: desk-photo slide moved to first (h1, active on load); portrait slide is now second.
- Files: `portfolio.html`
- Why: user request.
- Tests: headless screenshot of first frame.

## 2026-11-17 · Fix: giant white panel when hovering project cards
- What: cursor bubble used class "show", which the hero slider also styles (.show = full-height panel). Renamed the bubble state to "is-visible".
- Files: `portfolio.html`
- Why: bug report with screenshot.
- Tests: real Chrome, hovered a project card: bubble 169x42 with "View on GitHub", no panel.

## 2026-11-17 · Hero replaced with zoom-through slider
- What: full-screen hero slideshow (4 slides: portrait, desk, office, not-real video). Outgoing title zooms toward the viewer and blurs, background blurs out; incoming background sharpens from blur, title focuses in; slow Ken Burns; progress dots, counter, arrow keys, pauses off-screen; reduced motion = manual only, no effects. Cinzel serif for slide titles. Removed the orbit poster hero and its CSS/JS.
- Files: `portfolio.html`
- Why: user wanted the animation style from their reference video.
- Tests: real Chrome via localhost: all 4 slides end sharp, video plays on slide 4; screenshots desktop + 512px.

## 2026-11-17 · Favicon: round photo
- What: tab icon is now a round crop of the portrait (128px PNG with transparent corners); removed the purple "S" SVG.
- Files: `assets/favicon.png` (new), `assets/favicon.svg` (deleted), `portfolio.html`
- Why: user request.
- Tests: viewed the generated PNG.

## 2026-11-17 · New hero: orbit poster with live details
- What: hero left now has status badge, role @ Promon, outlined surname, rotating "I build ..." word, pitch, Email/Resume buttons, hashtag rows. Poster: grid glow, outlined PORTFOLIO with shine sweep, portrait core with pulse, two orbit rings of tech chips, "Currently" glass card with typed terminal line, stats glass card, mouse parallax, unveil-on-load. Reduced motion: static.
- Files: `portfolio.html`
- Why: user wanted a different hero look/animation with more details.
- Tests: headless screenshots 1366 + 512 after animations.

## 2026-11-17 · New favicon
- What: tab icon is now a purple "S" (SVG) instead of the portrait photo.
- Files: `assets/favicon.svg` (new), `portfolio.html`
- Why: user request.
- Tests: rendered the SVG in Chrome.

## 2026-11-17 · Portfolio purple theme
- What: retheme to violet/purple-black: dark glowing PORTFOLIO block (alternating violet letters), purple highlights in headings, glow on dark cards, Work section on a dark band with giant outlined "WORK" word, purple CTA glow.
- Files: `portfolio.html`
- Why: user reference (purple poster style).
- Tests: headless screenshots desktop 1366 + 512 wide.

## 2026-11-17 · Removed intro video
- What: dropped the engineer.mp4 intro screen (markup, styles, script) and its compressed file; page animations start right away.
- Files: `portfolio.html`, `assets/video/engineer.mp4` (deleted)
- Why: user did not like the intro.
- Tests: headless screenshot with animations on.

## 2026-11-17 · Portfolio rebuilt in bento "PORTFOLIO" style with video
- What: new layout from user reference: blue PORTFOLIO 2026 block, arrow + hashtags, sticky tab bar (About me / Resume / Work), collapsible panels, black/blue cards. engineer.mp4 = skippable intro (once per session); not-everything-is-real.mp4 = "My name is Sandhosh" card (plays when visible, click to replay). Animations: letter drop, arrow draw, staggered reveals, progress bars, cursor bubble on projects; all off under reduced motion.
- Files: `portfolio.html`, `assets/video/engineer.mp4`, `assets/video/not-real.mp4`, `assets/video/not-real-poster.jpg` (videos compressed 9MB→1.5MB, audio removed)
- Why: user wanted this style with their videos.
- Tests: headless Chrome screenshots desktop 1366 + 512 wide, intro frame; no overflow.

## 2026-11-16 · Portfolio redesigned: clean professional look
- What: rebuilt portfolio.html in a minimal Swiss style (navy/blue, light + auto dark mode). Removed neural canvas, aurora, spotlight, typing terminal, AI-scan portrait, animated n8n/orchestrator demos, marquee, count-ups. Kept only a 400ms fade-in on scroll and soft hover; off under reduced motion.
- Files: `portfolio.html` (CSS now inline; `index.css` no longer used)
- Why: user wanted a purely professional page with neat animations.
- Tests: headless Chrome screenshots at 1366px and mobile; no horizontal overflow.

## 2026-11-16 · Portfolio synced with new resume
- What: experience shows Promon Software Solutions (Present) and WG Tech intern May–Nov 2025; added "Download resume" button in contact.
- Files: `portfolio.html`
- Why: match updated resume.
- Tests: none (static page); opened in browser.

## 2026-11-16 · Resume exported to one-page PDF
- What: tighter print styles (9pt, smaller margins) so it fits one A4 page; exported via headless Chrome.
- Files: `assets/resume/resume.html`, `assets/resume/Sandhosh-resume.pdf` (new; old Santhosh-resume.pdf kept)
- Why: user wanted a one-page PDF.
- Tests: checked PDF page count = 1 and visual render.

## 2026-11-16 · Resume: responsive on screen
- What: page fits the window width; columns stack under 700px; print stays fixed A4.
- Files: `assets/resume/resume.html`
- Why: right column was clipped in narrow windows.
- Tests: none (static page).

## 2026-11-16 · Resume: current employer filled in
- What: current role now shows "Promon Software Solutions", no dates.
- Files: `assets/resume/resume.html`
- Why: user request.
- Tests: none (static page).

## 2026-11-16 · Resume rewritten for AI & automation role
- What: resume now leads with AI & Automation Engineer experience (1 yr), n8n/agent projects and new skills, matching portfolio.html; college projects/competitions condensed.
- Files: `assets/resume/resume.html`
- Why: user moved from student to working engineer.
- Tests: none (static page). Current company + start date left as yellow placeholders.

## 2026-11-16 · Editable resume source
- What: rebuilt the resume PDF as editable HTML (print to PDF); fixed typos, the cut-off NSCET line, and removed the LeetCode global rank.
- Files: `assets/resume/resume.html`
- Why: the PDF had no editable source.
- Tests: none (static page).

# Changes — Portfolio-professional

Newest first. Claude adds one entry after every change (see CLAUDE.md). Keep each entry short.

<!-- template
## YYYY-MM-DD · short title
- What: one or two lines.
- Files: `path/a`, `path/b`
- Why: the problem it solves.
- Tests: what ran and the result (e.g. 42/42).
-->

## 2026-11-16 · Claude Code set up
- What: added CLAUDE.md, .claude/settings.json, this change log and the /fix /feature /review /test /ship /docs /explain commands.
- Files: `CLAUDE.md`, `.claude/`
- Why: one shared, fast way of working with Claude on this project.
- Tests: none needed.
