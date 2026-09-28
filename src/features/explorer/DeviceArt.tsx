import { useId } from "react";
import type { CatalogDevice } from "./catalog";

export default function DeviceArt({
  device,
  exploded = false,
}: {
  device: Pick<CatalogDevice, "family" | "name" | "color">;
  exploded?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const palettes = {
    blue: ["#0c2735", "#3599af", "#a8e2e4"],
    purple: ["#26183d", "#8968c5", "#e3baf4"],
    gold: ["#492a20", "#d59b64", "#fae4ac"],
    green: ["#123b36", "#529887", "#c7dbac"],
    pink: ["#44283f", "#be759e", "#f5cbbb"],
    silver: ["#24323e", "#788d9e", "#d8e8ec"],
  };
  const colors = palettes[device.color];
  const isLaptop = device.family === "MacBook";
  return (
    <svg
      className={`device-art ${exploded ? "exploded-art" : ""}`}
      viewBox="0 0 400 260"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}metal`} x1="0" y1="0" x2="0.8" y2="1">
          <stop stopColor="#d8dadd" />
          <stop offset=".45" stopColor="#969ba0" />
          <stop offset="1" stopColor="#e4e6e7" />
        </linearGradient>
        <linearGradient id={`${id}wall`} x1="0" y1="1" x2="1" y2="0">
          <stop stopColor={colors[0]} />
          <stop offset=".6" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </linearGradient>
        <linearGradient id={`${id}wave`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={colors[2]} />
          <stop offset=".5" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[0]} />
        </linearGradient>
        <filter
          id={`${id}shadow`}
          x="-40%"
          y="-100%"
          width="180%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <clipPath id={`${id}screen`}>
          <rect x="65" y="36" width="270" height="170" rx="3" />
        </clipPath>
      </defs>
      <ellipse
        cx="200"
        cy="229"
        rx={isLaptop ? 154 : 87}
        ry="7"
        fill="#252829"
        opacity=".14"
        filter={`url(#${id}shadow)`}
      />
      {isLaptop ? (
        <g transform={exploded ? "translate(0 -17)" : "translate(0 0)"}>
          <rect
            x="57"
            y="27"
            width="286"
            height="189"
            rx="10"
            fill={`url(#${id}metal)`}
          />
          <rect x="60" y="30" width="280" height="184" rx="8" fill="#202226" />
          <g clipPath={`url(#${id}screen)`}>
            <rect
              x="65"
              y="36"
              width="270"
              height="170"
              fill={`url(#${id}wall)`}
            />
            <path
              d="M30 221C98 74 191 278 222 136S285-13 390 81V230Z"
              fill={`url(#${id}wave)`}
            />
            <path
              d="M31 220C103 72 188 264 218 135S293-4 391 82"
              fill="none"
              stroke={colors[2]}
              strokeWidth="2"
              opacity=".7"
            />
            <path
              d="M70 224C129 128 192 268 233 165S296 64 365 90"
              fill="none"
              stroke={colors[2]}
              strokeWidth="1"
              opacity=".25"
            />
          </g>
          <rect x="181" y="33" width="38" height="8" rx="3" fill="#202226" />
          <circle cx="200" cy="36" r="1.2" fill="#435e65" />
          <path
            d="M57 214H343L374 228Q375 232 365 234H35Q25 232 26 228Z"
            fill={`url(#${id}metal)`}
          />
          <path d="M26 228H374L368 233H32Z" fill="#a7acb0" />
          <path d="M172 214H228L225 218H175Z" fill="#8e9397" />
          {exploded && (
            <g transform="translate(0 36)">
              <path
                d="M57 214H343L369 231H30Z"
                fill="#d3d5d3"
                stroke="#a1a4a1"
              />
              <rect
                x="75"
                y="216"
                width="70"
                height="8"
                rx="1"
                fill="#3b443e"
              />
              <rect
                x="151"
                y="216"
                width="44"
                height="8"
                rx="1"
                fill="#353b38"
              />
              <rect
                x="202"
                y="216"
                width="124"
                height="8"
                rx="1"
                fill="#525553"
              />
              {[70, 330].map((x) => (
                <path
                  key={x}
                  d={`M${x} 209v-15`}
                  stroke="#8b928c"
                  strokeDasharray="2 3"
                />
              ))}
            </g>
          )}
        </g>
      ) : device.family === "Desktop" && /mini/i.test(device.name) ? (
        <g>
          <path
            d="M105 95Q105 82 121 79L266 62Q280 60 294 68L332 95V171Q332 182 315 186L151 209Q139 210 127 202L105 186Z"
            fill={`url(#${id}metal)`}
          />
          <path
            d="M105 95Q105 83 121 80L266 63Q280 61 294 69L327 94Q337 101 318 105L156 127Q143 129 129 121Z"
            fill="#d0d3d5"
          />
          <path d="M146 135v61" stroke="#999fa4" />
          <circle cx="310" cy="172" r="2" fill="white" />
          <text
            x="215"
            y="103"
            fontSize="22"
            textAnchor="middle"
            fill="#959b9e"
            fontFamily="sans-serif"
          >
            ●
          </text>
        </g>
      ) : device.family === "Desktop" ? (
        <g>
          <path d="M183 181h34l7 44h-49Z" fill={`url(#${id}metal)`} />
          <rect x="158" y="224" width="83" height="5" rx="3" fill="#a6bcb5" />
          <rect x="66" y="24" width="268" height="178" rx="7" fill="#a6c5b9" />
          <rect
            x="72"
            y="31"
            width="256"
            height="148"
            rx="2"
            fill={`url(#${id}wall)`}
          />
          <path
            d="M72 170Q125 46 204 114T328 60V179H72Z"
            fill={`url(#${id}wave)`}
          />
          <circle cx="200" cy="190" r="4" fill="#82a795" />
        </g>
      ) : (
        <g
          transform={
            device.family === "iPad" ? "translate(83 11)" : "translate(144 11)"
          }
        >
          <rect
            width={device.family === "iPad" ? 234 : 112}
            height="220"
            rx={device.family === "iPad" ? 12 : 20}
            fill={`url(#${id}metal)`}
          />
          <rect
            x="3"
            y="3"
            width={device.family === "iPad" ? 228 : 106}
            height="214"
            rx="18"
            fill="#22272c"
          />
          <rect
            x="8"
            y="12"
            width={device.family === "iPad" ? 218 : 96}
            height="196"
            rx="13"
            fill={`url(#${id}wall)`}
          />
          <ellipse
            cx={device.family === "iPad" ? 116 : 56}
            cy="118"
            rx={device.family === "iPad" ? 105 : 44}
            ry="79"
            fill={`url(#${id}wave)`}
          />
          <rect
            x={device.family === "iPad" ? 105 : 39}
            y="14"
            width="34"
            height="9"
            rx="5"
            fill="#1b2026"
          />
          <rect
            x={device.family === "iPad" ? 93 : 34}
            y="200"
            width="44"
            height="3"
            rx="2"
            fill="white"
            opacity=".7"
          />
        </g>
      )}
    </svg>
  );
}
