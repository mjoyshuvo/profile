export type Recommendation = {
  /**
   * Stable slug. Used for the tab and panel ids once there is more than one
   * recommendation, so it must not change when the list is reordered.
   */
  id: string;
  name: string;
  /** Their title when they wrote it, not their title today. */
  title: string;
  /** How they know me, in LinkedIn's own words. */
  relation: string;
  /** Display date, e.g. "July 2022". */
  date: string;
  /** ISO date, for <time datetime>. */
  dateISO: string;
  /** Verbatim, one entry per paragraph. Plain text — no markdown, no HTML. */
  quote: string[];
  /**
   * Optional, because the photo usually lags the words. Falls back to an
   * initials monogram drawn from the palette tokens.
   */
  avatar?: string;
  /** Link to the original, when there is a public one. */
  sourceUrl?: string;
};

/**
 * Transcribed from LinkedIn, unedited apart from obvious typos in the source.
 * If you would not be comfortable with the writer reading this page, the
 * transcription is wrong.
 */
export const recommendations: Recommendation[] = [
  {
    id: "erik-ormevik",
    name: "Erik Ormevik",
    title: "Product Owner & Frontend Developer at Ferdia",
    relation: "Worked with me at Ferdia",
    date: "July 2022",
    dateISO: "2022-07-14",
    avatar: "/recommenders/erik-ormevik.jpg",
    quote: [
      // Source reads "took it upon himself to e sure" — a typo for "ensure".
      // That is the only word changed anywhere in this quote.
      "Mrityunjoy stepped into our team with massive shoes to fill, taking over the role of the most senior resource in the team. Some had their doubts initially that this was even a role that could be properly filled by someone else, but Mrityunjoy took it upon himself to ensure that the doubters could not have been more wrong!",
      "He has earned my utmost respect, being a person who will always step up to the plate when things get tough, and will see things through to the end. Mrityunjoy does not back down from a difficult situation, and rather takes charge and displays great leadership!",
      "He is a rock solid person with an unmatched can-do attitude, and has integrity that earns respect. Even faced with critical, time-sensitive issues, Mrityunjoy keeps calm, collected, and confident until the task is seen all the way through.",
      "You've undoubtedly earned my respect, both for who you are as a person, as well as your knowledge in what you do in your work. It has been an absolute pleasure working with you, and I would say \"good luck\" moving forward, but you don't need luck!",
    ],
  },
];
