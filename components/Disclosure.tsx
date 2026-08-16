import { ChevronDown } from "lucide-react";

/**
 * A disclosure toggle with no content of its own.
 *
 * The thing being disclosed stays *outside* this element, clipped by a
 * `max-height` rule that `:has(.disclosure[open])` releases — see `.rec-quote`
 * and `.proj-body` in globals.css. That's deliberate: content inside a closed
 * `<details>` is `display: none`, and this site's case studies and quotes have
 * to stay in the DOM and in the accessibility tree whether or not anyone opens
 * them. So this is a visual clamp with a native, keyboard-reachable control on
 * it, not a real containment boundary.
 *
 * `controls` points at the id of the block being clipped, so the relationship
 * is stated rather than left to the visual arrangement.
 */
export function Disclosure({
  more,
  less,
  controls,
  defaultOpen,
  className,
}: {
  more: string;
  less: string;
  controls?: string;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <details className={`disclosure ${className ?? ""}`} open={defaultOpen}>
      <summary
        aria-controls={controls}
        className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-paper px-3 py-1.5 font-display font-semibold text-[0.6875rem] tracking-[0.08em] text-ink-soft uppercase transition-colors duration-200 hover:border-teal hover:text-teal"
      >
        <span className="disclosure-more">{more}</span>
        <span className="disclosure-less">{less}</span>
        <ChevronDown
          className="disclosure-chevron h-3.5 w-3.5"
          aria-hidden="true"
        />
      </summary>
    </details>
  );
}
