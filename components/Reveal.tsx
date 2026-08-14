"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger successive items in a list. Seconds. */
  delay?: number;
  className?: string;
};

/**
 * The only animation in the site: a short fade-and-rise as an element scrolls
 * into view, once.
 *
 * The hidden state lives in CSS behind an `html.js` class that the inline head
 * script sets, so a reader without JavaScript never sees the hidden state at
 * all — the content simply renders. Reduced-motion readers get the same
 * treatment via a media query in globals.css.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fall back to simply showing the content if IntersectionObserver is
    // missing, rather than leaving it faded out forever.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.revealed = "";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.revealed = "";
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
