# Bilingual customer site and presentations

## Discovery and decision

Starting customer commit: `e4ee929f1c245bcb45d2c423b8ad4f1d39a8d534`.
Work branch: `feature/bilingual-demos`, in a separate worktree. The original,
customer-site, and publishing-workflow worktrees were clean and remain separate.

The website is static HTML/CSS/JavaScript. There is no public agent backend.
Hektor is a Swedish Slidev concept presentation; telephone and case-system
integrations are not verified. SoherAgent has five English technical recordings:
concept plans, recreated workflow behavior, and dated runtime/test evidence.
SoherDocs has an English synthetic seven-step CV product visualization.

The owner clarified that SoherDocs is a document-tailoring tool service callable
by an agent. CVs are the current example; contracts and other document types are
future scope. Public material demonstrates the intended workflow, not a callable
production endpoint. The site must keep these distinctions visible.

Main is published unchanged at the Pages root. The manually dispatched workflow
on main assembles `feature/customer-facing-website` under `/preview/`. Feature
pushes do not deploy. No workflow, domain, main content, or Pages setting needs
to change for this work.

## Implementation

- Keep static hosting and the existing visual language. Generate English and
  Swedish HTML from shared templates and paired content. English URLs remain;
  Swedish lives under `sv/`. Language links lead to the same page and preserve
  the presentation position. Navigation stays in the selected language.
- Make all three primary demos matching bilingual, silent presentations, with
  captions, chapter links, readable transcripts, and downloadable recordings.
  Use Slidev for authoring/capture in an isolated development-only package.
  Publish static captures and videos; the site requires no Slidev runtime.
- Introduce a presentation-first SoherAgent page. Preserve original technical
  recordings and their original page as a clearly labeled English evidence
  archive. Preserve all existing media and transcript URLs.
- Explain the difference between an agent, a tool service, and a proposed
  customer workflow. Services describe work available to scope, without
  invented deployments, customers, outcomes, prices, or integration claims.
- Keep verified LinkedIn contact. No forms, trackers, hosted services, or
  external font dependencies.

This preserves existing evidence and hosting while making translations and
presentation content maintainable in one place. The user confirmed silent
recordings with bilingual slide text, captions, and transcripts. No additional
business claims or contact details are assumed.

## Validation and handoff

Validate translation parity, public routes and metadata, rendering at mobile and
desktop widths, language switching at a chapter, no-JavaScript reading, all six
recordings and text tracks, original evidence regression, and the combined Pages
artifact with the main files byte-preserved. Record commands/results here after
they run. Publishing remains a separate action from generating an artifact.

### Results — 11 September 2026

- `npm run check`: passed; 28 HTML pages and 932 internal links/assets/fragments.
- `npm run build`: passed; portable static export with the Swedish route tree.
- `npm run verify:customer`: passed at 320, 390, 768 and 1440 pixels. Checked
  navigation, heading hierarchy, keyboard access, original SoherDocs playback,
  all five SoherAgent recordings and all 66 chapter seeks, no-JS fallbacks,
  truthful contact, and absence of browser errors or unexpected requests.
- `npm run verify:bilingual`: passed for six 128-second videos, all 48 decoded
  slide intervals, captions, image/video/source hashes, reciprocal language
  navigation, preserved playback time, rewind-to-zero, transcript anchors and
  no-JS reading. Source hashes normalize LF line endings.
- `npm run verify`: passed for the original Hektor video, all 14 decoded slide
  intervals, seven chapters, Swedish captions, integrity and no-JS transcript.
- `npm run build:pages -- ../ai-agent-portfolio-pages-preview` and
  `npm run check:pages`: passed; all 131 main public files preserved byte-for-byte,
  226 customer public files, 41 HTML pages and 1,226 internal references across
  the combined artifact. Preview canonicals and noindex metadata are correct.
- `npm run verify:pages`: passed for both versions at 390 and 1440 pixels,
  including playback, chapter seeking, return navigation and transcript links.
- Visually inspected English and Swedish slide captures and mobile/desktop
  homepage screenshots. Increased Slidev summary contrast after the first render.
  All 48 final slides passed text/content-boundary checks during capture.
- Original `evidence/` assets have no modifications or deletions. The original
  checkout remains clean at `0cf02f0`; the published customer checkout remains
  clean at `e4ee929`. No workflow or production source was changed.

The checks validate the static experience and historical evidence playback.
They do not re-run private agent implementations or validate live integrations.

### Review and publication

The feature is prepared independently of the published customer branch. The
existing workflow only publishes `feature/customer-facing-website`, so pushing
`feature/bilingual-demos` does not change Pages. To publish after review, apply
this feature to the customer branch and manually run the existing combined
workflow from main. The root portfolio can remain unchanged. No new Pages
configuration is necessary.

### Remaining business inputs and maintenance

LinkedIn remains the verified contact destination. A business email or booking
link would be optional additions once supplied. Real customer references,
approved branding, production integration evidence, pricing and scope must come
from the owner before they can be represented as facts.

Original English technical evidence and the original Swedish Hektor deck remain
source-language archives; the new customer journey and primary demos are fully
bilingual. Slide recordings add about 7 MiB of video across six files, with
separate static captures. Slidev is an optional development dependency, isolated
from the zero-package publishing path. Update both locale entries together and
re-record after slide changes; provenance checks catch stale recordings.

For eventual migration, retain English/Swedish and evidence paths, change the
central URL, regenerate metadata and serve `dist/` with planned redirects. The
implementation does not depend on GitHub-specific APIs at runtime.
