import Image from "next/image";
import { ArrowDown, Briefcase, ExternalLink, MapPin } from "lucide-react";
import { NorwayFlag } from "./BrandIcons";
import { CardWash } from "./CardWash";
import { CareerRail } from "./CareerRail";
import { CountUp } from "./CountUp";
import { Disclosure } from "./Disclosure";
import { experience, type Position, type Role } from "@/content/experience";
import { projects } from "@/content/projects";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** Bullets shown per position before the rest fold behind "Show all". */
const BULLETS_AT_REST = 3;

const MONTH = 1000 * 60 * 60 * 24 * 30.4375;

const MONTH_NAMES = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

/** A whole-month count (year × 12 + month) from an ISO date, or now. */
function monthOf(iso: string | undefined, now: Date) {
  const date = iso ? new Date(iso) : now;
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
}

type RulerMonth = { label: string; year: number | null };

/** A fractional year from an ISO date, for placing bars on the ruler. */
function yearOf(iso: string | undefined, now: Date) {
  const date = iso ? new Date(iso) : now;
  return (
    date.getUTCFullYear() + date.getUTCMonth() / 12 + date.getUTCDate() / 365
  );
}

/** "3 yrs 11 mos" from two ISO dates, the way LinkedIn states a tenure. */
function tenure(start: string, end: string | undefined, now: Date) {
  const months = Math.max(
    1,
    Math.round(
      ((end ? new Date(end) : now).getTime() - new Date(start).getTime()) /
        MONTH,
    ),
  );
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

function slugOf(company: string) {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** The first word or two of a company name — what fits on a ruler bar. */
function shortName(company: string) {
  const known: Record<string, string> = {
    "Brain Station 23": "BS23",
    "ADN DigiNet Ltd.": "ADN",
    "InfoSapex Limited": "InfoSapex",
  };
  return known[company] ?? company;
}

/**
 * Experience as a metro line: one station per company, and the selected
 * company's panel under it. The panels are rendered here, on the server, so
 * every role and bullet is in the HTML; `CareerRail` only decides which one
 * shows. Without JavaScript all four are listed, newest first.
 */
export function Experience() {
  // Built statically, so "now" is the build date — the site redeploys often
  // enough that the line's end and the live tenure stay current.
  const now = new Date();
  const first = Math.floor(
    Math.min(...experience.map((role) => yearOf(role.startDate, now))),
  );
  const last = yearOf(undefined, now) + 0.35;
  const at = (year: number) => ((year - first) / (last - first)) * 100;

  const stops = [...experience].reverse().map((role) => {
    const start = new Date(role.startDate).getUTCFullYear();
    const end = role.endDate ? new Date(role.endDate).getUTCFullYear() : null;
    return {
      slug: slugOf(role.company),
      short: shortName(role.company),
      years:
        end === null
          ? `${start} – now`
          : end === start
            ? String(start)
            : `${start} – ${end}`,
      left: at(yearOf(role.startDate, now)),
      right: at(yearOf(role.endDate, now)),
      live: !role.endDate,
    };
  });

  return (
    <Section
      id="experience"
      title="Experience"
      icon={<Briefcase className="h-6 w-6" />}
    >
      <Reveal>
        <CareerRail
          stops={stops}
          nowLeft={at(yearOf(undefined, now))}
          panels={experience.map((role) => ({
            slug: slugOf(role.company),
            name: role.company,
            dates: `${role.start} – ${role.end}`,
            tenure: tenure(role.startDate, role.endDate, now),
            live: !role.endDate,
            node: <RolePanel role={role} now={now} />,
          }))}
        />
      </Reveal>
    </Section>
  );
}

/** Position grids by count. Literal classes, so Tailwind can see them. */
const POSITION_COLS: Record<number, string> = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
};

/**
 * One company as a bento: who and for whom on the left, the numbers worth
 * remembering in a teal block beside it, and one card per position under
 * both. The numbers sit next to the name, where a skimming reader looks.
 */
function RolePanel({ role, now }: { role: Role; now: Date }) {
  // Every month of the tenure, for the rulers under the position cards.
  const first = monthOf(role.startDate, now);
  const months = Array.from(
    { length: monthOf(role.endDate, now) - first + 1 },
    (_, i) => {
      const year = Math.floor((first + i) / 12);
      const month = (first + i) % 12;
      return {
        label: `${MONTH_NAMES[month]} ${year}`,
        year: month === 0 ? year : null,
      };
    },
  );
  const hasStats = Boolean(role.highlights?.length);

  return (
    <article className="career-panel grid gap-4 lg:grid-cols-12">
      <div
        className={`spot-card relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-rule bg-paper-raised p-6 sm:p-8 ${
          hasStats ? "lg:col-span-7" : "lg:col-span-12"
        }`}
      >
        <CardWash />
        <h3 className="career-name relative font-display text-3xl leading-[1.05] font-extrabold tracking-[-0.04em] sm:text-[2.75rem]">
          {role.companyUrl ? (
            <a
              href={role.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap inline-flex items-center gap-1.5 transition-colors hover:text-teal"
            >
              {role.company}
              <ExternalLink className="h-4 w-4 opacity-50" aria-hidden="true" />
            </a>
          ) : (
            role.company
          )}
        </h3>

        {/* Dates and places are data, so they are set like data: small,
            uppercase, in pills that wrap as whole pills. */}
        <p className="relative flex flex-wrap gap-2 font-display text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
          <span className="inline-flex items-center gap-x-2 rounded-full border border-rule px-3 py-1.5 whitespace-nowrap">
            <time dateTime={role.startDate}>{role.start}</time>
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-rule" />
            <DateEnd end={role.end} endDate={role.endDate} />
          </span>
          <span className="rounded-full border border-rule px-3 py-1.5 whitespace-nowrap">
            {tenure(role.startDate, role.endDate, now)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-rule px-3 py-1.5 whitespace-nowrap">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
            {role.location.split(",")[0]}
          </span>
        </p>

        {role.client ? (
          <div className="relative mt-1 flex flex-col gap-3 border-t border-rule pt-4 sm:flex-row sm:items-start sm:gap-4">
            <ClientMark client={role.client} />
            <p className="text-sm leading-relaxed text-ink-soft">
              <span className="mr-1.5 inline-flex items-center gap-1.5 align-middle font-display text-[0.6875rem] font-semibold tracking-[0.12em] text-teal uppercase">
                Client ·{" "}
                {role.client.url ? (
                  <a
                    href={role.client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap transition-colors hover:text-teal-strong"
                  >
                    {role.client.name}
                  </a>
                ) : (
                  role.client.name
                )}
                <NorwayFlag className="h-3 w-[1.03rem] shrink-0 rounded-[1px] ring-1 ring-black/10" />
                <span className="sr-only">(Norway)</span>
              </span>
              {role.client.blurb}
            </p>
          </div>
        ) : null}
      </div>

      {hasStats ? (
        // The figures as piano keys under a key bed: they drop in and play a
        // quick run when the panel arrives, and a key presses under the
        // pointer. Motion lives in globals.css (`.piano`).
        <ul
          className={`piano grid gap-1.5 lg:col-span-5 ${
            role.highlights!.length === 3 ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          {role.highlights!.map((item, i) => (
            <li
              key={item.label}
              style={{ "--i": i } as React.CSSProperties}
              className="piano-key @container flex min-w-0 flex-col justify-start gap-2 bg-teal p-4 pt-10 text-on-teal sm:p-6 sm:pt-14"
            >
              <CountUp
                value={item.value}
                className="font-display text-[min(2.5rem,24cqi)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap tabular-nums"
              />
              <span className="font-display text-[0.625rem] leading-snug font-semibold tracking-[0.08em] uppercase opacity-85 sm:text-[0.6875rem]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* One card per position, newest first. A promotion reads as one
          tenure with steps in it, not as separate jobs. */}
      <div
        className={`grid gap-4 lg:col-span-12 ${POSITION_COLS[Math.min(role.positions.length, 3)]}`}
      >
        {role.positions.map((position, i) => (
          <PositionEntry
            key={position.title + position.start}
            position={position}
            months={months}
            from={monthOf(position.startDate, now) - first}
            to={monthOf(position.endDate, now) - first + 1}
            id={`${slugOf(role.company)}-${i}`}
          />
        ))}
      </div>

      <div className="lg:col-span-12">
        <CaseStudyLinks company={role.company} />
      </div>
    </article>
  );
}

/**
 * The right-hand side of a date range. An ongoing role gets a teal badge rather
 * than the word in running text — it is the one piece of this metadata a reader
 * actually scans for, and there is no `<time>` to wrap it in anyway.
 */
function DateEnd({ end, endDate }: { end: string; endDate?: string }) {
  if (endDate) {
    return <time dateTime={endDate}>{end}</time>;
  }

  return (
    <span className="rounded-full bg-teal-wash px-2 py-0.5 font-display font-semibold text-teal">
      {end}
    </span>
  );
}

/**
 * Links from a role to the case studies delivered under it. Matched on
 * `Project.company`, so the two sections can't drift apart: delete a project
 * and its link disappears with it.
 */
function CaseStudyLinks({ company }: { company: string }) {
  const matches = projects.filter((project) => project.company === company);
  if (matches.length === 0) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
      {matches.map((project) => (
        <li key={project.slug}>
          <a
            href={`#project-${project.slug}`}
            className="tap group inline-flex items-center gap-1.5 font-display text-sm font-medium text-ink-faint transition-colors hover:text-teal"
          >
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
              aria-hidden="true"
            />
            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-teal">
              {project.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The client's logo when there's a file for it, and a lettermark otherwise, so
 * the card keeps the same shape either way.
 */
function ClientMark({ client }: { client: NonNullable<Role["client"]> }) {
  // Both marks are wordmarks drawn for a light ground, and one is green — so
  // the chip carries its own light surface in either theme rather than being
  // inverted, which would misrepresent the brand colour.
  const base =
    "flex h-9 shrink-0 items-center justify-center rounded-md border border-rule bg-[#f5f3ee]";

  if (client.logo) {
    return (
      <span className={`${base} w-24 px-2`}>
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={160}
          height={54}
          className="h-4 w-auto max-w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span className={`${base} w-9`} aria-hidden="true">
      <span className="font-display text-sm font-bold text-ink-faint">
        {client.name.charAt(0)}
      </span>
    </span>
  );
}

function PositionEntry({
  position,
  months,
  from,
  to,
  id,
}: {
  position: Position;
  /** Every month of the company tenure. */
  months: RulerMonth[];
  /** The months this position covers: `from` inclusive, `to` exclusive. */
  from: number;
  to: number;
  id: string;
}) {
  const bullets = position.bullets ?? [];
  const resting = bullets.slice(0, BULLETS_AT_REST);
  const folded = bullets.slice(BULLETS_AT_REST);
  const moreId = `position-${id}-more`;

  return (
    <div className="career-position flex flex-col gap-3 rounded-3xl border border-rule bg-paper-raised p-5 sm:p-7">
      <p className="flex items-center gap-x-2 font-display text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
        <time dateTime={position.startDate}>{position.start}</time>
        <span aria-hidden="true" className="h-px w-3 shrink-0 bg-rule" />
        <DateEnd end={position.end} endDate={position.endDate} />
      </p>
      <h4 className="font-display text-lg leading-snug font-bold tracking-[-0.02em] sm:text-xl">
        {position.title}
      </h4>

      <MonthRuler
        months={months}
        from={from}
        to={to}
        live={!position.endDate}
      />

      {resting.length ? (
        <ul className="mt-1 space-y-2">
          {resting.map((bullet) => (
            <Bullet key={bullet}>{bullet}</Bullet>
          ))}
        </ul>
      ) : null}

      {/* The rest of the bullets. Clipped, never removed — they are in the
          DOM and the accessibility tree whether or not the reader opens them,
          the same pattern as a project's case study. */}
      {folded.length ? (
        <>
          <div id={moreId} className="career-more">
            <div className="career-more-inner">
              <ul className="space-y-2 pt-2">
                {folded.map((bullet) => (
                  <Bullet key={bullet}>{bullet}</Bullet>
                ))}
              </ul>
            </div>
          </div>
          <Disclosure
            more={`Show all ${bullets.length}`}
            less="Show fewer"
            controls={moreId}
            className="mt-1 self-start"
          />
        </>
      ) : null}
    </div>
  );
}

/**
 * Where the position sits inside the tenure, as a ruler with one tick per
 * month and a taller tick at each new year. The position's months light up
 * and the playhead runs to its end when the panel arrives; under a pointer
 * the ticks rise in a small wave and name their month. All of it is CSS
 * (`.ruler` in globals.css). Decorative: the dates above say the same in
 * words.
 */
function MonthRuler({
  months,
  from,
  to,
  live,
}: {
  months: RulerMonth[];
  from: number;
  to: number;
  live: boolean;
}) {
  const at = (month: number) => `${(month / months.length) * 100}%`;
  return (
    <div
      aria-hidden="true"
      className="ruler relative mt-6 pb-5"
      style={{ "--from": at(from), "--to": at(to) } as React.CSSProperties}
    >
      <div className="relative flex h-11 items-end">
        {months.map((month, i) => {
          const inside = i >= from && i < to;
          return (
            <span
              key={month.label}
              {...(inside ? { "data-in": "" } : {})}
              {...(month.year ? { "data-year": "" } : {})}
              style={
                inside
                  ? ({ "--k": (i - from) / Math.max(1, to - from - 1) } as React.CSSProperties)
                  : undefined
              }
              className="ruler-tick relative flex h-full min-w-0 flex-1 items-end justify-center"
            >
              <span className="ruler-bar block w-[3px] rounded-full" />
              {month.year ? (
                <span className="ruler-year absolute top-[calc(100%+0.375rem)] left-1/2 -translate-x-1/2 font-display text-[0.625rem] font-semibold tracking-[0.06em] text-ink-faint">
                  {month.year}
                </span>
              ) : null}
              <span className="ruler-tip absolute bottom-[calc(100%+0.5rem)] left-1/2 rounded-lg bg-ink px-2 py-1 font-display text-[0.6875rem] font-bold whitespace-nowrap text-paper-raised tabular-nums">
                {month.label}
              </span>
            </span>
          );
        })}
        <span className="ruler-head absolute -top-1.5 -bottom-1 w-0.5 -translate-x-1/2 rounded-full bg-teal">
          <span className="ruler-tag absolute bottom-full left-1/2 -translate-x-1/2 rounded-full bg-teal px-2 py-0.5 font-display text-[0.625rem] font-bold tracking-[0.08em] whitespace-nowrap text-on-teal uppercase">
            {live ? "Now" : months[to - 1]?.label}
          </span>
        </span>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative max-w-[68ch] pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
      <span
        className="absolute top-[0.6em] left-0 h-1.5 w-1.5 rounded-full bg-teal/60"
        aria-hidden="true"
      />
      {children}
    </li>
  );
}
