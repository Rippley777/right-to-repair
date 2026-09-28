import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

async function transpile(name) {
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
const catalogUrl = `data:text/javascript;base64,${Buffer.from(await transpile("catalog")).toString("base64")}`;
const apiSource = (await transpile("apiCatalog")).replace(
  /from ["']\.\/catalog["']/,
  `from "${catalogUrl}"`
);
const { loadApiCatalog, normalizeDevice } = await import(
  `data:text/javascript;base64,${Buffer.from(apiSource).toString("base64")}`
);
const fixture = (index) => ({
  _id: `document-${index}`,
  type: "Laptop",
  model_identifier: "A1990",
  model_description: "MacBook Pro (15-inch, Mid 2018, Touch Bar)",
  model_number: `configuration-${index}`,
  release_date: "2018-07-12",
  repairability_score: 1,
  hardware_details: {
    memory: { soldered: true },
    storage: [{ removable: false }],
    processor: { model: "Intel Core i7-8850H" },
  },
});
const signal = () => new AbortController().signal;

test("loads hundreds of configurations from every API page without collapsing shared identifiers", async () => {
  const data = Array.from({ length: 235 }, (_, index) => fixture(index));
  const requested = [];
  const devices = await loadApiCatalog(
    "https://devices.example",
    signal(),
    async (url) => {
      const page = Number(new URL(url).searchParams.get("page"));
      requested.push(page);
      return Response.json({
        devices: data.slice((page - 1) * 100, page * 100),
        total: 235,
        pages: 3,
      });
    }
  );
  assert.equal(devices.length, 235);
  assert.equal(new Set(devices.map((device) => device.id)).size, 235);
  assert.equal(devices[234].model, "configuration-234");
  assert.deepEqual(requested.sort(), [1, 2, 3]);
});
test("does not impose the old 100-page catalog cutoff", async () => {
  const devices = await loadApiCatalog(
    "https://devices.example",
    signal(),
    async (url) => {
      const page = Number(new URL(url).searchParams.get("page"));
      return Response.json({
        devices: [fixture(page)],
        total: 101,
        pages: 101,
      });
    }
  );
  assert.equal(devices.length, 101);
});
test("uses live descriptions and scores and preserves the original identifier", () => {
  const device = normalizeDevice({
    ...fixture(1),
    model_identifier: "Mac14,2",
    repairability_score: 8,
  });
  assert.equal(device.id, "document-1");
  assert.equal(device.identifier, "Mac14,2");
  assert.equal(device.name, "MacBook Pro (15-inch, Mid 2018, Touch Bar)");
  assert.equal(device.score, 8);
  assert.equal(device.year, 2018);
  assert.equal(device.family, "MacBook");
});
test("handles missing hardware without replacing it with reference facts", () => {
  const device = normalizeDevice({
    _id: "minimal",
    model_identifier: "Mac14,2",
  });
  assert.equal(device.score, null);
  assert.equal(device.ram, null);
  assert.equal(device.storage, null);
});
test("derives page count from actual returned page size when metadata omits pages", async () => {
  const devices = await loadApiCatalog(
    "https://devices.example",
    signal(),
    async (url) => {
      const page = Number(new URL(url).searchParams.get("page"));
      return Response.json({ devices: [fixture(page)], total: 3 });
    }
  );
  assert.equal(devices.length, 3);
});
test("keeps a valid empty live catalog empty", async () => {
  assert.deepEqual(
    await loadApiCatalog("https://devices.example", signal(), async () =>
      Response.json({ devices: [], total: 0, pages: 0 })
    ),
    []
  );
});
test("rejects API failures, invalid responses and incomplete catalogs instead of returning demo devices", async () => {
  for (const response of [
    new Response(null, { status: 503 }),
    Response.json({ devices: [{}] }),
    Response.json({ devices: [fixture(1)], total: 10, pages: 1 }),
    Response.json({ devices: [], pages: -1 }),
  ]) {
    await assert.rejects(
      loadApiCatalog("https://devices.example", signal(), async () => response)
    );
  }
});
