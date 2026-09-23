import type { Project } from "@/content/projects";

type BarRow = {
  label: string;
  delta: string;
  /** Percent of the longer bar, 0–100. */
  before: number;
  after: number;
};

/** The first number in a figure like "~40%", "1.5x" or "99.4 ms". */
function figure(value: string) {
  const match = value.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : NaN;
}

/**
 * Before-and-after pairs that a bar can draw honestly.
 *
 * A proportional bar fails at extreme ratios — the 515x speed-up on Veyt's
 * core lookup would draw as a 0.2% sliver that reads as a rendering fault — so
 * any pair where the shorter bar would fall under 5% of the longer stays in
 * the case study's before/after tiles and is left off the card. When a card
 * has fewer than two drawable pairs, a headline metric written as "+N%" makes
 * the second one: 100 before, 100 + N after.
 */
function barRows(project: Project): BarRow[] {
  const rows: BarRow[] = [];

  for (const stat of project.stats ?? []) {
    const before = figure(stat.before);
    const after = figure(stat.after);
    if (!(before > 0) || !(after > 0)) continue;
    const high = Math.max(before, after);
    if (Math.min(before, after) / high < 0.05) continue;
    const approx = /~/.test(stat.before + stat.after) ? "~" : "";
    const delta =
      after < before
        ? `${approx}−${Math.round((1 - after / before) * 100)}%`
        : `${approx}+${Math.round((after / before - 1) * 100)}%`;
    rows.push({
      label: stat.label,
      delta,
      before: (before / high) * 100,
      after: (after / high) * 100,
    });
  }

  const lift = project.metric?.value.match(/^\+(\d+)%$/);
  if (rows.length < 2 && lift) {
    const gain = Number(lift[1]);
    rows.push({
      label: project.metric!.label,
      delta: project.metric!.value,
      before: (100 / (100 + gain)) * 100,
      after: 100,
    });
  }

  return rows.slice(0, 2);
}

/**
 * The figure panel on a resting project card: the headline metric, then the
 * supporting numbers drawn as before/after bars — or, for a project whose
 * numbers are counts, as labelled blocks and dots.
 *
 * The bars and blocks are aria-hidden: every number they draw is already in
 * the case study's before/after tiles or in the prose, and reading it twice
 * helps nobody. The headline metric is real text.
 *
 * The growth is CSS (`.bar-fill`, `.count-seg`, `.count-dot`), keyed to the
 * card's Reveal wrapper arriving on screen.
 */
export function ProjectFigures({ project }: { project: Project }) {
  const rows = barRows(project);
  const counts = project.counts ?? [];

  if (!project.metric && rows.length === 0 && counts.length === 0) return null;

  return (
    <div className="w-full shrink-0 sm:w-64">
      {project.metric ? (
        <p>
          <span className="block font-display text-3xl leading-none font-extrabold tracking-[-0.03em] text-teal tabular-nums">
            {project.metric.value}
          </span>
          <span className="mt-1.5 block font-display text-[0.6875rem] leading-snug font-semibold tracking-[0.08em] text-ink-faint uppercase">
            {project.metric.label}
          </span>
        </p>
      ) : null}

      {rows.length > 0 ? (
        <div aria-hidden="true" className="mt-5">
          <ul className="space-y-3.5">
            {rows.map((row) => (
              <li key={row.label}>
                <p className="flex items-baseline justify-between gap-3 font-display text-[0.625rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                  <span className="min-w-0">{row.label}</span>
                  <b className="shrink-0 text-[0.8125rem] font-extrabold tracking-normal text-teal tabular-nums">
                    {row.delta}
                  </b>
                </p>
                <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-rule/70">
                  <span
                    className="bar-fill block h-full rounded-full bg-ink-faint/45"
                    style={{ width: `${row.before}%` }}
                  />
                </span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-rule/70">
                  <span
                    className="bar-fill after block h-full rounded-full bg-teal"
                    style={{ width: `${row.after}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-3 font-display text-[0.625rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-3 rounded-full bg-ink-faint/45" />
              Before
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-3 rounded-full bg-teal" />
              After
            </span>
          </p>
        </div>
      ) : null}

      {counts.length > 0 ? (
        <ul aria-hidden="true" className="mt-5 space-y-3.5">
          {counts.map((count) => (
            <li key={count.label}>
              <p className="flex items-baseline justify-between gap-3 font-display text-[0.625rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                <span className="min-w-0">{count.label}</span>
                {/* With items the blocks are the number; without, say it. */}
                {count.items ? null : (
                  <b className="shrink-0 text-[0.8125rem] font-extrabold tracking-normal text-teal tabular-nums">
                    {count.value}
                  </b>
                )}
              </p>
              {count.items ? (
                <span className="mt-1.5 grid grid-cols-4 gap-1">
                  {count.items.map((item, k) => (
                    <span
                      key={item}
                      style={{ "--k": k } as React.CSSProperties}
                      className="count-seg rounded-md bg-teal py-1 text-center font-display text-[0.625rem] font-semibold text-on-teal"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="mt-1.5 flex gap-1.5">
                  {Array.from({ length: count.value }, (_, k) => (
                    <span
                      key={k}
                      style={{ "--k": k } as React.CSSProperties}
                      className="count-dot h-4 w-4 rounded-full bg-teal"
                    />
                  ))}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
