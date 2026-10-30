"""Generate the portfolio's static pages. Run from the repository root: python3 scripts/build-site.py ."""
import html, re, subprocess, sys
from pathlib import Path

ROOT = Path(sys.argv[1])
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&amp;'
         'family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&amp;family=Source+Serif+4:opsz,wght@8..60,600&amp;display=swap">')
LINKEDIN = 'https://www.linkedin.com/in/rami-halabi-2a5573195/'
GITHUB = 'https://github.com/raal1600'
e = html.escape


def old(path):
    return subprocess.check_output(['git', '-C', str(ROOT), 'show', f'main:{path}'], text=True)


# Recording players from the published pages, reused unchanged.
AGENT_DEMO = re.search(r'(<div class="demo-switcher".*?)</div></section>\s*<section class="block"[^>]*aria-labelledby="built(?:-title)?">',
                       old('projects/pi-agent-harness.html'), re.S).group(1)
docs_html = old('projects/soherdocs.html')
DOCS_DEMO = re.search(r'(<div class="workflow-demo".*?<p class="visualization-note".*?</p>)', docs_html, re.S).group(1)

AREAS = [
    ('data', 'Data and GIS',
     'Research data often sits in spreadsheets that only the researchers can read. I build tools that put aggregated data on a map '
     'without losing track of where each number came from: every value is checked against its source, and the published site is '
     'tested before and after it goes live.'),
    ('business', 'Business systems',
     'Small teams need tools that answer one question well: what something costs, what it should sell for, what others charge, or '
     'which version of a document to send. I keep the rules in the database, keep people in charge of decisions, and never let a '
     'tool change live data without approval.'),
    ('simulation', 'Simulation and robotics',
     'In automation, the hard bugs appear when a machine and the software around it disagree about what happened. I build '
     'simulators that make those moments repeatable, so a team can rehearse recovery before it costs anything.'),
    ('agents', 'AI agent tooling',
     'Agents are useful when they work inside clear limits. My agent tooling makes the limits explicit: the agent proposes, a '
     'person approves, and every step leaves evidence that can be checked afterwards.'),
    ('creative', '3D and creative tooling',
     'An agent can take over the repetitive parts of 3D work while a person keeps creative control. These tools let a coding '
     'agent reuse assets and adapt motion in Blender, or point at the interface while the learner makes every click.'),
    ('architecture', 'Architecture',
     'A design has to be clear enough for others to challenge before anything is built. I write architecture as editable '
     'diagrams, with notes on why each boundary exists and what happens when something fails.'),
]


def shot(src, alt, caption, cls='shot'):
    path = f'../assets/products/{src}'
    return (f'<figure class="{cls}"><a class="shot-link" href="{path}"><img src="{path}" alt="{e(alt)}" loading="lazy" decoding="async"></a>'
            f'<figcaption>{caption}</figcaption></figure>')


def gallery(first, *rest):
    """The first screenshot at full width, the others side by side."""
    return first + (f'<div class="shot-grid">{"".join(rest)}</div>' if rest else '')


PRODUCTS = [
    dict(slug='survey-map', area='data', name='Bilingual survey map', short='Survey map',
         idea='A map and data tool that presents a cross-border youth survey for 51 municipalities, in Swedish and Norwegian.',
         tags=['Python', 'JavaScript', 'Leaflet', 'GeoJSON', 'Playwright', 'axe'],
         when='Aug – Oct 2026', status='Working version delivered for the research team’s review', source='Private source; live site belongs to the project',
         problem=['A research team had its survey results in one large workbook: 162 measures across five themes, broken down by municipality, gender and group, for municipalities on both sides of a national border. They wanted people outside the team to explore the results on a map, in both languages, without a server to run and without any risk of the numbers drifting from the source.',
                  'The idea: convert the workbook once through a checked Python pipeline, publish the result as a small static site, and test every measure in a real browser before and after each release.'],
         flow=[('Workbook', 'Five sheets from the researchers'), ('Python import', 'Schema checks, documented corrections, geodata preparation'),
               ('Static bundle', 'JSON, GeoJSON and Leaflet, 0.84 MB, no server'), ('Release gate', 'E2E and accessibility tests must pass'),
               ('Live check', 'The same tests rerun on the published site')],
         demo=shot('gis-map.jpg', 'Map of municipalities on both sides of the Sweden–Norway border, shaded by average score, with a side panel comparing one municipality to the country totals.',
                   'Map view. Choose a measure, read each municipality’s value, and compare it with the totals for each country. The project’s branding is hidden for this portfolio.')
              + shot('gis-phone.jpg', 'The same tool at phone width: topic and area selectors above the map.', 'At 390 px the selectors stack above the map; the tests cover 320 and 390 px phones.', 'shot shot-phone')
              + '<p class="note">The live site belongs to the research project, so it is not linked here. I can walk through it on request.</p>',
         built=['The Python import that reads the workbook, validates it against a schema, applies the researchers’ documented corrections and prepares the geography.',
                'The map, table, occupational profile and multi-municipality comparison, with shareable links that keep every selection.',
                'Swedish and Norwegian text throughout, keyboard support and a phone layout.',
                'The release workflow: tests before publishing, then the same tests against the live address, plus a manifest of file hashes.',
                'Rounds of feedback and accessibility review with the researchers.'],
         stack=['Python', 'shapely', 'pyproj', 'pyshp', 'JavaScript (ES modules)', 'Leaflet', 'GeoJSON', 'Playwright', 'axe-core', 'GitHub Actions', 'Static hosting'],
         quality=['All 8,262 municipal source cells, 486 totals and 450 standard deviations reconciled against the original workbook with an independent reader.',
                  '12 unit test groups and 16 browser E2E groups, covering every measure on the map and in the table.',
                  'Automated WCAG A/AA checks with axe, keyboard and focus tests, and layouts at 320, 390, 1280 and 1366 px.',
                  'Each release records the exact version and a hash for every published file.'],
         limits=['Some municipal values are withheld until the researchers confirm them.',
                 'Part of the Norwegian data and metadata is waiting for the researchers’ final confirmation.',
                 'The cohort study data has not been delivered yet, so that view is empty.',
                 'A manual screen-reader review and a formal accessibility statement are still to do.']),

    dict(slug='ecommerce-back-office', area='business', name='E-commerce back office', short='Back office',
         idea='Purchase costs, target margins and competitor prices for a 1,150-product online shop, in one read-only dashboard.',
         tags=['PostgreSQL', 'PL/pgSQL', 'Supabase', 'Cloudflare Workers', 'JavaScript'],
         when='Sep 2026 – present', status='Live for one shop; AI monitoring paused', source='Private source',
         problem=['A dropshipping shop sells products it never holds. Supplier costs change, competitors change their prices, and the shop platform has no view of margins. The owner needed to see, for each product, what it costs, what it should sell for and what others charge, without any tool touching the live shop.',
                  'The idea: let PostgreSQL own the rules. Workers, both AI agents and a plain price refresher, can only call validated database functions. Every observation is kept, and the dashboard only reads.'],
         flow=[('Catalogue and costs', 'Imported snapshots, read-only towards the shop'), ('PostgreSQL', 'Append-only ledger, validating functions, row-level security'),
               ('Workers', 'AI agents find and judge offers; a Cloudflare Worker re-reads verified prices every 30 minutes'),
               ('Dashboard', 'Static site behind sign-in: margins and competitor prices')],
         demo=gallery(shot('erp-overview.jpg', 'Dashboard overview with counts of loaded products, calculated margins and products with negative margin.', 'Overview after sign-in.'),
              shot('erp-prices.jpg', 'Price table: purchase cost, product margin, target margin, calculated price and lowest competitor price for each product.', 'Prices and margins. Each row shows the purchase cost, the margin at the calculated price, the target margin and the lowest verified competitor price, with its source and check time.'),
              shot('erp-monitoring.jpg', 'Monitoring panel showing the status of exact and equivalent product monitoring groups.', 'Competitor monitoring. The queue adapts to whichever workers are running, and paused groups are taken over without errors.'))
              + '<p class="note">Synthetic data. These screenshots were rendered from the real dashboard code, with every request answered by a local mock containing invented products, sellers, prices and links. The shop’s name is replaced with “Exempelbutiken”.</p>',
         built=['The data model and 41 versioned migrations, with the domain logic in validating PL/pgSQL functions in a private schema.',
                'Margin calculation in whole öre, editable margin targets and a preview of every price change before it is saved.',
                'Competitor price monitoring: exact matches by EAN, judged equivalent products, seller coverage and an adaptive work queue.',
                'A Cloudflare Worker that re-reads verified offers from the page’s structured data, with sites that earn or lose automatic refresh.',
                'A versioned contract for the AI workers, published by migration, with rollback scripts for each version.'],
         stack=['PostgreSQL 17', 'PL/pgSQL', 'Supabase Auth', 'Row-level security', 'pg_cron', 'Cloudflare Workers', 'Browser Rendering', 'Hyperdrive', 'Cloudflare Pages', 'JavaScript', 'Python', 'GitHub Actions'],
         quality=['About 3,800 lines of SQL tests across the migrations, run in CI.',
                  '92 JavaScript test cases for the dashboard and the price refresher.',
                  'Three CI workflows: SQL tests, dashboard checks and deploy, and the price refresher.',
                  'A deployment log of verified checkpoints that the workers read before they act.'],
         limits=['Shop catalogue and supplier costs are imported by hand; there is no live supplier API.',
                 'Finding new competitor offers depends on AI scheduled tasks, which are paused right now. The refresher only re-reads offers that were already verified.',
                 'Competitor prices exclude shipping, and the margin excludes payment fees and overhead.']),

    dict(slug='soherdocs', area='business', name='SoherDocs', short='SoherDocs',
         idea='Turn one job posting and your saved CV knowledge into a tailored CV, a cover letter, an ATS check and PDFs.',
         tags=['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Playwright'],
         when='Jun – Jul 2026', status='Product concept recording; private source', source='Private source, available for supervised review',
         problem=['Tailoring a CV and a letter for every application is slow, and generic AI writing invents experience the applicant does not have.',
                  'The idea: keep a knowledge base of saved CV variants, tailor only from that evidence, check the result, and export ready-to-send PDFs.'],
         flow=[('Job posting', 'Paste or upload the ad'), ('Find evidence', 'Search saved CV variants'), ('Tailor', 'CV and personal cover letter'),
               ('Check', 'Advisory ATS readiness review'), ('Export', 'Both documents as PDFs')],
         demo=DOCS_DEMO,
         built=['A multi-user platform with authentication, private storage and ownership checks on every record.',
                'Profile import with validation and a reviewed diff before anything is applied.',
                'Consent controls for any data used to improve the product.',
                'Document generation and PDF export.'],
         stack=['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Nunjucks', 'Vitest', 'Playwright'],
         quality=['About 11,200 lines of unit, visual and E2E tests in the repository.',
                  'Each planned slice ships only after the type check, the test suites and a browser smoke test pass.'],
         limits=['The recording is a synthetic product concept with a fabricated person, company and job. It is not footage of a shipped interface.',
                 'The ATS score is advisory. It is not an employer’s result or a hiring prediction.',
                 'The source is private. I can arrange a supervised review.']),

    dict(slug='rigforge', area='business', name='RigForge', short='RigForge',
         idea='A community platform for planning, saving and sharing PC builds.',
         tags=['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth'],
         when='Dec 2025', status='In development; not deployed', source='Private source',
         problem=['People who build PCs plan their parts in spreadsheets and share screenshots. There is no single place to plan a build, save it, and let others learn from it or start from it.',
                  'The idea: a build studio with running totals, a cloud workspace for saved builds, and a showcase where the community can browse and reuse them.'],
         flow=[('Sign in', 'Accounts with NextAuth'), ('Build studio', 'Pick components; totals for price and power update as you go'),
               ('Save', 'Cloud workspace in PostgreSQL through Prisma'), ('Share', 'Showcase, tags and media')],
         demo=gallery(shot('rigforge-home.jpg', 'RigForge home page with the headline Design Your Dream Rig and buttons to build a PC or browse blueprints.', 'Home page.'),
              shot('rigforge-builder.jpg', 'Build studio listing component slots such as graphics card, processor and memory, with a setup summary panel.', 'Build studio with an empty build and the running summary.'),
              shot('rigforge-build.jpg', 'Saved build detail page with build ID, dates, total price, owner and tags.', 'A saved build. The QA account and its zero price are test data.'))
              + '<p class="note">QA screenshots from the repository, taken with synthetic test accounts.</p>',
         built=['Five planned releases in three weeks: foundation, media pipeline, build studio, community features, and discovery.',
                'Accounts, saved builds, tags and media uploads.',
                'Product, roadmap and technical specification documents for each release.'],
         stack=['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Tailwind CSS', 'Zod'],
         quality=['30 automated test cases in the repository.',
                  'Browser QA screenshots recorded for each release.',
                  'Release notes for every version from V2.4 to V3.1.'],
         limits=['Not deployed publicly.', 'Component prices in the QA data are placeholders.', 'Development paused during V3.1 planning.']),

    dict(slug='robotops-twin', area='simulation', name='RobotOps Twin', short='RobotOps Twin',
         idea='A deterministic simulator for a warehouse robot cell, built to rehearse what happens when the robot and the software disagree.',
         tags=['Python', 'FastAPI', 'PostgreSQL', 'RabbitMQ', 'OPC UA', 'Blender'],
         when='Oct 2026', status='Acceptance criteria met at an audited revision', source='Public source (link on request)',
         problem=['When a robot finishes a pick but its confirmation is lost, the warehouse system cannot tell whether the order is done. Cases like this are rare, and expensive to reproduce on real hardware.',
                  'The idea: simulate the cell deterministically, inject faults on purpose, and make the operator confirm the outcome with fresh evidence before the workflow moves on.'],
         flow=[('New test', 'Choose the cell, product and fault scenario'), ('Durable workflow', 'Plans the pick, sends commands, records every step'),
               ('Simulated cell', 'Blender scene with six tools and injected faults'), ('Verification', 'Fresh observation checks the result'),
               ('Investigation', 'The operator reconciles before the next pick')],
         demo=shot('robotops-cell.jpg', 'Simulator workspace showing a scenario panel next to a 3D view of the robot cell.', 'Running a pick. The left panel explains the selected scenario; the replay shows the cell in 3D.')
              + shot('robotops-investigation.jpg', 'Investigation panel for an uncertain result, showing the original command record and the sensor report section.', 'Investigating an uncertain result. The command record alone does not confirm the order, so the next pick is paused until it is reconciled.'),
         built=['A FastAPI and WebSocket backend over a durable workflow in PostgreSQL and RabbitMQ.',
                'An OPC UA interface to the simulated cell.',
                'A synthetic robot cell in Blender with six product families, six tools and three camera views, replayed read-only in the browser.',
                'The investigation flow: what happened, the evidence, and manual inspection, kept separate from possible explanations.',
                'A Windows desktop app for the same workspace.'],
         stack=['Python 3.13', 'FastAPI', 'Pydantic', 'psycopg', 'PostgreSQL', 'RabbitMQ', 'asyncua (OPC UA)', 'WebSockets', 'Blender', 'Playwright', 'uv'],
         quality=['Two clean 831-case test runs on Linux and all 169 required acceptance criteria met at the audited revision.',
                  'About 11,000 lines of tests, including runs against real Blender, PostgreSQL and RabbitMQ.',
                  'Linux and Windows CI with ruff, mypy, bandit and pip-audit.'],
         limits=['The cell is synthetic and based on public sources. It is not connected to real robot hardware.',
                 'Only one robot cell can be selected today, although the registry supports more.']),

    dict(slug='pi-agent-harness', area='agents', name='SoherAgent', short='SoherAgent',
         idea='A governed delivery harness for coding agents: an exact authorized batch, leased work, independent review and hard stops.',
         tags=['TypeScript', 'Node.js', 'Pi SDK', 'Obsidian'],
         when='Jul 2026', status='Working extension suite; private source', source='Private source, available for supervised review',
         problem=['Coding agents work fast, but without limits they commit, deploy or widen the scope on their own.',
                  'The idea: the agent can only act on a batch that a person authorized exactly. Work runs under a lease, an independent reviewer checks it, and the harness stops before anything that was not approved.'],
         flow=[('Plan', 'Idea, specification and tickets'), ('Authorize', 'The person approves one exact batch'), ('Deliver', 'Leased implementation with checkpoints'),
               ('Review', 'An independent reviewer checks the work'), ('Stop', 'Hard stop before anything unauthorized')],
         demo='<p>Five chaptered terminal recordings follow one imagined project. Recordings 1 and 2 are sanitized concept recreations of a proposed planning mode, 3 and 4 recreate reviewed current behavior, and 5 shows captured test results.</p>' + AGENT_DEMO,
         built=['An extension suite of about 8,500 lines: a control plane with capability gates, deterministic phase routing and resumable sessions.',
                'Cross-process leases, bounded parallel agents and hard stops before commits, deployment, destructive actions or scope changes.',
                'Obsidian knowledge tools with bounded retrieval, path controls and approved changes only.'],
         stack=['TypeScript', 'Node.js', 'Pi Extension SDK', 'Obsidian', 'Node test runner'],
         quality=['155 of 155 extension tests pass (<a href="../evidence/pi-agent-harness/pi-extension-tests.txt">test output</a>).',
                  '30 of 30 runtime assertions pass in a public synthetic runner (<a href="../evidence/pi-agent-harness/runtime-behavior.json">result</a>, <a href="../evidence/pi-agent-harness/runtime-scenario.mjs">runner</a>).',
                  'Evidence captured on 24 July 2026 by importing the private modules into the public runner.'],
         limits=['Recordings 1 and 2 show a proposed planning mode, not implemented behavior.',
                 'The test evidence does not prove a full live conversation or a production deployment.',
                 'The source is private. I can arrange a supervised review.']),

    dict(slug='support-agent', area='agents', name='Customer service agent', short='Service agent',
         idea='A concept for one agent that answers chat and phone in Swedish, hands over to staff with context, and turns dictation into reviewed notes.',
         tags=['Concept', 'Chat', 'Telephony', 'Dictation'],
         when='Jul 2026', status='Concept presentation; nothing deployed', source='No source; concept only',
         problem=['Support teams answer the same questions every day, write the same notes, and are closed when many customers need help.',
                  'The idea: one agent that uses the team’s approved knowledge across web chat, phone and staff dictation, with a clear limit where a person takes over and every note reviewed before it is saved.'],
         flow=[('Customer asks', 'Web chat or phone, in Swedish'), ('Agent answers', 'Only from approved knowledge'),
               ('Handover', 'A person takes over with the background attached'), ('Dictation', 'Staff dictate; the agent drafts the case note'),
               ('Review', 'Staff check and approve before anything is saved')],
         demo='<p>The concept was presented as a 14-slide deck in seven parts. Each part in short:</p><ol class="walkthrough">'
              + ''.join(f'<li><strong>{e(t)}</strong><span>{e(d)}</span></li>' for t, d in [
                  ('Customer value', 'Common questions get an answer even when the support desk is closed, and many customers can be helped at once.'),
                  ('Chat and knowledge', 'Answers come only from the organisation’s approved knowledge, so the agent explains instead of guessing.'),
                  ('Phone in Swedish', 'A clear spoken answer, and a clear limit for what the agent will not handle.'),
                  ('Handover', 'When a person is needed, the background follows the case so the customer does not repeat themselves.'),
                  ('Dictation', 'Staff describe the case; the agent drafts the note; staff review and approve it.'),
                  ('Team and control', 'The organisation decides what the agent knows, what it can access and when a person takes over.'),
                  ('The offer', 'One agent at roughly the cost of one support employee, with scope and price set in a quote.')])
              + '</ol><p class="note">The earlier video of this presentation carried the client’s branding, so it is not published here.</p>',
         built=['Turned the presentation into a chaptered, silent walkthrough video with Swedish captions and a readable transcript.',
                'Wrote the recording script that captured each slide at fixed timings.'],
         stack=['Node.js', 'Playwright', 'ffmpeg', 'WebVTT'],
         quality=['Chapters, captions and a full text transcript, so the walkthrough works without sound.'],
         limits=['This is a concept. The phone and case-system integrations are not built or verified.',
                 'Capacity and savings have not been measured.']),

    dict(slug='blender-asset-director', area='creative', name='Blender Asset Director', short='Asset Director',
         idea='Gives a coding agent a small Blender production team: reuse assets, adapt motion, plan shots and review the result.',
         tags=['Python', 'Blender', 'MCP', 'Codex skill'],
         when='Sep 2026', status='v0.5.0 released; v0.6 in development', source='<a href="https://github.com/raal1600/blender-asset-director">Public source</a>',
         problem=['Agents that build 3D scenes tend to generate everything from scratch, even when suitable assets already exist. And moving an animation from one character rig to another often breaks the footwork and timing.',
                  'The idea: index what the scene and library already have, plan the transfer and have it reviewed, then adapt the motion with explicit checks, and keep technical tests separate from a person’s judgement of the performance.'],
         flow=[('Prompt and scene', 'Start from what already exists'), ('Index', 'Assets and motion clips'), ('Plan', 'Reviewed transfer plan'),
               ('Adapt', 'Retarget with grounding and timing checks'), ('Review', 'Evidence for a person to judge')],
         demo=f'<figure class="shot"><a href="https://raal1600.github.io/blender-asset-director/"><img src="../assets/products/asset-director-poster.jpg" alt="Four renders of the same character comparing a hard cut, an NLA crossfade, an aligned crossfade and the Director bridge between two dance clips." loading="lazy" decoding="async"></a>'
              '<figcaption>Four ways to join two motion clips, compared over four seconds. <a href="https://raal1600.github.io/blender-asset-director/">Watch the recording</a>.</figcaption></figure>',
         built=['A Python package and command-line tool with no third-party dependencies, plus an installer.',
                'One agent skill that loads seven roles as needed: director, scout, performance, camera, lighting, editing and continuity.',
                'Motion retargeting with reference-frame conversion, optional foot grounding, and fixes for import timing and clip endpoints.',
                'Full-clip sequencing with a reviewed bridge between clips, and a public technical lab on GitHub Pages.'],
         stack=['Python 3.11', 'Blender', 'Blender MCP', 'Codex skills', 'GitHub Actions', 'GitHub Pages'],
         quality=['523 test functions, including Blender component tests and end-to-end job tests in CI.',
                  'Releases are published only after the complete CI suite passes, and the public installer is checked after each release.'],
         limits=['A technically correct transfer is not proof of natural movement; unsuitable source clips still look wrong.',
                 'Video-to-motion capture and live streaming are not implemented.',
                 'The installer still installs v0.5.0; the development branch is ahead of it.']),

    dict(slug='teaching-overlay', area='creative', name='Blender Teaching Overlay', short='Teaching Overlay',
         idea='A Windows MCP server that lets an AI tutor point at Blender’s interface while the learner makes every click.',
         tags=['C#', '.NET 10', 'MCP', 'Windows'],
         when='Sep 2026', status='Early source release for Windows', source='<a href="https://github.com/raal1600/blender-teaching-overlay-mcp">Public source</a>',
         problem=['Following a Blender tutorial means hunting for small controls. Letting an agent take over the mouse would be quicker, but it takes away the learning and puts the user’s work at risk.',
                  'The idea: the agent can see Blender and point, but it cannot click, type or change the scene. The learner does every step.'],
         flow=[('Find Blender', 'Discover and bind one window'), ('Capture', 'A fresh image of the interface'), ('Decide', 'The agent picks the control'),
               ('Point', 'Click-through pointer, outline and label'), ('Learner clicks', 'Optionally verified through Blender MCP')],
         demo='<p>The server exposes six tools to the agent:</p><ol class="walkthrough">'
              + ''.join(f'<li><strong><code>{t}</code></strong><span>{e(d)}</span></li>' for t, d in [
                  ('status', 'Finds eligible Blender windows and reports readiness, without taking a screenshot.'),
                  ('bind_blender', 'Binds one window by an opaque ID the server issued.'),
                  ('capture_blender', 'Returns a fresh image of that window with coordinate data.'),
                  ('zoom_blender', 'Crops and enlarges part of an existing image for the agent.'),
                  ('show_guidance', 'Draws one pointer, outline and short label over the control.'),
                  ('clear_guidance', 'Removes the guidance and cancels any delayed drawing.')])
              + '</ol><p class="note">There is no public recording yet; screenshots from the test machine are kept private.</p>',
         built=['The MCP server in C# on .NET 10, with strict tool schemas over local stdio.',
                'Window capture through Windows Graphics Capture and Direct3D 11, with correct coordinates at 100 to 200 % display scaling and on monitors with negative positions.',
                'A click-through overlay that never takes focus, so the learner keeps full control.',
                'PowerShell build and test scripts that use a pinned SDK and committed lockfiles.'],
         stack=['C#', '.NET 10', 'Windows Graphics Capture', 'Direct3D 11', 'MCP (stdio)', 'PowerShell', 'GitHub Actions'],
         quality=['Automated tests for coordinates and rounding, window identity, snapshot expiry and race conditions, and the MCP protocol.',
                  '12 test groups passed, including a real guided lesson, on the original test machine.',
                  'Windows CI builds and tests every change.'],
         limits=['Validated on one Windows 11, Blender 5.2.1, 150 % scaling setup so far.',
                 'No installer yet; it is built from source.',
                 'HDR displays, separate Blender dialog windows and ARM64 are not supported.']),

    dict(slug='private-ai-datacenter', area='architecture', name='Private AI Datacenter', short='AI Datacenter',
         idea='A reference design for running AI workflows on premises, in 18 linked views from hardware to tenant offboarding.',
         tags=['Mermaid', 'HTML', 'JavaScript', 'Python'],
         when='Sep 2026', status='Reference design; not deployed', source='<a href="https://github.com/raal1600/private-ai-datacenter">Public source</a>',
         problem=['Organisations want AI to help run their infrastructure, but they cannot send data out or let the AI hold broad credentials.',
                  'The idea: keep customer traffic, estate management and AI inference on separate planes, and let the AI act only through a gateway that scopes every credential and records every request.'],
         flow=[('Boundaries', 'Estate, networks and service ownership'), ('Platform', 'VMware with tenant isolation'),
               ('AI control plane', 'Local models and durable workflow state'), ('Execution gateway', 'Scoped credentials and approvals'),
               ('Operations', 'Patching, backups, incidents and break-glass')],
         demo=shot('datacenter-explorer.jpg', 'Architecture explorer with a list of views on the left and the estate boundaries diagram on the right.',
                   'The explorer: grouped views, design notes, Mermaid source, and SVG export for every diagram.')
              + '<p><a href="https://raal1600.github.io/private-ai-datacenter/">Open the explorer</a></p>',
         built=['18 editable Mermaid diagrams, each with design notes and source references.',
                'A self-contained explorer with search, zoom and pan, fullscreen and exports, and no framework, backend or tracking.',
                'A hardware memory worksheet, an automation acceptance catalogue and an offline ZIP.'],
         stack=['HTML', 'CSS', 'JavaScript', 'Mermaid', 'SVG', 'Python', 'GitHub Actions', 'GitHub Pages'],
         quality=['Structural validation and browser regression tests run in CI before publishing.',
                  'Rendered SVGs ship with a manifest of their Mermaid source hashes.'],
         limits=['A design only. Nothing is deployed, and the hardware figures are worksheet estimates.']),
]

AREA_NAME = {k: n for k, n, _ in AREAS}
# Card and hero images made by thumbs.py; products without one get a typographic tile of their flow.
THUMBS = {p['slug'] for p in PRODUCTS if (ROOT / 'assets/products/thumbs' / f'{p["slug"]}.jpg').exists()}
# Dark is the default. The saved choice is applied before the page paints, so a light page never flashes dark.
THEME_BOOT = ("(function(){var d=document.documentElement;d.classList.add('js');"
              "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}})();")
SUN = ('<svg class="icon-sun" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>'
       '<path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9 13 13M3 13l1.1-1.1M11.9 4.1 13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>')
MOON = ('<svg class="icon-moon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
        '<path d="M13.5 9.6A5.6 5.6 0 0 1 6.4 2.5a5.6 5.6 0 1 0 7.1 7.1Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>')
THEME_TOGGLE = f'<button class="theme-toggle" type="button" data-theme-toggle>{SUN}{MOON}<span data-theme-label>Light mode</span></button>'
SECTIONS = [('problem', 'Problem'), ('how', 'How it works'), ('demo', 'Demo'), ('built', 'What I built'),
            ('stack', 'Stack'), ('quality', 'Evidence'), ('limits', 'Limits')]


def head(title, description, depth, extra=''):
    up = '../' * depth
    return f'''<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>{THEME_BOOT}</script>
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
{FONTS}
<link rel="stylesheet" href="{up}assets/style.css">
<script src="{up}assets/site.js" defer></script>{extra}
</head>
<body>
<a class="skip-link" href="#content">Skip to content</a>
<header class="site-header"><div class="wrap">
<p class="brand-line"><a class="brand" href="{up}index.html">Rami Halabi</a><span class="brand-role">Software developer · Stockholm</span></p>
<nav class="site-nav" aria-label="Main">
<a href="{up}index.html"{' aria-current="page"' if depth == 0 else ''}>Products</a>
<a href="{LINKEDIN}">LinkedIn</a>
<a href="{GITHUB}">GitHub</a>
{THEME_TOGGLE}
</nav>
</div></header>
'''


def foot(depth):
    up = '../' * depth
    return f'''<footer class="site-footer"><div class="wrap">
<p><span class="brand-small">Rami Halabi</span> · Software developer, Stockholm</p>
<nav class="footer-nav" aria-label="Footer"><a href="{up}index.html">All products</a><a href="{LINKEDIN}">LinkedIn</a><a href="{GITHUB}">GitHub</a></nav>
<p class="footer-note">Static site, no tracking.</p>
</div></footer>
</body>
</html>
'''


def tags(items):
    return '<ul class="tags">' + ''.join(f'<li>{e(t)}</li>' for t in items) + '</ul>'


def media(p, up):
    """A product's picture: its thumbnail, or a quiet tile listing the steps of its flow."""
    if p['slug'] in THUMBS:
        return f'<img src="{up}assets/products/thumbs/{p["slug"]}.jpg" alt="" width="960" height="600" loading="lazy" decoding="async">'
    steps = ''.join(f'<li>{e(t)}</li>' for t, _ in p['flow'])
    return f'<ol class="thumb-steps">{steps}</ol>'


def product_page(p, prev, nxt):
    flow = f'<ol class="flow" aria-label="Diagram: how {e(p["name"])} works">' + ''.join(f'<li><strong>{e(t)}</strong><span>{e(d)}</span></li>' for t, d in p['flow']) + '</ol>'
    lis = lambda xs: '<ul>' + ''.join(f'<li>{x}</li>' for x in xs) + '</ul>'
    extra = ('\n<noscript><style>.demo-tabs{display:none}.demo-panel[hidden]{display:grid!important}</style></noscript>'
             if p['slug'] == 'pi-agent-harness' else '')
    has_image = p['slug'] in THUMBS
    figure = (f'<a class="hero-media" href="#demo" tabindex="-1" aria-hidden="true">{media(p, "../")}</a>' if has_image else '')
    page_index = ''.join(f'<li><a href="#{key}">{label}</a></li>' for key, label in SECTIONS)
    body = f'''<main id="content">
<div class="wrap">
<section class="product-hero{' has-media' if has_image else ''}" aria-labelledby="title">
<div class="hero-text">
<p class="eyebrow"><a href="../index.html#{p["area"]}">{e(AREA_NAME[p["area"]])}</a></p>
<h1 id="title">{e(p["name"])}</h1>
<p class="lead">{e(p["idea"])}</p>
<p class="hero-actions"><a class="button" href="#demo">See the demo</a></p>
</div>
{figure}
<dl class="facts">
<div><dt>When</dt><dd class="date">{e(p["when"])}</dd></div>
<div><dt>Status</dt><dd>{e(p["status"])}</dd></div>
<div><dt>Source</dt><dd>{p["source"]}</dd></div>
<div><dt>Stack</dt><dd>{tags(p["tags"])}</dd></div>
</dl>
</section>
</div>
<nav class="page-index" aria-label="On this page"><div class="wrap"><ol>{page_index}</ol></div></nav>
<div class="wrap">
<section class="block" id="problem" aria-labelledby="problem-title"><h2 id="problem-title">Problem and idea</h2><div class="block-body">{''.join(f'<p>{x}</p>' for x in p["problem"])}</div></section>
<section class="block" id="how" aria-labelledby="how-title"><h2 id="how-title">How it works</h2><div class="block-body">{flow}</div></section>
<section class="block" id="demo" aria-labelledby="demo-title"><h2 id="demo-title">Demo</h2><div class="block-body">{p["demo"]}</div></section>
<section class="block" id="built" aria-labelledby="built-title"><h2 id="built-title">What I built</h2><div class="block-body">{lis(p["built"])}</div></section>
<section class="block" id="stack" aria-labelledby="stack-title"><h2 id="stack-title">Stack</h2><div class="block-body">{tags(p["stack"])}</div></section>
<section class="block" id="quality" aria-labelledby="quality-title"><h2 id="quality-title">Quality evidence</h2><div class="block-body"><ul class="checklist">{''.join(f'<li>{x}</li>' for x in p["quality"])}</ul></div></section>
<section class="block" id="limits" aria-labelledby="limits-title"><h2 id="limits-title">Current limits</h2><div class="block-body">{lis(p["limits"])}</div></section>
<nav class="next-links" aria-label="More products">
<a class="next-link" href="{prev["slug"]}.html"><span>Previous</span>{e(prev["name"])}</a>
<a class="next-link next" href="{nxt["slug"]}.html"><span>Next</span>{e(nxt["name"])}</a>
</nav>
</div>
</main>
'''
    return head(f'{p["name"]} · Rami Halabi', p['idea'], 1, extra) + body + foot(1)


def count(n):
    return f'{n} product' + ('' if n == 1 else 's')


def index_page():
    areas, index = [], []
    for i, (key, name, intro) in enumerate(AREAS, 1):
        items = [p for p in PRODUCTS if p['area'] == key]
        cards = ''.join(
            f'<li class="card"><a class="card-media" href="projects/{p["slug"]}.html" tabindex="-1" aria-hidden="true">{media(p, "")}</a>'
            f'<div class="card-text"><p class="date">{e(p["when"])}</p><h3>{e(p["name"])}</h3><p>{e(p["idea"])}</p>{tags(p["tags"])}'
            f'<a class="card-link" href="projects/{p["slug"]}.html" aria-label="View demo: {e(p["name"])}">View demo</a></div></li>'
            for p in items)
        single = ' single' if len(items) == 1 else ''
        areas.append(f'<section class="area" id="{key}" aria-labelledby="area-{key}"><div class="area-head"><p class="area-num">{i:02d}</p>'
                     f'<h2 id="area-{key}">{e(name)}</h2><p class="area-count">{count(len(items))}</p></div>'
                     f'<div class="area-body"><p class="area-intro">{e(intro)}</p><ul class="cards{single}">{cards}</ul></div></section>')
        index.append(f'<li><a href="#{key}"><span class="area-num">{i:02d}</span><span class="area-index-name">{e(name)}</span>'
                     f'<span class="area-count">{len(items)}</span></a></li>')
    body = f'''<main id="content">
<div class="wrap">
<section class="intro" aria-labelledby="title">
<div class="intro-text">
<p class="eyebrow">Product showcase</p>
<h1 id="title">Products I have designed and built</h1>
<p class="lead">I am a software developer in Stockholm. I build products end to end in Python, TypeScript and SQL: data tools, business systems, simulators and AI agent tooling.</p>
<p class="lead">Each page shows the problem, how the product works, a demo, what I built myself, and the evidence behind it, including what is not finished yet.</p>
<p class="intro-links"><a href="{LINKEDIN}">LinkedIn</a><a href="{GITHUB}">GitHub</a></p>
</div>
<nav class="area-index" aria-label="Product areas"><p class="area-index-title">{len(PRODUCTS)} products in {len(AREAS)} areas</p><ol>{''.join(index)}</ol></nav>
</section>
{''.join(areas)}
</div>
</main>
'''
    return head('Rami Halabi · Products', 'Products designed and built by Rami Halabi: data and GIS tools, business systems, simulation, AI agent tooling, 3D tooling and architecture.', 0) + body + foot(0)


(ROOT / 'index.html').write_text(index_page())
order = [p for key, _, _ in AREAS for p in PRODUCTS if p['area'] == key]
for i, p in enumerate(order):
    (ROOT / 'projects' / f'{p["slug"]}.html').write_text(product_page(p, order[i - 1], order[(i + 1) % len(order)]))
print('wrote', 1 + len(order), 'pages')
