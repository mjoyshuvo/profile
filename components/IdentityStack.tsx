"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const noop = () => () => {};

export type Layer = {
  key: string;
  /** "Layer 2". */
  label: string;
  eyebrow: string;
  icon: ReactNode;
  panel: ReactNode;
};

/** Slab widths, top to bottom, so the stack reads as a small pyramid. */
const WIDTHS = ["w-[76%]", "w-[88%]", "w-full"];

/**
 * The three disciplines drawn as a stack of layers — AI on top of data on top
 * of the backend — with dots moving between them. The selected layer lifts
 * and its panel shows beside the stack (below it on a phone).
 *
 * A client component for the selection only. Every panel is rendered on the
 * server; without JavaScript the stack is hidden (`html:not(.js)`) and the
 * three panels are simply listed.
 *
 * `layers` run top to bottom.
 */
export function IdentityStack({
  layers,
  initial,
}: {
  layers: Layer[];
  initial: string;
}) {
  const [active, setActive] = useState(initial);
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = layers.findIndex((layer) => layer.key === active);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: layers.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + layers.length) % layers.length;
    setActive(layers[next].key);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:items-center lg:gap-14">
      <div
        {...(ready
          ? {
              role: "tablist",
              "aria-label": "Disciplines",
              "aria-orientation": "vertical" as const,
            }
          : {})}
        onKeyDown={onKeyDown}
        className="layer-stack flex flex-col items-center"
      >
        {layers.map((layer, i) => {
          const isActive = layer.key === active;
          return (
            <div key={layer.key} className="flex w-full flex-col items-center">
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                {...(ready
                  ? {
                      role: "tab",
                      id: `layer-tab-${layer.key}`,
                      "aria-controls": `layer-panel-${layer.key}`,
                      "aria-selected": isActive,
                      tabIndex: isActive ? 0 : -1,
                    }
                  : {})}
                {...(isActive ? { "data-active": "" } : {})}
                onClick={() => setActive(layer.key)}
                className={`layer-slab flex h-20 items-center gap-4 rounded-[1.375rem] border px-5 text-left sm:h-24 sm:px-7 ${WIDTHS[i] ?? "w-full"}`}
              >
                <span className="layer-glyph grid h-11 w-11 shrink-0 place-items-center rounded-2xl sm:h-12 sm:w-12">
                  {layer.icon}
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-display text-[0.6875rem] font-semibold tracking-[0.14em] uppercase opacity-80">
                    {layer.label}
                  </span>
                  <span className="font-display text-lg font-bold tracking-[-0.02em] sm:text-xl">
                    {layer.eyebrow}
                  </span>
                </span>
              </button>
              {i < layers.length - 1 ? (
                <span aria-hidden="true" className="layer-link relative h-9 w-28 sm:h-11">
                  <span className="layer-wire left-8" />
                  <span className="layer-wire right-8" />
                  <span className="layer-bit left-[1.8125rem]" />
                  <span className="layer-bit layer-bit-late right-[1.8125rem]" />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="layer-panels">
        {layers.map((layer) => (
          <div
            key={layer.key}
            id={`layer-panel-${layer.key}`}
            {...(ready
              ? {
                  role: "tabpanel",
                  "aria-labelledby": `layer-tab-${layer.key}`,
                  tabIndex: 0,
                }
              : {})}
            {...(layer.key === active ? { "data-active": "" } : {})}
            className="layer-panel"
          >
            {layer.panel}
          </div>
        ))}
      </div>
    </div>
  );
}
