export const SITE_URL = "https://mrityunjoy.com";

export const profile = {
  name: "Mrityunjoy Das",
  /** Kept for metadata and JSON-LD; the hero leads with the triad instead. */
  title: "Staff Software Engineer",
  /** Shown as a small status row above the statement. */
  status: "At Cefalo — open to select work",
  /** The statement. Last line renders in the accent colour. */
  triad: ["Engineer.", "Mentor.", "Builder."],
  /** The supporting paragraph under the statement. */
  supportingLine:
    "I have spent ten years on backend systems and the data pipelines behind them. I like the problems that turn out to be design decisions rather than bugs, and I spend a good part of my week making sure the engineers around me can solve them too.",
  /**
   * The supporting line is deliberately less literal than a search engine needs,
   * so <meta> and JSON-LD get their own keyword-carrying sentence.
   */
  metaDescription:
    "Staff Software Engineer with 10 years in backend, data, and AI engineering — ETL pipelines, FastAPI and Django services, and agentic systems, for Norwegian clients including Veyt and Ferdia.",
  location: "Dhaka, Bangladesh",
  email: "mjoyshuvo@gmail.com",
  resumePath: "/Mrityunjoy_Das_Resume.pdf",
  /** Photograph — used for OpenGraph and JSON-LD, where a real face is wanted. */
  photo: "/mrityunjoy-das-portrait.jpg",
  /**
   * Pencil-sketch treatment of the same portrait, drawn on transparency so it
   * sits on the paper with no frame. Near-black ink; dark mode inverts it in CSS.
   */
  sketch: "/mrityunjoy-das-sketch.png",
  links: {
    linkedin: "https://www.linkedin.com/in/mrityunjoy-das/",
    github: "https://github.com/mjoyshuvo",
    githubWork: "https://github.com/shuvo-cefalo",
  },
} as const;

/** The three disciplines, stacked on ruled lines under the portrait. */
export const disciplines = ["Backend", "Data engineering", "AI"];

/** Every profile URL that belongs to this person, for JSON-LD `sameAs`. */
export const sameAs: string[] = [
  profile.links.linkedin,
  profile.links.github,
  profile.links.githubWork,
].filter(Boolean);
