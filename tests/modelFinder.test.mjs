import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

async function compile(name) {
  const source = await readFile(
    new URL(`../src/features/explorer/${name}.ts`, import.meta.url),
    "utf8"
  );
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
}
const aliasesUrl = `data:text/javascript;base64,${Buffer.from(await compile("appleModelGroups")).toString("base64")}`;
const moduleSource = (await compile("modelFinder")).replace(
  /from ["']\.\/appleModelGroups["']/,
  `from "${aliasesUrl}"`
);
const { parseModelDetails, findModelMatches } = await import(
  `data:text/javascript;base64,${Buffer.from(moduleSource).toString("base64")}`
);
const base = {
  family: "MacBook",
  name: "MacBook Pro (15-inch, Mid 2018, Touch Bar)",
  identifier: "A1990",
  year: 2018,
  memorySizes: ["16GB", "32GB"],
  screenSize: "15.4 inches",
};
const devices = [
  {
    ...base,
    id: "pro-26",
    model: "MR942LL/A",
    chip: "Intel Core i7-8850H",
    processorSpeed: "2.6GHz",
    storageCapacities: ["512GB"],
  },
  {
    ...base,
    id: "pro-22",
    model: "MR932LL/A",
    chip: "Intel Core i7-8750H",
    processorSpeed: "2.2GHz",
    storageCapacities: ["256GB"],
  },
  {
    ...base,
    id: "pro-2019",
    model: "MV912LL/A",
    year: 2019,
    name: "MacBook Pro (15-inch, 2019)",
    chip: "Intel Core i9-9880H",
    processorSpeed: "2.3GHz",
    storageCapacities: ["512GB"],
  },
  {
    ...base,
    id: "m1",
    model: "MGN63LL/A",
    identifier: "A2337",
    year: 2020,
    name: "MacBook Air (13-inch, 2020, M1)",
    chip: "Apple M1",
    screenSize: "13.3 inches",
    memorySizes: ["8GB", "16GB"],
    storageCapacities: ["256GB"],
  },
  {
    ...base,
    id: "m1pro",
    model: "MKGP3LL/A",
    identifier: "A2442",
    year: 2021,
    name: "MacBook Pro (14-inch, 2021, M1 Pro)",
    chip: "Apple M1 Pro",
    screenSize: "14.2 inches",
    storageCapacities: ["512GB"],
  },
];
const find = (input, fields) =>
  findModelMatches(devices, parseModelDetails(input, fields));

test("part numbers identify the correct configuration case-insensitively", () => {
  const result = find("Model Number: mr942ll/a");
  assert.equal(result.length, 1);
  assert.equal(result[0].device.id, "pro-26");
  assert.equal(result[0].kind, "part");
});
test("A-numbers keep every configuration instead of selecting the first", () => {
  assert.deepEqual(
    find("A1990").map((match) => match.device.id),
    ["pro-26", "pro-22", "pro-2019"]
  );
});
test("System Information identifiers bridge to API A-numbers through sourced Apple part-number groups", () => {
  const result = find("Model Identifier: MacBookPro15,1");
  assert.ok(result.some((match) => match.device.id === "pro-26"));
  assert.ok(result.some((match) => match.device.id === "pro-22"));
  assert.ok(
    result.every(
      (match) => match.source === "https://support.apple.com/en-us/108052"
    )
  );
});
test("pasted About This Mac details narrow model, year, processor speed, memory and storage together", () => {
  const input =
    "MacBook Pro (15-inch, 2018)\nProcessor: 2.6 GHz 6-Core Intel Core i7\nMemory: 16 GB 2400 MHz DDR4\nStorage: 512 GB";
  const result = find(input);
  assert.equal(result.length, 1);
  assert.equal(result[0].device.id, "pro-26");
  assert.equal(result[0].kind, "details");
  assert.ok(result[0].undocumented.includes("Installed memory"));
});
test("unknown identifiers do not quietly fall back to approximate model-name matches", () => {
  assert.equal(find("MacBook Pro 2018 A9999").length, 0);
  assert.equal(find("Model Identifier: Mac99,99").length, 0);
});
test("conflicting identifiers and specifications produce no matches", () => {
  assert.equal(find("MR942LL/A A2442").length, 0);
  assert.equal(find("MR942LL/A 2020").length, 0);
  assert.equal(find("MR942LL/A\nStorage: 256 GB").length, 0);
});
test("structured follow-up fields override pasted values", () => {
  const result = find("A1990 2019", {
    year: "2018",
    chip: "2.2 GHz Intel Core i7",
    memory: "",
    storage: "256 GB",
    screen: "",
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].device.id, "pro-22");
});
test("regional Apple part numbers are possible variants, not exact matches", () => {
  const result = find("MR942ZP/A");
  assert.equal(result.length, 1);
  assert.equal(result[0].kind, "regional");
});
test("distinguishes Apple M1 from M1 Pro and MacBook Air from Pro", () => {
  assert.deepEqual(
    find("MacBook Air 2020\nChip: Apple M1").map((match) => match.device.id),
    ["m1"]
  );
  assert.deepEqual(
    find("Chip: Apple M1 Pro").map((match) => match.device.id),
    ["m1pro"]
  );
});
test("memory options describe supported sizes without claiming installed memory", () => {
  const result = find("MR942LL/A\nMemory: 32 GB");
  assert.ok(result[0].reasons.includes("Supports 32 GB memory"));
  assert.ok(result[0].undocumented.includes("Installed memory"));
  assert.equal(find("MR942LL/A\nMemory: 8 GB").length, 0);
});
test("handles nominal versus usable storage and marketed versus measured display sizes", () => {
  const result = find(
    "MacBook Pro 15-inch 2018\nCapacity: 499.96 GB\nProcessor: 2.6 GHz Intel Core i7"
  );
  assert.equal(result.length, 1);
  assert.equal(result[0].device.id, "pro-26");
});
test("keeps incomplete records possible while making undocumented specifications explicit", () => {
  const result = findModelMatches(
    [
      {
        ...devices[0],
        processorSpeed: undefined,
        storageCapacities: undefined,
      },
    ],
    parseModelDetails(
      "A1990\nProcessor: 2.6 GHz Intel Core i7\nStorage: 512 GB"
    )
  );
  assert.equal(result.length, 1);
  assert.ok(result[0].undocumented.includes("Storage capacity"));
  assert.ok(result[0].undocumented.includes("Processor speed"));
});
test("ignores serial number, UUID and personal metadata lines", () => {
  const clues = parseModelDetails(
    "Serial Number (system): MR942LL/A\nHardware UUID: A1990\nApple ID: MacBookPro15,1\nComputer Name: MacBook Pro 2018"
  );
  assert.deepEqual(clues.partNumbers, []);
  assert.deepEqual(clues.identifiers, []);
  assert.equal(clues.year, undefined);
  assert.equal(findModelMatches(devices, clues).length, 0);
});
test("empty or unrecognized input does not show the entire catalog as a match", () => {
  assert.equal(find("").length, 0);
  assert.equal(find("hello world").length, 0);
});
