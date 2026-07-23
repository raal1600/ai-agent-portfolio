# Soher agent system runtime evidence

**Executable evidence captured:** 22 July 2026

**Control-pane interface rechecked and recorded:** 23 July 2026

**Execution snapshot:** actual private extension core modules with synthetic inputs

**Result:** PASS
**Focused suites:** 138 tests passed, 0 failed

- [Current Soher control-pane walkthrough](pi-agent-harness-runtime.webm)
- [Current control-pane frame](pi-runtime-poster.png)
- [Reproducible public-safe control-pane source](soher-control-pane-walkthrough.html)
- [Contract-accurate Full YOLO workflow playback](full-yolo-workflow.webm)
- [Completed Full YOLO workflow frame](full-yolo-workflow-poster.png)
- [Machine-readable workflow and contract evidence](full-yolo-workflow-result.json)
- [Soher terminal workflow playback](soher-terminal-workflow.webm)
- [Soher terminal workflow frame](soher-terminal-workflow-poster.png)
- [Reviewable public-safe runtime scenario](runtime-scenario.mjs)
- [Actual synthetic core-behavior result](runtime-behavior.json)
- [Genuine Node test-runner output](pi-extension-tests.txt)
- [Private-source snapshot manifest](source-snapshot.sha256)

## Current Soher control-pane walkthrough

The 31-second WebM is a Chromium recording of a public-safe recreation of the current Soher `/yolo` interface inside Pi. It was rechecked against Pi 0.80.7, the configured light theme, current global resource configuration, the `yolo-control` TUI implementation, the delivery dispatcher, the user-scoped `yolo-implementer` and `yolo-reviewer` definitions, and the active handoff, implementation, and review workflow contracts.

The recording mirrors the real operator sequence and visible controls:

1. The session begins with every automation capability off; durable permission-system YOLO mode also remains off between sessions.
2. `/yolo on` opens the real five-row capability selector. Selecting Full YOLO normalizes Permission auto-approval, Obsidian auto-write, Wayfinder optimization, Session auto-continuity, and Full YOLO delivery to enabled.
3. Delivery starts paused and presents the actual authorized-work chooser. When no handoff is resumable, the UI offers new-batch discovery or cancellation.
4. New-batch discovery has a second explicit confirmation. Discovery prepares one candidate only; it is not batch authorization, and existing resumable work remains paused.
5. The final synthetic running state shows the real persistent status widget and `/yolo status` dashboard vocabulary: current action, active session owner, delivery health counters, runtime checkpoint, pause, bounded scan, disable-all, and close.
6. The role boundary matches the configured workflow: the parent Pi session coordinates single-target phases and owns every Obsidian mutation; restricted user-scoped workers are available for approved parallel groups; commits, pushes, publication, deployment, destructive actions, and next-batch progression remain outside authority.

This is deliberately labeled a **sanitized recreation**, not a raw terminal capture and not executable proof. Synthetic IDs replace private session and handoff values, while the layout, wording, state transitions, and light-theme palette come from the reviewed implementation and configuration. The retained HTML source makes the media reproducible. Executable core behavior is evidenced separately by `runtime-behavior.json`, `runtime-scenario.mjs`, the genuine 138-test runner output, and the source-snapshot manifest.

## Contract-accurate Full YOLO workflow playback

The 37-second WebM mirrors Soher's current reviewed Full YOLO delivery contract instead of presenting a simplified generic agent sequence. It combines the current hash-pinned prepare, dispatcher, implementation, review, coordination, and safety contracts with bounded evidence from the completed canonical Obsidian V1-S4 execution-batch handoff.

The visible lifecycle is:

1. Derive the smallest graph-ready batch, verify registry-compatible implementer and reviewer assignments, disclose scope and stop conditions, and obtain explicit user batch authorization.
2. Verify all five session capabilities and the complete canonical batch authority while keeping commit and next-batch authority disabled.
3. Map and freshness-check the exact Wayfinder capsule, acquire an atomic cross-process batch lease, and persist the active runtime checkpoint.
4. Process one exact ticket: verify dependency frontier, fixed point, rollback, and safe workspace; reproduce behavior red first; make the minimum bounded correction; run focused/full/safety checks; and record durable evidence without committing.
5. Finalize the same handoff, advance its Wayfinder generation once, move it from `implement` to `review`, repair exact links sequentially, and pass the post-route consistency gate.
6. Run fresh read-only Standards and Specification axes separately. Soher Coordinator reruns required checks and verifies implementation remained unchanged.
7. On changes-required, increment only the current ticket's normal remediation cycle and route the same note back. The fourth changes-required result stops at `automation-blocked`.
8. If separately authorized, a later diagnosis-only lease proves one recoverable defect and consumes one ticket-owned post-block attempt; later implementation and later review remain separate phases.
9. Complete only after both review axes pass. Preserve ticket history, verify the batch exit gate, move only the same handoff to its pinned initiative-scoped Completed destination, repair links, and run the post-archive gate. The next batch remains unauthorized.

The completed V1-S4 evidence exercises the difficult branch rather than only the happy path: normal remediation cycle 3, a fourth changes-required disposition, `automation-blocked`, blocked-remediation diagnosis and route, attempt 2/2 implementation with red-first reproduction, later fresh Standards and Spec passes, coordinator verification, ticket completion, and batch archival. `full-yolo-workflow-result.json` records the current contract stages, observed completed path, hard stops, and SHA-256 hashes of the reviewed local contracts. The playback is a sanitized presentation of canonical workflow evidence, not a raw prompt, transcript, terminal, or vault recording.

## Soher terminal workflow playback

The terminal recording presents the exact same evidence and state transitions through Soher's named operating forms:

- **Soher Coordinator** owns canonical authority checks, Wayfinder mapping, leases, runtime checkpoints, Obsidian routing, link repair, and post-route/post-archive gates.
- **Soher Implementer** receives one exact ticket and pinned file scope. It cannot mutate Obsidian, route handoffs, commit, deploy, or start another batch.
- **Soher Standards Reviewer** and **Soher Spec Reviewer** run as fresh read-only forms with separate review axes.

The coordinator stream and three role-specific panes expose the full engineering loop: review returns changes-required, normal remediation stops at its bound, separately authorized diagnosis proves the root cause, a later implementation reproduces the blocker red before correcting it, and later fresh review passes both axes. The final state preserves the same handoff, resolved attempt 2/2, completed archive gate, and unauthorized next batch. Soher is the custom agent system; Pi is identified only as its underlying framework.

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
91037c9ed7d8f1980eb29694eb5385a6e3eae70e06693208a9ae803f29707a33  pi-agent-harness-runtime.webm
3d6dc8b997d518e8509467e9088ba1b54c06065d637ec7d826f1d33d8dadc129  pi-runtime-poster.png
c18c4fdf762266ec3844689ddb6e069a1e695cfece3b4039b28d2d601773af57  soher-control-pane-walkthrough.html
c6e23d4d3e0ced6042e407aa84b5390a43e6082b6467a441f691387d80c5b12b  full-yolo-workflow.webm
40563b5a2b628796fec431b3fb4115a83e5b8fe3b117080ca9ebb8d108f8ab7b  full-yolo-workflow-poster.png
e061ec06ec3df0e6f847416211d83647d37763a5e3aec303af0ea83f2911d6e8  full-yolo-workflow-result.json
049a7f2a878a4c0cadaaa45dcd7e96633512668e24b0725bdb8ca85a4c4b2ec3  soher-terminal-workflow.webm
978f80ff70125fccde451e54c96b31a1c556d99ef910ccbc2861028184cf4e61  soher-terminal-workflow-poster.png
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
- The temporary core-behavior runner accessed and mutated no Obsidian content.
- The control-pane walkthrough uses synthetic identifiers and contains no raw terminal, private note, prompt, transcript, session reference, or local path.
- The Full YOLO playback shows only public-safe V1-S4 identifiers, canonical machine states, bounded activities, checks, and dispositions; it contains no desktop or raw vault view.
- No private prompt, transcript, session, credential, hostname, or absolute path in the public artifacts
- Temporary core-behavior runner removed after the executable evidence capture

## Supervised review

Private source is available for supervised review. Temporary read-only access can be arranged for a technical interviewer after agreeing the exact modules, review period, and revocation date.
