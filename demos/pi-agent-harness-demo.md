# Guided demo — Pi agent harness

The published WebM is a captioned architecture walkthrough generated from the sanitized public case study. It is not a recording of private prompts, notes, sessions, or infrastructure.

## Suggested supervised live demonstration (8–10 minutes)

1. **Control plane:** show session-scoped capability selection and visible pause/resume state.
2. **Bounded workflow:** authorize one synthetic implementation/review phase and explain the state transition.
3. **Coordination:** show how a lease prevents two Pi processes from owning the same work.
4. **Knowledge boundary:** run a bounded Obsidian retrieval against synthetic notes and preview a safe mutation.
5. **Failure case:** demonstrate a stale lease, ambiguous authority, or path violation failing closed.
6. **Evidence:** run focused tests and map them to the demonstrated controls.
7. **Handover:** show the operator-facing documentation and rollback boundary.

## Privacy checklist

- Use a synthetic vault and test repository.
- Hide terminal usernames, absolute paths, hostnames, and session identifiers.
- Disable notifications and unrelated panes.
- Never show credentials, private prompts, personal notes, or production configuration.
