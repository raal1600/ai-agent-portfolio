# Rami Halabi — custom AI agents and selected work

A static customer-facing services website with three guided project showcases. The homepage explains custom AI agent development, services, engineering boundaries, approach, and project enquiries. The original compact portfolio is preserved at `work.html`; existing project and evidence URLs are unchanged.

**[Open the portfolio](https://raal1600.github.io/ai-agent-portfolio/)**

The [customer website preview](https://raal1600.github.io/ai-agent-portfolio/preview/) is published from [`feature/customer-facing-website`](https://github.com/raal1600/ai-agent-portfolio/tree/feature/customer-facing-website). The [existing portfolio](https://raal1600.github.io/ai-agent-portfolio/) remains at the original URL. Only the shared publishing workflow was merged into main; the customer homepage remains on its separate branch.

Read the [discovery and architecture decision](docs/customer-website-discovery.md) and [implementation handoff](docs/customer-website-handoff.md) for evidence limits, validation and remaining decisions.

The [combined Pages publishing setup](docs/pages-preview.md) keeps both versions online using the multi-branch approach used by Hektor. It was activated with user approval through [PR #1](https://github.com/raal1600/ai-agent-portfolio/pull/1).

## Website development

No framework, backend, or runtime package is required. HTML and generated SEO files are committed; the publishing workflow assembles the two static versions into one artifact. The new homepage works without JavaScript; demo pages retain their existing controls.

From the feature worktree:

```sh
npm run serve
# http://127.0.0.1:8110/ — customer homepage
# http://127.0.0.1:8110/work.html — compact portfolio
```

Node is sufficient for serving, metadata, static checks and building. Use Node 22+ for the optional capture tooling as previously documented; website checks were also run with the available Node 20.17.0.

```sh
# Browser verification only: install the existing locked tools.
# Skip the FFmpeg installer when you do not need to record videos.
npm ci --ignore-scripts
npm run check
npm run build
npm run verify
npm run verify:customer
npm run preview
# http://127.0.0.1:8110/ — the built dist/ website
```

Run `serve` or `preview` one at a time: both use port 8110. Browser verification uses installed Chrome on Windows, or Playwright Chromium on other systems (`npx playwright-core install chromium`). No tests contact LinkedIn or submit an enquiry. `verify:customer` requires a current `dist/` build and tests it beneath a URL prefix as well as at an origin root. Screenshots are written to ignored `test-results/`.

## Content, contact and SEO

- Edit `index.html` for customer copy, `work.html` for the compact portfolio, and `assets/customer.css` for the new homepage styling. Shared demo styles and playback logic are preserved.
- `site.config.mjs` centralizes the canonical site URL, published name, contact destination and main pages. Contact uses the LinkedIn profile already published in this repository. No form backend, email or booking URL is configured. LinkedIn may require sign-in.
- After editing titles, descriptions or configuration, run `npm run metadata`. It updates marked metadata blocks, marked contact links, Person structured data, `sitemap.xml` and `robots.txt`. `npm run check` detects stale output.
- Social preview source is `assets/social-preview.svg`; `npm run render:social` creates its checked-in PNG with the existing browser tool. Neither the generator nor any third-party script runs in the visitor's browser.
- The sitemap lists the homepage, compact portfolio and three project pages. Supporting transcripts remain accessible through normal links. No dates, reviews, ratings or customer claims are generated.
- Crawlers only use `robots.txt` at an **origin root**. The file at `/ai-agent-portfolio/robots.txt` cannot control the GitHub Pages origin; no domain-root configuration was changed. The sitemap can be submitted directly if you have webmaster access. For an eventual dedicated-origin move, put this file at the root.

## Hosting and portability

Production originally used GitHub's generated Pages workflow on `main`, including Jekyll processing. Starting commit: `0cf02f0e6f5ace36858af5f13fcd3ed3900f2325`. With user approval, workflow-only PR #1 was merged at `38ca1c52270b338f4980a86805190ba2f4a5a86f` and Pages was switched to GitHub Actions. The manual **Publish portfolio and customer preview** workflow now assembles main at `/` and the customer branch under `/preview/`. No DNS or custom domain was changed. To refresh either version, run that workflow from main; a feature-branch push alone does not publish it.

`npm run build` produces an allowlisted `dist/` containing only site pages, assets, evidence, sitemap and robots. It refuses to replace an unrecognized output directory and validates ownership of its own output before rebuilding. Git data, test outputs, tools, and local documentation are not exported. Current production does not use `dist/`; the export is for local preview or a future approved hosting choice.

For a later migration, retain every `projects/` and `evidence/` path, update `site.config.mjs`, regenerate metadata, and serve the static export. A changed hostname or path prefix needs planned redirects from old URLs. No migration is performed here. Avoid uploading the whole development checkout to a new host.

## SoherAgent

**[Open the five-step workflow demo](https://raal1600.github.io/ai-agent-portfolio/projects/pi-agent-harness.html#runtime-title)**

Five chaptered terminal recordings follow an imagined **Service Contract Intelligence MVP** project initiative across the six planning, handoff, implementation, and review skills: a clearly labeled proposed `/plan on` concept leads into current `/yolo on` exact-batch authorization, reviewed delivery, and a required stop. The scenario is a portfolio interpretation of a public role brief, not a claim about the employer’s requirements or a deployed product. Recordings 1–2 are sanitized concept recreations; recordings 3–4 recreate reviewed current `/yolo` behavior; recording 5 shows actual evidence from 30 runtime assertions and 155 passing tests.

Evidence:

- [Machine-readable runtime result](evidence/pi-agent-harness/runtime-behavior.json)
- [Public synthetic runner](evidence/pi-agent-harness/runtime-scenario.mjs)
- [Genuine 155-test Node output](evidence/pi-agent-harness/pi-extension-tests.txt)

## SoherDocs

**[Open the seven-step workflow recording](https://raal1600.github.io/ai-agent-portfolio/projects/soherdocs.html#product-view)**

One 35-second synthetic product-concept recording follows the full flow: add a job posting, search evidence across saved CV variants, tailor the CV, write a personal cover letter, generate both documents and check ATS readiness, optionally save a new CV variant, and export both PDFs directly.

## Hektor Agent

**[Watch the Swedish Hektor Demo](https://raal1600.github.io/ai-agent-portfolio/projects/hektor-agent.html#product-view)**

A silent 2½-minute video made from all **14 slides** of the Swedish Hektor Demo, with seven chapter links, optional Swedish text descriptions, and a readable transcript. It covers web chat, Swedish telephone support, human handover, reviewed staff dictation, and the value for a support team. This is a concept presentation, not footage of an operating telephone integration or measured savings.

- [Download the video](https://raal1600.github.io/ai-agent-portfolio/evidence/hektor-agent/hektor-demo.mp4)
- [Read the walkthrough](https://raal1600.github.io/ai-agent-portfolio/evidence/hektor-agent/hektor-demo-transcript.html)
- [Open the Swedish presentation](https://h-sami.github.io/hektor-chat-pitch/hektor-demo/)
- [Download the presentation PDF](https://h-sami.github.io/hektor-chat-pitch/hektor-demo/Hektor-Demo.pdf)
- [Capture provenance and timings](evidence/hektor-agent/recording.json)

The commercial direction is one agent at the cost of one support employee, with the potential to automate recurring work across a team. Scope and cost must be defined in a quote; actual capacity and automation are not yet measured.

## Local preview and Hektor recording

The portfolio is a static site; publishing does not require a build. The optional recording tools use Node.js 22+ and installed Chrome on Windows (or Playwright Chromium on other systems).

```sh
npm ci
npm run serve
# Open http://127.0.0.1:8110
npm run verify
```

`npm run record:hektor` captures every rendered slide from the public Swedish deck and encodes them into an H.264 MP4 using the durations in `evidence/hektor-agent/storyboard.json`. It also regenerates the Hektor service page, poster, transcript, chapter/caption tracks, and capture manifest. Edit that storyboard or `scripts/record-hektor.mjs` before regenerating. The script stops if source headings differ; update the source revision when deliberately recording a changed deck. Screenshots are actual presentation captures; no simulated product interface or audio is added. Review generated files before publishing.

`npm run verify -- https://raal1600.github.io/ai-agent-portfolio/preview` checks the deployed customer version. Use `npm run verify:pages -- https://raal1600.github.io/ai-agent-portfolio` to check both published versions together; the root homepage remains the original portfolio.

## Source access

SoherAgent and SoherDocs implementation source remains private. Supervised review or time-bounded read-only access can be arranged for an identified technical interviewer after scope confirmation. The Hektor presentation source is public and linked from its demo.

[LinkedIn — Rami Halabi](https://www.linkedin.com/in/rami-halabi-2a5573195/)
