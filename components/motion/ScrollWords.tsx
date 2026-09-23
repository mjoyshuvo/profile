"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useRef } from "react";

/**
 * A line whose words light up one after another as it scrolls into view.
 *
 * Motion writes each word's opacity into a `--o` custom property; the rule
 * that reads it (`.js .scroll-word`) only exists with scripting on, so the
 * line is solid without JavaScript, and solid again under reduced motion. The
 * spaces are plain text nodes between the words, so copy-paste and the
 * accessible name read the sentence as written.
 */
export function ScrollWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Contact is the last section, so the page runs out of scroll early:
    // the range ends while the line is still low on the screen, and the
    // last word lands at 85% of it, so every word is solid by the bottom.
    offset: ["start 0.9", "start 0.6"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <Word
            progress={scrollYProgress}
            range={[(i / words.length) * 0.85, ((i + 1) / words.length) * 0.85]}
          >
            {word}
          </Word>
        </Fragment>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      className="scroll-word"
      style={{ "--o": opacity } as unknown as React.CSSProperties}
    >
      {children}
    </motion.span>
  );
}
