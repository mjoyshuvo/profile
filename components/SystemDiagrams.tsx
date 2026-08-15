import type { ReactElement } from "react";
import type { DiagramKey } from "@/content/projects";

/**
 * One small line drawing per case study — the shape of the system, not a
 * faithful architecture diagram.
 *
 * Every one of these is decorative: the prose beside it already says what it
 * shows, so they're `aria-hidden` and contribute nothing to the accessible
 * name. Colour comes only from `currentColor`, set by a Tailwind `text-*`
 * utility on a wrapping <g>. That keeps them inside the palette tokens in both
 * themes without a single hex value — see design constraint 5 in README.md.
 *
 * Fixed viewBox plus a fixed height class means they can't reflow, so they
 * cost nothing in CLS.
 */

const shared = {
  viewBox: "0 0 240 96",
  className: "h-20 w-full sm:h-24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
  "aria-hidden": true,
  // Keeps the SVG out of the tab order in older IE-derived engines; harmless
  // everywhere else.
  focusable: false as const,
};

/** Sources fan in, transform, timeseries curves fan out. */
function PipelineDiagram() {
  return (
    <svg {...shared}>
      <g className="text-ink-faint">
        {[20, 48, 76].map((y) => (
          <rect key={y} x="8" y={y - 7} width="26" height="14" rx="3" />
        ))}
        {[20, 48, 76].map((y) => (
          <path key={y} d={`M34 ${y} C58 ${y}, 60 48, 78 48`} />
        ))}
      </g>

      <g className="text-teal">
        <rect x="78" y="34" width="30" height="28" rx="4" />
        <path d="M86 48h14M93 41v14" />
        <path d="M108 48h16" />
      </g>

      {/* Published curves — the thing the pipelines actually produce. */}
      <g className="text-teal">
        <path d="M124 62 C146 34, 168 70, 190 40 C206 18, 220 34, 232 26" />
      </g>
      <g className="text-ink-faint">
        <path d="M124 72 C148 56, 166 78, 190 60 C208 47, 220 58, 232 52" />
        <path d="M124 82 C150 76, 168 86, 192 78 C210 72, 222 80, 232 76" />
      </g>
    </svg>
  );
}

/** An agent reading real systems through a tool layer, rather than guessing. */
function AgentDiagram() {
  return (
    <svg {...shared}>
      <g className="text-teal">
        <rect x="10" y="34" width="44" height="28" rx="6" />
        <circle cx="24" cy="48" r="2.5" />
        <circle cx="34" cy="48" r="2.5" />
        <circle cx="44" cy="48" r="2.5" />
        <path d="M54 48h24" />
        {/* The tool layer: the only thing between the agent and the systems. */}
        <rect x="78" y="30" width="34" height="36" rx="5" />
        <path d="M87 42h16M87 48h16M87 54h10" />
      </g>

      <g className="text-ink-faint">
        <path d="M112 48 C132 48, 134 20, 156 20" />
        <path d="M112 48h44" />
        <path d="M112 48 C132 48, 134 76, 156 76" />
        {[20, 48, 76].map((y) => (
          <rect key={y} x="156" y={y - 9} width="42" height="18" rx="4" />
        ))}
      </g>
    </svg>
  );
}

/** Many tenants, one boundary, shared services behind it. */
function MultiTenantDiagram() {
  return (
    <svg {...shared}>
      <g className="text-ink-faint">
        {[18, 48, 78].map((y) => (
          <rect key={y} x="8" y={y - 8} width="30" height="16" rx="8" />
        ))}
        {[18, 48, 78].map((y) => (
          <path key={y} d={`M38 ${y} C58 ${y}, 62 48, 76 48`} />
        ))}
      </g>

      {/* The tenancy boundary, kept in one place rather than in every service. */}
      <g className="text-teal">
        <path d="M76 14v68" strokeDasharray="4 5" />
        <rect x="88" y="34" width="32" height="28" rx="4" />
        <path d="M96 48h16" />
        <path d="M120 48h18" />
      </g>

      <g className="text-ink-faint">
        {[20, 48, 76].map((y) => (
          <rect key={y} x="138" y={y - 9} width="38" height="18" rx="4" />
        ))}
        <path d="M138 48h-0" />
      </g>

      {/* Cache: small on purpose. */}
      <g className="text-teal">
        <rect
          x="192"
          y="38"
          width="38"
          height="20"
          rx="4"
          strokeDasharray="3 4"
        />
      </g>
    </svg>
  );
}

/** Documents into an index, ranked results out; slow work moved off to a queue. */
function SearchDiagram() {
  return (
    <svg {...shared}>
      <g className="text-ink-faint">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={10 + i * 6}
            y={26 + i * 4}
            width="28"
            height="36"
            rx="3"
          />
        ))}
        <path d="M46 46h26" />
      </g>

      <g className="text-teal">
        <rect x="72" y="28" width="34" height="36" rx="5" />
        <circle cx="87" cy="42" r="7" />
        <path d="M92 47l6 6" />
        <path d="M106 46h18" />
      </g>

      {/* Ranked results — the top one is the point. */}
      <g className="text-teal">
        <rect x="124" y="16" width="64" height="14" rx="3" />
      </g>
      <g className="text-ink-faint">
        <rect x="124" y="36" width="52" height="12" rx="3" />
        <rect x="124" y="54" width="46" height="12" rx="3" />

        {/* The queue that stopped the request waiting on it. */}
        <path d="M124 80h44" strokeDasharray="3 4" />
        <circle cx="176" cy="80" r="5" />
        <path d="M188 74h44v12h-44z" />
      </g>
    </svg>
  );
}

export const systemDiagrams: Record<DiagramKey, () => ReactElement> = {
  pipeline: PipelineDiagram,
  agent: AgentDiagram,
  "multi-tenant": MultiTenantDiagram,
  search: SearchDiagram,
};
