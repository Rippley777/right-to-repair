import { Link } from "react-router-dom";
import { scoreBand, scoreLabel, type CatalogDevice } from "./catalog";
import { type SharedProps } from "./types";
import { Score, ScoreBars } from "./ui";
import {
  LuArrowUpRight,
  LuBookmark,
  LuCheck,
  LuCpu,
  LuHardDrive,
  LuPlus,
} from "react-icons/lu";
import DeviceArt from "./DeviceArt";

export function DeviceCard({
  device,
  saved,
  compare,
  toggleSave,
  toggleCompare,
}: Pick<SharedProps, "saved" | "compare" | "toggleSave" | "toggleCompare"> & {
  device: CatalogDevice;
}) {
  const selected = compare.includes(device.id);
  const isSaved = saved.includes(device.id);
  return (
    <article className={`device-card ${selected ? "is-selected" : ""}`}>
      <div className={`device-visual ${device.color}`}>
        <span className="model-tag">{device.model || device.family}</span>
        <button
          className={`save-button ${isSaved ? "is-saved" : ""}`}
          onClick={() => toggleSave(device.id)}
          aria-pressed={isSaved}
          aria-label={`${isSaved ? "Unsave" : "Save"} ${device.name} ${device.year}`}
        >
          <LuBookmark />
        </button>
        <Link
          to={`/device/${encodeURIComponent(device.id)}`}
          className="art-link"
          aria-label={`View ${device.name} ${device.year}`}
        >
          <DeviceArt device={device} />
        </Link>
      </div>
      <div className="device-card-body">
        <div className="device-card-title">
          <div>
            <Link to={`/device/${encodeURIComponent(device.id)}`}>
              <h3>{device.name}</h3>
            </Link>
            <p>{device.subtitle}</p>
          </div>
          <Score score={device.score} />
        </div>
        <div className="repair-status">
          <span className={`status-dot ${scoreBand(device.score)}`} />
          {scoreLabel(device.score)}
          <ScoreBars score={device.score} />
        </div>
        <div className="component-tags">
          <span>
            <LuCpu />
            {device.ram === null
              ? "RAM unknown"
              : device.ram
                ? "RAM upgradable"
                : "RAM soldered"}
          </span>
          <span>
            <LuHardDrive />
            {device.storage === null
              ? "SSD unknown"
              : device.storage
                ? "Storage replaceable"
                : "Storage soldered"}
          </span>
        </div>
      </div>
      <div className="device-card-footer">
        <button
          className={`compare-button ${selected ? "selected" : ""}`}
          onClick={() => toggleCompare(device.id)}
          aria-pressed={selected}
          disabled={!selected && compare.length >= 3}
        >
          {selected ? <LuCheck /> : <LuPlus />}
          {selected ? "Added to compare" : "Compare"}
        </button>
        <Link
          to={`/device/${encodeURIComponent(device.id)}`}
          aria-label={`Details for ${device.name} ${device.year}`}
        >
          View device <LuArrowUpRight />
        </Link>
      </div>
    </article>
  );
}
