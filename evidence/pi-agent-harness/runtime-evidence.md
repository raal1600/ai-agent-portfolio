# Pi extension runtime evidence

**Captured:** 22 July 2026

**Execution:** actual private extension core modules with synthetic inputs

**Result:** PASS
**Focused suites:** 138 tests passed, 0 failed

- [Reviewable public-safe runtime scenario](runtime-scenario.mjs)
- [Actual synthetic core-behavior result](runtime-behavior.json)
- [Genuine Node test-runner output](pi-extension-tests.txt)
- [Private-source snapshot manifest](source-snapshot.sha256)

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
- No Obsidian vault content or mutation
- No private prompt, transcript, session, credential, hostname, or absolute path in the public artifacts
- Temporary evidence runner removed after capture

## Supervised review

Private source is available for supervised review. Temporary read-only access can be arranged for a technical interviewer after agreeing the exact modules, review period, and revocation date.
