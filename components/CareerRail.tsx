"use client";

import { ChevronDown } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const noop = () => () => {};

/** `true` from `sm` up, once the client can tell; `false` on the server. */
function useWide() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(min-width: 40rem)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 40rem)").matches,
    () => false,
  );
}

export type RailStop = {
  slug: string;
  /** Short label for the station. */
  short: string;
  /** "2016 – 2020", or "2022 – now". */
  years: string;
  /** Where the stop starts and ends on the line, as percentages. */
  left: number;
  right: number;
  live: boolean;
};

export type RailPanel = {
  slug: string;
  name: string;
  dates: string;
  tenure: string;
  live: boolean;
  node: ReactNode;
};

/**
 * The career as a metro line: one station per company, placed at the month it
 * started. The line fills teal up to the end of the selected company, and the
 * stretch that is still running (the current role) moves slowly towards "Now".
 *
 * From `sm` up the line runs across the page and one company panel shows
 * under it (tabs). On a phone the line turns vertical: each company is a row on
 * it, and the selected row opens in place (an accordion).
 *
 * A client component for the selection only. The panels arrive as server-
 * rendered nodes, so **every role and every bullet is in the initial HTML**.
 * Without JavaScript the line and the row buttons are hidden and every panel is
 * listed, newest first.
 *
 * `stops` run oldest → newest (left → right); `panels` are newest first, as in
 * the content file, and are matched to stops by slug.
 */
export function CareerRail({
  stops,
  nowLeft,
  panels,
}: {
  stops: RailStop[];
  nowLeft: number;
  panels: RailPanel[];
}) {
  const liveSlug = (stops.find((stop) => stop.live) ?? stops[0]).slug;
  const [activeSlug, setActiveSlug] = useState(liveSlug);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const wide = useWide();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = Math.max(
    0,
    stops.findIndex((stop) => stop.slug === activeSlug),
  );

  // A deep link to one company (#experience-cefalo) opens on that company.
  useEffect(() => {
    const pick = () => {
      const slug = window.location.hash.replace("#experience-", "");
      if (stops.some((stop) => stop.slug === slug)) setActiveSlug(slug);
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [stops]);

  function choose(slug: string) {
    const next = stops.findIndex((stop) => stop.slug === slug);
    setDir(next >= active ? "fwd" : "back");
    setActiveSlug(slug);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: stops.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const index = (moves[event.key] + stops.length) % stops.length;
    choose(stops[index].slug);
    tabs.current[index]?.focus();
  }

  const current = stops[active];
  const live = stops.find((stop) => stop.live);
  // The filled part of the line: to the end of the selected company, or to
  // the start of the running stretch when the current role is selected.
  const fill = current.live ? current.left : current.right;
  const asTabs = ready && wide;

  return (
    <div>
      {/* The line, from `sm` up. Decorative apart from the station buttons,
          which are the tabs; the dates are in each panel as text. */}
      <div className="career-rail relative mb-10 hidden h-48 sm:block">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-[5.75rem] h-1.5 rounded-full bg-rule"
        />
        <span
          aria-hidden="true"
          className="metro-fill absolute top-[5.75rem] left-0 h-1.5 rounded-full bg-teal"
          style={{ width: `${fill}%` }}
        />
        {live ? (
          <span
            aria-hidden="true"
            className="metro-live absolute top-[5.75rem] h-1.5 rounded-full"
            style={{ left: `${live.left}%`, width: `${nowLeft - live.left}%` }}
          />
        ) : null}
        <span
          aria-hidden="true"
          className="metro-now absolute top-[5.9375rem] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-teal"
          style={{ left: `${nowLeft}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-[7.4rem] -translate-x-1/2 font-display text-[0.625rem] font-bold tracking-[0.12em] text-teal uppercase"
          style={{ left: `${nowLeft}%` }}
        >
          Now
        </span>

        <div
          {...(asTabs ? { role: "tablist", "aria-label": "Companies" } : {})}
          onKeyDown={onKeyDown}
        >
          {stops.map((stop, i) => {
            const isActive = i === active;
            const passed = i < active;
            const above = i % 2 === 0;
            return (
              <button
                key={stop.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                {...(asTabs
                  ? {
                      role: "tab",
                      id: `career-tab-${stop.slug}`,
                      "aria-controls": `experience-${stop.slug}`,
                      "aria-selected": isActive,
                      tabIndex: isActive ? 0 : -1,
                    }
                  : { "aria-pressed": isActive })}
                onClick={() => choose(stop.slug)}
                style={{ left: `${stop.left}%` }}
                className={`metro-stop group absolute -ml-[1.375rem] flex items-start gap-2.5 text-left ${
                  above
                    ? "bottom-[4.6875rem] flex-col-reverse"
                    : "top-[4.5625rem] flex-col"
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center">
                  <span
                    className={`metro-dot rounded-full border-solid ${
                      isActive
                        ? "metro-dot-active h-[1.375rem] w-[1.375rem] border-4 border-paper bg-teal"
                        : passed
                          ? "h-4 w-4 border-[3px] border-paper bg-teal"
                          : "h-4 w-4 border-[3px] border-ink-faint/45 bg-paper-raised group-hover:border-teal"
                    }`}
                  />
                </span>
                <span className="flex flex-col gap-0.5 pl-3 whitespace-nowrap">
                  <span
                    className={`font-display text-[0.9375rem] font-bold tracking-[-0.02em] transition-colors ${
                      isActive ? "text-teal" : "text-ink group-hover:text-teal"
                    }`}
                  >
                    {stop.short}
                  </span>
                  <span className="font-display text-[0.6875rem] font-semibold text-ink-faint tabular-nums">
                    {stop.years}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Constraint 2 in the README: roles are a real ordered list. On a phone
          this list is the line itself, drawn down its left edge. */}
      <ol className="career-stack" data-dir={dir}>
        {panels.map((panel) => {
          const isActive = panel.slug === activeSlug;
          const bodyId = `experience-${panel.slug}-body`;
          return (
            <li
              key={panel.slug}
              id={`experience-${panel.slug}`}
              {...(asTabs
                ? {
                    role: "tabpanel",
                    "aria-labelledby": `career-tab-${panel.slug}`,
                  }
                : {})}
              {...(isActive ? { "data-active": "" } : {})}
              {...(panel.live ? { "data-live": "" } : {})}
            >
              {/* The phone's row on the line. Hidden from `sm` up, where the
                  stations above are the controls. */}
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={bodyId}
                onClick={() => choose(panel.slug)}
                className="metro-row flex min-h-16 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left sm:hidden"
              >
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
                    {panel.name}
                  </span>
                  <span className="font-display text-[0.6875rem] font-semibold tracking-[0.04em] tabular-nums opacity-80">
                    {panel.dates} · {panel.tenure}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="metro-chevron ml-auto h-[1.125rem] w-[1.125rem] shrink-0"
                />
              </button>
              <div id={bodyId} className="career-body">
                {panel.node}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
