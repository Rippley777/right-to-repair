import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const source = await readFile(
  new URL("../src/features/explorer/repairPlanner.ts", import.meta.url),
  "utf8"
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const {
  createRepairPlan,
  readRepairPlans,
  costInCents,
  planTotals,
  repairConsideration,
  exportRepairPlan,
  safeGuideUrl,
} = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const device = {
  id: "configuration-26",
  identifier: "A1990",
  model: "MR942LL/A",
  name: "MacBook Pro 2018",
  chip: "Intel i7-8850H",
  year: 2018,
  guide: "https://www.ifixit.com/Search?query=A1990",
  ram: false,
  storage: false,
  battery: "Difficult",
  repairDifficulty: "High",
  partAvailability: "Limited",
  repairCosts: { battery: "$199" },
};
test("plans preserve the exact configuration and separate device identity from the plan", () => {
  const a = createRepairPlan(device, "battery", "self"),
    b = createRepairPlan(
      { ...device, id: "configuration-22", model: "MR932LL/A" },
      "battery",
      "self"
    );
  assert.notEqual(a.id, b.id);
  assert.notEqual(a.device.id, b.device.id);
  assert.equal(a.device.model, "MR942LL/A");
  assert.equal(a.tasks.length, 6);
  assert.equal(a.items.length, 0);
  assert.equal(a.budget, "");
  assert.equal(
    a.tasks.every((task) => !task.done),
    true
  );
  device.name = "Changed catalog description";
  assert.equal(a.device.name, "MacBook Pro 2018");
  device.name = "MacBook Pro 2018";
});
test("service and self repair use different preparation tasks", () => {
  const self = createRepairPlan(device, "screen", "self"),
    service = createRepairPlan(device, "screen", "service");
  assert.ok(self.tasks.some((t) => t.text.includes("guide")));
  assert.ok(service.tasks.some((t) => t.text.includes("quote")));
  assert.ok(service.tasks.some((t) => t.text.includes("turnaround")));
  assert.equal(
    service.tasks.some((t) => t.text.includes("reassembly")),
    false
  );
});
test("soldered and unknown upgrades remain explicit without being represented as routine component replacements", () => {
  assert.match(repairConsideration(device, "memory"), /soldered/);
  assert.match(repairConsideration(device, "storage"), /soldered/);
  assert.match(
    repairConsideration({ ...device, ram: null }, "memory"),
    /isn’t documented/
  );
  assert.match(
    repairConsideration({ ...device, storage: true }, "storage"),
    /replaceable storage/
  );
});
test("cost totals use cents, include free items, and exclude unpriced or invalid amounts", () => {
  const items = ["0.10", "0.20", "0", "", "-5", "3.456"].map((cost, i) => ({
    id: String(i),
    name: "Item",
    kind: "part",
    cost,
    ready: false,
  }));
  assert.deepEqual(planTotals({ items, budget: "0.25" }), {
    total: 30,
    missing: 3,
    budget: 25,
    overBudget: true,
  });
  for (const value of ["", "-1", "1e3", "NaN", "Infinity", "$50", "10.001"])
    assert.equal(costInCents(value), null);
  assert.equal(costInCents("19.99"), 1999);
  assert.equal(costInCents(" 0 "), 0);
  assert.equal(planTotals({ items: [], budget: "" }).budget, null);
});
test("completed checklists, costs, guide and notes survive storage round trips", () => {
  const plan = createRepairPlan(device, "keyboard", "service");
  plan.tasks[0].done = true;
  plan.notes = "Part compatibility confirmed";
  plan.guideUrl = "https://support.apple.com/self-service-repair";
  plan.status = "in-progress";
  plan.items = [
    { id: "part", name: "Quote", kind: "labor", cost: "99.95", ready: true },
  ];
  assert.deepEqual(readRepairPlans(JSON.stringify([plan])), [plan]);
});
test("corrupted storage cannot break the planner and invalid records do not hide valid plans", () => {
  const valid = createRepairPlan(device, "battery", "self");
  for (const raw of [
    null,
    "{bad",
    "{}",
    "null",
    JSON.stringify([{ ...valid, device: null }]),
    JSON.stringify([
      { ...valid, tasks: [{ id: "x", text: { bad: true }, done: false }] },
    ]),
    JSON.stringify([{ ...valid, goal: "invented" }]),
  ])
    assert.deepEqual(readRepairPlans(raw), []);
  assert.deepEqual(
    readRepairPlans(
      JSON.stringify([
        valid,
        {
          ...valid,
          device: { ...valid.device, repairCosts: { battery: { bad: true } } },
        },
      ])
    ),
    [valid]
  );
});
test("exports progress, pricing uncertainty, currency and notes without converting catalog estimates into quotes", () => {
  const plan = createRepairPlan(device, "battery", "self");
  plan.currency = "EUR";
  plan.tasks[0].done = true;
  plan.notes = "Follow up next week";
  plan.items = [
    { id: "1", name: "Replacement", kind: "part", cost: "12.50", ready: true },
    { id: "2", name: "Driver", kind: "tool", cost: "", ready: false },
  ];
  const output = exportRepairPlan(plan);
  assert.match(output, /MR942LL\/A/);
  assert.match(output, /\[x\] Confirm/);
  assert.match(output, /Unpriced items: 1/);
  assert.match(output, /Cost not entered/);
  assert.match(output, /EUR/);
  assert.match(output, /Follow up next week/);
  assert.doesNotMatch(output, /\$199/);
});
test("selected guides only open HTTP or HTTPS URLs", () => {
  assert.equal(safeGuideUrl("javascript:alert(1)"), undefined);
  assert.equal(safeGuideUrl("data:text/html,test"), undefined);
  assert.equal(safeGuideUrl("not a url"), undefined);
  assert.equal(
    safeGuideUrl("https://www.ifixit.com/Device/Apple"),
    "https://www.ifixit.com/Device/Apple"
  );
});
