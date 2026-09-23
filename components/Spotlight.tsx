"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to whichever `.spot-card` is under it, as
 * `--mx`/`--my` in the card's own pixels. The glow and the lit border are pure
 * CSS in globals.css; this only tells them where to sit.
 *
 * One delegated listener for the whole page rather than one per card, batched
 * to a frame, and skipped entirely on touch — there is no pointer to follow,
 * and the cards fall back to their plain hover border.
 */
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = last.target as Element | null;
      const card = target?.closest?.<HTMLElement>(".spot-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${last.clientX - rect.left}px`);
      card.style.setProperty("--my", `${last.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
