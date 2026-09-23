"use client";

import { useEffect, useRef } from "react";

/**
 * A figure that counts up from zero each time it comes into view — including
 * when a hidden panel it sits in is shown again, since that also changes its
 * intersection.
 *
 * The server renders the final text, so without JavaScript (or with reduced
 * motion) the real value is simply there. Only the first run of digits
 * animates; the rest of the string ("~", "×", "+", "%") stays as written.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/\d[\d.,]*/);
    if (!el || !match || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const digits = match[0];
    const target = parseFloat(digits.replace(/,/g, ""));
    const decimals = (digits.split(".")[1] ?? "").length;
    let frame = 0;

    const run = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 900);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = value.replace(
          digits,
          (target * eased).toFixed(decimals),
        );
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) run();
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
