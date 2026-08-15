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
export function CardWash() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-28 -right-24 h-72 w-[34rem] rounded-full bg-teal/10 blur-3xl transition-colors duration-300 group-hover:bg-teal/15"
    />
  );
}
