"use client";

import { motion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { canHover, springSoft } from "@/lib/motion";

/**
 * The contact card's frame: it tilts a little towards a fine pointer, sprung
 * so it trails rather than snaps, and rests flat on touch. The contents are
 * server-rendered and passed in, so this only owns the motion.
 */
export function ContactCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, springSoft);
  const rotateY = useSpring(0, springSoft);

  function onPointerMove(event: React.PointerEvent) {
    if (!ref.current || !canHover()) return;
    const rect = ref.current.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 8);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="contact-card relative flex flex-col gap-5 rounded-[2rem] border border-rule bg-paper-raised p-6 shadow-[0_30px_60px_-36px_var(--teal)] sm:p-8"
    >
      {children}
    </motion.div>
  );
}
