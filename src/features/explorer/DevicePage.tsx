import { Link, useParams } from "react-router-dom";
import { scoreLabel, upgradeLabel } from "./catalog";
import { type SharedProps } from "./types";
import { Score, ScoreBars, NotFound } from "./ui";
import {
  LuArrowLeft,
  LuArrowUpRight,
  LuBattery,
  LuBookOpen,
  LuBookmark,
  LuCheck,
  LuCpu,
  LuGitCompareArrows,
  LuHardDrive,
  LuInfo,
} from "react-icons/lu";
import DeviceArt from "./DeviceArt";

export function DevicePage({
  devices,
  saved,
  compare,
  toggleSave,
  toggleCompare,
  openScores,
}: SharedProps) {
  const { model_identifier } = useParams();
  const device = devices.find(
    (d) =>
      d.id === model_identifier ||
      d.identifier === model_identifier ||
      d.model === model_identifier
  );
  if (!device) return <NotFound title="We couldn’t find that device." />;
  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        <LuArrowLeft />
        Back to all devices
      </Link>
      <div className="detail-main">
        <div className={`detail-art device-visual ${device.color}`}>
          <span className="eyebrow">THE DEVICE FILE / {device.model}</span>
          <DeviceArt device={device} />
          <span className="art-footnote">
            Device illustration · {device.family}
          </span>
        </div>
        <div className="detail-summary">
          <span className="eyebrow">
            {device.family.toUpperCase()} / {device.year || "YEAR UNKNOWN"}
          </span>
          <h1>{device.name}</h1>
          <p className="detail-subtitle">{device.subtitle}</p>
          <p className="model-identifier">
            {device.identifier ?? device.id} <span>·</span> {device.model}
          </p>
          <div className="detail-score">
            <Score score={device.score} large />
            <div>
              <h3>{scoreLabel(device.score)}</h3>
              <ScoreBars score={device.score} />
              <button className="text-button" onClick={openScores}>
                What does this score mean? <LuInfo />
              </button>
            </div>
          </div>
          <div className="detail-actions">
            <button
              className="primary-button"
              onClick={() => toggleCompare(device.id)}
              disabled={!compare.includes(device.id) && compare.length >= 3}
            >
              {compare.includes(device.id) ? (
                <LuCheck />
              ) : (
                <LuGitCompareArrows />
              )}
              {compare.includes(device.id)
                ? "Added to comparison"
                : "Compare this device"}
            </button>
            <button
              className="secondary-button"
              onClick={() => toggleSave(device.id)}
              aria-pressed={saved.includes(device.id)}
            >
              <LuBookmark />
              {saved.includes(device.id) ? "Saved" : "Save device"}
            </button>
          </div>
        </div>
      </div>
      <div className="detail-lower">
        <section>
          <span className="eyebrow">UNDER THE SURFACE</span>
          <h2>What you should know.</h2>
          <div className="spec-grid">
            {[
              { icon: LuCpu, title: "Memory", value: upgradeLabel(device.ram) },
              {
                icon: LuHardDrive,
                title: "Storage",
                value: upgradeLabel(device.storage),
              },
              {
                icon: LuBattery,
                title: "Battery access",
                value: device.battery,
              },
            ].map((item) => (
              <div key={item.title}>
                <item.icon />
                <span>{item.title}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <ul className="repair-notes">
            {device.notes.map((note) => (
              <li key={note}>
                <LuInfo />
                {note}
              </li>
            ))}
          </ul>
        </section>
        <aside className="resource-card">
          <LuBookOpen />
          <h2>Ready to take a closer look?</h2>
          <p>
            Find tools, replacement steps, and model-specific advice in the
            repair guides.
          </p>
          <a
            href={device.guide}
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            Explore repair guides <LuArrowUpRight />
          </a>
          {device.source ? (
            <a
              className="source-link"
              href={device.source}
              target="_blank"
              rel="noreferrer"
            >
              Score source: iFixit <LuArrowUpRight />
            </a>
          ) : (
            <p className="source-link">
              Score supplied by the connected catalog.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
