# Rami Halabi — custom AI agents and tool services

A static customer website with English and Swedish pages, services and three
presentation-led demos. Slidev is used to create recordings; visitors receive
static HTML, images and silent MP4s. There is no public agent backend.

This revision is on `feature/bilingual-demos`, based on customer commit
`e4ee929f1c245bcb45d2c423b8ad4f1d39a8d534`. Read the
[discovery and implementation decision](docs/bilingual-demos.md).

## Run locally

Node is enough to serve and build the committed site.

```sh
npm run check
npm run build
npm run preview
# English: http://127.0.0.1:8110/
# Swedish: http://127.0.0.1:8110/sv/
```

`npm run serve` serves source instead of `dist/`. Run one preview server at a
time; both use port 8110. Contact uses the repository's verified
[LinkedIn profile](https://www.linkedin.com/in/rami-halabi-2a5573195/).
No form submission, tracking or paid infrastructure is configured.

## Authoring

- `content/site.mjs`: paired homepage, services, approach, contact and UI copy.
- `content/demos.mjs`: paired demo descriptions and slide content. Shared IDs,
  order and timings keep the two languages aligned.
- `scripts/generate-site.mjs`: shared static templates and text tracks.
- `presentations/`: six generated Slidev entries, one shared Vue component,
  styling and an isolated package/lockfile.
- `evidence/presentations/{soheragent,soherdocs,hektor}/{en,sv}/`: public slides,
  128-second silent videos, captions, chapters, transcripts and capture manifests.
- `assets/language.js`: carries video time and transcript anchors when switching
  language. URLs determine language; no automatic redirect or storage is needed.

Edit the sources/templates and run `npm run generate`. Generated HTML and
Markdown are committed to keep publication simple. Recording requires Node
22.12+, the isolated Slidev dependencies and a browser.

```sh
npm ci
npm --prefix presentations ci
npm run generate
npm --prefix presentations run dev
# http://localhost:3030/ — SoherAgent English in Slidev
# Stop authoring before recording.
npm run record:presentations
npm run generate
npm run check
npm run build
```

`npm run record:hektor` refreshes both languages of the new Hektor presentation;
the original Swedish assets remain untouched. `FFMPEG_PATH` may point to an
existing executable; otherwise `ffmpeg-static` supplies it. Recording and tests
use installed Chrome on Windows or Playwright Chromium elsewhere. Install the
latter with `npx playwright-core install chromium`. For tests without the FFmpeg
installer, use `npm ci --ignore-scripts`. Public pages load no third-party fonts
or scripts. Capture manifests hash images, video and sources; text-source hashes
normalize LF line endings for cross-platform verification.

## Demo boundaries and preserved material

| Demo | Public material | Limits |
| --- | --- | --- |
| SoherAgent | Bilingual planning, delegation, control and review presentation; original English technical recordings | Concepts and recreations are distinct from the 24 July 2026 capture: 30 runtime assertions and 155 test results. No customer deployment is claimed. |
| SoherDocs | Document-tool-service concept with CV tailoring as the current example | No live document endpoint is exposed. Contracts and other document types are future scope. |
| Hektor Agent | Support concept covering knowledge, chat, proposed voice, handover and reviewed staff dictation | Hektor is the proposal subject, not this business's identity or a verified endorsement. Telephone and case integrations are not demonstrated. |

SoherDocs is a focused tool within an agent workflow: approved source material
and a target brief go in; a tailored draft goes through review. Its original CV
visualization uses synthetic data, including an advisory ATS score that is not
an employer result or hiring prediction. Other document types need their own
sources, templates and review rules.

- `projects/pi-agent-harness.html` retains all five technical recordings and
  66 chapter links. `projects/soheragent.html` is the new bilingual overview.
- `projects/soherdocs.html` and `projects/hektor-agent.html` retain their URLs
  and now show the selected-language presentation.
- `projects/soherdocs-original.html` and `projects/hektor-agent-original.html`
  retain the original players as labeled supporting material.
- All original `evidence/` files and URLs remain unchanged. Original evidence
  retains its source language; primary presentations and customer pages are
  bilingual. Archive notices link to both localized presentations.
- `work.html` remains the gallery URL with localized cards. Swedish routes mirror
  the customer pages beneath `sv/`; readable transcripts live beside the media.

## Validation

```sh
npm run check
npm run build
npm run verify:customer
npm run verify:bilingual
npm run verify

# Combined export requires a separate checkout of main:
npm run build:pages -- ../ai-agent-portfolio-pages-preview
npm run check:pages
npm run verify:pages
```

The named sibling has the same public files as main plus the publishing workflow.
Any current main checkout can be supplied instead. `verify:customer` checks 320,
390, 768 and 1440 pixel layouts, navigation, keyboard controls and the original
SoherAgent/CV recordings. `verify:bilingual` checks six recordings, 48 decoded
slide intervals, captions, provenance, language/position switching and no-JS
transcripts. `verify` checks the original 14-slide Hektor video. Screenshots go
to ignored `test-results/`. Tests submit no enquiries.

## Pages and migration

The approved manual workflow on main publishes the existing portfolio at
[the root URL](https://raal1600.github.io/ai-agent-portfolio/) and checks out
`feature/customer-facing-website` for
[the customer preview](https://raal1600.github.io/ai-agent-portfolio/preview/).
See [Pages operations](docs/pages-preview.md). Pushing this feature branch does
not publish it. This revision changes no workflow, Pages setting, domain or DNS.
The combined export copies main byte-for-byte and places customer pages under
`/preview/`, with `noindex, follow`.

`site.config.mjs` centralizes the URL, name and contact. Metadata includes
canonicals, reciprocal language alternates, social previews, verified Person
data and a sitemap of pages/transcripts. Project-level robots.txt cannot control
the GitHub Pages origin root.

For a later move, use static hosting, update the config, regenerate metadata
and plan redirects. Retain `sv/`, `projects/` and `evidence/` paths. Upload
`dist/`, not the entire development checkout. No migration or publication is
performed by generating and validating this feature.
