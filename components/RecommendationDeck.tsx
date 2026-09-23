"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, type PanInfo } from "motion/react";
import { useRef, useState } from "react";
import type { Recommendation } from "@/content/recommendations";
import { initials } from "./RecommendationCard";

/**
 * Recommendations as a spotlight: the people down the left (a row across the
 * top on a phone), and the selected person's words large on the right — a
 * pull quote from their own text, then the whole recommendation.
 *
 * This is a client component for the selection state only. Next renders it on
 * the server, so **every quote is in the initial HTML** — design constraint 1
 * holds. Which one is visible is decided by CSS keyed on `html.js` plus
 * `data-active`, never by the `hidden` attribute. The panels share one grid
 * cell (`.rec-stack`), so the card is always as tall as the longest quote and
 * switching can't jerk the page; inactive panels wait to either side, so a
 * switch slides in the direction of travel.
 *
 * The quote can also be dragged or swiped sideways to page through.
 */
export function RecommendationDeck({ items }: { items: Recommendation[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function go(next: number, focus = false) {
    const index = (next + items.length) % items.length;
    setActive(index);
    if (focus) {
      const tab = tabRefs.current[index];
      tab?.focus();
      tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  // A swipe past 60px, or a quick flick, pages; anything less springs back.
  function onDragEnd(_: unknown, info: PanInfo) {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -60) go(active + 1);
    else if (swipe > 60) go(active - 1);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    go(moves[event.key], true);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start lg:gap-6">
      {/* Automatic activation: switching is instant and loads nothing. No
          aria-live — aria-selected plus the moved focus already announce the
          change, and a live region would re-read the whole quote. */}
      <div
        role="tablist"
        aria-label="Recommendations"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="rec-rail -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:p-0"
      >
        {items.map((rec, i) => {
          const on = i === active;
          return (
            <button
              key={rec.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`rec-tab-${rec.id}`}
              aria-controls={`rec-panel-${rec.id}`}
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              className={`relative isolate flex min-h-[4.5rem] shrink-0 items-center gap-3.5 rounded-[1.375rem] border px-4 py-3 text-left transition-colors duration-300 lg:min-h-[5.75rem] lg:px-5 ${
                on
                  ? "border-transparent text-on-teal"
                  : "border-rule bg-paper-raised text-ink hover:border-teal"
              }`}
            >
              {on ? (
                <motion.span
                  layoutId="rec-spot"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-[1.375rem] bg-teal shadow-[0_18px_30px_-18px_var(--teal)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span
                aria-hidden="true"
                className={`grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-teal-wash ring-[3px] ${
                  on ? "ring-on-teal/40" : "ring-teal-wash"
                }`}
              >
                {rec.avatar ? (
                  <Image
                    src={rec.avatar}
                    alt=""
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-display text-sm font-semibold text-teal">
                    {initials(rec.name)}
                  </span>
                )}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-display text-[0.9375rem] font-bold whitespace-nowrap">
                  {rec.name}
                </span>
                <span className="hidden text-xs opacity-85 lg:block">
                  {rec.relation}
                </span>
                <span className="font-display text-[0.6875rem] font-semibold tracking-[0.08em] uppercase opacity-75">
                  {rec.date}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        className="rec-stack cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragSnapToOrigin
        onDragEnd={onDragEnd}
      >
        {items.map((rec, i) => (
          <figure
            key={rec.id}
            data-rec-panel=""
            {...(i === active
              ? { "data-active": "" }
              : { "data-side": i < active ? "prev" : "next" })}
            role="tabpanel"
            id={`rec-panel-${rec.id}`}
            aria-labelledby={`rec-tab-${rec.id}`}
            // The panel holds no focusable text, so without it a keyboard
            // reader could not reach or scroll the quote.
            tabIndex={0}
            className="relative m-0 flex flex-col gap-6 overflow-hidden rounded-[1.75rem] border border-rule bg-paper-raised p-6 shadow-[var(--shadow)] sm:p-10"
          >
            <Quote
              aria-hidden="true"
              className="absolute top-5 right-6 h-24 w-24 text-teal-wash sm:h-28 sm:w-28"
              fill="currentColor"
              strokeWidth={0}
            />
            <blockquote className="relative flex flex-col gap-6">
              {/* Lifted from the text below, so it is read once. */}
              {rec.pull ? (
                <p
                  aria-hidden="true"
                  className="max-w-[24ch] font-display text-2xl leading-tight font-extrabold tracking-[-0.035em] text-balance text-teal sm:text-[2.25rem]"
                >
                  “{rec.pull}”
                </p>
              ) : null}
              <div className="gap-8 md:columns-2">
                {rec.quote.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-3.5 break-inside-avoid text-[0.9375rem] leading-relaxed text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </blockquote>
            <figcaption className="relative flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule pt-5">
              <span className="font-display text-[0.9375rem] font-bold text-ink">
                {rec.name}
              </span>
              <span className="text-sm text-ink-soft">{rec.title}</span>
              <span className="w-full font-display text-[0.6875rem] font-semibold tracking-[0.06em] text-ink-faint uppercase">
                {rec.relation}
                <span className="mx-1.5" aria-hidden="true">
                  ·
                </span>
                <time dateTime={rec.dateISO}>{rec.date}</time>
              </span>
            </figcaption>
          </figure>
        ))}
      </motion.div>

      <div className="rec-counter flex items-center justify-end gap-2 lg:col-start-2">
        <p
          aria-hidden="true"
          className="mr-auto font-display text-sm font-semibold text-ink-faint tabular-nums"
        >
          <span className="text-ink">{String(active + 1).padStart(2, "0")}</span>
          {" / "}
          {String(items.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous recommendation"
          className="grid h-11 w-11 place-items-center rounded-full border border-rule bg-paper-raised text-ink transition-colors hover:border-teal hover:text-teal"
        >
          <ChevronLeft className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next recommendation"
          className="grid h-11 w-11 place-items-center rounded-full bg-teal text-on-teal transition-colors hover:bg-teal-strong"
        >
          <ChevronRight className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
