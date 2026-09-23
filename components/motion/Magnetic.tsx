"use client";

import { motion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { canHover, springSoft } from "@/lib/motion";

/**
 * Pulls its child a few pixels towards the pointer while the pointer is over
 * it, and springs back on leave. The child keeps its own hover styles — this
 * only adds the pull.
 *
 * `strength` is the share of the pointer's offset from centre the element
 * follows. Nothing happens on touch, and the reduced-motion setting in
 * MotionProvider stops the transform for readers who asked for less motion.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, springSoft);
  const y = useSpring(0, springSoft);

  function onPointerMove(event: React.PointerEvent) {
    if (!ref.current || !canHover()) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      className={`inline-flex max-w-full ${className}`}
    >
      {children}
    </motion.span>
  );
}
