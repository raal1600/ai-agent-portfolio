# Customer website handoff

## Delivery and Git safety

Implemented locally on `feature/customer-facing-website` in the isolated sibling worktree `ai-agent-portfolio-customer-site`. Base commit: `0cf02f0e6f5ace36858af5f13fcd3ed3900f2325`. The original checkout remains on `add-hektor-agent-demo` at that commit; its clean tracked/untracked state and older local `main` reference are preserved. Existing ignored capture, dependency and test directories in that checkout were not touched.

The initial implementation was delivered as local commits. The user subsequently requested visibility on GitHub, authorizing publication of the feature branch for review. Nothing was merged or deployed. No branch was deleted, no history rewritten, and no DNS, domain, or production setting was changed.

## Discovery and implementation

The repository is a framework-free static portfolio: HTML, shared CSS and JavaScript, recorded videos, synthetic visualizations, and dated evidence. It contains no running customer-facing agent service or private agent implementation. GitHub's generated Pages workflow deploys `main` with a Jekyll build. The public site and deployment commit were verified. An authenticated follow-up check before branch publication confirmed legacy Pages publishing from `main` at `/`, with no custom domain. No repository-owned push or PR workflow exists.

The lowest-risk choice was to extend the static site. The new homepage provides services, clearly labelled demos, technical credibility, an approach, practical FAQ, and LinkedIn contact. A small HTML/CSS diagram explains an agent workflow without implying that it runs here. The existing visual palette and typography carry into the new design. No framework, runtime dependency, analytics, tracker, backend, or paid infrastructure was added.

Existing project pages gained services/contact navigation, canonical/social metadata, and consistent contact links. A mismatched SoherAgent LinkedIn URL was corrected to the README's published destination. Hektor's recording template was updated to preserve those links on regeneration, and its npm recording command reapplies metadata. No media was regenerated.

## Demos and preserved behaviour

| Public URL | Preserved experience and limits |
| --- | --- |
| `projects/pi-agent-harness.html#runtime-title` | Five videos, all 66 chapter links, keyboard tabs, transcripts, detailed planning artifacts and dated runtime proof. Proposed planning and reviewed current behaviour remain distinguished. |
| `projects/pi-agent-harness.html#evidence-title` | Actual captured results from 24 July 2026: 30 assertions and 155 passing tests. These historical private-core tests were not rerun in this repository. |
| `projects/soherdocs.html#product-view` | Seven-step, 35-second synthetic product-concept video, caption track, transcript and visualization. No live CV generation. |
| `projects/hektor-agent.html#product-view` | Silent Swedish 150-second presentation, seven chapters, 14 slides, captions, transcript, and external presentation/PDF links. No verified telephone integration or savings. |
| `evidence/**` | Every existing file and URL is unchanged, including video bytes, posters, transcripts, runtime JSON, test output, scripts, query parameters and fragment destinations. |
| `work.html` | The former homepage preserved as a compact portfolio, with navigation back to services. |

Root `index.html` becomes the services homepage only in this feature branch. Brand links return there. Project links labelled “Work” lead to the preserved compact portfolio. Existing shared `assets/site.js` and `assets/style.css` are unchanged.

## Important files

- `index.html`: customer journey, service copy, demo labels, native FAQ and contact.
- `assets/customer.css`: responsive homepage styles isolated from demo layouts.
- `work.html`: preserved compact portfolio.
- `assets/favicon.svg`, `assets/social-preview.svg`, `assets/social-preview.png`: local identity and share assets.
- `site.config.mjs`: published identity/contact, canonical origin and base path, main-page registry.
- `scripts/metadata.mjs`: repeatable static canonical/Open Graph/social metadata, verified Person data, sitemap and robots generation. Supports Windows and Unix line endings.
- `scripts/build.mjs`: optional portable `dist/` export using an explicit public allowlist. Only its recognized output directory can be cleared on rebuild.
- `scripts/check-site.mjs`, `scripts/verify-customer.mjs`: static validation and broader browser/media checks.
- `docs/customer-website-discovery.md`: evidence and architecture decision recorded before implementation.

## Run, build and preview

From the feature worktree, with Node installed:

```sh
npm run serve
# Open http://127.0.0.1:8110/
# /work.html opens the compact portfolio.
```

To validate and build an export:

```sh
npm ci --ignore-scripts
npm run check
npm run build
npm run verify
npm run verify:customer
npm run preview
# Open http://127.0.0.1:8110/ to preview dist/.
```

Stop `serve` before running `preview`; both use 8110. Only browser verification and optional media tools need the installed development dependencies. Windows tests use installed Chrome; other systems require Playwright Chromium (`npx playwright-core install chromium`). Node 20.17.0 was used for website validation; existing recording documentation recommends 22+. Installing with `--ignore-scripts` skips FFmpeg's download; use the original `npm ci` setup if you later need to record Hektor.

Changing titles/descriptions or `site.config.mjs` requires `npm run metadata` before checks/build. Regenerate the social PNG with `npm run render:social` after editing its SVG. No publishing build is required by the current Pages setup: generated metadata is committed.

## Validation performed

- Existing `npm run verify` passed before implementation, then again with the new homepage and preserved `work.html`.
- `npm run check`: passed for 14 HTML pages and 335 local links, assets and fragments, plus metadata freshness, main-page headings, contact consistency, and absence of external executable scripts/forms.
- `npm run build`: completed the allowlisted static export. Built pages were tested at an origin root and beneath `/dist/` to exercise project-path hosting.
- `npm run verify:customer`: passed at 320, 390, 768 and 1440 CSS pixels. Checks included navigation boundaries, heading hierarchy, lazy images, native FAQ keyboard use, skip link, contact target, and no unexpected network requests/browser errors in the checked pages.
- SoherAgent: all five videos played; all 66 chapter seeks passed; keyboard Home/End tabs, pause-on-tab-change, and runtime JSON loading passed.
- SoherDocs: playback, all seven chapter seeks, 35-second duration and seven caption cues passed.
- Hektor: 150-second duration, 1600×900 media, seven seeks, 14 caption cues, distinct decoded frames for all 14 slides, and SHA-256 equality to its provenance manifest passed.
- JavaScript-disabled checks passed for homepage contact/FAQ and all three demos' transcript navigation. All five SoherAgent panels remain readable without JavaScript.
- Desktop/mobile screenshots were generated and visually reviewed. A rendered-text contrast check identified three small diagram step labels, which were darkened. This is a focused accessibility review, not a full assistive-technology certification.
- JavaScript syntax checks and `git diff --check` passed. Git comparison confirmed that all existing `evidence/` assets and shared demo CSS/JS are unchanged.
- Public text/source review found no obvious credentials, private endpoints, new customer records or trackers. No private agent source or user data was copied into the site. This does not claim a forensic audit of every historical binary frame.

The first expanded browser run encountered a Playwright stability timeout while smooth-scrolling to a native FAQ with JavaScript disabled. The deterministic no-JavaScript check now uses reduced motion and passes; no fake interaction or forced click was used. Screenshots were also adjusted to load offscreen lazy images before full-page capture.

## Missing information and limits

The published LinkedIn profile provides a usable contact destination, so no missing backend blocks this version. A visitor may need a LinkedIn account to message you. An approved business email or booking URL would offer an optional alternative; none was invented. Any future form needs an agreed destination and privacy handling before it can claim to submit.

Optional editorial input: preferred service emphasis, a longer verified biography, whether to add Swedish services copy, and any real customer work that you have permission to publish. Customer names, testimonials, pricing, timelines, outcomes, qualifications and guarantees were not added.

Private implementation code is absent, so the 155 agent tests cannot be rerun here; browser regression checks validate the public showcase. Hektor's original proposal includes unmeasured commercial/capacity language. It was preserved inside the existing presentation and was not reused as general pricing or a proven outcome. Review it before a commercial release. External presentation links remain outside this repository's control. Tests used Chrome; Safari, Firefox, screen readers and a full manual accessibility audit remain future checks.

## SEO and eventual migration

Canonical and share metadata are static, crawlable HTML. The sitemap contains the five main pages; transcripts are reachable through internal links. Person structured data contains only the published name, URL and LinkedIn profile.

On project Pages hosting, `/ai-agent-portfolio/robots.txt` does not control crawling at the origin root. The generated file is ready for a future dedicated origin, and the sitemap may be submitted directly with webmaster access. No domain-root file or hosting setting was modified.

When a migration is approved, publish only the static export, preserve the existing project/evidence paths, update `site.config.mjs`, regenerate metadata, and arrange redirects if the origin or prefix changes. The current deployment was not changed to use `dist/`. Static hosting remains sufficient; no application server or vendor-specific service is required.
