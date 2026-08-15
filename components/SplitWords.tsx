import { Fragment, type CSSProperties } from "react";

/**
 * Splits a heading into per-word masks so each word can rise from behind its
 * own clip box as the heading scrolls in.
 *
 * A server component on purpose: these strings are build-time constants, so
 * splitting in the browser would ship the heading as one node and then rewrite
 * it after hydration — a flash and a pointless diff, for nothing.
 *
 * The space between words is a real text node **between** the masks, never
 * inside one. Put it inside and `overflow: hidden` collapses it, which silently
 * turns "Products & Systems" into "Products&Systems" for copy-paste, for the
 * accessible name `aria-labelledby` computes, and for anything parsing the page
 * as a résumé. A non-breaking space would fix the text but suppress wrapping,
 * so long headings would overflow on mobile. A plain text node is the answer.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <span className="st-mask">
            <span className="st-w" style={{ "--w": i } as CSSProperties}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </>
  );
}
