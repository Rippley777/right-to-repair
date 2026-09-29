import type { CatalogDevice } from "./catalog";
import { appleModelGroups } from "./appleModelGroups";

export interface FinderFields {
  year: string;
  chip: string;
  memory: string;
  storage: string;
  screen: string;
}
export const emptyFinderFields: FinderFields = {
  year: "",
  chip: "",
  memory: "",
  storage: "",
  screen: "",
};
export interface ModelClues {
  partNumbers: string[];
  identifiers: string[];
  kind?: string;
  year?: number;
  chip?: string;
  speed?: number;
  memory?: number;
  storage?: number;
  screen?: number;
}
export interface ModelMatch {
  device: CatalogDevice;
  kind: "part" | "regional" | "identifier" | "details";
  reasons: string[];
  undocumented: string[];
  source?: string;
}
const normalize = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "").replace(/[“”″]/g, '"');
const unique = (values: string[]) => [
  ...new Set(values.map((value) => value.replace(/\s+/g, ""))),
];
const partBase = (value: string) =>
  normalize(value).replace(/(?:[a-z]{2})\/[a-z]$/, "");
const capacity = (value: string) => {
  const match = value.match(/(\d+(?:\.\d+)?)\s*(gb|tb)\b/i);
  return match
    ? Number(match[1]) * (match[2].toLowerCase() === "tb" ? 1024 : 1)
    : undefined;
};
const modelKind = (value: string) =>
  value
    .match(
      /\b(mac\s*book\s*pro|mac\s*book\s*air|mac\s*book|mac\s*mini|mac\s*pro|imac\s*pro|imac|iphone|ipad\s*pro|ipad\s*air|ipad\s*mini|ipad)/i
    )?.[1]
    .replace(/\s+/g, "")
    .toLowerCase();
const processor = (value: string) => {
  const apple = value.match(
    /\b(?:Apple\s+)?([MA]\d{1,2})(?:\s+(Pro|Max|Ultra))?\b/i
  );
  if (apple)
    return `${apple[1]}${apple[2] ? ` ${apple[2]}` : ""}`.toUpperCase();
  const intel = value.match(
    /\b(?:Intel\s+)?(?:Core\s+)?(i[3579](?:-\d{3,5}[a-z]*)?|Core\s*2\s*Duo|Core\s*Duo|Xeon)\b/i
  );
  return intel?.[1].replace(/\s+/g, " ");
};

export function parseModelDetails(
  input: string,
  fields: FinderFields = emptyFinderFields
): ModelClues {
  // Reports often contain unique personal identifiers; these are never used in matching.
  const text = input
    .slice(0, 12000)
    .split(/\r?\n/)
    .filter(
      (line) =>
        !/^\s*(?:serial\s*(?:number)?|hardware\s*uuid|provisioning\s*udid|uuid|apple\s*id|computer\s*name|user\s*name)\b/i.test(
          line
        )
    )
    .join("\n");
  const partNumbers = unique(text.match(/\b[A-Z0-9]{5,9}\/[A-Z]\b/gi) ?? []);
  const identifiers = unique(
    text.match(
      /\b(?:MacBookPro|MacBookAir|MacBook|Macmini|MacPro|iMacPro|iMac|Mac|iPhone|iPad)\d{1,2}\s*,\s*\d{1,2}\b|\bA\d{4}\b/gi
    ) ?? []
  );
  const yearText = fields.year || text.match(/\b(?:19|20)\d{2}\b/)?.[0];
  const memoryText =
    fields.memory ||
    text.match(/\b(?:memory|ram)\s*:?\s*(\d+(?:\.\d+)?\s*(?:gb|tb))\b/i)?.[1];
  const storageText =
    fields.storage ||
    text.match(
      /\b(?:storage|capacity|ssd|hdd)\s*:?\s*(\d+(?:\.\d+)?\s*(?:gb|tb))\b/i
    )?.[1];
  const screenText =
    fields.screen ||
    text.match(/\b(\d{2}(?:\.\d+)?)\s*(?:[-‑–]?\s*inch(?:es)?|["″])/i)?.[1];
  const speedText =
    fields.chip ||
    text.match(
      /(?:processor(?:\s*speed)?\s*:?\s*)?(\d(?:\.\d+)?)\s*GHz/i
    )?.[0] ||
    "";
  return {
    partNumbers,
    identifiers,
    kind: modelKind(text),
    year: yearText ? Number(yearText) : undefined,
    chip: processor(fields.chip || text),
    speed: Number(speedText.match(/(\d(?:\.\d+)?)\s*GHz/i)?.[1]) || undefined,
    memory: memoryText ? capacity(memoryText) : undefined,
    storage: storageText ? capacity(storageText) : undefined,
    screen: Number(screenText) || undefined,
  };
}

export function describeClues(clues: ModelClues): string[] {
  return [
    ...clues.partNumbers,
    ...clues.identifiers,
    ...(clues.kind
      ? [
          clues.kind
            .replace(/macbook(pro|air)/, "MacBook $1")
            .replace(
              /\b(pro|air)\b/g,
              (word) => word[0].toUpperCase() + word.slice(1)
            ),
        ]
      : []),
    ...(clues.year ? [String(clues.year)] : []),
    ...(clues.chip ? [clues.chip] : []),
    ...(clues.speed ? [`${clues.speed} GHz`] : []),
    ...(clues.memory ? [`${clues.memory} GB memory`] : []),
    ...(clues.storage ? [`${clues.storage} GB storage`] : []),
    ...(clues.screen ? [`${clues.screen}″ display`] : []),
  ];
}

export function findModelMatches(
  devices: CatalogDevice[],
  clues: ModelClues
): ModelMatch[] {
  if (!describeClues(clues).length) return [];
  const matches: ModelMatch[] = [];
  for (const device of devices) {
    const reasons: string[] = [];
    const undocumented: string[] = [];
    let matchKind: ModelMatch["kind"] = "details";
    let source: string | undefined;
    const groups = appleModelGroups.filter((group) =>
      group.partNumbers.some(
        (part) => partBase(part) === partBase(device.model)
      )
    );
    if (clues.partNumbers.length) {
      if (
        clues.partNumbers.every(
          (part) => normalize(part) === normalize(device.model)
        )
      ) {
        matchKind = "part";
        reasons.push("Exact part number");
      } else if (
        clues.partNumbers.every(
          (part) => partBase(part) === partBase(device.model)
        )
      ) {
        matchKind = "regional";
        reasons.push("Same part number family; region differs");
      } else continue;
    }
    if (clues.identifiers.length) {
      let accepted = true;
      for (const identifier of clues.identifiers) {
        if (
          normalize(device.identifier ?? device.id) === normalize(identifier) ||
          normalize(device.model) === normalize(identifier)
        ) {
          reasons.push(`Identifier ${identifier}`);
          continue;
        }
        const group = groups.find((group) =>
          group.identifiers.some(
            (value) => normalize(value) === normalize(identifier)
          )
        );
        if (!group) {
          accepted = false;
          break;
        }
        source = group.source;
        reasons.push(`Apple model group ${identifier}`);
      }
      if (!accepted) continue;
      if (matchKind === "details") matchKind = "identifier";
    }
    if (clues.kind) {
      const knownKind =
        modelKind(`${device.name} ${device.identifier ?? ""}`) ??
        modelKind(groups[0]?.name ?? "");
      if (knownKind && knownKind !== clues.kind) continue;
      if (!knownKind) undocumented.push("Model family");
      else reasons.push("Model family");
    }
    if (clues.year) {
      if (device.year && device.year !== clues.year) continue;
      if (device.year) reasons.push(String(device.year));
      else undocumented.push("Release year");
    }
    if (clues.chip) {
      const chip = normalize(device.chip);
      const expected = normalize(clues.chip);
      const knownChip = processor(device.chip);
      // M1 is a different processor from M1 Pro/Max. Intel i7 is a family, not a SKU.
      if (
        knownChip &&
        (/^[ma]\d/.test(expected)
          ? normalize(knownChip) !== expected
          : !chip.includes(expected))
      )
        continue;
      if (!knownChip) undocumented.push("Processor");
      else reasons.push(clues.chip);
    }
    if (clues.speed) {
      const speed = Number(
        device.processorSpeed?.match(/(\d(?:\.\d+)?)\s*GHz/i)?.[1]
      );
      if (speed && Math.abs(speed - clues.speed) > 0.05) continue;
      if (speed) reasons.push(`${clues.speed} GHz processor`);
      else undocumented.push("Processor speed");
    }
    if (clues.screen) {
      const screen = Number(
        device.screenSize?.match(/\d+(?:\.\d+)?/)?.[0] ??
          device.name.match(/(\d{2}(?:\.\d+)?)\s*(?:-inch|["″])/)?.[1]
      );
      if (screen && Math.abs(screen - clues.screen) > 0.6) continue;
      if (screen) reasons.push(`${clues.screen}″ display`);
      else undocumented.push("Display size");
    }
    if (clues.memory) {
      const sizes = (device.memorySizes ?? [])
        .map(capacity)
        .filter((size): size is number => size !== undefined);
      if (sizes.length && !sizes.includes(clues.memory)) continue;
      // The API lists supported memory options, not the memory installed in each unit.
      if (sizes.length) reasons.push(`Supports ${clues.memory} GB memory`);
      undocumented.push("Installed memory");
    }
    if (clues.storage) {
      const sizes = (device.storageCapacities ?? [])
        .map(capacity)
        .filter((size): size is number => size !== undefined);
      // System Information can report usable capacity below the advertised size.
      const matchingSize = sizes.find(
        (size) => Math.abs(size - clues.storage!) <= size * 0.08
      );
      if (sizes.length && matchingSize === undefined) continue;
      if (matchingSize !== undefined)
        reasons.push(`${matchingSize} GB storage`);
      else undocumented.push("Storage capacity");
    }
    matches.push({ device, kind: matchKind, reasons, undocumented, source });
  }
  return matches.sort(
    (a, b) =>
      a.undocumented.length - b.undocumented.length ||
      b.reasons.length - a.reasons.length
  );
}
