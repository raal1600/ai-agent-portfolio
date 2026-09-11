# Customer website: discovery and implementation decision

Recorded 11 September 2026, before implementation.

## Git safety

- Original checkout: `ai-agent-portfolio`, branch `add-hektor-agent-demo`.
- Starting commit: `0cf02f0e6f5ace36858af5f13fcd3ed3900f2325`, also the verified remote `main` head.
- No tracked modifications or untracked, non-ignored files. Existing ignored `.capture/`, `node_modules/`, and `test-results/` belong to the original checkout and are preserved.
- Local `main` is older (`d643332`); it must not be used as the implementation base or updated as part of this task.
- Work occurs in a separate sibling worktree, `ai-agent-portfolio-customer-site`, on `feature/customer-facing-website`.
- No push, merge, history rewrite, domain change, or production deployment is part of this work.

## Existing architecture

Plain HTML, CSS, and browser JavaScript. This is a public presentation portfolio, not a monorepo or a hosted agent application. Root `index.html` links to three pages in `projects/`. `assets/style.css` supplies warm neutral colours, large typography, blue accents, and responsive layouts. `assets/site.js` supplies reveals, keyboard-accessible demo tabs, chapter seeking, and transcript fallbacks. No fonts, analytics, trackers, API services, forms, environment configuration, or runtime dependencies are loaded from third parties.

`evidence/` holds videos, posters, individual frames, text tracks, transcripts, synthetic visualizations, and dated runtime artifacts. All HTML files are directly addressable; there is no client router. Root links and the three project routes are the main visitor journey. Supporting HTML routes include five terminal transcripts, approved planning artifacts, the SoherDocs visualization and transcript, and the Hektor transcript.

`package.json` has optional Node tooling for a local static server, Playwright browser verification, and Hektor capture with FFmpeg. There is no application build, lint, or type-check command. The only installed development dependencies are `playwright-core` and `ffmpeg-static`. README recommends Node 22+ for recording; the available Node is 20.17.0. No AGENTS.md, framework/workspace config, deployment file, or repository-owned GitHub Actions workflow was found. README, SECURITY.md, package/lock files, server, verifier, recorder, shared assets, project pages, demo scripts, and provenance artifacts were inspected.

## Demo inventory and claims

| Demo | What visitors can actually use | Evidence limits |
| --- | --- | --- |
| SoherAgent | Five chaptered WebM recordings, terminal transcripts, planning artifacts, JSON and Node test output | Recordings 1–2 are proposed `/plan` concepts. 3–4 recreate reviewed `/yolo` behaviour. 5 presents actual private-core results captured on 24 July 2026: 30 assertions and 155 tests. The imagined contract project is synthetic, not a customer case or deployed product. Private modules are absent, so their tests cannot be rerun here. |
| SoherDocs | 35-second MP4, seven chapters, captions, transcript and visualization | Fabricated person, company, job and ATS score; product concept, not a shipped interface or live document service. Private implementation is absent. |
| Hektor Agent | 150-second silent Swedish MP4 from 14 presentation slides, seven chapters, descriptions, transcript and external presentation/PDF | Proposed support, telephone, handover and dictation workflows. Integrations and savings are unverified. Hektor is a presentation subject, not the site owner's business identity or evidence of a customer relationship. |

Public content uses explicit synthetic/concept disclosures. A text review found no obvious credentials, private endpoints, live customer records, trackers or external executable scripts. This is a bounded source review, not a forensic audit of every binary frame. Existing Hektor commercial language is an unmeasured proposal and will not be reused as a general pricing or capacity claim. One SoherAgent LinkedIn URL differs from the README and will be corrected to the published README destination.

## Hosting and contact

The documented public URL, `https://raal1600.github.io/ai-agent-portfolio/`, responds successfully and includes all three projects. Remote branches contain only `main`. GitHub run `34545442506` successfully deployed starting commit `0cf02f0` from `main`, through the platform-generated `dynamic/pages/pages-build-deployment` workflow (Jekyll build, artifact upload, Pages deploy). There are no repository-owned push/PR workflows. No CNAME or custom domain is configured in the repository. The Pages settings endpoint returned 404 to an unauthenticated read, so exact administrative source-directory settings and any external integrations could not be confirmed. Do not assume feature pushes are safe for external systems; nothing will be pushed in this task.

Verified published identity: **Rami Halabi**. Verified contact destination: the README's `https://www.linkedin.com/in/rami-halabi-2a5573195/`. No email, phone, booking destination, or form backend is published. Git commit metadata is not a business contact source.

## Decision before implementation

1. Extend `index.html` into one coherent services homepage with services, demos, engineering evidence, approach, FAQ, and contact anchors. Keep all meaningful content and navigation usable without JavaScript.
2. Reuse the static stack and existing visual tokens. Put homepage-specific styles in a separate stylesheet to avoid changing demo layouts. Use a small HTML/CSS workflow illustration rather than stock imagery or new dependencies.
3. Preserve all evidence bytes, playback controls, query parameters, and public demo paths. Only make small project navigation/contact/metadata additions where useful. Preserve the original homepage as `work.html` for a compact portfolio view.
4. Link to the existing LinkedIn profile with an honest project-enquiry prompt; no fake form or implied message delivery. No new paid service, analytics or backend.
5. Add a small Node script for repeatable static metadata (canonical, social, verified Person data and sitemap) from central configuration. Check generated files into Git so current hosting still needs no build. Add an optional clean, allowlisted static export for later portability without changing hosting settings.
6. Validate local links, semantic metadata, mobile/desktop layouts, keyboard/no-JS navigation, media playback and chapter controls with the existing browser tooling. Distinguish historical private-core test evidence from tests run for this change.

This minimizes risk: no framework migration, no new runtime, no backend, no changes to production settings, and no rewriting of demos. Services describe work available to scope, while demo labels describe only what is present. Assumptions: English services copy, the existing public name and LinkedIn destination remain appropriate, and the documented Pages URL remains the canonical location until a future approved move.

## Follow-up before branch publication

After the local implementation handoff, the user requested that the work be visible on GitHub. An authenticated Pages settings read then confirmed `build_type: legacy`, source branch `main`, source path `/`, and no custom domain. The remote `main` still points to the original `0cf02f0` commit. This supports publishing only the feature branch for review without changing the live website. The original discovery findings above record what was known before implementation.
