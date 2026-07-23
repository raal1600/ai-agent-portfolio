import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";

const controlModule = process.env.YOLO_CONTROL_CORE_URL;
const deliveryModule = process.env.PI_YOLO_CORE_URL;
if (!controlModule || !deliveryModule) {
  throw new Error("YOLO_CONTROL_CORE_URL and PI_YOLO_CORE_URL are required");
}

const startedAt = new Date();
const started = performance.now();
const control = await import(controlModule);
const delivery = await import(deliveryModule);
const results = {};

const sha256 = async (url) => createHash("sha256").update(await readFile(new URL(url))).digest("hex");
const moduleHashes = {
  "yolo-control/core.mjs": await sha256(controlModule),
  "pi-yolo-delivery/core.mjs": await sha256(deliveryModule),
};

// Full delivery must select every non-destructive prerequisite while leaving
// the separately confirmed destructive capability disabled.
results.capabilities = control.normalizeCapabilities({ delivery: true });
results.fullDeliveryPrerequisitesSelected = [
  "permissions",
  "obsidianAutoWrite",
  "wayfinder",
  "continuity",
  "delivery",
].every((key) => results.capabilities[key] === true);
results.autoDestroyNotSelected = results.capabilities.obsidianAutoDestroy === false;

// Dispatch requires all capabilities, an idle parent, a fresh signal, and an
// unpaused gate.
const gate = delivery.createDispatchGate();
const ready = {
  yoloEnabled: true,
  obsidianAutoWrite: true,
  wayfinderEnabled: true,
  continuityEnabled: true,
  deliveryEnabled: true,
  idle: true,
};
gate.signal();
results.missingCapabilityBlocked = gate.begin({ ...ready, continuityEnabled: false }) === false;
results.freshDispatchAccepted = gate.begin(ready) === true;
results.duplicateDispatchBlocked = gate.begin(ready) === false;
gate.settled();
gate.signal();
gate.pause();
results.pausedDispatchBlocked = gate.begin(ready) === false;
gate.resume();
results.explicitResumeAccepted = gate.begin(ready) === true;
gate.settled();

// Queue aliases fail closed; exact canonical queue paths remain valid.
const alias = "00-Shared/Handoffs/To-Pi/implementation/Synthetic.md";
results.nonCanonicalQueueRejected = delivery.nonCanonicalHandoffMutationPath(
  "obsidian_manage",
  { operation: "move_note", toPath: alias },
) === alias;
results.canonicalQueueAccepted = delivery.nonCanonicalHandoffMutationPath(
  "obsidian_manage",
  { operation: "move_note", toPath: "00-Shared/Handoffs/To-Pi/implement/Synthetic.md" },
) === undefined;

// Two Wayfinder targets are always mapped in order with maximum mapping
// concurrency one, even when later worker execution may overlap.
let activeMappings = 0;
let maximumMappingConcurrency = 0;
const mappingOrder = [];
results.mappedTargets = await delivery.mapCandidatesSequentially(["A", "B"], async (target) => {
  activeMappings += 1;
  maximumMappingConcurrency = Math.max(maximumMappingConcurrency, activeMappings);
  mappingOrder.push(`start-${target}`);
  await new Promise((resolve) => setTimeout(resolve, target === "A" ? 8 : 1));
  mappingOrder.push(`end-${target}`);
  activeMappings -= 1;
  return target.toLowerCase();
});
results.mappingOrder = mappingOrder;
results.maximumMappingConcurrency = maximumMappingConcurrency;

// Explicit matching group authority selects no more than two targets and
// excludes mismatched or remediation candidates.
const dependencyFingerprint = "a".repeat(64);
const primary = {
  leaseKey: "synthetic-initiative\0batch-a",
  batchId: "batch-a",
  phase: "implement",
  parallelDelivery: true,
  parallelGroup: "synthetic-group",
  parallelMode: "isolated-worktree",
  parallelMaxConcurrency: 2,
  parallelDependencyFingerprint: dependencyFingerprint,
};
const matching = { ...primary, leaseKey: "synthetic-initiative\0batch-b", batchId: "batch-b", phase: "review" };
const third = { ...matching, leaseKey: "synthetic-initiative\0batch-c", batchId: "batch-c" };
const wrongProof = { ...matching, leaseKey: "synthetic-initiative\0batch-d", batchId: "batch-d", parallelDependencyFingerprint: "b".repeat(64) };
const remediation = { ...matching, leaseKey: "synthetic-initiative\0batch-e", batchId: "batch-e", phase: "remediate" };
const selectedGroup = delivery.selectParallelDispatchGroup(
  [primary, matching, third, wrongProof, remediation],
  primary,
);
results.parallelGroupSize = selectedGroup.length;
results.parallelGroupBatches = selectedGroup.map((candidate) => candidate.batchId);
results.mismatchedTargetsExcluded = selectedGroup.every((candidate) => ["batch-a", "batch-b"].includes(candidate.batchId));

// Remediation grants remain explicit, bounded, cumulative, and capped by the
// actual core calculator.
results.renewalLimitAfterTwoAttempts = delivery.remediationRenewalLimit({
  limit: 3,
  renewalGrantTotal: 0,
  maxAdditionalAttempts: 3,
}, 2);
results.oversizedRenewalRejected = delivery.remediationRenewalLimit({
  limit: 3,
  renewalGrantTotal: 0,
  maxAdditionalAttempts: 3,
}, 4) === undefined;
results.cumulativeCeilingEnforced = delivery.remediationRenewalLimit({
  limit: 11,
  renewalGrantTotal: 8,
  maxAdditionalAttempts: 1,
}, 2) === undefined;

// Actual filesystem-backed lease contention, replay prevention, and stale
// owner fencing run only inside temporary synthetic fixture directories.
const contentionRoot = await mkdtemp(join(tmpdir(), "soher-public-contention-"));
const contentionIdentity = {
  initiativeId: "synthetic-initiative",
  batchId: "synthetic-batch",
  currentTicket: "synthetic-ticket",
  phase: "reconcile",
  leaseKey: "synthetic-initiative\0synthetic-batch",
  handoffPath: "synthetic/queue/handoff.md",
  contentFingerprint: "synthetic-content-v1",
};
try {
  const first = delivery.createLocalLeaseCoordinator({ root: contentionRoot, ownerId: "synthetic-owner-a" });
  const second = delivery.createLocalLeaseCoordinator({ root: contentionRoot, ownerId: "synthetic-owner-b" });
  const contenders = await Promise.all([first.acquire(contentionIdentity), second.acquire(contentionIdentity)]);
  results.simultaneousLeaseOwners = contenders.filter(Boolean).length;
  const winnerIndex = contenders.findIndex(Boolean);
  const winner = winnerIndex === 0 ? first : second;
  const loser = winnerIndex === 0 ? second : first;
  const winningLease = contenders[winnerIndex];
  results.winnerOwnsLease = await winner.owns(winningLease);
  results.loserBlockedWhileOwned = (await loser.acquire(contentionIdentity)) === undefined;
  results.reconciliationCompletionRecorded = await winner.complete(winningLease);
  results.winnerReleasedLease = await winner.release(winningLease);
  results.completedFingerprintBlocksReplay = (await loser.acquire(contentionIdentity)) === undefined;
  const changed = { ...contentionIdentity, phase: "remediate", contentFingerprint: "synthetic-content-v2" };
  const changedLease = await loser.acquire(changed);
  results.changedCanonicalStateCanAcquire = Boolean(changedLease);
  if (changedLease) await loser.release(changedLease);
} finally {
  await rm(contentionRoot, { recursive: true, force: true });
}

const takeoverRoot = await mkdtemp(join(tmpdir(), "soher-public-takeover-"));
let clock = 1_000;
const takeoverIdentity = {
  ...contentionIdentity,
  phase: "implement",
  contentFingerprint: "synthetic-takeover-v1",
};
try {
  const oldOwner = delivery.createLocalLeaseCoordinator({
    root: takeoverRoot,
    ttlMs: 1_000,
    now: () => clock,
    ownerId: "synthetic-old-owner",
  });
  const newOwner = delivery.createLocalLeaseCoordinator({
    root: takeoverRoot,
    ttlMs: 1_000,
    now: () => clock,
    ownerId: "synthetic-new-owner",
  });
  const oldLease = await oldOwner.acquire(takeoverIdentity);
  results.oldOwnerInitiallyOwned = Boolean(oldLease) && await oldOwner.owns(oldLease);
  results.takeoverBlockedBeforeTtl = (await newOwner.acquire(takeoverIdentity)) === undefined;
  clock += 1_001;
  const newLease = await newOwner.acquire(takeoverIdentity);
  results.staleTakeoverSucceeded = Boolean(newLease);
  results.oldOwnerFencedAfterTakeover = Boolean(oldLease)
    && await oldOwner.owns(oldLease) === false
    && await oldOwner.heartbeat(oldLease) === false
    && await oldOwner.release(oldLease) === false;
  results.newOwnerOwnsAfterTakeover = Boolean(newLease) && await newOwner.owns(newLease);
  if (newLease) await newOwner.release(newLease);
} finally {
  await rm(takeoverRoot, { recursive: true, force: true });
}

const expected = {
  fullDeliveryPrerequisitesSelected: true,
  autoDestroyNotSelected: true,
  missingCapabilityBlocked: true,
  freshDispatchAccepted: true,
  duplicateDispatchBlocked: true,
  pausedDispatchBlocked: true,
  explicitResumeAccepted: true,
  nonCanonicalQueueRejected: true,
  canonicalQueueAccepted: true,
  mappedTargets: ["a", "b"],
  mappingOrder: ["start-A", "end-A", "start-B", "end-B"],
  maximumMappingConcurrency: 1,
  parallelGroupSize: 2,
  parallelGroupBatches: ["batch-a", "batch-b"],
  mismatchedTargetsExcluded: true,
  renewalLimitAfterTwoAttempts: 5,
  oversizedRenewalRejected: true,
  cumulativeCeilingEnforced: true,
  simultaneousLeaseOwners: 1,
  winnerOwnsLease: true,
  loserBlockedWhileOwned: true,
  reconciliationCompletionRecorded: true,
  winnerReleasedLease: true,
  completedFingerprintBlocksReplay: true,
  changedCanonicalStateCanAcquire: true,
  oldOwnerInitiallyOwned: true,
  takeoverBlockedBeforeTtl: true,
  staleTakeoverSucceeded: true,
  oldOwnerFencedAfterTakeover: true,
  newOwnerOwnsAfterTakeover: true,
};

for (const [key, value] of Object.entries(expected)) {
  if (JSON.stringify(results[key]) !== JSON.stringify(value)) {
    throw new Error(`${key}: expected ${JSON.stringify(value)}, received ${JSON.stringify(results[key])}`);
  }
}

console.log(JSON.stringify({
  schemaVersion: 1,
  capturedAt: startedAt.toISOString(),
  result: "pass",
  evidenceKind: "actual-private-core-execution",
  fixture: "synthetic-temporary-filesystem",
  runtime: {
    node: process.version,
    platform: process.platform,
    durationMs: Number((performance.now() - started).toFixed(3)),
    modules: Object.entries(moduleHashes).map(([logicalName, hash]) => ({ logicalName, sha256: hash })),
  },
  summary: {
    assertions: Object.keys(expected).length,
    modulesExecuted: Object.keys(moduleHashes).length,
    maximumMappingConcurrency: results.maximumMappingConcurrency,
    maximumParallelTargets: results.parallelGroupSize,
    simultaneousLeaseOwners: results.simultaneousLeaseOwners,
    staleOwnerFenced: results.oldOwnerFencedAfterTakeover,
    replayBlocked: results.completedFingerprintBlocksReplay,
    destructiveCapabilitySelected: !results.autoDestroyNotSelected,
  },
  results,
}, null, 2));
