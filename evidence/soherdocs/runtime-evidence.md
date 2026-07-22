# SoherDocs runtime evidence — application export

**Captured:** 22 July 2026

**Source snapshot:** `CV@941fab7c87acf85338aa024b36f2a54dc808955d` (`v8-soherdocs-platform`)

**Source state:** no uncommitted files in the application package subtree

**Browser:** Playwright Chromium, headless, 1440 × 1000

**Result:** PASS

[Watch the actual runtime capture](soherdocs-application-export-runtime.webm)

## Representative decoded frames

These images were decoded from the published WebM at 1, 5, 9, and 13 seconds and visually reviewed before publication. They show only the real application UI with synthetic account and application data.

1. [Generator and live previews loaded](frames/01-generator-loaded.png)
2. [Local job-ad analysis and suggestions](frames/02-local-analysis.png)
3. [Successful export with ownership-checked artifact links](frames/03-export-complete.png)
4. [Exported artifacts remain visible](frames/04-artifacts-listed.png)

## What this proves

The video records the real SoherDocs production build running against an isolated throwaway PostgreSQL database and local artifact storage. It is not an architecture animation or a mocked screenshot sequence.

The automated browser scenario:

1. Starts the production Next.js build with isolated local infrastructure.
2. Signs in through the real Auth.js credentials flow using a synthetic account.
3. Loads the application generator, role choices, and live document previews.
4. Confirms AI execution is disabled when no provider is configured.
5. Enters a synthetic Swedish job advertisement for Acme AB.
6. Runs the on-machine job-ad analyzer.
7. Verifies the suggested company, role, language, contact, and track.
8. Applies the suggestions to the editable application fields.
9. Exports the application through the real export route.
10. Verifies successful completion, six ownership-checked artifact links, and the refreshed applications list.

## Privacy and isolation

- Synthetic login: `demo.candidate@example.com`
- Synthetic profile name, phone number, employer, university, URL, job advertisement, and target company
- Throwaway embedded PostgreSQL instance
- Throwaway local application-artifact directory
- No production database, storage, credentials, or AI provider
- No provider or model network call
- Temporary evidence runner removed after capture

## Integrity

```text
SHA-256  1d164d32df97d8ca45e91f6f1eac0dfebeae54e7e204dea90fe0c1c0c72cdfde
File     soherdocs-application-export-runtime.webm
Duration 14.24 seconds
Video    VP8 WebM, 1440 × 1000, 25 fps
```

## Reproduction boundary

The scenario is based on the private repository’s reviewed `application-export` browser-smoke harness. During supervised review, the same source snapshot and scenario can be inspected and rerun. Private source is not copied into this public portfolio.
