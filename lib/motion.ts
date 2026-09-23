/**
 * The motion vocabulary for every Motion-driven component, so new code picks
 * a named curve instead of inventing one. The CSS side keeps its own tokens
 * (`--ease-soft`, `--ease-spring` in globals.css); these are the same curves
 * in the shape Motion wants.
 */

/** Matches `--ease-soft`: fast out, long settle. For anything that arrives. */
export const easeSoft = [0.22, 1, 0.36, 1] as const;

/** The default spring for things that follow the pointer or snap into place. */
export const spring = { type: "spring", stiffness: 260, damping: 30 } as const;

/** Softer, for motion that trails the pointer — tilt, magnetic pull. */
export const springSoft = { stiffness: 180, damping: 18, mass: 0.6 } as const;

/** True only where a fine pointer can hover. Touch gets no pointer effects. */
export function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
