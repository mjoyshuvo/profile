export type Post = {
  title: string;
  url: string;
  /** One line on why the piece exists — not a summary of it. */
  blurb: string;
  publisher: string;
  /**
   * The article's own cover image, copied into `public/writing` rather than
   * hotlinked. LinkedIn's CDN signs and expires these URLs, so a link would
   * quietly turn into a broken image some months from now.
   */
  cover?: string;
};

export const writing: Post[] = [
  {
    title: "MCP went stateless. Here's why that's a bigger deal than it sounds",
    url: "https://www.linkedin.com/pulse/mcp-went-stateless-heres-why-thats-bigger-deal-than-sounds-das-ydmac/",
    blurb:
      "What dropping session state changes about how you deploy, scale, and reason about MCP servers.",
    publisher: "LinkedIn",
    cover: "/writing/mcp-stateless.jpg",
  },
  {
    title: "From agent engineering to the loop",
    url: "https://www.linkedin.com/pulse/from-agent-engineering-loop-mrityunjoy-das-sgo7c/",
    blurb:
      "Why the interesting problem in agentic systems is the loop around the model, not the prompt inside it.",
    publisher: "LinkedIn",
    cover: "/writing/agent-engineering-loop.jpg",
  },
];
