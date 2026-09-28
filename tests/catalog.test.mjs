import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Exercise the actual TypeScript module using the compiler already in the project.
const source = await readFile(
  new URL("../src/features/explorer/catalog.ts", import.meta.url),
  "utf8"
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
});
const { catalog, filterDevices, scoreBand, upgradeLabel } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const defaults = {
  query: "",
  family: "",
  score: "",
  year: "",
  chip: "",
  ram: false,
  storage: false,
  sort: "featured",
};
const find = (filters) => filterDevices(catalog, { ...defaults, ...filters });

test("matches model number, identifier and mixed-case search terms", () => {
  assert.equal(find({ query: " A2442 " })[0].id, "MacBookPro18,3");
  assert.equal(find({ query: "MacBookPro18,3" }).length, 1);
  assert.equal(find({ query: "AIR 2022 m2" })[0].model, "A2681");
  assert.equal(find({ query: "not-a-real-device" }).length, 0);
});
test("combines category, year, processor and hardware filters", () => {
  assert.deepEqual(
    find({
      family: "MacBook",
      year: "2012",
      chip: "intel",
      ram: true,
      storage: true,
    }).map((d) => d.id),
    ["MacBookPro9,1"]
  );
  assert.equal(find({ chip: "silicon", storage: true }).length, 0);
});
test("score bands include their endpoints and exclude unrated devices", () => {
  assert.equal(scoreBand(0), "hard");
  assert.equal(scoreBand(3), "hard");
  assert.equal(scoreBand(4), "moderate");
  assert.equal(scoreBand(6), "moderate");
  assert.equal(scoreBand(7), "easy");
  assert.equal(scoreBand(10), "easy");
  assert.equal(scoreBand(null), "unknown");
  assert.ok(find({ score: "easy" }).every((d) => d.score >= 7));
});
test("sorts scores and release years without mutating the reference catalog", () => {
  const ids = catalog.map((d) => d.id);
  const descending = find({ sort: "score" }).map((d) => d.score);
  assert.deepEqual(
    descending,
    [...descending].sort((a, b) => b - a)
  );
  assert.equal(find({ sort: "lowest" })[0].score, 1);
  assert.equal(find({ sort: "newest" })[0].year, 2024);
  assert.deepEqual(
    catalog.map((d) => d.id),
    ids
  );
});
test("places unknown scores last in both score sorts", () => {
  const data = [{ ...catalog[0], id: "unknown", score: null }, ...catalog];
  for (const sort of ["score", "lowest"])
    assert.equal(
      filterDevices(data, { ...defaults, sort }).at(-1).id,
      "unknown"
    );
});
test("keeps missing hardware information distinct from soldered hardware", () => {
  assert.equal(upgradeLabel(null), "Not documented");
  assert.equal(upgradeLabel(false), "Soldered");
  assert.equal(upgradeLabel(true), "Replaceable");
});
test("every reference device has a unique ID, a valid score and primary sources", () => {
  assert.equal(new Set(catalog.map((d) => d.id)).size, catalog.length);
  for (const device of catalog) {
    assert.ok(device.score >= 0 && device.score <= 10);
    assert.equal(new URL(device.source).hostname, "www.ifixit.com");
    assert.equal(new URL(device.guide).hostname, "www.ifixit.com");
  }
});
