# Bryan Bu Wen Bin – Personal Portfolio

![GitHub Release](https://img.shields.io/github/v/release/Bryanbu2014/portfolio)
![Custom Release Date](https://img.shields.io/badge/release_date-November_14,_2026-gre)

Live at **[bryanbu.me](https://bryanbu.me)**.

A fast, accessible personal portfolio showcasing my projects, experience and achievements in Artificial Intelligence.

## 🚀 About the Project

Hand-built with plain HTML, CSS and JavaScript: no framework, no build step. The v3 design ("Signal") is bold and minimal, with large type, a single signal colour and monospace details.

### Key Features
- **Design system:** One stylesheet (`assets/css/main.css`) built on design tokens, with light and dark themes that follow the system setting plus a remembered manual toggle.
- **Project index:** A numbered list of projects; on desktop a preview image follows the cursor, on touch devices thumbnails are shown inline.
- **CV timeline:** Experience and education shown on the page, with a PDF download.
- **Accessible:** Skip link, visible keyboard focus, labelled icon buttons, a native `<dialog>` image lightbox, and full support for "reduce motion".
- **Clean URLs:** Root-relative, directory-based addresses (e.g. `/projects/gan/`, `/piano/`) on the custom domain.
- **Shareable:** Description, canonical and Open Graph tags on every page, plus `sitemap.xml` and `robots.txt`.
- **Responsive:** Adapts to mobile, tablet and desktop.

## 📁 Directory Structure

- `index.html` - The main landing page.
- `CHANGELOG.md` - Version history of the portfolio (Keep a Changelog format).
- `assets/css/main.css` - The design system.
- `assets/js/boot.js` - Runs before first paint (theme, intro state).
- `assets/js/script.js` - Site interactions (navigation, theme toggle, cursor preview, lightbox).
- `assets/cv/` - CV as PDF (`cv_en.pdf`).
- `assets/html/project-template.html` - Starting point for new project pages.
- `images/` - Portfolio images, logos, and project thumbnails.
- `projects/` - Individual project pages with embedded videos and details (Paper Trading Lab, GAN, Jetbot, Grid Wars, Z3 Solver, Cinema Chatbot).
- `piano/` - Piano covers (hobby page, linked from the door emoji in About Me).
- `achievements/` - Individual achievement pages with embedded certificates (CERN, Bosch, Congatec).

## 🖥️ Running Locally

Links are root-relative, so serve the folder instead of opening files directly:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## 👨‍💻 About Me

I am an AI Engineer at Toolbox Cloud Solutions and a graduate of the Deggendorf Institute of Technology (B.Sc. Artificial Intelligence, 2026). My work includes academic projects and production-ready industrial applications, with experience ranging from cloud-based data pipelines at Bosch to autonomous robot cars and generative networks.

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3, vanilla JavaScript
- **Fonts:** Geist and Geist Mono (Google Fonts)
- **Icons:** Font Awesome (v6.4.0)
- **Hosting:** GitHub Pages with the custom domain `bryanbu.me`

## 📄 License
This is a personal portfolio. All rights reserved by Bryan Bu Wen Bin, 2026.
