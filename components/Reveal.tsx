"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * `rise`    — the block itself fades and rises. The original behaviour.
 * `stagger` — the block doesn't move; its direct children rise on a CSS ladder.
 * `hold`    — no motion at all. A trigger scope, used by the per-word heading
 *             rise so the words know when they're on screen.
 */
type RevealMode = "rise" | "stagger" | "hold";

/** Small closed set, so the reveal can wrap a list without emitting a `div`
 *  inside a `ul` and the markup stays valid for the parsers that read it. */
type RevealTag = "div" | "ul" | "ol" | "dl" | "p";

const ATTR: Record<RevealMode, string> = {
  rise: "data-reveal",
  stagger: "data-reveal-stagger",
  hold: "data-reveal-hold",
};

type RevealProps = {
  children: ReactNode;
  /** Seconds before this block starts. Only meaningful for `rise`. */
  delay?: number;
  /** Seconds between successive children. Only meaningful for `stagger`. */
  step?: number;
  mode?: RevealMode;
  as?: RevealTag;
  className?: string;
};

/**
 * The site's only animation trigger: a one-shot IntersectionObserver that marks
 * an element as on-screen and then disconnects. All the motion lives in CSS.
 *
 * The hidden state lives in `globals.css` behind an `html.js` class that the
 * inline head script sets, so a reader without JavaScript never sees the hidden
 * state at all — the content simply renders. Reduced-motion readers get the
 * same treatment via a media query.
 */
export function Reveal({
  children,
  delay = 0,
  step,
  mode = "rise",
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

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

  const style: Record<string, string> = {};
  if (delay) style["--reveal-delay"] = `${delay}s`;
  if (step) style["--reveal-step"] = `${step}s`;

  return (
    <Tag
      // One ref type across a closed set of tags; each is an HTMLElement.
      ref={ref as React.Ref<never>}
      {...{ [ATTR[mode]]: "" }}
      className={className}
      style={Object.keys(style).length ? (style as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
