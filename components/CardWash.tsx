/**
 * The teal corner wash shared by every card on the page.
 *
 * Geometry is deliberate: anchored 6rem outside the right edge at 34rem wide,
 * so it reaches ~40% of the way across the card. Defined once here rather than
 * repeated per card, because "all the washes look the same" is the whole point
 * and three copies of the class string would drift.
 *
 * Purely decorative, so `aria-hidden` and `pointer-events-none`.
 */
export function CardWash({ size = "card" }: { size?: "card" | "chip" }) {
  // A chip is two orders of magnitude smaller than a card, so the card's
  // geometry scaled down rather than reused: same proportions — anchored off
  // the top-right, about 40% of the width — at a blur the pill can hold.
  // Card geometry is sized in percentages of the card, not in fixed rem. At
  // 34rem wide the wash was 544px across a 335px phone card — it cleared both
  // edges, so a corner bloom became a flat tint over the whole top and, spread
  // that thin under a 64px blur, read as nothing at all. Two thirds of the
  // card, capped at the old width, keeps a real corner at every size. The blur
  // scales with it for the same reason.
  // The chip's bloom must sit INSIDE the pill to survive it. Anchored outside a
  // 34px-tall pill, `overflow-hidden` clipped away all but a sliver, and a
  // 16px blur spread that sliver into nothing on a phone — where there is also
  // no hover to rescue it. Sitting it just over the top-right corner, at half
  // the pill's height, leaves a real bloom after the clip. Touch screens hold a
  // stronger resting tint because a tint is all they ever get; a tap brightens
  // it the way hover does on a desktop.
  const geometry =
    size === "chip"
      ? "-top-2 -right-2 h-5 w-12 blur-md group-hover:bg-teal/30 group-active:bg-teal/35 [@media(hover:none)]:bg-teal/25"
      : "-top-[18%] -right-[12%] h-[65%] max-h-72 w-2/3 max-w-[34rem] blur-2xl sm:blur-3xl group-hover:bg-teal/15";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-teal/10 transition-colors duration-300 ${geometry}`}
    />
  );
}
