# Pi extension runtime evidence

**Captured:** 22 July 2026

**Execution:** actual private extension core modules with synthetic inputs

**Result:** PASS
**Focused suites:** 138 tests passed, 0 failed

- [Contract-accurate Full YOLO workflow playback](full-yolo-workflow.webm)
- [Completed Full YOLO workflow frame](full-yolo-workflow-poster.png)
- [Machine-readable workflow and contract evidence](full-yolo-workflow-result.json)
- [Focused verification recording](pi-agent-harness-runtime.webm)
- [Final verification frame](pi-runtime-poster.png)
- [Reviewable public-safe runtime scenario](runtime-scenario.mjs)
- [Actual synthetic core-behavior result](runtime-behavior.json)
- [Genuine Node test-runner output](pi-extension-tests.txt)
- [Private-source snapshot manifest](source-snapshot.sha256)

## Contract-accurate Full YOLO workflow playback

The 29-second WebM mirrors the current reviewed Full YOLO delivery contract instead of presenting a simplified generic agent sequence. It combines the current hash-pinned prepare, dispatcher, implementation, review, coordination, and safety contracts with bounded evidence from the completed canonical Obsidian V1-S4 execution-batch handoff.

The visible lifecycle is:

1. Derive the smallest graph-ready batch, verify registry-compatible implementer and reviewer assignments, disclose scope and stop conditions, and obtain explicit user batch authorization.
2. Verify all five session capabilities and the complete canonical batch authority while keeping commit and next-batch authority disabled.
3. Map and freshness-check the exact Wayfinder capsule, acquire an atomic cross-process batch lease, and persist the active runtime checkpoint.
4. Process one exact ticket: verify dependency frontier, fixed point, rollback, and safe workspace; reproduce behavior red first; make the minimum bounded correction; run focused/full/safety checks; and record durable evidence without committing.
5. Finalize the same handoff, advance its Wayfinder generation once, move it from `implement` to `review`, repair exact links sequentially, and pass the post-route consistency gate.
6. Run fresh read-only Standards and Specification axes separately. The parent reruns required checks and verifies implementation remained unchanged.
7. On changes-required, increment only the current ticket's normal remediation cycle and route the same note back. The fourth changes-required result stops at `automation-blocked`.
8. If separately authorized, a later diagnosis-only lease proves one recoverable defect and consumes one ticket-owned post-block attempt; later implementation and later review remain separate phases.
9. Complete only after both review axes pass. Preserve ticket history, verify the batch exit gate, move only the same handoff to its pinned initiative-scoped Completed destination, repair links, and run the post-archive gate. The next batch remains unauthorized.

The completed V1-S4 evidence exercises the difficult branch rather than only the happy path: normal remediation cycle 3, a fourth changes-required disposition, `automation-blocked`, blocked-remediation diagnosis and route, attempt 2/2 implementation with red-first reproduction, later fresh Standards and Spec passes, parent verification, ticket completion, and batch archival. `full-yolo-workflow-result.json` records the current contract stages, observed completed path, hard stops, and SHA-256 hashes of the reviewed local contracts. The playback is a sanitized presentation of canonical workflow evidence, not a raw prompt, transcript, terminal, or vault recording.

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
71936e63ec580f49b37a41f642626df2194b701cdd7e996cf6554183ce66b3a5  full-yolo-workflow.webm
3efa23c67786cb35492909c6aa31d7a320e9b630cd8b9527ecc896c01a8d1320  full-yolo-workflow-poster.png
19b8a520fe5ff55a2599d9baa620b8b89d4de6c20feb446359f4c5539a43b280  full-yolo-workflow-result.json
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
- The Full YOLO playback shows only public-safe V1-S4 identifiers, canonical machine states, bounded activities, checks, and dispositions; it contains no desktop or raw vault view.
- No private prompt, transcript, session, credential, hostname, or absolute path in the public artifacts
- Temporary evidence runner removed after capture

## Supervised review

Private source is available for supervised review. Temporary read-only access can be arranged for a technical interviewer after agreeing the exact modules, review period, and revocation date.
