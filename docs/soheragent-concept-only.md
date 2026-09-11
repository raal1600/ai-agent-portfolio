# SoherAgent: explain the idea without the technical evidence

Starting commit: `0ac65bc010387b7d5821e5238d6e5cbe0153e54b`.
Implementation branch: `feature/soheragent-concept-only`.

The owner requested removal of SoherAgent's evidence material from the customer
experience. The evidence appeared in the homepage, gallery, demo page and the
presentation itself, including historical test counts and verification dates.

The English and Swedish presentation now explains the idea through a request,
planning, coordination, agreed boundaries, possible use cases and human review.
It retains eight slides, their timing and the existing visual design. The
concept is still clearly labeled. No new claim of a working customer deployment
or measured result is introduced.

Customer copy no longer promotes technical evidence. SoherAgent's original
recordings section and recording-provenance link are removed. Captions and
readable slides follow the revised presentation; the former evidence chapter
anchor remains an alias to the new use-cases slide for existing bookmarks.

The original technical files remain in the repository and at their existing
URLs. Their archive page is omitted from the customer sitemap, marked noindex
and unlinked from the customer journey. The original main site and Hektor's
completed presentation are preserved.

The recording source manifest currently hashes a shared demo-content module.
SoherDocs is therefore re-captured to validate its unchanged output against the
updated source; its public content is unchanged. This coupling can be narrowed
to individual demo content in a future tooling cleanup.

Validation:

- Regenerated both language versions and recorded both SoherAgent videos.
  Visually inspected every changed slide in both languages; capture overflow
  and external-overlay checks passed.
- `npm run check` and `npm run build` passed: 28 HTML pages and 973 local
  links, assets and fragments checked.
- `npm run verify:bilingual` passed for all six presentations, including 60
  decoded frames, captions, chapter navigation and language-position switching.
- `npm run verify:customer` passed at 320, 390, 768 and 1440 pixels, including
  keyboard navigation, contact links and playback of the preserved original demos.
- Browser inspection of both homepages, galleries, SoherAgent pages and
  transcripts confirmed no technical-evidence copy, test counts, archive links
  or recording-provenance links. The former chapter bookmark still resolves.
- `npm run build:pages -- ../ai-agent-portfolio-pages-preview`,
  `npm run check:pages` and `npm run verify:pages` passed: all 131 main files
  preserved, 41 HTML pages and 1,267 local references checked, with desktop,
  mobile and no-JavaScript navigation working for both versions.
- Git comparison confirmed all original evidence and all Hektor presentation
  files are unchanged. Every SoherDocs image and video is also unchanged after
  capture; only its source manifest was refreshed.
