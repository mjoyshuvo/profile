import Image from "next/image";
import { Quote } from "lucide-react";
import type { Recommendation } from "@/content/recommendations";

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
  return (
    <figure
      {...panelProps}
      className={`relative overflow-hidden rounded-2xl border border-rule bg-paper-raised p-6 sm:p-9 ${panelProps?.className ?? ""}`}
    >
      <Quote
        className="absolute -top-1 -left-1 h-16 w-16 text-teal/10"
        aria-hidden="true"
      />

      <blockquote className="relative space-y-3.5">
        {rec.quote.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </blockquote>

      <figcaption className="relative mt-6 flex items-center gap-3.5 border-t border-rule pt-5">
        <Avatar rec={rec} />
        <div className="min-w-0">
          <p className="text-[0.9375rem] font-medium text-ink">{rec.name}</p>
          <p className="text-sm text-ink-soft">{rec.title}</p>
          <p className="mt-0.5 text-xs text-ink-faint">
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
      className={`${base} bg-teal-wash font-serif text-sm font-semibold text-teal`}
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
