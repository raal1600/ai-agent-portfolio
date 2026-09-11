# Rami Halabi — selected systems

A public portfolio for three projects, presented through concise demos, product views, concept presentations, and available runtime evidence.

**[Open the portfolio](https://raal1600.github.io/ai-agent-portfolio/)**

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

`npm run verify -- https://raal1600.github.io/ai-agent-portfolio` checks a deployed site instead of the local preview.

## Source access

SoherAgent and SoherDocs implementation source remains private. Supervised review or time-bounded read-only access can be arranged for an identified technical interviewer after scope confirmation. The Hektor presentation source is public and linked from its demo.

[LinkedIn — Rami Halabi](https://www.linkedin.com/in/rami-halabi-2a5573195/)
