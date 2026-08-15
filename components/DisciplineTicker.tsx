import { disciplines } from "@/content/profile";
import { MarqueeBand } from "./MarqueeBand";

/**
 * The three disciplines, moving. They used to sit as a ruled stack under the
 * hero portrait; as a band they get the full width and carry the eye from the
 * statement into the page.
 *
 * Both rows live inside one track, which is what makes the `translateX(-50%)`
 * loop land exactly one copy along and read as seamless. Three short words
 * would not fill a wide screen on their own, so each row repeats them — the
 * repeats and the whole second row are aria-hidden, leaving one spoken pass.
 */
const REPEATS = 4;

export function DisciplineTicker() {
  return (
    <div className="no-print relative border-y border-rule">
      <MarqueeBand>
        <DisciplineRow />
        <DisciplineRow duplicate />
      </MarqueeBand>
    </div>
  );
}

function DisciplineRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="marquee-row"
      {...(duplicate ? { "aria-hidden": "true" } : {})}
    >
      {Array.from({ length: REPEATS }).flatMap((_, pass) =>
        disciplines.map((discipline) => (
          <li
            key={`${pass}-${discipline}`}
            className="flex flex-none items-center gap-8 py-3 pr-8 sm:gap-12 sm:pr-12"
            // Only the first pass is read out; the rest are visual filler.
            {...(pass > 0 ? { "aria-hidden": "true" } : {})}
          >
            <span className="font-mono text-xs tracking-[0.18em] whitespace-nowrap text-teal uppercase">
              {discipline}
            </span>
            <span className="h-1 w-1 rounded-full bg-rule" aria-hidden="true" />
          </li>
        )),
      )}
    </ul>
  );
}
