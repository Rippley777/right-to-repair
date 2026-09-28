import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { type CatalogDevice } from "./catalog";
import { Score, Modal, NotFound, CatalogError } from "./ui";
import { GuidesPage, AboutPage } from "./InfoPages";
import { useCatalog } from "./useCatalog";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuBookmark,
  LuCheck,
  LuGitCompareArrows,
  LuLaptop,
  LuSearch,
  LuSmartphone,
  LuWrench,
  LuX,
} from "react-icons/lu";
import { ExplorerPage } from "./ExplorerPage";
import { DevicePage } from "./DevicePage";
import { ComparePage } from "./ComparePage";

function useStoredIds(key: string) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const value = JSON.parse(localStorage.getItem(key) ?? "[]");
      return Array.isArray(value)
        ? value.filter((id): id is string => typeof id === "string")
        : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(ids));
    } catch {
      /* Browsing still works when storage is unavailable. */
    }
  }, [ids, key]);
  return [ids, setIds] as const;
}
export default function Workspace() {
  const { devices, loading, source, error, retry } = useCatalog();
  const catalogStatus = loading ? (
    <div className="empty-state">Loading device catalog…</div>
  ) : error ? (
    <CatalogError error={error} retry={retry} />
  ) : null;
  const [saved, setSaved] = useStoredIds("right-to-repair:saved");
  const [storedCompare, setCompare] = useStoredIds("right-to-repair:compare");
  const compare = storedCompare
    .filter((id) => devices.some((device) => device.id === id))
    .slice(0, 3);
  const [modal, setModal] = useState<"scores" | "identify" | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);
  const toggleSave = (id: string) => {
    const alreadySaved = saved.includes(id);
    setSaved((current) =>
      alreadySaved ? current.filter((x) => x !== id) : [...current, id]
    );
    setAnnouncement(
      alreadySaved ? "Device removed from saved devices." : "Device saved."
    );
  };
  const toggleCompare = (id: string) => {
    const selected = compare.includes(id);
    setCompare(
      selected
        ? compare.filter((x) => x !== id)
        : compare.length < 3
          ? [...compare, id]
          : compare
    );
    setAnnouncement(
      selected
        ? "Device removed from comparison."
        : "Device added to comparison."
    );
  };
  const openScores = () => setModal("scores");
  const shared = {
    devices,
    saved,
    compare,
    toggleSave,
    toggleCompare,
    openScores,
    openIdentify: () => setModal("identify"),
  };
  const selectedDevices = compare
    .map((id) => devices.find((d) => d.id === id))
    .filter((d): d is CatalogDevice => Boolean(d));
  useEffect(() => {
    if (!announcement) return;
    const timeout = window.setTimeout(() => setAnnouncement(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [announcement]);
  useEffect(() => {
    const path = location.pathname;
    const name = path.startsWith("/device/")
      ? (devices.find(
          (d) =>
            `/device/${encodeURIComponent(d.id)}` === path ||
            `/device/${d.id}` === path
        )?.name ?? "Device details")
      : ((
          {
            "/": "Explore devices",
            "/saved": "Saved devices",
            "/compare": "Compare devices",
            "/guides": "Repair resources",
            "/about": "About the project",
          } as Record<string, string>
        )[path] ?? "Explore devices");
    document.title = `${name} — Right to Repair`;
    if (previousPath.current !== path) {
      window.scrollTo(0, 0);
      mainRef.current?.focus({ preventScroll: true });
      previousPath.current = path;
    }
  }, [location.pathname, devices]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Right to Repair home">
            <span className="brand-icon">
              <LuWrench />
            </span>
            <span>
              right to repair<span className="brand-period">.</span>
            </span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Explore devices
            </NavLink>
            <NavLink to="/compare">
              Compare
              {selectedDevices.length > 0 && (
                <span className="nav-count">{selectedDevices.length}</span>
              )}
            </NavLink>
            <NavLink to="/guides">Repair resources</NavLink>
            <NavLink to="/about">
              Our mission <LuArrowUpRight />
            </NavLink>
          </nav>
          <NavLink to="/saved" className="saved-nav">
            <LuBookmark />
            <span>Saved</span>
            {saved.length > 0 && (
              <span className="nav-count">{saved.length}</span>
            )}
          </NavLink>
        </div>
      </header>
      <main id="main" className="main-container" tabIndex={-1} ref={mainRef}>
        <Routes>
          <Route
            path="/"
            element={
              <ExplorerPage
                {...shared}
                loading={loading}
                source={source}
                error={error}
                retry={retry}
              />
            }
          />
          <Route
            path="/saved"
            element={
              <ExplorerPage
                {...shared}
                loading={loading}
                source={source}
                error={error}
                retry={retry}
                savedOnly
              />
            }
          />
          <Route
            path="/devices"
            element={
              <ExplorerPage
                {...shared}
                loading={loading}
                source={source}
                error={error}
                retry={retry}
              />
            }
          />
          <Route
            path="/tables"
            element={
              <ExplorerPage
                {...shared}
                loading={loading}
                source={source}
                error={error}
                retry={retry}
              />
            }
          />
          <Route
            path="/device/:model_identifier"
            element={catalogStatus ?? <DevicePage {...shared} />}
          />
          <Route
            path="/compare"
            element={catalogStatus ?? <ComparePage {...shared} />}
          />
          <Route
            path="/charts"
            element={catalogStatus ?? <ComparePage {...shared} />}
          />
          <Route path="/guides" element={<GuidesPage />} />
          <Route
            path="/about"
            element={<AboutPage openScores={openScores} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div>
          <Link to="/" className="footer-brand">
            <LuWrench />
            right to repair.
          </Link>
          <p>For the things worth keeping.</p>
        </div>
        <span>Independent by design. Repair-minded by nature.</span>
        <button
          id="identify-link"
          className="text-button"
          onClick={() => setModal("identify")}
        >
          Find your model <LuArrowUpRight />
        </button>
      </footer>
      {selectedDevices.length > 0 &&
        !["/compare", "/charts"].includes(location.pathname) && (
          <div className="compare-tray">
            <span className="tray-heading">
              <LuGitCompareArrows />
              <strong>{selectedDevices.length}/3</strong>
              <span>selected</span>
            </span>
            <div className="tray-devices">
              {selectedDevices.map((d) => (
                <div key={d.id}>
                  <span>
                    {d.name}
                    <small>{d.year}</small>
                  </span>
                  <button
                    aria-label={`Remove ${d.name} ${d.year} from comparison`}
                    onClick={() => toggleCompare(d.id)}
                  >
                    <LuX />
                  </button>
                </div>
              ))}
            </div>
            <button className="tray-clear" onClick={() => setCompare([])}>
              Clear
            </button>
            {selectedDevices.length >= 2 ? (
              <Link className="primary-button" to="/compare">
                Compare devices <LuArrowRight />
              </Link>
            ) : (
              <span className="tray-prompt">Add one more to compare</span>
            )}
          </div>
        )}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
      {modal === "scores" && (
        <Modal
          title="A score is a starting point."
          onClose={() => setModal(null)}
        >
          <p>
            Repairability scores run from 0 to 10. A higher score generally
            means a device is easier to take apart, service, and put back
            together.
          </p>
          <div className="score-explainer">
            {[
              {
                score: 8,
                title: "7–10 · More repairable",
                text: "A more repair-friendly design, with fewer obstacles to common repairs.",
              },
              {
                score: 5,
                title: "4–6 · Some challenges",
                text: "Repairs are possible, with tradeoffs such as adhesive or soldered components.",
              },
              {
                score: 2,
                title: "0–3 · Hard to repair",
                text: "Significant barriers can make disassembly and part replacement difficult.",
              },
            ].map((item) => (
              <div key={item.score}>
                <Score score={item.score} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p>
            Scores are supplied by the connected device catalog. These browse
            labels help you explore them. Scoring methods evolve, so older and
            newer scores aren’t always directly comparable.
          </p>
          <a
            className="source-link"
            href="https://www.ifixit.com/repairability"
            target="_blank"
            rel="noreferrer"
          >
            Explore iFixit’s scoring methodology <LuArrowUpRight />
          </a>
        </Modal>
      )}
      {modal === "identify" && (
        <Modal
          title="Let’s find your exact model."
          onClose={() => setModal(null)}
        >
          <div className="identify-steps">
            <section>
              <LuLaptop />
              <h3>On a Mac</h3>
              <p>
                Open the Apple menu → About This Mac for the model and year.
                Open System Information → Hardware to find an identifier like{" "}
                <code>MacBookPro18,3</code>.
              </p>
            </section>
            <section>
              <LuSmartphone />
              <h3>On an iPhone or iPad</h3>
              <p>
                Go to Settings → General → About. Tap Model Number to reveal the
                A-number printed in our device cards.
              </p>
            </section>
            <section>
              <LuSearch />
              <h3>Can’t turn it on?</h3>
              <p>
                Look for the model number on the device’s enclosure or original
                packaging. An A-number can cover several configurations—check
                the year and specifications too.
              </p>
            </section>
          </div>
          <button className="primary-button" onClick={() => setModal(null)}>
            Got it <LuCheck />
          </button>
        </Modal>
      )}
    </div>
  );
}
