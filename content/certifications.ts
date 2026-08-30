export type Certification = {
  name: string;
  issuer: string;
  issuerUrl?: string;
  /** One line on what the credential actually attests to. */
  blurb: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  /** The public verification page, when the issuer publishes one. */
  url?: string;
  /**
   * The issuer's badge, copied into `public/certifications` rather than
   * hotlinked — the same reasoning as the article covers: a badge platform's
   * CDN URL is signed and will quietly rot into a broken image.
   */
  badge?: string;
};

export const certifications: Certification[] = [
  {
    name: "Claude Certified Architect — Foundations",
    issuer: "Anthropic",
    issuerUrl: "https://www.anthropic.com/",
    blurb:
      "Designing and building production-grade applications with Claude — Claude Code, the Agent SDK, the API, and MCP.",
    issued: "Aug 2026",
    expires: "Aug 2027",
    credentialId: "86e666e2-2d83-411a-8694-1960fc6509ec",
    url: "https://www.credly.com/badges/86e666e2-2d83-411a-8694-1960fc6509ec",
    badge: "/certifications/claude-certified-architect-foundations.png",
  },
];
