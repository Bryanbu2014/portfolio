# Changelog

All notable changes to this portfolio are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and versions follow [Semantic Versioning](https://semver.org/).

## [3.0.0] - 2026-11-14

### Content Updates 📝

- Removed the CelebA sample photos (real people) and their two describing paragraphs from the GAN page, and deleted unused face images
- Updated the intro and About Me to reflect graduation (B.Sc. Artificial Intelligence, 2026) and the current AI Engineer role
- Rewrote the Bachelor's thesis summary in the past tense with its key details
- Renamed the CERN GridWars Hackathon result to "2nd Place" for consistency with the CV

### Design Overhaul 🎨

- Project and experience pages now use the homepage grid: numbered section headings in a left rail, text at reading width, media beside its heading
- Redesigned the entire portfolio with a new bold-minimal design system: large Geist typography, Geist Mono details and a single signal colour
- Replaced the floating pill navigation and corner Home button with a single sticky header across all pages
- Turned projects and achievements into a numbered index list, with a floating image preview that follows the cursor (inline thumbnails on touch devices)
- Added light and dark themes that follow the system preference, with a remembered manual toggle
- Added a full-bleed contact finale and restyled article pages, tables and network layer chips for a consistent reading experience

### UX Improvements ✨

- Split Projects into "Selected work" (Grid Wars, Paper Trading Lab) and a compact "Earlier work" list, with a context label on every project; Paper Trading Lab is marked "On hold": its page explains the rethink and no longer offers beta access
- Replaced the public Arbeitszeugnis pages with experience pages (`/experience/bosch/`, `/experience/congatec/`) built from the CV; certificates are now available on request, and the old addresses forward to the new pages
- CV timeline rows open their experience page; Achievements now lists only achievements (CERN GridWars Hackathon, which links to the Grid Wars project)
- The CERN certificates open in the same pop-up viewer as the CV, with an Award/Participation switch
- Moved the site to the custom domain [bryanbu.me](https://bryanbu.me) with clean, root-relative URLs (no more `index.html` in addresses)
- Unpublished the piano covers page (kept in `_archive/` in the repository) and removed the hobby paragraph from About Me
- Renamed the homepage tab title to "Bryan Bu Wen Bin | AI Engineer" and the CERN page title to the full hackathon name
- Added page descriptions, canonical URLs and Open Graph tags so shared links show a proper preview, plus `sitemap.xml` and `robots.txt`
- All projects are now visible at once, replacing the "Load More" interaction
- "Send me an email!" now opens the mail client, with a separate button to copy the address
- "Go Back" now links to the relevant homepage section instead of relying on browser history
- Replaced the embedded Google Drive CV with an on-page experience and education timeline, plus a single "View CV" pop-up with an English/German switch (no download button), with entries matching the CV
- The hero typewriter no longer shifts the layout while typing

### Accessibility ♿

- Added a skip-to-content link, visible keyboard focus states and labels for all icon-only buttons
- Respected the system "reduced motion" setting and removed endlessly looping animations
- Rebuilt the image lightbox on the native dialog element (Escape to close, focus contained)

### Architecture 🛠️

- Rewrote the stylesheet around design tokens and removed unused legacy styles
- Moved the version history from a public page into this `CHANGELOG.md`; the footer now shows a "Last updated" note and a link to the source code
- Rewrote the site scripts as small self-contained modules loaded with `defer`, removing dead code
- Removed all inline styles from project and achievement pages

### Performance ⚡

- Lazy-loaded below-the-fold images and embedded documents
- Replaced the blocking font `@import` with preconnected font links

## [2.1.3] - 2026-06-01

### Bug Fixes 🐛

- Fixed a navigation issue where the Home button on piano cover page would not active instead of redirecting to the main portfolio

### Architecture 🛠️

- Centralized versioning logic into a global configuration file to establish a single source of truth for portfolio updates

### Security Enhancements 🔒

- Secured dynamic DOM injections by adopting safe element creation patterns, mitigating potential XSS vulnerabilities
- Patched reverse tabnabbing vulnerabilities across the site by enforcing strict `noopener noreferrer` policies on all external links

## [2.1.2] - 2026-05-04

### Content Updates 📝

- Added a new "Motivation" section to the Paper Trading Lab project page

### Bug Fixes 🐛

- Fixed an issue where profile picture animation under hero section were incorrectly skipped upon page refresh

## [2.1.1] - 2026-04-25

### Bug Fixes 🐛

- Fixed the intro profile picture not floating on the first page load
- Fixed the floating animation stopping after revisiting the page due to a conflicting inline style

### UI Enhancements 🛠️

- Sped up the profile picture floating animation for a snappier feel

## [2.1.0] - 2026-04-25

### Content & Features ✨

- Introduced "Paper Trading Lab" as the primary featured project
- Designed an interactive "Ongoing" fire badge for active projects
- Increased the size and prominence of achievement logos
- Added disclaimers for company logos in the footer

### Navigation & UX Enhancements 🛠️

- Refined the Home button behavior to properly restart page animations when desired
- Updated "Go Back" navigation to smartly remember and preserve the layout state without unneeded re-animations

### Architecture 🛠️

- Decoupled styling and logic from HTML files by migrating most of the inline CSS and JS into `main.css` and `script.js`
- Implemented a global event listener system for site-wide navigation to eliminate redundant `onclick` handlers
- Standardized project-specific layout styles using shared CSS classes for improved consistency and maintainability

## [2.0.0] - 2026-04-25

### Design & UI 🎨

- Redesigned portfolio with a custom CSS framework
- Added responsive bento grids for project cards

### New Features ✨

- Added session storage to remember the "Load More" state

### Architecture & Performance 🛠️

- Changed file structure to use clean directory routing (e.g. `/projects/gan/`)
- Removed jQuery and unused CSS to improve performance

## [1.0.0]

### Initial Release 🚀

- Created portfolio using the HTML5 UP template
- Added project pages and PDF viewing
