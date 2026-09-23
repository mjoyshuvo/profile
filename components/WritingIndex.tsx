"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/content/writing";
import { CardWash } from "./CardWash";

/**
 * Writing as an index inside one card: large titles in a ruled list, and
 * beside it the cover of whichever post is under the pointer or keyboard
 * focus. Built for any number of posts: the list simply grows, and the
 * preview stays in view beside it.
 *
 * A client component for the hover state only; Next renders it on the server,
 * so every title, blurb and link is in the initial HTML. All the covers are in
 * the DOM and cross-fade (`.writing-cover`), so with no JavaScript the first
 * one simply shows. On phones there is no side column: each row carries its
 * own cover instead.
 */
export function WritingIndex({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="spot-card relative grid gap-8 overflow-clip rounded-[1.75rem] border border-rule bg-paper-raised px-6 py-2 shadow-[var(--shadow)] sm:px-10 sm:py-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-14">
      <CardWash />
      <ul className="relative divide-y divide-rule">
        {posts.map((post, i) => {
          const isActive = i === active;
          return (
            <li
              key={post.url}
              onPointerEnter={() => setActive(i)}
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 py-7 sm:gap-8 sm:py-8"
              >
                <span className="flex flex-col gap-2.5">
                  {/* The phone's cover, where there is no side column. */}
                  {post.cover ? (
                    <span className="mb-2 block overflow-hidden rounded-2xl border border-rule lg:hidden">
                      <Image
                        src={post.cover}
                        alt=""
                        aria-hidden="true"
                        width={960}
                        height={540}
                        sizes="(min-width: 640px) 600px, 100vw"
                        className="block h-40 w-full object-cover sm:h-56"
                      />
                    </span>
                  ) : null}
                  <span
                    className={`font-display text-[0.6875rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                      isActive ? "text-teal" : "text-ink-faint"
                    }`}
                  >
                    {i === 0 ? "Latest" : "Essay"} · {post.publisher}
                  </span>
                  <span
                    className={`font-display text-2xl leading-[1.12] font-extrabold tracking-[-0.035em] text-balance transition-colors sm:text-3xl ${
                      isActive ? "text-teal" : "text-ink"
                    }`}
                  >
                    {post.title}
                  </span>
                  <span className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                    {post.blurb}
                  </span>
                </span>

                {/* The arrow fills on the active row. */}
                <span
                  aria-hidden="true"
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 group-hover:rotate-45 sm:h-14 sm:w-14 ${
                    isActive
                      ? "border-teal bg-teal text-on-teal"
                      : "border-rule bg-paper-raised text-ink-soft"
                  }`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* The preview. Decorative: the same cover is inline on phones, and the
          link text says everything the image does. */}
      {/* Sticky, so with a long list the cover stays beside the row it
          belongs to rather than at the top of the card. */}
      <div
        aria-hidden="true"
        className="relative hidden pt-8 pb-10 lg:sticky lg:top-24 lg:block"
      >
        <div className="grid">
          {posts.map((post, i) =>
            post.cover ? (
              <div
                key={post.url}
                {...(i === active ? { "data-active": "" } : {})}
                style={
                  { "--tilt": i % 2 ? "2deg" : "-2deg" } as React.CSSProperties
                }
                className="writing-cover col-start-1 row-start-1 overflow-hidden rounded-[1.75rem] border border-rule shadow-[0_24px_48px_-28px_var(--teal)]"
              >
                <Image
                  src={post.cover}
                  alt=""
                  width={960}
                  height={540}
                  sizes="352px"
                  className="block aspect-[4/3] w-full object-cover"
                />
              </div>
            ) : null,
          )}
        </div>
        <span className="absolute bottom-6 -left-5 rounded-full border border-rule bg-paper-raised px-4 py-2 font-display text-xs font-semibold text-ink-soft shadow-[var(--shadow-float)]">
          Published on {posts[active]?.publisher}
        </span>
      </div>
    </div>
  );
}
