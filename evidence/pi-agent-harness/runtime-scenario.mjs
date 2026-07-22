import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const controlModule = process.env.YOLO_CONTROL_CORE_URL;
const deliveryModule = process.env.PI_YOLO_CORE_URL;
if (!controlModule || !deliveryModule) {
  throw new Error("YOLO_CONTROL_CORE_URL and PI_YOLO_CORE_URL are required");
}

const control = await import(controlModule);
const delivery = await import(deliveryModule);
const results = {};

results.capabilityNormalization = control.normalizeCapabilities({ delivery: true });
results.capabilityGatePass = Object.values(results.capabilityNormalization).every(Boolean);

const gate = delivery.createDispatchGate();
gate.signal();
const ready = {
  yoloEnabled: true,
  obsidianAutoWrite: true,
  wayfinderEnabled: true,
  continuityEnabled: true,
  deliveryEnabled: true,
  idle: true,
};
results.dispatchWithoutAllCapabilities = gate.begin({ ...ready, continuityEnabled: false });
results.dispatchWithAllCapabilities = gate.begin(ready);
results.duplicateDispatchWithoutNewSignal = gate.begin(ready);
gate.settled();
gate.signal();
gate.pause();
results.dispatchWhilePaused = gate.begin(ready);
gate.resume();
results.dispatchAfterExplicitResume = gate.begin(ready);
gate.settled();

const unsafePath = "00-Shared/Handoffs/To-Pi/implementation/Synthetic.md";
results.nonCanonicalQueueRejected = delivery.nonCanonicalHandoffMutationPath(
  "obsidian_manage",
  { operation: "move_note", toPath: unsafePath },
) === unsafePath;
results.canonicalQueueAccepted = delivery.nonCanonicalHandoffMutationPath(
  "obsidian_manage",
  { operation: "move_note", toPath: "00-Shared/Handoffs/To-Pi/implement/Synthetic.md" },
) === undefined;

const root = await mkdtemp(join(tmpdir(), "pi-public-runtime-evidence-"));
const identity = {
  initiativeId: "synthetic-initiative",
  batchId: "synthetic-batch",
  currentTicket: "synthetic-ticket",
  phase: "reconcile",
  leaseKey: "synthetic-initiative\0synthetic-batch",
  handoffPath: "synthetic/queue/handoff.md",
  contentFingerprint: "synthetic-content-v1",
};
try {
  const first = delivery.createLocalLeaseCoordinator({ root, ownerId: "synthetic-owner-a" });
  const second = delivery.createLocalLeaseCoordinator({ root, ownerId: "synthetic-owner-b" });
  const contenders = await Promise.all([first.acquire(identity), second.acquire(identity)]);
  results.simultaneousLeaseOwners = contenders.filter(Boolean).length;
  const winnerIndex = contenders.findIndex(Boolean);
  const winner = winnerIndex === 0 ? first : second;
  const loser = winnerIndex === 0 ? second : first;
  const winningLease = contenders[winnerIndex];
  results.winnerOwnsLease = await winner.owns(winningLease);
  results.loserCannotAcquireWhileOwned = (await loser.acquire(identity)) === undefined;
  results.winnerCompletes = await winner.complete(winningLease);
  results.winnerReleases = await winner.release(winningLease);
  results.completedFingerprintBlocksReplay = (await loser.acquire(identity)) === undefined;
  const changed = { ...identity, phase: "remediate", contentFingerprint: "synthetic-content-v2" };
  const changedLease = await loser.acquire(changed);
  results.changedCanonicalStateCanAcquire = Boolean(changedLease);
  if (changedLease) await loser.release(changedLease);
} finally {
  await rm(root, { recursive: true, force: true });
}

const expected = {
  capabilityGatePass: true,
  dispatchWithoutAllCapabilities: false,
  dispatchWithAllCapabilities: true,
  duplicateDispatchWithoutNewSignal: false,
  dispatchWhilePaused: false,
  dispatchAfterExplicitResume: true,
  nonCanonicalQueueRejected: true,
  canonicalQueueAccepted: true,
  simultaneousLeaseOwners: 1,
  winnerOwnsLease: true,
  loserCannotAcquireWhileOwned: true,
  winnerCompletes: true,
  winnerReleases: true,
  completedFingerprintBlocksReplay: true,
  changedCanonicalStateCanAcquire: true,
};
for (const [key, value] of Object.entries(expected)) {
  if (results[key] !== value) throw new Error(`${key}: expected ${value}, received ${results[key]}`);
}

console.log(JSON.stringify({
  capturedAt: "2026-07-22",
  result: "pass",
  source: "actual private extension core modules",
  fixture: "synthetic",
  results,
}, null, 2));
