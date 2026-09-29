import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuCheck,
  LuClipboardList,
  LuDownload,
  LuInfo,
  LuPlus,
  LuPrinter,
  LuTrash2,
  LuWrench,
} from "react-icons/lu";
import type { CatalogDevice } from "./catalog";
import { CatalogError } from "./ui";
import {
  createRepairPlan,
  exportRepairPlan,
  goalName,
  planTotals,
  plannerStorageKey,
  readRepairPlans,
  repairConsideration,
  repairGoals,
  safeGuideUrl,
  type ItemKind,
  type RepairApproach,
  type RepairGoal,
  type RepairPlan,
} from "./repairPlanner";

const statusNames = {
  planning: "Planning",
  "in-progress": "In progress",
  complete: "Complete",
};
export function RepairPlannerPage({
  devices,
  saved,
  loading,
  error,
  retry,
}: {
  devices: CatalogDevice[];
  saved: string[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}) {
  const [params, setParams] = useSearchParams();
  const [plans, setPlans] = useState<RepairPlan[]>(() => {
    try {
      return readRepairPlans(localStorage.getItem(plannerStorageKey));
    } catch {
      return [];
    }
  });
  const [storageError, setStorageError] = useState(false);
  const [query, setQuery] = useState("");
  const [deviceId, setDeviceId] = useState(params.get("device") ?? "");
  const [goal, setGoal] = useState<RepairGoal>("battery");
  const [approach, setApproach] = useState<RepairApproach>("self");
  const [taskText, setTaskText] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemKind, setItemKind] = useState<ItemKind>("part");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const workspaceRef = useRef<HTMLElement>(null);
  const active = plans.find((plan) => plan.id === params.get("plan"));
  const device = devices.find((item) => item.id === deviceId);
  const filtered = devices
    .filter((item) =>
      `${item.name} ${item.model} ${item.identifier ?? ""} ${item.chip} ${item.year}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    )
    .sort(
      (a, b) => Number(saved.includes(b.id)) - Number(saved.includes(a.id))
    );
  useEffect(() => {
    try {
      localStorage.setItem(plannerStorageKey, JSON.stringify(plans));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [plans]);
  const update = (patch: Partial<RepairPlan>) => {
    if (active)
      setPlans((current) =>
        current.map((plan) =>
          plan.id === active.id
            ? { ...plan, ...patch, updatedAt: new Date().toISOString() }
            : plan
        )
      );
  };
  const openPlan = (id: string) => {
    setParams({ plan: id });
    setDeleteId(null);
    setTaskText("");
    setItemName("");
    requestAnimationFrame(() => {
      workspaceRef.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 800px)").matches)
        workspaceRef.current?.scrollIntoView({ block: "start" });
    });
  };
  const newPlan = () => {
    setParams({});
    setDeleteId(null);
    setQuery("");
    setDeviceId("");
  };
  const totals = active ? planTotals(active) : null;
  const money = (cents: number) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: active?.currency ?? "USD",
    }).format(cents / 100);
  const progress = active ? active.tasks.filter((task) => task.done).length : 0;
  const estimateDevice = active?.device ?? device;
  const estimateGoal = active?.goal ?? goal;
  const estimate =
    estimateGoal === "battery" ||
    estimateGoal === "screen" ||
    estimateGoal === "keyboard"
      ? estimateDevice?.repairCosts?.[estimateGoal]
      : undefined;
  const download = () => {
    if (!active) return;
    const url = URL.createObjectURL(
      new Blob([exportRepairPlan(active)], { type: "text/plain;charset=utf-8" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `repair-plan-${active.device.model.replace(/[^a-z0-9-]/gi, "-") || "device"}.txt`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="content-page planner-page">
      <Link to="/" className="back-link">
        <LuArrowLeft />
        Back to all devices
      </Link>
      <div className="planner-heading">
        <div>
          <span className="eyebrow">THE REPAIR PLANNER</span>
          <h1>
            A little planning.
            <br />
            <span>A better repair.</span>
          </h1>
          <p className="page-intro">
            Turn “I should fix that” into a plan. Keep your checklist, parts,
            costs, and notes together.
          </p>
        </div>
        <div className="planner-heading-note">
          <LuClipboardList />
          <span>
            Your next repair,
            <br />
            one step at a time.
          </span>
        </div>
      </div>
      <p
        className={`planner-storage ${storageError ? "has-error" : ""}`}
        role="status"
      >
        {storageError
          ? "Browser storage is unavailable. Changes are kept for this visit; download your plan before leaving."
          : "Plans save automatically in this browser. Download a copy to keep elsewhere."}
      </p>
      <div className="planner-layout">
        <aside className="planner-sidebar">
          <div className="planner-library-heading">
            <h2>
              Your plans <span>{plans.length}</span>
            </h2>
            <button className="text-button" onClick={newPlan}>
              <LuPlus />
              New plan
            </button>
          </div>
          {plans.length ? (
            <div className="planner-library">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  className={active?.id === plan.id ? "active" : ""}
                  onClick={() => openPlan(plan.id)}
                  aria-pressed={active?.id === plan.id}
                >
                  <span className={`planner-status ${plan.status}`}>
                    {statusNames[plan.status]}
                  </span>
                  <strong>{goalName(plan.goal)}</strong>
                  <span>{plan.device.name}</span>
                  <small>{plan.device.model || plan.device.identifier}</small>
                  <LuArrowRight />
                </button>
              ))}
            </div>
          ) : (
            <p className="planner-library-empty">
              Your saved plans will live here. Start with the device you want to
              repair.
            </p>
          )}
          <div className="planner-sidebar-note">
            <LuInfo />
            <p>
              A plan tracks your preparation and progress. Use a model-specific
              guide for the repair instructions.
            </p>
          </div>
        </aside>
        <section
          className="planner-workspace"
          ref={workspaceRef}
          tabIndex={-1}
          aria-label={active ? "Repair plan" : "Create a repair plan"}
        >
          {!active ? (
            <>
              <div className="planner-section-heading">
                <span className="eyebrow">START SOMETHING GOOD</span>
                <h2>What are we working on?</h2>
                <p>
                  Choose the exact configuration and the repair you have in
                  mind.
                </p>
              </div>
              {params.get("plan") && (
                <p role="status" className="planner-callout">
                  That plan isn’t saved in this browser. Choose one from your
                  plans or create a new one.
                </p>
              )}
              {loading ? (
                <p role="status" className="planner-callout">
                  Loading your device catalog… You can open an existing plan
                  while it loads.
                </p>
              ) : error ? (
                <CatalogError error={error} retry={retry} />
              ) : !devices.length ? (
                <p className="planner-callout">
                  The catalog is empty. Connect devices to start a new plan.
                </p>
              ) : null}
              <form
                className="planner-create"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!device || loading || error) return;
                  const plan = createRepairPlan(device, goal, approach);
                  setPlans((current) => [plan, ...current]);
                  openPlan(plan.id);
                }}
              >
                <div className="planner-form-grid">
                  <label>
                    Find your device
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setDeviceId("");
                      }}
                      placeholder="Search model, A-number, or part number"
                    />
                  </label>
                  <label>
                    Exact configuration
                    <select
                      required
                      aria-label="Exact configuration"
                      value={deviceId}
                      disabled={loading || Boolean(error)}
                      onChange={(event) => setDeviceId(event.target.value)}
                    >
                      <option value="">
                        Choose a device ({filtered.length})
                      </option>
                      {filtered.map((item) => (
                        <option key={item.id} value={item.id}>
                          {saved.includes(item.id) ? "Saved · " : ""}
                          {item.model || item.identifier} · {item.name} ·{" "}
                          {item.chip}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <p className="planner-model-help">
                  Not sure which one?{" "}
                  <Link to="/identify">
                    Use the model finder <LuArrowUpRight />
                  </Link>
                </p>
                {device && (
                  <div className="planner-device-preview">
                    <span className="planner-device-icon">
                      <LuWrench />
                    </span>
                    <div>
                      <strong>{device.name}</strong>
                      <p>
                        {device.model} · {device.chip} ·{" "}
                        {device.year || "Year unknown"}
                      </p>
                    </div>
                    <Link
                      to={`/device/${encodeURIComponent(device.id)}`}
                      aria-label="View selected device details"
                    >
                      <LuArrowUpRight />
                    </Link>
                  </div>
                )}
                <label className="planner-goal-label">
                  Repair goal
                  <select
                    aria-label="Repair goal"
                    value={goal}
                    onChange={(event) =>
                      setGoal(event.target.value as RepairGoal)
                    }
                  >
                    {repairGoals.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <fieldset className="planner-approach">
                  <legend>How would you like to handle it?</legend>
                  <div>
                    <label className={approach === "self" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="repair-approach"
                        value="self"
                        checked={approach === "self"}
                        onChange={() => setApproach("self")}
                      />
                      <span>
                        <strong>Self repair</strong>
                        <small>Prepare parts, tools, and a guide.</small>
                      </span>
                    </label>
                    <label className={approach === "service" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="repair-approach"
                        value="service"
                        checked={approach === "service"}
                        onChange={() => setApproach("service")}
                      />
                      <span>
                        <strong>Repair service</strong>
                        <small>Organize a quote and service visit.</small>
                      </span>
                    </label>
                  </div>
                </fieldset>
                {device && (
                  <div className="planner-callout">
                    <LuInfo />
                    <div>
                      <p>{repairConsideration(device, goal)}</p>
                      <span>
                        Catalog difficulty:{" "}
                        {device.repairDifficulty ?? "Not documented"} · Parts:{" "}
                        {device.partAvailability ?? "Not documented"}
                      </span>
                      {estimate && (
                        <span>
                          Catalog estimate: {estimate}. Confirm a current quote;
                          this isn’t added to your budget.
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="primary-button"
                  disabled={!device || loading || Boolean(error)}
                >
                  <LuPlus />
                  Create repair plan
                  <LuArrowRight />
                </button>
              </form>
            </>
          ) : (
            <>
              <pre className="planner-print-copy">
                {exportRepairPlan(active)}
              </pre>
              <header className="planner-plan-header">
                <div>
                  <span className="eyebrow">
                    {active.device.model ||
                      active.device.identifier ||
                      "YOUR DEVICE"}
                  </span>
                  <h2>{goalName(active.goal)}</h2>
                  <p>{active.device.name}</p>
                  <span className="planner-plan-subtitle">
                    {active.device.chip} ·{" "}
                    {active.approach === "self"
                      ? "Self repair"
                      : "Repair service"}
                  </span>
                </div>
                <div className="planner-export-actions">
                  <button className="secondary-button" onClick={download}>
                    <LuDownload />
                    Download
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => window.print()}
                  >
                    <LuPrinter />
                    Print
                  </button>
                </div>
              </header>
              <div className="planner-overview">
                <div>
                  <span>Checklist</span>
                  <strong>
                    {progress}
                    <small> / {active.tasks.length}</small>
                  </strong>
                  <div
                    className="planner-progress"
                    role="progressbar"
                    aria-label="Checklist progress"
                    aria-valuemin={0}
                    aria-valuemax={active.tasks.length || 1}
                    aria-valuenow={progress}
                  >
                    <span
                      style={{
                        width: `${active.tasks.length ? (progress / active.tasks.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <span>Entered costs</span>
                  <strong>
                    {money(totals!.total)} <small>{active.currency}</small>
                  </strong>
                  <small>
                    {totals!.missing
                      ? `${totals!.missing} ${totals!.missing === 1 ? "item needs" : "items need"} a price`
                      : active.items.length
                        ? "All items priced"
                        : "Add parts, tools, or service costs"}
                  </small>
                </div>
                <label>
                  Plan status
                  <select
                    aria-label="Plan status"
                    value={active.status}
                    onChange={(event) =>
                      update({
                        status: event.target.value as RepairPlan["status"],
                      })
                    }
                  >
                    {Object.entries(statusNames).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {active.status === "complete" && (
                <p className="planner-completed" role="status">
                  <LuCheck />
                  Marked complete. Your checklist and notes stay available.
                </p>
              )}
              <div className="planner-callout">
                <LuInfo />
                <div>
                  <p>{repairConsideration(active.device, active.goal)}</p>
                  <span>
                    Catalog difficulty:{" "}
                    {active.device.repairDifficulty ?? "Not documented"} ·
                    Parts: {active.device.partAvailability ?? "Not documented"}
                  </span>
                  {estimate && (
                    <span>
                      Catalog estimate: {estimate}. Confirm a current quote
                      before committing.
                    </span>
                  )}
                </div>
              </div>
              <section className="planner-block">
                <div className="planner-block-heading">
                  <div>
                    <span className="eyebrow">
                      01 / PREPARE & FOLLOW THROUGH
                    </span>
                    <h3>Your checklist</h3>
                  </div>
                  <span>
                    {progress} of {active.tasks.length} done
                  </span>
                </div>
                <div className="planner-task-list">
                  {active.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`planner-task ${task.done ? "done" : ""}`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() =>
                            update({
                              tasks: active.tasks.map((item) =>
                                item.id === task.id
                                  ? { ...item, done: !item.done }
                                  : item
                              ),
                            })
                          }
                        />
                        <span>{task.text}</span>
                      </label>
                      <button
                        onClick={() =>
                          update({
                            tasks: active.tasks.filter(
                              (item) => item.id !== task.id
                            ),
                          })
                        }
                        aria-label={`Remove task: ${task.text}`}
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
                <form
                  className="planner-add-row"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!taskText.trim()) return;
                    update({
                      tasks: [
                        ...active.tasks,
                        {
                          id: crypto.randomUUID(),
                          text: taskText.trim(),
                          done: false,
                        },
                      ],
                    });
                    setTaskText("");
                  }}
                >
                  <input
                    aria-label="New checklist task"
                    placeholder="Add a task of your own…"
                    maxLength={500}
                    value={taskText}
                    onChange={(event) => setTaskText(event.target.value)}
                  />
                  <button
                    className="secondary-button"
                    disabled={!taskText.trim()}
                  >
                    <LuPlus />
                    Add task
                  </button>
                </form>
              </section>
              <section className="planner-block">
                <div className="planner-block-heading">
                  <div>
                    <span className="eyebrow">02 / GET WHAT YOU NEED</span>
                    <h3>Parts, tools & costs</h3>
                  </div>
                  <span>
                    {active.items.filter((item) => item.ready).length} of{" "}
                    {active.items.length} ready
                  </span>
                </div>
                <p className="planner-block-intro">
                  Add items from your guide or service quote. Enter the full
                  cost for each line in your chosen currency.
                </p>
                <div className="planner-budget-controls">
                  <label>
                    Currency
                    <select
                      aria-label="Currency"
                      value={active.currency}
                      onChange={(event) =>
                        update({
                          currency: event.target
                            .value as RepairPlan["currency"],
                        })
                      }
                    >
                      {["USD", "EUR", "GBP", "CAD", "AUD"].map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Budget limit
                    <input
                      type="number"
                      min="0"
                      max="999999999"
                      step="0.01"
                      value={active.budget}
                      onChange={(event) =>
                        update({ budget: event.target.value })
                      }
                      placeholder="Optional"
                    />
                  </label>
                  <p>
                    Changing currency keeps your entered amounts. It doesn’t
                    convert them.
                  </p>
                </div>
                {active.items.length ? (
                  <div className="planner-items">
                    {active.items.map((item) => (
                      <div className="planner-item" key={item.id}>
                        <label className="planner-item-ready">
                          <input
                            type="checkbox"
                            checked={item.ready}
                            aria-label={`Ready: ${item.name}`}
                            onChange={() =>
                              update({
                                items: active.items.map((row) =>
                                  row.id === item.id
                                    ? { ...row, ready: !row.ready }
                                    : row
                                ),
                              })
                            }
                          />
                          <span>Ready</span>
                        </label>
                        <div className="planner-item-description">
                          <input
                            aria-label={`Item name: ${item.name}`}
                            maxLength={300}
                            value={item.name}
                            onChange={(event) =>
                              update({
                                items: active.items.map((row) =>
                                  row.id === item.id
                                    ? { ...row, name: event.target.value }
                                    : row
                                ),
                              })
                            }
                          />
                          <span>
                            {item.kind === "labor"
                              ? "Service / labor"
                              : item.kind === "other"
                                ? "Other cost"
                                : item.kind === "part"
                                  ? "Part"
                                  : "Tool"}
                          </span>
                        </div>
                        <label className="planner-item-cost">
                          Cost ({active.currency})
                          <input
                            aria-label={`Cost: ${item.name}`}
                            type="number"
                            min="0"
                            max="999999999"
                            step="0.01"
                            placeholder="Not priced"
                            value={item.cost}
                            onChange={(event) =>
                              update({
                                items: active.items.map((row) =>
                                  row.id === item.id
                                    ? { ...row, cost: event.target.value }
                                    : row
                                ),
                              })
                            }
                          />
                        </label>
                        <button
                          aria-label={`Remove item: ${item.name}`}
                          onClick={() =>
                            update({
                              items: active.items.filter(
                                (row) => row.id !== item.id
                              ),
                            })
                          }
                        >
                          <LuTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="planner-empty-items">
                    No items yet. Start with a compatible replacement part, a
                    tool, or a service quote.
                  </p>
                )}
                <form
                  className="planner-add-row planner-add-item"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!itemName.trim()) return;
                    update({
                      items: [
                        ...active.items,
                        {
                          id: crypto.randomUUID(),
                          name: itemName.trim(),
                          kind: itemKind,
                          cost: "",
                          ready: false,
                        },
                      ],
                    });
                    setItemName("");
                  }}
                >
                  <input
                    aria-label="New item name"
                    placeholder="Part, tool, or service…"
                    maxLength={300}
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                  />
                  <select
                    aria-label="New item type"
                    value={itemKind}
                    onChange={(event) =>
                      setItemKind(event.target.value as ItemKind)
                    }
                  >
                    <option value="part">Part</option>
                    <option value="tool">Tool</option>
                    <option value="labor">Service / labor</option>
                    <option value="other">Other</option>
                  </select>
                  <button
                    className="secondary-button"
                    disabled={!itemName.trim()}
                  >
                    <LuPlus />
                    Add item
                  </button>
                </form>
                <div
                  className={`planner-cost-total ${totals!.overBudget ? "over-budget" : ""}`}
                  role="status"
                >
                  <span>
                    {totals!.overBudget
                      ? `${money(totals!.total - totals!.budget!)} over your budget`
                      : totals!.budget !== null
                        ? `${money(totals!.budget! - totals!.total)} remaining in your budget`
                        : "Total of entered costs"}
                    {totals!.missing > 0 && (
                      <small>Unpriced items aren’t included.</small>
                    )}
                  </span>
                  <strong>
                    {money(totals!.total)} <small>{active.currency}</small>
                  </strong>
                </div>
              </section>
              <section className="planner-block">
                <div className="planner-block-heading">
                  <div>
                    <span className="eyebrow">03 / KEEP THE DETAILS</span>
                    <h3>Guide & repair notes</h3>
                  </div>
                </div>
                <div className="planner-resource-links">
                  <a
                    href={safeGuideUrl(active.device.guide)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Find model repair guides
                    <LuArrowUpRight />
                  </a>
                  <a
                    href="https://support.apple.com/self-service-repair"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Apple repair resources
                    <LuArrowUpRight />
                  </a>
                  <Link to={`/device/${encodeURIComponent(active.device.id)}`}>
                    View device details
                    <LuArrowUpRight />
                  </Link>
                </div>
                <label className="planner-guide-label">
                  Your selected guide URL
                  <input
                    type="url"
                    placeholder="https://…"
                    maxLength={2000}
                    value={active.guideUrl}
                    onChange={(event) =>
                      update({ guideUrl: event.target.value })
                    }
                  />
                </label>
                {safeGuideUrl(active.guideUrl) ? (
                  <a
                    className="planner-selected-guide"
                    href={safeGuideUrl(active.guideUrl)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open your selected guide
                    <LuArrowUpRight />
                  </a>
                ) : (
                  active.guideUrl && (
                    <p className="planner-invalid-url">
                      Enter a complete http or https URL to open your guide.
                    </p>
                  )
                )}
                <label className="planner-notes-label">
                  Symptoms, compatibility checks, quotes, and outcome
                  <textarea
                    rows={5}
                    maxLength={10000}
                    value={active.notes}
                    placeholder="What’s wrong? Which part fits? What did you learn?"
                    onChange={(event) => update({ notes: event.target.value })}
                  />
                </label>
              </section>
              <div className="planner-plan-footer">
                <span>
                  Saved in this browser · Created{" "}
                  {new Date(active.createdAt).toLocaleDateString()}
                </span>
                {deleteId === active.id ? (
                  <div className="planner-delete-confirm">
                    <span>Remove this saved plan?</span>
                    <button
                      className="text-button"
                      onClick={() => setDeleteId(null)}
                    >
                      Keep plan
                    </button>
                    <button
                      className="text-button planner-delete"
                      onClick={() => {
                        setPlans((current) =>
                          current.filter((plan) => plan.id !== active.id)
                        );
                        newPlan();
                      }}
                    >
                      Delete permanently
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-button planner-delete"
                    onClick={() => setDeleteId(active.id)}
                  >
                    <LuTrash2 />
                    Delete plan
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
