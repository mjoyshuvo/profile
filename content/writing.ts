export type Post = {
  title: string;
  url: string;
  /** One line, in my voice, on why I wrote it — not a summary of it. */
  blurb: string;
  publisher: string;
};

export const writing: Post[] = [
  {
    title: "MCP went stateless. Here's why that's a bigger deal than it sounds",
    url: "https://www.linkedin.com/pulse/mcp-went-stateless-heres-why-thats-bigger-deal-than-sounds-das-ydmac/",
    blurb:
      "I wrote this after dropping session state changed how I deploy, scale and reason about MCP servers.",
    publisher: "LinkedIn",
  },
  {
    title: "From agent engineering to the loop",
    url: "https://www.linkedin.com/pulse/from-agent-engineering-loop-mrityunjoy-das-sgo7c/",
    blurb:
      "My argument that the interesting problem in agentic systems is the loop around the model, not the prompt inside it.",
    publisher: "LinkedIn",
  },
];
