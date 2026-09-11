# Publish the approved SoherAgent storyboard

Base: `a54cf608d16f8e239dc62a371ff2ee1e9d4dbf8f` on the customer branch.
Implementation: `feature/publish-soheragent-storyboard`.

The approved eight-slide story is now the source of both language versions of
the customer demo. It follows an illustrative internal contract-search project
from request through planning, agent coordination, tools, human review and the
intended result. It remains explicitly a concept, with no customer claims or
technical evidence added to the visitor experience.

`content/soheragent.mjs` adapts the approved paired copy into chapters and readable
transcripts. The deck generator selects the scoped `SoherAgentStory` component
with Slidev's `none` layout so the default theme does not override the approved
design. The recorder captures that component and hashes its actual sources.

Both silent 128-second videos, posters, slides, captions, chapters and
transcripts were regenerated. Existing chapter IDs and the historical
`#evidence` alias remain available. Content-based media URLs refresh browser
caches, including related-demo cards on other pages.

SoherDocs content and presentation source are unchanged. Its images/videos were
re-rendered because its existing manifest hashes the shared demo module; the
rendered media is not byte-identical to the previous capture. Separating its
content provenance from other demos is a future tooling cleanup. Hektor's
presentation sources, slides, videos, captions and transcripts are unchanged.

## Validation

- All 16 SoherAgent PNGs exactly match the approved review images by SHA-256.
- Capture checks passed: expected titles, text bounds, no overlaid player text
  and no browser errors.
- Site check: 28 HTML pages and 973 internal references passed.
- Static build passed. Combined Pages build preserves all 131 main-site files
  and includes 238 customer files under `/preview/`.
- Combined artifact check: 41 HTML pages and 1267 local references passed.
- Browser checks passed for both sites at 390px and 1440px, including chapter
  seeking, navigation, transcript links and no-JavaScript fallbacks.
- Bilingual verification passed for all six videos, all 60 decoded slide
  frames, captions, source manifests, and language switching with playback
  position preserved.
- Customer checks passed at 320px, 390px, 768px and 1440px, including keyboard
  controls and the preserved original SoherAgent and SoherDocs demos.

## Reproduce

Use Node 22.12+ with the existing root and `presentations/` dependencies.

```sh
node scripts/generate-decks.mjs
node scripts/record-presentations.mjs soheragent
node scripts/generate-site.mjs
node scripts/metadata.mjs
node scripts/check-site.mjs
node scripts/build.mjs
node scripts/verify-bilingual.mjs
node scripts/build-pages.mjs ../ai-agent-portfolio-pages-preview
node scripts/verify-pages.mjs
node scripts/verify-pages-browser.mjs
```

Set `FFMPEG_PATH` if the local FFmpeg executable is not in `ffmpeg-static`.
The combined build's argument must be a separate checkout with the current
main site's public files. Publication uses the existing manual
`publish-portfolio.yml` workflow on main, which reads the customer branch;
no changes to main, domains or deployment configuration are needed.
