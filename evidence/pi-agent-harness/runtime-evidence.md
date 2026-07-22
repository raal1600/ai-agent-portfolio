# Pi extension runtime evidence

**Captured:** 22 July 2026

**Execution:** actual private extension core modules with synthetic inputs

**Result:** PASS
**Focused suites:** 138 tests passed, 0 failed

- [Autonomous multi-agent workflow playback](multi-agent-autonomous-workflow.webm)
- [Completed multi-agent workflow frame](multi-agent-autonomous-workflow-poster.png)
- [Machine-readable multi-agent result](multi-agent-workflow-result.json)
- [Focused verification recording](pi-agent-harness-runtime.webm)
- [Final verification frame](pi-runtime-poster.png)
- [Reviewable public-safe runtime scenario](runtime-scenario.mjs)
- [Actual synthetic core-behavior result](runtime-behavior.json)
- [Genuine Node test-runner output](pi-extension-tests.txt)
- [Private-source snapshot manifest](source-snapshot.sha256)

## Autonomous multi-agent workflow playback

The 18-second WebM is an evidence-bound presentation of an actual Pi subagent run against isolated synthetic ticket `DEMO-MA1`. It replaces the slower raw desktop capture with a purpose-built view that makes agent roles, authority, parallel work, gates, handoffs, and verdicts immediately understandable.

1. A Pi implementation agent receives writer authority limited to `src/slugify.js`.
2. The agent inspects committed tests, changes only the approved file, and passes three tests plus `git diff --check`.
3. The orchestrator closes the writer phase and dispatches two independent Pi reviewer sessions in parallel.
4. The code reviewer inspects the actual baseline diff and unchanged tests, reruns the gates, finds no blockers, and returns `GO`.
5. The QA validator independently verifies tests, scope, staging, and commit state, then returns `PASS`.
6. The orchestrator marks the workflow complete only after both read-only verdicts succeed. No implementation commit is created.

The displayed sequence is a verified playback rather than a raw desktop recording. Its states and results are populated from `multi-agent-workflow-result.json`, which records the actual three-session execution, reviewed diff hash, resulting source hash, gates, and verdicts. The synthetic implementation and final reviews were executed by separate Pi subagent sessions; the two review agents ran concurrently.

## Focused verification recording

The WebM is a Playwright capture of a purpose-built, public-safe verification view. During the recorded session, its local runner spawned the current private `yolo-control` and `pi-yolo-delivery` core modules, then ran nine focused private Node test files. The visible cards and `138 / 138` result were populated only after those processes completed successfully. The view displayed synthetic labels and sanitized test names; it did not expose source code, local paths, credentials, prompts, notes, or sessions.

This is runtime evidence, not an architecture animation. The public capture runner itself remains a temporary local fixture because it requires private module paths; the reviewable scenario below documents the executed behavior without those paths.

## What was executed

A temporary evidence runner imported the actual private `yolo-control` and `pi-yolo-delivery` core modules. It did not copy those modules into this public repository. With synthetic identities, paths, and temporary directories it verified:

1. Enabling Full YOLO delivery normalizes every required capability to enabled.
2. Dispatch is rejected when one required capability is absent.
3. Dispatch is accepted when all required capabilities and an idle state are present.
4. Duplicate dispatch without a new signal is rejected.
5. Paused delivery rejects dispatch until an explicit resume.
6. The non-canonical `implementation/` queue alias is rejected.
7. The canonical `implement/` queue is accepted.
8. Two simultaneous lease contenders produce exactly one owner.
9. The non-owner cannot acquire the same live lease.
10. A completed recovery fingerprint blocks duplicate replay.
11. Changed canonical content can acquire a new recovery lease.

The complete machine-readable result is in `runtime-behavior.json`.

## Focused extension suites

The genuine Node test-runner artifact contains the human-readable output from the private extension tests covering:

- YOLO capability and session control
- Deterministic delivery state and dispatch gates
- Cross-process leases, stale ownership, and recovery
- Wayfinder mapping and bounded parallel delivery
- Obsidian path boundaries and filesystem-first retrieval
- Digest-bound folder migration
- Deterministic inventory publication and atomic writes
- Lifecycle debounce and shutdown flush behavior

```text
tests     138
pass      138
fail      0
cancelled 0
skipped   0
duration  849.149333 ms
```

## Source and evidence integrity

The source remains private. `source-snapshot.sha256` records hashes for 27 logical source/test artifacts without exposing absolute local paths. Its own SHA-256 is:

```text
6d2dcb6916457cc0ad8aeea9ee611c07e818ecc5ce2255da1fd760396666ad5a
```

Evidence hashes:

```text
2ca28a28ce886bc999768e821653b8b3f1b457e8ac741f670c43d28a67a2704b  runtime-scenario.mjs
e8dbaccf805e340dc6c42106c6d34980287404c40e6883e68b4b9317e03d7c84  runtime-behavior.json
e5601037f4fc5b31819ee5b9537f81990d2e56c21c5d8395f996ac11cb71396e  pi-extension-tests.txt
736ceb0bee5ededa3e5142b37ae37040cd2b7c8750a5600ba797d4c9c1c05c7e  pi-agent-harness-runtime.webm
f1a9ecc0959f6c29781c6435eb76503789808f0743e016a584af28a6b361ca62  pi-runtime-poster.png
22ca2b58c7c70efca6e235e1e03db0cb69500bce22030cddb23048c1736d26df  multi-agent-autonomous-workflow.webm
8618197c38d0efedc3cadf537d1c73b404b33f71b797b31bf1730ba2bf1f08e2  multi-agent-autonomous-workflow-poster.png
0129d7bbbd664d11dc97d78673686608697588e9be1d177b5ae8bd69cb86676a  multi-agent-workflow-result.json
```

Reviewed inventory at capture time:

| Measure | Result |
|---|---:|
| Non-test TypeScript/JavaScript source | 8,566 lines |
| Test source | 3,122 lines |
| Combined extension suite | 11,688 lines |
| Focused tests | 138 passing |

## Privacy boundary

- Synthetic authority, ticket, queue, owner, and content identities
- Temporary lease directories removed after execution
- The focused verification runner accessed and mutated no Obsidian content.
- The multi-agent playback shows only synthetic DEMO-MA1 identities, public-safe activities, gates, and verdicts; it contains no desktop or vault view.
- No private prompt, transcript, session, credential, hostname, or absolute path in the public artifacts
- Temporary evidence runner removed after capture

## Supervised review

Private source is available for supervised review. Temporary read-only access can be arranged for a technical interviewer after agreeing the exact modules, review period, and revocation date.
