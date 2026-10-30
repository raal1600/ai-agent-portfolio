# Rami Halabi · Products

A static product showcase: every product I have built, grouped by area, with one page each covering the problem and idea, how it works, a demo, what I built myself, the stack, quality evidence and current limits.

**[Open the site](https://raal1600.github.io/ai-agent-portfolio/)**

| Area | Products |
|---|---|
| Data and GIS | Bilingual survey map |
| Business systems | E-commerce back office, SoherDocs, RigForge |
| Simulation and robotics | RobotOps Twin |
| AI agent tooling | SoherAgent, Customer service agent |
| 3D and creative tooling | Blender Asset Director, Blender Teaching Overlay |
| Architecture | Private AI Datacenter |

[docs/product-inventory.md](docs/product-inventory.md) lists every repository that was checked, what can be demonstrated, and the evidence behind each claim.

## Rules for content

- No names of clients, employers, universities, funders, partners, shops or people. Products are described by what they do.
- No links to repositories or URLs whose names contain a client name.
- Screenshots of private products use synthetic data only. The back-office screenshots are rendered from the real dashboard code with every request answered by a local mock.
- Claims come from source code, test output or the repository history. Anything that cannot be checked is left out.

## Local preview and checks

The site is plain HTML, CSS and JavaScript with no build step, framework or tracking. The checks need Node.js 22+ and an installed Google Chrome.

```sh
npm ci
npm run serve      # http://127.0.0.1:8110
npm run verify
```

The home page and product pages are generated from the product data in `scripts/build-site.py`. Edit the data there, then run `python3 scripts/build-site.py .` and `npm run verify`. Card thumbnails come from `scripts/make-thumbs.py` (needs Pillow).

`npm run verify` opens every page at 1440 px and 390 px and fails on broken local links or fragments, broken images, horizontal scrolling, console errors, or any axe WCAG 2.2 A/AA violation. It also searches every published file for the names listed in `scripts/verify-portfolio.mjs`. External links are listed in `test-results/verify-report.json` but never opened.

## Source access

SoherAgent, SoherDocs, the back office and RigForge have private source. A supervised review or time-bounded read-only access can be arranged for a technical interviewer.

[LinkedIn](https://www.linkedin.com/in/rami-halabi-2a5573195/) · [GitHub](https://github.com/raal1600)
