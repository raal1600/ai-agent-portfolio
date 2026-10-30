# Product inventory

Checked on 30 October 2026 against the local checkouts under `~/Projects` and `~/Presentations` and every repository returned by `gh repo list raal1600`. Forks and upstream copies were skipped (cmux, hermes-agent, work-search-engine, claude-code-playground).

Counts come from `git ls-files`, `git log` and the test files in each repository. Line counts exclude lockfiles, vendored code and build output. Anything that could not be checked in source or test output is left out.

Some repository and folder names contain a client name. They are listed here under a neutral label and are not linked from the site.

## Products with a page on the site

| Product | Repo | Public or private | What's demoable | Existing demo URL | Evidence |
|---|---|---|---|---|---|
| Bilingual survey map | "GIS runtime repo" and "GIS source repo" (names withheld) | Runtime repo public, source repo private | Static web app: map, municipality comparison, table, occupational profile, Swedish/Norwegian. Screenshots on the site with the project branding hidden. | Withheld: the URL contains a client name | Delivery status document: 162 measures, 51 municipalities, 8,262 source cells reconciled against the original workbook. Release workflow runs 16 Playwright E2E groups and axe WCAG A/AA checks before and after deploy. Python import scripts (`import_excel.py`, `import_survey.py`, `prepare_assets.py`). Runtime repo: 22 commits, 2026-09-13 to 2026-10-14. |
| E-commerce back office with competitor price monitoring | "ERP repo" (name withheld) | Private | Dashboard behind a login. Screenshots on the site are rendered from the real dashboard code with every API response mocked with invented products, sellers and prices. | None (login required) | 41 SQL migrations; 43 files under `apps/erp/tests`; 92 JavaScript test cases across the dashboard and price refresher; workflows `erp-sql-tests.yml`, `erp-pages.yml`, `price-refresher.yml`. About 14,900 lines of SQL, 3,800 of them tests. 168 commits, 2026-09-25 to 2026-10-29. |
| RobotOps Twin | "Robotics simulator repo" (name withheld) | Public | Browser workspace and desktop app for running simulated picks and investigating uncertain outcomes. Screenshots from the repository's own evidence folder. | Withheld: the URL contains a client name | README: two clean 831-case Linux suites and all 169 MUST criteria at the audited source. Workflows `ci.yml` (Linux), `desktop.yml` (Windows), `publish-reports.yml`. About 24,800 lines of Python, 11,000 of them tests. 67 commits, 2026-10-01 to 2026-10-06. |
| Blender Asset Director | raal1600/blender-asset-director | Public | Recorded four-way motion comparison on GitHub Pages; installer and CLI. | https://raal1600.github.io/blender-asset-director/ | About 16,200 lines of Python, 523 `test_` functions. Eight workflows including `ci.yml` and `release.yml`. Tags v0.3.1, v0.4.0, v0.5.0. 118 commits, 2026-09-12 to 2026-09-16. A private companion test repository adds 29 commits. |
| Blender Teaching Overlay | raal1600/blender-teaching-overlay-mcp | Public | Windows MCP server. No public recording; the site describes its six tools and the lesson flow. | None | About 2,560 lines of C#, 828 of them tests. `windows.yml` CI. `ACCEPTANCE.md`: 12 test groups passed on the original test machine. 2 commits, 2026-09-12. |
| Private AI Datacenter | raal1600/private-ai-datacenter | Public | Self-contained architecture explorer with 18 Mermaid views on GitHub Pages. | https://raal1600.github.io/private-ai-datacenter/ | `tests/validate.py` and `tests/browser.py`; workflows `validate.yml` and `pages.yml`. 5 commits, 2026-09-18. |
| SoherAgent | Private extension source (not in a GitHub repository); evidence in this repository | Private source, public evidence | Five chaptered terminal recordings and a public synthetic runner. | This site, `projects/pi-agent-harness.html` | `evidence/pi-agent-harness/pi-extension-tests.txt`: 155 passing tests. `runtime-behavior.json`: 30 of 30 assertions. Captured 2026-07-24. |
| SoherDocs | raal1600/CV (app under `Rami/cv-app`) | Private | 35-second product-concept recording and readable transcript. | This site, `projects/soherdocs.html` | About 25,600 lines of TypeScript, 11,200 of them tests (unit, visual and E2E). 53 commits, 2026-06-17 to 2026-07-16. |
| Customer service agent | Concept presentation hosted in another person's GitHub account (withheld) | Public presentation | Text walkthrough of the concept on this site. The earlier video and slide images carried the client's branding and were removed from this branch. | None on this site | 14-slide concept presentation recorded in July 2026. No runtime evidence; the presentation itself says the telephone integration and savings are not verified. |
| RigForge | raal1600/RigForge | Private | Next.js app that needs PostgreSQL. QA screenshots from the repository, taken with synthetic test accounts. | None | 256 commits, 2025-12-01 to 2025-12-21. About 33,500 lines of TypeScript. 30 test cases under `tests/`. Versioned release notes V2.4 to V3.1. |

## Repositories without a public product

| Repo or folder | Public or private | Why there is no page |
|---|---|---|
| raal1600/design-engineering-os | Private | Internal engineering workspace. It needs Penpot, Neo4j, PostgreSQL and a crawler running locally, so there is nothing an outside visitor can try. 136 commits, 2025-12-28 to 2026-04-13. |
| hermes-pane-bridge (local only) | Private | Developer tooling that keeps remote terminal sessions alive. No user interface. About 1,350 lines of Python with tests. |
| raal1600/Hermes-skill-library, Hermes-backup, Hermes-overlays | Private | Skills, backups and overlays for a third-party agent framework. Not a product. |
| raal1600/Blender-Asset-Director-MotionForge | Private | Research and architecture documents only. The README says the add-on is not implemented. |
| raal1600/blender-asset-director-private-tests | Private | Test suite for Blender Asset Director. Covered by that product's page. |
| "GIS presentation repo" (name withheld) | Private | Slidev architecture presentation and the GIS source branch. Covered by the survey map page. |
| pi-harness-reliability (local folder) | Not a repository | Working notes for SoherAgent reliability. |
| Two ERP notes folders (names withheld) | Not repositories | Handover notes and rollback SQL for the back office. |
| raal1600/CV | Private | Holds SoherDocs (covered) and CV variants. |
| raal1600/ai-agent-portfolio | Public | This site. |
