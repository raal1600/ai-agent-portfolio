# Restore the completed Hektor demo and fix captured Slidev controls

Starting customer commit: `ae3433c046910bc7c858153f366c1b5daec6711e`.
Work is isolated on `fix/presentation-captures-and-hektor` in a separate worktree.

The user reported black navigation labels in the recordings and rejected the
replacement of the completed Hektor presentation. Inspection confirmed that
Slidev's screen-reader navigation labels were visible over the first exported
slide (including “Go to next slide” and “Show slide overview”). Checking just
the slide DOM, video duration and image hashes did not detect that overlay.

The correction preserves the original 14-slide, 150-second Swedish Hektor video
and every original image byte-for-byte. Its English counterpart translates the
same complete presentation, retaining layout, branding, order, scenarios and
timings. The original seven chapters return. The reference repository remains
unchanged. No new Hektor narrative or design is introduced.

Slide capture now explicitly hides everything outside the selected slide,
checks that no outside text can overlap it, and is tested with deliberately
visible navigation labels. SoherAgent and SoherDocs were re-recorded with
this correction. The public images and video URLs include content versions
so browsers fetch corrected assets instead of cached defective recordings.

Validation performed locally:

- `node --test scripts/capture-slide.test.mjs`: deliberately overlaid labels
  are rejected before isolation; isolated pixels match the clean slide.
- `npm run generate`, `npm run check`, `npm run build`: pass; 28 HTML pages
  and 978 internal links, assets and fragments checked.
- `npm run verify:bilingual`: all six presentations, 60 decoded slide frames,
  chapters, captions, language switching, no-JavaScript fallbacks and served
  video/poster hashes pass. Swedish Hektor matches the original video and
  all 14 original images exactly.
- `npm run verify:customer`: navigation, keyboard controls and layout at
  320, 390, 768 and 1440 pixels; original SoherAgent and SoherDocs playback;
  preserved source evidence and truthful contact pass.
- `npm run verify`: original Hektor playback, all 14 decoded slides, seven
  chapter seeks, captions, video integrity and no-JavaScript transcript pass.
- `npm run build:pages -- ../ai-agent-portfolio-pages-preview`,
  `npm run check:pages`, `npm run verify:pages`: pass; 131 main files preserved,
  41 combined HTML pages and 1,272 local links checked, with working desktop,
  mobile and no-JavaScript navigation for both versions.
- Visually inspected all 14 English Hektor slides, including both Mermaid
  diagrams, and all four corrected Soher opening slides. English text uses
  the original artwork and fits the original layouts.

The first combined verification invocation mistakenly supplied the main source
directory to the output-directory argument and failed. Running it against the
actual `pages-dist` output passed; no source change was needed.
