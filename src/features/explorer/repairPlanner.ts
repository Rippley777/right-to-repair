import type { CatalogDevice } from "./catalog";

export const repairGoals = [
  {
    id: "battery",
    name: "Battery replacement",
    detail: "Restore useful battery life.",
  },
  {
    id: "screen",
    name: "Display repair",
    detail: "Plan a damaged display repair.",
  },
  {
    id: "keyboard",
    name: "Keyboard repair",
    detail: "Resolve typing or key problems.",
  },
  {
    id: "storage",
    name: "Storage upgrade",
    detail: "Make room for what comes next.",
  },
  {
    id: "memory",
    name: "Memory upgrade",
    detail: "Check your upgrade options.",
  },
  {
    id: "diagnosis",
    name: "Diagnose a problem",
    detail: "Find the cause before ordering parts.",
  },
] as const;
export type RepairGoal = (typeof repairGoals)[number]["id"];
export type RepairApproach = "self" | "service";
export type PlanStatus = "planning" | "in-progress" | "complete";
export type ItemKind = "part" | "tool" | "labor" | "other";
export const plannerStorageKey = "right-to-repair:plans:v1";
export interface PlanTask {
  id: string;
  text: string;
  done: boolean;
}
export interface PlanItem {
  id: string;
  name: string;
  kind: ItemKind;
  cost: string;
  ready: boolean;
}
export type PlannerDevice = Pick<
  CatalogDevice,
  | "id"
  | "name"
  | "model"
  | "identifier"
  | "year"
  | "chip"
  | "guide"
  | "ram"
  | "storage"
  | "battery"
  | "repairDifficulty"
  | "partAvailability"
  | "repairCosts"
>;
export interface RepairPlan {
  id: string;
  device: PlannerDevice;
  goal: RepairGoal;
  approach: RepairApproach;
  status: PlanStatus;
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD";
  budget: string;
  guideUrl: string;
  notes: string;
  tasks: PlanTask[];
  items: PlanItem[];
  createdAt: string;
  updatedAt: string;
}
export const goalName = (goal: RepairGoal) =>
  repairGoals.find((item) => item.id === goal)!.name;
export function repairConsideration(device: PlannerDevice, goal: RepairGoal) {
  if (goal === "memory" || goal === "storage") {
    const removable = goal === "memory" ? device.ram : device.storage;
    if (removable === false)
      return `The catalog lists ${goal === "memory" ? "memory" : "storage"} as soldered. A separate component upgrade isn’t supported; plan diagnosis or discuss board-level options with a repair service before ordering parts.`;
    if (removable == null)
      return `Upgradeability isn’t documented. Confirm the exact ${goal} interface and supported options in a model-specific guide before choosing parts.`;
    return `The catalog lists replaceable ${goal}. Confirm the connector, capacity, and compatibility for this exact configuration before choosing parts.`;
  }
  if (goal === "battery")
    return `Battery access: ${device.battery || "Not documented"}. Check the model-specific guide for the required procedure and tools.`;
  return "Confirm the fault and read a guide for this exact configuration before choosing parts or tools.";
}
export function createRepairPlan(
  device: CatalogDevice,
  goal: RepairGoal,
  approach: RepairApproach
): RepairPlan {
  const now = new Date().toISOString();
  const {
    id,
    name,
    model,
    identifier,
    year,
    chip,
    guide,
    ram,
    storage,
    battery,
    repairDifficulty,
    partAvailability,
    repairCosts,
  } = device;
  const texts = [
    "Confirm the exact model and record the symptoms.",
    "Back up important data, if the device can be used.",
    approach === "self"
      ? "Read the complete model-specific guide, including preparation and reassembly."
      : "Get a diagnosis and itemized quote from the repair service.",
    approach === "self"
      ? "Confirm compatible parts and the guide’s required tools."
      : "Confirm parts availability, turnaround, and what the service includes.",
    approach === "self"
      ? "Complete the repair using the selected guide."
      : "Arrange service and keep the repair receipt.",
    "Test the repaired feature and record the outcome.",
  ];
  return {
    id: crypto.randomUUID(),
    device: {
      id,
      name,
      model,
      identifier,
      year,
      chip,
      guide,
      ram,
      storage,
      battery,
      repairDifficulty,
      partAvailability,
      repairCosts,
    },
    goal,
    approach,
    status: "planning",
    currency: "USD",
    budget: "",
    guideUrl: "",
    notes: "",
    tasks: texts.map((text) => ({
      id: crypto.randomUUID(),
      text,
      done: false,
    })),
    items: [],
    createdAt: now,
    updatedAt: now,
  };
}
export function costInCents(value: string): number | null {
  if (!/^\d{1,9}(?:\.\d{1,2})?$/.test(value.trim())) return null;
  return Math.round(Number(value) * 100);
}
export function planTotals(plan: Pick<RepairPlan, "items" | "budget">) {
  const total = plan.items.reduce(
    (sum, item) => sum + (costInCents(item.cost) ?? 0),
    0
  );
  const missing = plan.items.filter(
    (item) => costInCents(item.cost) === null
  ).length;
  const budget = costInCents(plan.budget);
  return {
    total,
    missing,
    budget,
    overBudget: budget !== null && total > budget,
  };
}
export function safeGuideUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
const object = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);
const textFields = (value: Record<string, unknown>, keys: string[]) =>
  keys.every((key) => typeof value[key] === "string");
export function readRepairPlans(raw: string | null): RepairPlan[] {
  try {
    const values: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(values)) return [];
    return values.filter((plan): plan is RepairPlan => {
      if (
        !object(plan) ||
        !textFields(plan, [
          "id",
          "budget",
          "guideUrl",
          "notes",
          "createdAt",
          "updatedAt",
        ]) ||
        !object(plan.device)
      )
        return false;
      const snapshot = plan.device;
      if (
        !textFields(snapshot, [
          "id",
          "name",
          "model",
          "chip",
          "guide",
          "battery",
        ]) ||
        typeof plan.device.year !== "number"
      )
        return false;
      if (
        ![true, false, null].includes(plan.device.ram as boolean | null) ||
        ![true, false, null].includes(plan.device.storage as boolean | null)
      )
        return false;
      if (
        !["identifier", "repairDifficulty", "partAvailability"].every(
          (key) =>
            snapshot[key] === undefined || typeof snapshot[key] === "string"
        )
      )
        return false;
      if (
        plan.device.repairCosts !== undefined &&
        (!object(plan.device.repairCosts) ||
          !Object.values(plan.device.repairCosts).every(
            (value) => typeof value === "string"
          ))
      )
        return false;
      if (
        !repairGoals.some((goal) => goal.id === plan.goal) ||
        !["self", "service"].includes(String(plan.approach)) ||
        !["planning", "in-progress", "complete"].includes(
          String(plan.status)
        ) ||
        !["USD", "EUR", "GBP", "CAD", "AUD"].includes(String(plan.currency))
      )
        return false;
      if (
        !Array.isArray(plan.tasks) ||
        !plan.tasks.every(
          (task) =>
            object(task) &&
            textFields(task, ["id", "text"]) &&
            typeof task.done === "boolean"
        )
      )
        return false;
      return (
        Array.isArray(plan.items) &&
        plan.items.every(
          (item) =>
            object(item) &&
            textFields(item, ["id", "name", "cost"]) &&
            ["part", "tool", "labor", "other"].includes(String(item.kind)) &&
            typeof item.ready === "boolean"
        )
      );
    });
  } catch {
    return [];
  }
}
export function exportRepairPlan(plan: RepairPlan): string {
  const money = (cents: number) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: plan.currency,
    }).format(cents / 100);
  const totals = planTotals(plan);
  return [
    `${goalName(plan.goal)} — ${plan.device.name}`,
    `Configuration: ${plan.device.model || plan.device.id} · ${plan.device.identifier ?? ""} · ${plan.device.chip}`,
    `Approach: ${plan.approach === "self" ? "Self repair" : "Repair service"}`,
    `Status: ${plan.status}`,
    "",
    "CHECKLIST",
    ...plan.tasks.map((task) => `[${task.done ? "x" : " "}] ${task.text}`),
    "",
    "PARTS, TOOLS & COSTS",
    ...plan.items.map(
      (item) =>
        `${item.ready ? "[x]" : "[ ]"} ${item.name} (${item.kind}) — ${costInCents(item.cost) === null ? "Cost not entered" : money(costInCents(item.cost)!)} ${plan.currency}`
    ),
    `Entered total: ${money(totals.total)} ${plan.currency}`,
    `Unpriced items: ${totals.missing}`,
    `Budget: ${totals.budget === null ? "Not entered" : money(totals.budget) + " " + plan.currency}`,
    "",
    `Repair resources: ${safeGuideUrl(plan.guideUrl) ?? safeGuideUrl(plan.device.guide) ?? "Not added"}`,
    "",
    "NOTES",
    plan.notes || "No notes yet.",
    "",
    "A planning checklist; use a model-specific guide for repair instructions.",
  ].join("\n");
}
