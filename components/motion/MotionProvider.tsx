"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * One place that tells every Motion component to honour the reader's
 * `prefers-reduced-motion` setting. Transforms and layout animations are
 * skipped for them; the CSS reduced-motion block in globals.css covers the
 * rest of the page.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
