"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { certifications } from "@/content/certifications";
import { profile } from "@/content/profile";
import { canHover, springSoft } from "@/lib/motion";

/**
 * The hero portrait: the photo cut out of its office background and set in a
 * circle over a teal glow, with a dashed ring turning slowly around it and
 * four glass chips on its edge, at every width.
 *
 * Three motions, each with its own trigger:
 *  - on load, the circle opens from its centre and the photo settles (CSS,
 *    `.photo-frame` in globals.css, scoped to `html.js`);
 *  - under a fine pointer, the disc tilts towards it and a soft light follows;
 *  - on scroll, the disc drifts a little slower than the page.
 *
 * Everything that loops is decoration and aria-hidden. The chips carry words,
 * so they arrive once and then hold still.
 */
export function PhotoCard() {
  const stage = useRef<HTMLDivElement>(null);

  // Tilt, in degrees, sprung so the disc trails the pointer instead of
  // snapping to it. The light is the same pointer position in percent.
  const rotateX = useSpring(0, springSoft);
  const rotateY = useSpring(0, springSoft);
  const lightX = useSpring(50, springSoft);
  const lightY = useSpring(30, springSoft);
  const light = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgb(255 255 255 / 0.55), transparent 55%)`;

  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 80]);

  function onPointerMove(event: React.PointerEvent) {
    if (!stage.current || !canHover()) return;
    const rect = stage.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(-py * 14);
    lightX.set((px + 0.5) * 100);
    lightY.set((py + 0.5) * 100);
    stage.current.dataset.lit = "";
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(50);
    lightY.set(30);
    if (stage.current) delete stage.current.dataset.lit;
  }

  return (
    <motion.div
      ref={stage}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ y: drift }}
      className="photo-stage relative mx-auto mt-4 mb-6 w-56 p-4 sm:w-64 lg:my-0 lg:w-[23rem] lg:p-7"
    >
      <span aria-hidden="true" className="photo-aura" />
      <span aria-hidden="true" className="photo-ring">
        <span className="photo-bead" />
      </span>

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative"
      >
        <div className="photo-frame relative aspect-square overflow-hidden rounded-full">
          {/* The glow is a token-built gradient, so it follows the palette. */}
          <span aria-hidden="true" className="photo-glow absolute inset-0" />
          <Image
            src={profile.cutout}
            alt={`Portrait of ${profile.name}`}
            width={800}
            height={800}
            sizes="(min-width: 1024px) 320px, 224px"
            priority
            className="photo-img relative h-full w-full object-cover"
          />
          <motion.span
            aria-hidden="true"
            style={{ backgroundImage: light }}
            className="photo-light pointer-events-none absolute inset-0 mix-blend-soft-light"
          />
        </div>
      </motion.div>

      {/* These restate facts the page states in words (the supporting line,
          Certifications), so they are hidden from assistive tech rather than
          read twice. Smaller on a phone and moved to the corners there, where
          the disc is narrow, so they sit on the edge instead of the face. */}
      <span aria-hidden="true" className="photo-chip photo-chip-a">
        <b className="font-extrabold text-teal">10</b> years shipping
      </span>
      <span aria-hidden="true" className="photo-chip photo-chip-b">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
        Agentic AI trainer · Cefalo
      </span>
      <span aria-hidden="true" className="photo-chip photo-chip-c">
        <b className="font-extrabold text-teal">200+</b> pipelines live
      </span>
      <span aria-hidden="true" className="photo-chip photo-chip-d">
        <Image
          src={certifications[0].badge ?? ""}
          alt=""
          width={40}
          height={40}
          className="h-4 w-4 shrink-0 object-contain lg:h-5 lg:w-5"
        />
        Claude Certified Architect
      </span>
    </motion.div>
  );
}
