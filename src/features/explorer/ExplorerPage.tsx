import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { filterDevices, scoreLabel, type Filters } from "./catalog";
import { type SharedProps } from "./types";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuBookmark,
  LuChevronDown,
  LuCommand,
  LuInfo,
  LuLaptop,
  LuLayoutGrid,
  LuLeaf,
  LuList,
  LuMonitor,
  LuSearch,
  LuSlidersHorizontal,
  LuSmartphone,
  LuTablet,
  LuWrench,
  LuX,
} from "react-icons/lu";
import DeviceArt from "./DeviceArt";
import { DeviceCard } from "./DeviceCard";
import { CatalogError } from "./ui";

const families = [
  { name: "", label: "All devices", icon: LuLayoutGrid },
  { name: "MacBook", label: "MacBook", icon: LuLaptop },
  { name: "iPhone", label: "iPhone", icon: LuSmartphone },
  { name: "iPad", label: "iPad", icon: LuTablet },
  { name: "Desktop", label: "Mac desktops", icon: LuMonitor },
];

export function ExplorerPage({
  devices,
  saved,
  compare,
  toggleSave,
  toggleCompare,
  openScores,
  openIdentify,
  loading,
  source,
  error,
  retry,
  savedOnly = false,
}: SharedProps & {
  loading: boolean;
  source: string;
  error: string | null;
  retry: () => void;
  savedOnly?: boolean;
}) {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const filters: Filters = {
    query: params.get("q") ?? "",
    family: params.get("family") ?? "",
    score: params.get("score") ?? "",
    year: params.get("year") ?? "",
    chip: params.get("chip") ?? "",
    ram: params.get("ram") === "1",
    storage: params.get("storage") === "1",
    sort: params.get("sort") ?? "featured",
  };
  const list = params.get("view") === "list";
  const available = savedOnly
    ? devices.filter((d) => saved.includes(d.id))
    : devices;
  const results = filterDevices(available, filters);
  const pageCount = Math.max(1, Math.ceil(results.length / 6));
  const page = Math.min(
    pageCount,
    Math.max(1, Math.floor(Number(params.get("page"))) || 1)
  );
  const visible = results.slice((page - 1) * 6, page * 6);
  const pageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  ).filter(
    (number) =>
      number === 1 || number === pageCount || Math.abs(number - page) <= 1
  );
  const activeFilters = [
    filters.score,
    filters.year,
    filters.chip,
    filters.ram,
    filters.storage,
  ].filter(Boolean).length;
  const setFilter = (key: string, value: string, replace = false) => {
    // The address bar updates before a router transition finishes rendering.
    // Read it here so rapid filter changes cannot overwrite one another.
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page" && key !== "view") next.delete("page");
    setParams(next, { replace, preventScrollReset: true });
  };
  const reset = () => setParams({});
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const years = [...new Set(devices.map((d) => d.year).filter(Boolean))].sort(
    (a, b) => b - a
  );
  return (
    <>
      <section className={`hero ${savedOnly ? "saved-hero" : ""}`}>
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-cross">✳</span> LESS LANDFILL. MORE LIFE.
          </div>
          <h1>
            {savedOnly ? (
              <>
                Your next
                <br />
                <span>second chances.</span>
              </>
            ) : (
              <>
                Worth knowing.
                <br />
                Worth <span>repairing.</span>
              </>
            )}
          </h1>
          <p>
            {savedOnly ? (
              "The devices you’re keeping an eye on. Saved here, ready when you are."
            ) : (
              <>
                Find out how fixable your Apple device really is.
                <br className="desktop-break" /> Explore repairability, compare
                models, and make it last.
              </>
            )}
          </p>
        </div>
        <div className="hero-graphic" aria-hidden="true">
          <div className="diagram-grid" />
          <span className="diagram-label top-label">
            DESIGNED TO BE UNDERSTOOD.
          </span>
          <div className="diagram-orbit" />
          <DeviceArt
            device={{ family: "MacBook", name: "MacBook", color: "silver" }}
            exploded
          />
          <span className="diagram-callout callout-one">
            <span /> A LITTLE KNOW-HOW.
          </span>
          <span className="diagram-callout callout-two">
            <span /> A LOT MORE LIFE.
          </span>
          <div className="repair-stamp">
            <LuWrench />
            <span>
              REPAIR
              <br />
              IS A RIGHT.
            </span>
          </div>
          <span className="diagram-caption">
            OPEN IT UP. KEEP IT GOING. <LuArrowUpRight />
          </span>
        </div>
      </section>
      <section className="search-section" aria-label="Find a device">
        <form
          className="search-box"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            resultsRef.current?.focus({ preventScroll: true });
            resultsRef.current?.scrollIntoView({ block: "start" });
          }}
        >
          <LuSearch />
          <input
            ref={searchRef}
            aria-label="Search devices"
            placeholder="Search by device, model, or identifier…"
            value={filters.query}
            onChange={(e) => setFilter("q", e.target.value, true)}
          />
          {filters.query ? (
            <button
              className="icon-button"
              type="button"
              aria-label="Clear search"
              onClick={() => setFilter("q", "")}
            >
              <LuX />
            </button>
          ) : (
            <kbd>
              <LuCommand /> K
            </kbd>
          )}
          <button
            className="search-submit"
            type="submit"
            aria-label="Show matching devices"
          >
            <LuArrowRight />
          </button>
        </form>
        <div className="search-hint">
          <span>Try a search:</span>
          {["MacBook Air", "A2442", "2012"].map((q) => (
            <button
              key={q}
              onClick={() => {
                setParams({ q });
              }}
            >
              {q}
              <LuArrowUpRight />
            </button>
          ))}
          <button
            className="identify-link"
            aria-label="Find your device model"
            onClick={openIdentify}
          >
            Not sure which model? <LuInfo />
          </button>
        </div>
      </section>
      <nav className="family-tabs" aria-label="Device category">
        {families.map((f) => (
          <button
            key={f.label}
            aria-pressed={filters.family === f.name}
            className={filters.family === f.name ? "active" : ""}
            onClick={() => setFilter("family", f.name)}
          >
            <f.icon />
            {f.label}
            {!f.name && <span>{available.length}</span>}
          </button>
        ))}
      </nav>
      <div className="catalog-layout">
        <aside
          className={`filter-sidebar ${filtersOpen ? "mobile-open" : ""}`}
          aria-label="Device filters"
        >
          <div className="filter-heading">
            <h2>
              <LuSlidersHorizontal /> Filters{" "}
              {activeFilters > 0 && (
                <span className="count-badge">{activeFilters}</span>
              )}
            </h2>
            <button onClick={reset} className="text-button">
              Reset
            </button>
          </div>
          <fieldset>
            <legend>
              Repairability{" "}
              <button
                onClick={openScores}
                className="inline-icon"
                aria-label="How repairability scores work"
              >
                <LuInfo />
              </button>
            </legend>
            {[
              { value: "", label: "All scores", range: "" },
              { value: "easy", label: "More repairable", range: "7–10" },
              { value: "moderate", label: "Some challenges", range: "4–6" },
              { value: "hard", label: "Hard to repair", range: "0–3" },
            ].map((option) => (
              <label className="filter-option" key={option.value}>
                <input
                  type="radio"
                  name="score"
                  checked={filters.score === option.value}
                  onChange={() => setFilter("score", option.value)}
                />
                {option.value && (
                  <span className={`status-dot ${option.value}`} />
                )}
                <span>{option.label}</span>
                <span className="option-range">{option.range}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Release year</legend>
            <div className="select-wrap">
              <select
                aria-label="Release year"
                value={filters.year}
                onChange={(e) => setFilter("year", e.target.value)}
              >
                <option value="">All years</option>
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <LuChevronDown />
            </div>
          </fieldset>
          <fieldset>
            <legend>Processor</legend>
            {[
              { value: "", label: "All processors" },
              { value: "silicon", label: "Apple silicon" },
              { value: "intel", label: "Intel" },
            ].map((option) => (
              <label className="filter-option" key={option.value}>
                <input
                  type="radio"
                  name="chip"
                  checked={filters.chip === option.value}
                  onChange={() => setFilter("chip", option.value)}
                />
                {option.label}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Make room to grow</legend>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.ram}
                onChange={(e) => setFilter("ram", e.target.checked ? "1" : "")}
              />
              Upgradable memory
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.storage}
                onChange={(e) =>
                  setFilter("storage", e.target.checked ? "1" : "")
                }
              />
              Replaceable storage
            </label>
          </fieldset>
          <div className="sidebar-note">
            <LuLeaf />
            <h3>The greenest device?</h3>
            <p>
              The one you already own.
              <br />A repair can give it a whole new chapter.
            </p>
            <Link to="/about">
              Why repair matters <LuArrowUpRight />
            </Link>
          </div>
        </aside>
        <section
          className="results-section"
          ref={resultsRef}
          tabIndex={-1}
          aria-label="Device results"
        >
          <div className="results-toolbar">
            <div className="results-title">
              <h2>{savedOnly ? "Saved devices" : "Explore devices"}</h2>
              <span className="count-badge" aria-live="polite">
                {results.length}
              </span>
            </div>
            <div className="result-controls">
              <button
                className="mobile-filter-button"
                onClick={() => setFiltersOpen(!filtersOpen)}
                aria-expanded={filtersOpen}
              >
                <LuSlidersHorizontal />
                Filters{activeFilters ? ` (${activeFilters})` : ""}
              </button>
              <label className="sort-label">
                <span>Sort by:</span>
                <div className="select-wrap">
                  <select
                    aria-label="Sort devices"
                    value={filters.sort}
                    onChange={(e) => setFilter("sort", e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest first</option>
                    <option value="score">Most repairable</option>
                    <option value="lowest">Least repairable</option>
                  </select>
                  <LuChevronDown />
                </div>
              </label>
              <div className="view-switch">
                <button
                  aria-label="Grid view"
                  aria-pressed={!list}
                  className={!list ? "active" : ""}
                  onClick={() => setFilter("view", "")}
                >
                  <LuLayoutGrid />
                </button>
                <button
                  aria-label="List view"
                  aria-pressed={list}
                  className={list ? "active" : ""}
                  onClick={() => setFilter("view", "list")}
                >
                  <LuList />
                </button>
              </div>
            </div>
          </div>
          <div className="catalog-context">
            <span>
              <span
                className={`status-dot ${source === "live" ? "easy" : "neutral"}`}
              />
              {loading
                ? "Loading device catalog…"
                : error
                  ? "Device catalog unavailable"
                  : source === "live"
                    ? "Connected device catalog"
                    : "Reference catalog · Scores sourced from iFixit"}
            </span>
            <button onClick={openScores}>
              About the scores <LuArrowUpRight />
            </button>
          </div>
          {activeFilters > 0 && (
            <div className="active-filters">
              {[
                [
                  "score",
                  filters.score &&
                    scoreLabel(
                      filters.score === "easy"
                        ? 8
                        : filters.score === "moderate"
                          ? 5
                          : 2
                    ),
                ],
                ["year", filters.year],
                [
                  "chip",
                  filters.chip &&
                    (filters.chip === "silicon" ? "Apple silicon" : "Intel"),
                ],
                ["ram", filters.ram && "Upgradable memory"],
                ["storage", filters.storage && "Replaceable storage"],
              ]
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <button
                    key={String(key)}
                    onClick={() => setFilter(String(key), "")}
                  >
                    {value}
                    <LuX />
                  </button>
                ))}
            </div>
          )}
          {loading ? (
            <div className="empty-state">
              <span className="loading-spinner" />
              <h3>Getting the details…</h3>
              <p>Loading the device catalog.</p>
            </div>
          ) : error ? (
            <CatalogError error={error} retry={retry} />
          ) : visible.length ? (
            <div className={`device-grid ${list ? "list-view" : ""}`}>
              {visible.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  saved={saved}
                  compare={compare}
                  toggleSave={toggleSave}
                  toggleCompare={toggleCompare}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              {savedOnly && !available.length ? <LuBookmark /> : <LuSearch />}
              <h3>
                {savedOnly && !available.length
                  ? "A little collection of possibilities."
                  : "No devices match just yet."}
              </h3>
              <p>
                {savedOnly && !available.length
                  ? "Tap the bookmark on any device to keep it here for later."
                  : "Try a different model, or clear a few filters to widen your search."}
              </p>
              {savedOnly && !available.length ? (
                <Link to="/" className="primary-button">
                  Explore devices <LuArrowRight />
                </Link>
              ) : (
                <button onClick={reset} className="primary-button">
                  Clear all filters <LuArrowRight />
                </button>
              )}
            </div>
          )}
          {results.length > 0 && (
            <div className="pagination">
              <p>
                Showing {(page - 1) * 6 + 1}–
                {Math.min(page * 6, results.length)} of {results.length} devices
              </p>
              <div>
                <button
                  onClick={() => setFilter("page", String(page - 1))}
                  disabled={page <= 1}
                  aria-label="Previous page"
                >
                  <LuArrowLeft />
                </button>
                {pageNumbers.map((number, index) => (
                  <span className="page-number" key={number}>
                    {index > 0 && number - pageNumbers[index - 1] > 1 && (
                      <span className="pagination-gap" aria-hidden="true">
                        …
                      </span>
                    )}
                    <button
                      className={page === number ? "active" : ""}
                      aria-label={`Page ${number}`}
                      aria-current={page === number ? "page" : undefined}
                      onClick={() => setFilter("page", String(number))}
                    >
                      {number}
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setFilter("page", String(page + 1))}
                  disabled={page >= pageCount}
                  aria-label="Next page"
                >
                  <LuArrowRight />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      <section className="bottom-callout">
        <div className="callout-icon">
          <LuWrench />
        </div>
        <div>
          <h2>A little knowledge. A longer life.</h2>
          <p>Understand your device before the first screw comes out.</p>
        </div>
        <Link to="/guides">
          Find your starting point <LuArrowUpRight />
        </Link>
      </section>
    </>
  );
}
