"use client";

import { useEffect } from "react";

/**
 * Feeds `--stack` (0 → 1) to each pinned project card as the next card slides
 * over it, so the one underneath can shrink and dim (`.proj-layer` in
 * globals.css). One passive scroll listener batched to a frame; it writes a
 * custom property and never touches React state.
 *
 * Does nothing where the cards are not pinned (phones, an open case study) or
 * for a reader who asked for reduced motion.
 */
export function StackEffect() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".proj-stack > li"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      items.forEach((li, i) => {
        const layer = li.querySelector<HTMLElement>(".proj-layer");
        if (!layer) return;
        const next = items[i + 1];
        if (!next || getComputedStyle(li).position !== "sticky") {
          layer.style.setProperty("--stack", "0");
          return;
        }
        const here = li.getBoundingClientRect();
        const there = next.getBoundingClientRect();
        const covered = 1 - (there.top - here.top) / here.height;
        layer.style.setProperty(
          "--stack",
          Math.min(1, Math.max(0, covered)).toFixed(3),
        );
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // A case study opening changes the card's height and whether it pins.
    document.addEventListener("toggle", schedule, true);
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("toggle", schedule, true);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
