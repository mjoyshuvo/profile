import Image from "next/image";
import { Quote } from "lucide-react";
import type { Recommendation } from "@/content/recommendations";
import { CardWash } from "./CardWash";
import { Disclosure } from "./Disclosure";

/**
 * A quote long enough to be worth collapsing. Measured on the server from the
 * text itself, so a short recommendation never gets a "See more" that expands
 * to nothing — and no client-side measuring is needed to decide.
 */
const CLAMP_ABOVE_CHARS = 420;

/**
 * The quote card itself, shared by the single-recommendation path and the deck.
 * Defining it once is what keeps the two paths from drifting visually.
 *
 * `panelProps` carries the tab wiring when it's inside the deck, and is empty
 * when it stands alone — a lone quote is not a tabpanel and shouldn't claim to
 * be one.
 */
export function RecommendationCard({
  rec,
  panelProps,
}: {
  rec: Recommendation;
  panelProps?: React.HTMLAttributes<HTMLElement> & { "data-active"?: string };
}) {
  const isLong = rec.quote.join(" ").length > CLAMP_ABOVE_CHARS;

  return (
    <figure
      {...panelProps}
      className={`rec-card group relative overflow-hidden rounded-2xl border border-rule bg-paper-raised p-6 transition-[border-color,transform] duration-200 sm:p-9 ${panelProps?.className ?? ""}`}
    >
      <CardWash />

      <Quote
        className="absolute -top-1 -left-1 h-16 w-16 text-teal/10"
        aria-hidden="true"
      />

      {/* The whole quote is always in the DOM. When it's long it starts
          collapsed to a fixed height, and <details> — not JavaScript — opens
          it, so it stays reachable with scripting off. */}
      <div className={`relative ${isLong ? "rec-body" : ""}`}>
        <blockquote
          id={isLong ? `rec-quote-${rec.id}` : undefined}
          className={isLong ? "rec-quote" : undefined}
        >
          <div className="space-y-3.5">
            {rec.quote.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </blockquote>

        {isLong ? (
          <Disclosure
            className="mt-4"
            more="See more"
            less="See less"
            controls={`rec-quote-${rec.id}`}
          />
        ) : null}
      </div>

      <figcaption className="relative mt-6 flex items-center gap-3.5 border-t border-rule pt-5">
        <Avatar rec={rec} />
        <div className="min-w-0">
          <p className="font-display text-[0.9375rem] font-semibold text-ink">
            {rec.name}
          </p>
          <p className="text-sm text-ink-soft">{rec.title}</p>
          <p className="mt-0.5 font-display font-semibold text-[0.6875rem] tracking-[0.06em] text-ink-faint uppercase">
            {rec.relation}
            <span className="mx-1.5" aria-hidden="true">
              ·
            </span>
            <time dateTime={rec.dateISO}>{rec.date}</time>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * The photo when there is one, initials otherwise, at identical dimensions
 * either way so a photo arriving later can't shift the layout.
 *
 * Both branches are aria-hidden and the image's alt is empty: the name is
 * already in the caption beside it, and in the deck the tab button carries it,
 * so an avatar that announced itself would say the name twice.
 */
function Avatar({ rec }: { rec: Recommendation }) {
  const base =
    "grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 ring-rule";

  if (rec.avatar) {
    return (
      <Image
        src={rec.avatar}
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        className={`${base} object-cover`}
      />
    );
  }

  return (
    <span
      className={`${base} bg-teal-wash font-display text-sm font-semibold text-teal`}
      aria-hidden="true"
    >
      {initials(rec.name)}
    </span>
  );
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
