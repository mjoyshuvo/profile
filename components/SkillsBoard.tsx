"use client";

import { useState } from "react";
import type { SkillGroup } from "@/content/skills";
import { skillIcons } from "./SkillIcons";

/**
 * Skills as a board of tiles with a filter row above it. Picking an area
 * brings its tiles forward and fades the rest; nothing is removed, so the
 * full list is always on the page (and in the server HTML). Without
 * JavaScript the filter row is hidden and the board is simply the list.
 */
export function SkillsBoard({ groups }: { groups: SkillGroup[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  const filters = [
    { label: "All", value: null, count: total },
    ...groups.map((group) => ({
      label: group.label,
      value: group.label,
      count: group.items.length,
    })),
  ];

  // Counts only the tiles that are in, so the ones coming forward ripple in
  // reading order rather than all at once.
  let lit = 0;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div
        role="group"
        aria-label="Filter skills by area"
        className="skill-filters flex flex-wrap gap-2"
      >
        {filters.map((item) => {
          const on = filter === item.value;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(item.value)}
              className="skill-filter flex h-11 items-center gap-2.5 rounded-full border pr-2 pl-4 font-display text-sm font-semibold"
            >
              {item.label}
              <span className="skill-count grid h-7 min-w-7 place-items-center rounded-full px-1.5 text-xs tabular-nums">
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {groups.flatMap((group) =>
          group.items.map((skill) => {
            const Icon = skillIcons[skill];
            const inFilter = filter === null || filter === group.label;
            const delay = inFilter ? lit++ * 0.02 : 0;
            return (
              <li
                key={skill}
                {...(filter !== null && inFilter ? { "data-lit": "" } : {})}
                {...(!inFilter ? { "data-dim": "" } : {})}
                style={{ "--d": `${Math.min(delay, 0.3)}s` } as React.CSSProperties}
                className="skill-tile flex flex-col gap-3 rounded-2xl border bg-paper-raised p-4"
              >
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-teal-wash text-teal"
                >
                  {Icon ? (
                    <Icon className="h-[1.125rem] w-[1.125rem]" />
                  ) : (
                    <span className="font-display text-xs font-bold">
                      {skill.slice(0, 2)}
                    </span>
                  )}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
                    {skill}
                  </span>
                  <span className="font-display text-[0.625rem] font-semibold tracking-[0.1em] text-ink-faint uppercase">
                    {group.label}
                  </span>
                </span>
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}
