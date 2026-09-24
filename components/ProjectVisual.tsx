import type { Project } from "@/content/projects";

/**
 * The picture on a resting project card: a small drawing of what the product
 * is, not another copy of its numbers. The numbers already live in Experience
 * and in the case study's before/after tiles.
 *
 * Decorative, so aria-hidden: the gist beside it says the same in words. The
 * motion is CSS (`.pv-*` in globals.css), keyed to the card's Reveal wrapper
 * arriving on screen, and it rests on the finished drawing under reduced
 * motion or with scripting off.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const scene = SCENES[project.visual];

  return (
    <figure
      aria-hidden="true"
      className="w-full shrink-0 overflow-hidden rounded-2xl border border-rule bg-paper/70 sm:w-64"
    >
      <svg
        viewBox="0 0 256 168"
        className="block h-auto w-full font-display"
        fill="none"
      >
        {scene.art}
      </svg>
      <figcaption className="flex items-center justify-between gap-3 border-t border-rule px-3.5 py-2.5 font-display text-[0.625rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
        <span className="whitespace-nowrap">{scene.caption}</span>
        <span className="flex items-center gap-2.5 whitespace-nowrap">
          {scene.legend}
        </span>
      </figcaption>
    </figure>
  );
}

/** The published history, shared by the drawn line and the marks riding it. */
const CURVE = "M16 96 C 40 90, 52 64, 76 70 S 112 94, 134 70 S 160 40, 176 48";

/** Other series published beside it, drawn quieter behind the lead curve. */
const SERIES = [
  {
    d: "M16 108 C 44 104, 60 86, 84 92 S 120 106, 142 92 S 164 76, 176 80",
    className: "stroke-teal/45",
  },
  {
    d: "M16 62 C 38 70, 58 50, 82 56 S 118 40, 140 50 S 166 62, 176 60",
    className: "stroke-teal/25",
  },
];

function Key({ dashed, dot }: { dashed?: boolean; dot?: boolean }) {
  if (dot) return <span className="h-2 w-2 rounded-[2px] bg-teal" />;
  return (
    <span
      className={`h-0 w-3 border-t-2 border-teal ${dashed ? "border-dashed" : ""}`}
    />
  );
}

const SCENES: Record<
  Project["visual"],
  { caption: string; legend: React.ReactNode; art: React.ReactNode }
> = {
  // Published timeseries: a lead curve over two quieter series, the forecast
  // dashed past "now" inside its band, and ingest volume as bars along the
  // floor.
  timeseries: {
    caption: "Curves",
    legend: (
      <>
        <span className="inline-flex items-center gap-1.5">
          <Key /> Timeseries
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Key dashed /> Forecast
        </span>
      </>
    ),
    art: (
      <>
        {[36, 72, 108].map((y) => (
          <line
            key={y}
            x1="16"
            x2="240"
            y1={y}
            y2={y}
            className="stroke-rule"
            strokeWidth="1"
          />
        ))}
        {/* Ingest volume, always moving a little: each bar reveals on its
            outer group and pulses on its inner rect, so the two motions
            never fight over one transform. */}
        {[12, 20, 9, 26, 16, 22, 30, 14, 24, 18, 28, 20, 12, 26].map((h, i) => (
          <g
            key={i}
            className="pv-bar"
            style={{ "--k": i } as React.CSSProperties}
          >
            <rect
              x={18 + i * 11}
              y={148 - h}
              width="6"
              height={h}
              rx="2"
              className="pv-eq fill-rule"
            />
          </g>
        ))}
        <path
          d="M16 96 C 40 90, 52 64, 76 70 S 112 94, 134 70 S 160 40, 176 48 L 176 118 L 16 118 Z"
          className="pv-fade fill-teal/10"
        />
        <g className="pv-fade pv-late">
          <path
            d="M176 48 C 196 40, 212 30, 240 24 L 240 58 C 212 60, 196 62, 176 48 Z"
            className="pv-breathe fill-teal/15"
          />
        </g>
        {SERIES.map((series, i) => (
          <path
            key={series.d}
            d={series.d}
            pathLength="1"
            className={`pv-draw ${series.className}`}
            strokeWidth="1.75"
            strokeLinecap="round"
            style={{ "--k": i + 1 } as React.CSSProperties}
          />
        ))}
        <path
          d={CURVE}
          pathLength="1"
          className="pv-draw stroke-teal"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M176 48 C 196 44, 212 38, 240 38"
          className="pv-fade pv-late pv-march stroke-teal"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        {/* Fresh data running along every series into "now". */}
        <g className="pv-fade pv-late">
          {[CURVE, CURVE, ...SERIES.map((series) => series.d)].map((d, k) => (
            <circle
              key={k}
              r={k < 2 ? 2.5 : 2}
              className={`pv-packet ${k < 2 ? "fill-teal" : "fill-teal/60"}`}
              style={
                { "--k": k, offsetPath: `path("${d}")` } as React.CSSProperties
              }
            />
          ))}
        </g>
        <line
          x1="176"
          x2="176"
          y1="18"
          y2="118"
          className="stroke-ink-faint/50"
          strokeDasharray="2 3"
        />
        <rect
          x="160"
          y="6"
          width="32"
          height="14"
          rx="7"
          className="fill-teal"
        />
        <text
          x="176"
          y="16"
          textAnchor="middle"
          className="fill-on-teal text-[8px] font-bold tracking-[0.08em]"
        >
          NOW
        </text>
        <circle
          cx="176"
          cy="48"
          r="4"
          className="pv-pulse stroke-teal"
          strokeWidth="1.5"
        />
        <circle
          cx="176"
          cy="48"
          r="4"
          className="pv-pop fill-paper-raised stroke-teal"
          strokeWidth="2.5"
        />
        {/* Under the pointer, a crosshair reads along the curve. */}
        <clipPath id="pv-plot">
          <rect x="16" y="22" width="160" height="96" />
        </clipPath>
        <g clipPath="url(#pv-plot)">
          <g className="pv-scan">
            <line
              x1="0"
              x2="0"
              y1="-100"
              y2="100"
              className="stroke-teal/50"
              strokeDasharray="2 3"
            />
            <rect
              x="-18"
              y="-22"
              width="36"
              height="13"
              rx="6.5"
              className="fill-ink"
            />
            <rect
              x="-11"
              y="-17.5"
              width="22"
              height="4"
              rx="2"
              className="fill-paper-raised/70"
            />
            <circle
              r="4"
              className="fill-teal stroke-paper-raised"
              strokeWidth="2"
            />
          </g>
        </g>
      </>
    ),
  },

  // Operators' routes on one platform: the teal route is one tenant, the
  // dashed ones are the others. A bus runs the line while the card is under
  // the pointer, and a seat map fills under it.
  routes: {
    caption: "Routes, seats",
    legend: (
      <>
        <span className="inline-flex items-center gap-1.5">
          <Key dot /> Booked
        </span>
      </>
    ),
    art: (
      <>
        <path
          d="M16 30 C 70 10, 110 70, 240 34"
          className="stroke-rule"
          strokeWidth="2"
          strokeDasharray="3 5"
          strokeLinecap="round"
        />
        <path
          d="M16 100 C 80 110, 150 40, 240 96"
          className="stroke-rule"
          strokeWidth="2"
          strokeDasharray="3 5"
          strokeLinecap="round"
        />
        <path
          d="M20 72 C 60 40, 100 96, 138 62 S 206 44, 236 66"
          pathLength="1"
          className="pv-draw stroke-teal"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {[
          [20, 72],
          [82, 66],
          [138, 62],
          [236, 66],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            className="pv-pop fill-paper-raised stroke-teal"
            strokeWidth="2.5"
            style={{ "--k": i } as React.CSSProperties}
          />
        ))}
        <g className="pv-bus">
          <rect
            x="-11"
            y="-7"
            width="22"
            height="14"
            rx="4"
            className="fill-teal"
          />
          <rect
            x="-7"
            y="-4"
            width="5"
            height="4"
            rx="1"
            className="fill-on-teal/80"
          />
          <rect
            x="1"
            y="-4"
            width="5"
            height="4"
            rx="1"
            className="fill-on-teal/80"
          />
        </g>
        {Array.from({ length: 20 }, (_, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const booked = [0, 1, 3, 4, 7, 10, 12, 13, 16, 18].includes(i);
          return (
            <rect
              key={i}
              x={34 + col * 19 + (col >= 5 ? 6 : 0)}
              y={120 + row * 20}
              width="14"
              height="14"
              rx="3.5"
              className={booked ? "pv-seat fill-teal" : "fill-none stroke-rule"}
              strokeWidth="1.5"
              style={{ "--k": i } as React.CSSProperties}
            />
          );
        })}
      </>
    ),
  },

  // The suite as one app window: signed in once (the avatar and its tick),
  // the four products in the sidebar, and the open one on the right. The
  // highlight steps through the products while the card is under the pointer.
  hub: {
    caption: "One sign-on",
    legend: <span>4 products</span>,
    art: (
      <>
        <rect
          x="12"
          y="10"
          width="232"
          height="148"
          rx="12"
          className="fill-paper-raised stroke-rule"
          strokeWidth="1.5"
        />
        <line x1="12" x2="244" y1="32" y2="32" className="stroke-rule" />
        {[26, 35, 44].map((cx) => (
          <circle key={cx} cx={cx} cy="21" r="2.5" className="fill-rule" />
        ))}
        {/* Signed in: a key pill, then the one account with its tick. */}
        <g className="pv-pop">
          <rect
            x="176"
            y="14"
            width="36"
            height="14"
            rx="7"
            className="fill-teal-wash"
          />
          <g
            className="stroke-teal"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="186" cy="21" r="2.75" />
            <path d="M188.75 21 H196 M194 21 V23.5" />
          </g>
          <text
            x="199"
            y="23.5"
            className="fill-teal text-[6.5px] font-bold tracking-[0.06em]"
          >
            SSO
          </text>
        </g>
        <circle cx="226" cy="21" r="6.5" className="fill-teal" />
        <circle cx="226" cy="19.5" r="2.25" className="fill-on-teal" />
        <path d="M222 25 a4 3 0 0 1 8 0" className="fill-on-teal" />

        <line x1="84" x2="84" y1="32" y2="158" className="stroke-rule" />
        <rect
          x="18"
          y="118"
          width="60"
          height="22"
          rx="7"
          className="pv-tab fill-teal-wash"
        />
        {[
          {
            label: "CRM",
            icon: "M27 56 a4 4 0 0 1 8 0 M31 49.5 m-2.25 0 a2.25 2.25 0 1 0 4.5 0 a2.25 2.25 0 1 0 -4.5 0",
          },
          {
            label: "Ads",
            icon: "M26 74 V78 H29 L35 81 V71 L29 74 Z M37 74.5 V77.5",
          },
          {
            label: "URLs",
            icon: "M29.5 103 L26.5 106 a2 2 0 0 0 3 3 L32.5 106 M32.5 103 L35.5 100 a2 2 0 0 0 -3 -3 L29.5 100 M29.5 106 L32.5 103",
          },
          { label: "Reports", icon: "M27 136 V132 M31 136 V127 M35 136 V130" },
        ].map((item, i) => (
          <g key={item.label}>
            <path
              d={item.icon}
              className="stroke-teal"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="42"
              y={54.5 + i * 26}
              className="fill-ink-soft text-[8.5px] font-semibold"
            >
              {item.label}
            </text>
          </g>
        ))}

        {/* The open product: two figure tiles over a bar chart. */}
        {[96, 172].map((x, i) => (
          <g
            key={x}
            className="pv-row"
            style={{ "--k": i } as React.CSSProperties}
          >
            <rect
              x={x}
              y="42"
              width="64"
              height="30"
              rx="8"
              className="fill-paper stroke-rule"
            />
            <rect
              x={x + 8}
              y="49"
              width="26"
              height="4"
              rx="2"
              className="fill-ink-faint/35"
            />
            <rect
              x={x + 8}
              y="58"
              width={i ? 30 : 38}
              height="7"
              rx="3.5"
              className="fill-teal"
            />
          </g>
        ))}
        <line x1="96" x2="236" y1="148" y2="148" className="stroke-rule" />
        {[22, 34, 28, 44, 38, 52, 46, 60].map((h, i) => (
          <rect
            key={i}
            x={100 + i * 17}
            y={148 - h}
            width="10"
            height={h}
            rx="3"
            className={`pv-bar ${i === 7 ? "fill-teal" : "fill-teal/35"}`}
            style={{ "--k": i } as React.CSSProperties}
          />
        ))}
      </>
    ),
  },

  // One search box over three products: documents, TB cases, hotel rooms.
  // The best match rises to the top in teal.
  search: {
    caption: "One search",
    legend: <span>3 products</span>,
    art: (
      <>
        <rect
          x="16"
          y="14"
          width="224"
          height="30"
          rx="15"
          className="fill-paper-raised stroke-rule"
          strokeWidth="1.5"
        />
        <g className="stroke-teal" strokeWidth="2" strokeLinecap="round">
          <circle cx="36" cy="28.5" r="5.5" />
          <path d="M40 32.5 L44 36.5" />
        </g>
        <rect
          x="54"
          y="25"
          width="64"
          height="7"
          rx="3.5"
          className="fill-ink-faint/35"
        />
        <rect
          x="120"
          y="21"
          width="1.5"
          height="15"
          className="pv-caret fill-teal"
        />
        {[
          { y: 56, hit: true, icon: "doc" },
          { y: 92, hit: false, icon: "cross" },
          { y: 128, hit: false, icon: "bed" },
        ].map((row, i) => (
          <g
            key={row.icon}
            className="pv-row"
            style={{ "--k": i } as React.CSSProperties}
          >
            <rect
              x="16"
              y={row.y}
              width="224"
              height="30"
              rx="10"
              className={
                row.hit
                  ? "fill-teal-wash stroke-teal/40"
                  : "fill-paper-raised stroke-rule"
              }
              strokeWidth="1.5"
            />
            <rect
              x="26"
              y={row.y + 7}
              width="16"
              height="16"
              rx="4"
              className={row.hit ? "fill-teal" : "fill-rule"}
            />
            <g
              className={row.hit ? "stroke-on-teal" : "stroke-ink-faint"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {row.icon === "doc" ? (
                <path
                  d={`M31 ${row.y + 11} H37 M31 ${row.y + 15} H37 M31 ${row.y + 19} H35`}
                />
              ) : row.icon === "cross" ? (
                <path
                  d={`M34 ${row.y + 10} V${row.y + 20} M29 ${row.y + 15} H39`}
                />
              ) : (
                <path
                  d={`M29 ${row.y + 19} V${row.y + 12} M29 ${row.y + 16} H39 V${row.y + 19} M32 ${row.y + 14} H35`}
                />
              )}
            </g>
            <rect
              x="52"
              y={row.y + 9}
              width={row.hit ? 96 : 80}
              height="5"
              rx="2.5"
              className={row.hit ? "fill-teal" : "fill-ink-faint/40"}
            />
            <rect
              x="52"
              y={row.y + 18}
              width={row.hit ? 132 : 112}
              height="4"
              rx="2"
              className="fill-ink-faint/25"
            />
            {row.hit ? (
              <rect
                x="196"
                y={row.y + 9}
                width="34"
                height="12"
                rx="6"
                className="fill-teal/15"
              />
            ) : null}
          </g>
        ))}
      </>
    ),
  },
};
