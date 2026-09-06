import {
  ArrowRightLeft,
  BookOpen,
  Boxes,
  BrainCircuit,
  ChartColumn,
  Cloud,
  Code,
  Container,
  Database,
  FlaskConical,
  Gauge,
  GitBranch,
  KeyRound,
  Leaf,
  Link2,
  MessageSquare,
  Network,
  Plug,
  Repeat,
  Rocket,
  Search,
  Server,
  Share2,
  Terminal,
  TreePine,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * One glyph per skill chip.
 *
 * Deliberately lucide line icons rather than vendor logos: the marks are
 * trademarked, they arrive in their own brand colours, and thirty of them would
 * turn a quiet list into a sticker sheet. A single monochrome family inherits
 * the chip's own colour — including its teal on hover — in both themes.
 *
 * A skill with no entry renders without an icon, so adding one to
 * `content/skills.ts` never breaks the row.
 */
export const skillIcons: Record<string, LucideIcon> = {
  // Backend & Languages
  Python: Code,
  Django: Server,
  FastAPI: Zap,
  Flask: FlaskConical,

  // Databases
  PostgreSQL: Database,
  MySQL: Database,
  MongoDB: Leaf,
  Redis: Gauge,
  Pinecone: TreePine,

  // Data Engineering
  ETL: ArrowRightLeft,
  Prefect: Workflow,
  Celery: Repeat,
  Elasticsearch: Search,
  "Apache Superset": ChartColumn,

  // Agentic & AI
  "Claude Code": Terminal,
  MCP: Plug,
  "Agent Architecture": Network,
  "Agentic Workflows": Workflow,
  "LLM Integration": BrainCircuit,
  "Prompt Engineering": MessageSquare,
  RAG: BookOpen,
  LangChain: Link2,
  LangGraph: Share2,

  // Infrastructure
  Docker: Container,
  AWS: Cloud,
  Microservices: Boxes,
  Keycloak: KeyRound,
  "CI/CD": Rocket,
  Git: GitBranch,
};
