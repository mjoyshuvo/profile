"use client";

import { Pause, Play } from "lucide-react";
import { useState, type ReactNode } from "react";

/**
 * The moving band, and the control that stops it.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide) is a Level A requirement for anything that
 * moves on its own for more than five seconds. Hover-pause does not satisfy it
 * — it is unreachable by keyboard and by touch — and Lighthouse does not check,
 * so the score would stay at 100 while the page regressed. This button is the
 * actual compliance mechanism, which is why the band is not allowed to exist
 * without it.
 *
 * It owns both the paused state and the element that state applies to, so the
 * button's label can never disagree with what the track is doing. The rows come
 * in as `children` from a server component, so the words are still in the
 * server-rendered HTML — passing them through a client boundary does not move
 * them into JavaScript.
 *
 * The animation itself is CSS scoped to `html.js` — the same condition under
 * which this button exists. Motion and control appear together or not at all.
 */
export function MarqueeBand({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="marquee">
      <div className="marquee-track" {...(paused ? { "data-paused": "" } : {})}>
        {children}
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="marquee-pause absolute top-1/2 right-2 z-10 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-rule bg-paper px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.08em] text-ink-faint uppercase transition-colors duration-200 hover:border-teal hover:text-teal"
      >
        {paused ? (
          <Play className="h-3 w-3" aria-hidden="true" />
        ) : (
          <Pause className="h-3 w-3" aria-hidden="true" />
        )}
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> the scrolling disciplines</span>
      </button>
    </div>
  );
}
