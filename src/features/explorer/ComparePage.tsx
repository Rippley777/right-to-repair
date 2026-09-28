import { type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { scoreLabel, upgradeLabel, type CatalogDevice } from "./catalog";
import { type SharedProps } from "./types";
import { Score } from "./ui";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuGitCompareArrows,
  LuInfo,
  LuX,
} from "react-icons/lu";
import DeviceArt from "./DeviceArt";

export function ComparePage({ devices, compare, toggleCompare }: SharedProps) {
  const [params] = useSearchParams();
  const requested = params.get("ids");
  const ids = requested !== null ? requested.split("|").slice(0, 3) : compare;
  const chosen = ids
    .map((id) => devices.find((d) => d.id === id))
    .filter((d): d is CatalogDevice => Boolean(d));
  const rows: { label: string; render: (d: CatalogDevice) => ReactNode }[] = [
    {
      label: "Repairability",
      render: (d) => (
        <>
          <Score score={d.score} />
          <span className="comparison-score-label">{scoreLabel(d.score)}</span>
        </>
      ),
    },
    { label: "Release year", render: (d) => d.year || "Unknown" },
    { label: "Processor", render: (d) => d.chip },
    { label: "Memory", render: (d) => upgradeLabel(d.ram) },
    { label: "Storage", render: (d) => upgradeLabel(d.storage) },
    { label: "Battery access", render: (d) => d.battery },
    { label: "Model number", render: (d) => d.model || "Unknown" },
    {
      label: "Repair resources",
      render: (d) => (
        <a
          className="source-link"
          href={d.guide}
          target="_blank"
          rel="noreferrer"
        >
          View guides <LuArrowUpRight />
        </a>
      ),
    },
    {
      label: "Score source",
      render: (d) =>
        d.source ? (
          <a
            className="source-link"
            href={d.source}
            target="_blank"
            rel="noreferrer"
          >
            iFixit <LuArrowUpRight />
          </a>
        ) : (
          "Connected catalog"
        ),
    },
  ];
  return (
    <div className="content-page">
      <Link to="/" className="back-link">
        <LuArrowLeft />
        Back to all devices
      </Link>
      <span className="eyebrow">THE SIDE-BY-SIDE</span>
      <h1>
        Same question.
        <br />
        <span>Different answers.</span>
      </h1>
      <p className="page-intro">
        See where each device stands, from the battery to the board.
      </p>
      {chosen.length >= 2 ? (
        <>
          <div className="comparison-scroll">
            <table className="comparison-table">
              <caption className="sr-only">
                Device repairability comparison
              </caption>
              <thead>
                <tr>
                  <th scope="col">The details that matter</th>
                  {chosen.map((d) => (
                    <th scope="col" key={d.id}>
                      <DeviceArt device={d} />
                      <Link to={`/device/${encodeURIComponent(d.id)}`}>
                        <h2>{d.name}</h2>
                      </Link>
                      <p>{d.subtitle}</p>
                      {requested === null && (
                        <button
                          className="text-button"
                          onClick={() => toggleCompare(d.id)}
                        >
                          Remove <LuX />
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {chosen.map((d) => (
                      <td key={d.id}>{row.render(d)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="comparison-note">
            <LuInfo />
            Scoring methods change over time. Check each source before comparing
            devices from different generations.
          </p>
        </>
      ) : (
        <div className="empty-state">
          <LuGitCompareArrows />
          <h3>It takes two to compare.</h3>
          <p>
            Select two or three devices using the Compare button on any device
            card.
          </p>
          <Link to="/" className="primary-button">
            Choose devices <LuArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
