"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Recommendation } from "@/content/recommendations";
import { initials, RecommendationCard } from "./RecommendationCard";

/**
 * A tabbed deck of recommendations: one quote on show, a rail of faces to
 * switch between them.
 *
 * This is a client component for the selection state only. It imports the
 * recommendations statically and Next renders it on the server, so **every
 * quote is in the initial HTML** — design constraint 1 holds. Which one is
 * visible is decided by CSS keyed on `html.js` plus `data-active`, never by the
 * `hidden` attribute, which would delete the other quotes for a reader without
 * JavaScript.
 *
 * The panels are stacked in a single grid cell rather than toggled with
 * `display: none`, so the container is always as tall as the longest quote and
 * switching can't jerk the page. See `.rec-stack` in globals.css.
 */
export function RecommendationDeck({ items }: { items: Recommendation[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(next: number) {
    const index = (next + items.length) % items.length;
    setActive(index);
    const tab = tabRefs.current[index];
    tab?.focus();
    // The rail scrolls horizontally once there are a few faces; arrow-keying
    // past its edge should bring the next one into view.
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        select(active + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        select(active - 1);
        break;
      case "Home":
        event.preventDefault();
        select(0);
        break;
      case "End":
        event.preventDefault();
        select(items.length - 1);
        break;
    }
  }

  return (
    <div>
      <div className="rec-stack">
        {items.map((rec, i) => (
          <RecommendationCard
            key={rec.id}
            rec={rec}
            panelProps={
              {
                "data-rec-panel": "",
                ...(i === active ? { "data-active": "" } : {}),
                role: "tabpanel",
                id: `rec-panel-${rec.id}`,
                "aria-labelledby": `rec-tab-${rec.id}`,
                // Required, not optional: the panel holds no focusable elements,
                // so without it a keyboard reader cannot reach or scroll the
                // quote at all.
                tabIndex: 0,
              } as React.HTMLAttributes<HTMLElement>
            }
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4">
        {/* Automatic activation: switching is instant and loads nothing, which
            is exactly the case the APG says it's for. No aria-live — with a
            correct tablist, aria-selected plus the moved focus already announce
            the change, and a live region would re-read the whole quote. */}
        <div
          role="tablist"
          aria-label="Recommendations"
          onKeyDown={onKeyDown}
          className="rec-rail flex flex-wrap items-center gap-2"
        >
          {items.map((rec, i) => (
            <button
              key={rec.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`rec-tab-${rec.id}`}
              aria-controls={`rec-panel-${rec.id}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`grid h-11 w-11 place-items-center overflow-hidden rounded-full ring-1 transition-[opacity,transform,box-shadow] duration-200 ${
                i === active
                  ? "opacity-100 ring-2 ring-teal"
                  : "opacity-60 ring-rule hover:opacity-100"
              }`}
            >
              {rec.avatar ? (
                <Image
                  src={rec.avatar}
                  alt=""
                  aria-hidden="true"
                  width={88}
                  height={88}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className="font-display text-xs font-semibold text-teal"
                  aria-hidden="true"
                >
                  {initials(rec.name)}
                </span>
              )}
              {/* The button's accessible name. The avatar contributes nothing,
                  so the name is said once. */}
              <span className="sr-only">{rec.name}</span>
            </button>
          ))}
        </div>

        {/* Tabular numerals and zero-padding, so the counter can't change width
            and nudge the rail as you page through. */}
        <p
          className="rec-counter ml-auto text-sm text-ink-faint tabular-nums"
          aria-hidden="true"
        >
          <span className="text-ink">
            {String(active + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(items.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
