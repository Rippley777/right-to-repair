import { catalog, type CatalogDevice } from "./catalog";
import type { Device } from "@/types";

type ApiDevice = Device & {
  _id?: string;
  model_description?: string;
  release_year?: number | string;
};
type DevicePage = { devices: ApiDevice[]; total?: number; pages?: number };

export function normalizeDevice(device: ApiDevice): CatalogDevice {
  const identifier = device.model_identifier;
  const known = catalog.find((d) => d.id === identifier);
  const description = device.model_description?.trim();
  const identity = `${device.type} ${identifier} ${description ?? ""}`;
  const family =
    known?.family ??
    (/iphone/i.test(identity)
      ? "iPhone"
      : /ipad/i.test(identity)
        ? "iPad"
        : /macbook|laptop|notebook/i.test(identity)
          ? "MacBook"
          : "Desktop");
  const chip = device.hardware_details?.processor?.model || "Not documented";
  const soldered = device.hardware_details?.memory?.soldered;
  const storage = device.hardware_details?.storage?.[0]?.removable;
  const date =
    typeof device.release_date === "string" ? device.release_date : "";
  const year =
    Number(date.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? device.release_year) || 0;
  const score =
    typeof device.repairability_score === "number" &&
    device.repairability_score >= 0 &&
    device.repairability_score <= 10
      ? device.repairability_score
      : null;
  const genericName = /[a-z]/.test(identifier)
    ? identifier
        .replace(/(?<=[a-z])(?=[A-Z])/g, " ")
        .replace(/\d.*$/, "")
        .trim()
    : identifier;
  return {
    // The backend stores several configurations under the same model identifier.
    // Keep the document identity so none are lost when loading all pages.
    id: device._id || device.model_number || identifier,
    identifier,
    name: description || known?.name || genericName || identifier,
    subtitle: `${chip} · ${year || "Year unknown"}`,
    model: device.model_number ?? "",
    family,
    year,
    chip,
    silicon: /apple|\b[ma]\d/i.test(chip),
    score,
    ram: typeof soldered === "boolean" ? !soldered : null,
    storage: typeof storage === "boolean" ? storage : null,
    battery:
      device.repairability_insights?.battery?.accessibility ?? "Not documented",
    notes:
      Array.isArray(device.known_issues) && device.known_issues.length
        ? device.known_issues.filter(
            (note): note is string => typeof note === "string"
          )
        : ["See the linked repair resources for model-specific guidance."],
    guide:
      known?.guide ??
      `https://www.ifixit.com/Search?query=${encodeURIComponent(identifier)}`,
    color:
      known?.color ??
      (
        {
          MacBook: "blue",
          iPhone: "purple",
          iPad: "pink",
          Desktop: "silver",
        } as const
      )[family],
  };
}

async function requestPage(
  api: string,
  page: number,
  signal: AbortSignal,
  fetcher: typeof fetch
): Promise<DevicePage> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal.aborted) abort();
  else signal.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, 45000);
  try {
    const response = await fetcher(
      `${api.replace(/\/$/, "")}/api/devices/search?page=${page}&pageSize=100`,
      { signal: controller.signal }
    );
    if (!response.ok)
      throw new Error(`Device API returned HTTP ${response.status}.`);
    const body = await response.json();
    if (
      !body ||
      !Array.isArray(body.devices) ||
      body.devices.some(
        (device: ApiDevice) =>
          !device || typeof device.model_identifier !== "string"
      )
    )
      throw new Error("The device API returned an invalid catalog response.");
    return body;
  } catch (error) {
    if (controller.signal.aborted && !signal.aborted)
      throw new Error("The device API timed out. Please try again.");
    throw error;
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", abort);
  }
}

export async function loadApiCatalog(
  api: string,
  signal: AbortSignal,
  fetcher: typeof fetch = fetch
): Promise<CatalogDevice[]> {
  const first = await requestPage(api, 1, signal, fetcher);
  const total = first.total;
  const pages = Number(
    first.pages ??
      (total !== undefined && first.devices.length
        ? Math.ceil(total / first.devices.length)
        : 1)
  );
  if (!Number.isSafeInteger(pages) || pages < 0)
    throw new Error("The device API returned invalid pagination metadata.");
  const devices = [...first.devices];
  // Fetch every API page, in small batches, without a deadline on the entire catalog.
  for (let start = 2; start <= pages; start += 4) {
    const batch = await Promise.all(
      Array.from({ length: Math.min(4, pages - start + 1) }, (_, index) =>
        requestPage(api, start + index, signal, fetcher)
      )
    );
    for (const page of batch) devices.push(...page.devices);
  }
  if (typeof total === "number" && devices.length < total)
    throw new Error(
      `The device API returned ${devices.length} of ${total} devices. Please retry the catalog.`
    );
  return devices.map(normalizeDevice);
}
