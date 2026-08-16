export type ConceptBranch = "executive" | "ops" | "narrative" | "product";

export type ConceptLayout =
  | "kpi-board"
  | "ops-console"
  | "finance"
  | "funnel"
  | "cohort"
  | "geo"
  | "realtime"
  | "scroll-story"
  | "okr"
  | "logistics"
  | "channels"
  | "domain";

export type Concept = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  accent: string;
  accentSoft: string;
  surface: string;
  ink: string;
  branch: ConceptBranch;
  layout: ConceptLayout;
  tagline: string;
  metrics: { label: string; value: string }[];
  flagship?: boolean;
};

export const CONTACT_URL = "https://stablepanther.com/#contact";
export const PARENT_URL = "https://stablepanther.com";

export const BRANCH_LABELS: Record<ConceptBranch, string> = {
  executive: "Executive",
  ops: "Operations",
  narrative: "Narrative",
  product: "Product",
};

export const concepts: Concept[] = [
  {
    slug: "northstar",
    title: "Northstar",
    category: "C-suite",
    branch: "executive",
    layout: "kpi-board",
    flagship: true,
    blurb: "A calm executive board: north-star KPI, trend, and decision cues.",
    accent: "#1096a9",
    accentSoft: "#d7ebee",
    surface: "#0f1418",
    ink: "#e8eef0",
    tagline: "See the business in one glance.",
    metrics: [
      { label: "ARR", value: "$12.4M" },
      { label: "NPS", value: "62" },
      { label: "Burn", value: "18 mo" },
    ],
  },
  {
    slug: "signalroom",
    title: "Signal Room",
    category: "Ops",
    branch: "ops",
    layout: "ops-console",
    flagship: true,
    blurb: "Live ops console for incidents, latency, and on-call signal.",
    accent: "#ed4933",
    accentSoft: "#fde8e4",
    surface: "#0c1014",
    ink: "#f2f5f7",
    tagline: "When the room needs the truth fast.",
    metrics: [
      { label: "Uptime", value: "99.97%" },
      { label: "P95", value: "142ms" },
      { label: "Open", value: "3" },
    ],
  },
  {
    slug: "ledger",
    title: "Ledger",
    category: "Finance",
    branch: "executive",
    layout: "finance",
    blurb: "P&L narrative with margin trails and cash runway clarity.",
    accent: "#10a37f",
    accentSoft: "#d8f3eb",
    surface: "#f4f7f8",
    ink: "#142226",
    tagline: "Finance that reads like a briefing.",
    metrics: [
      { label: "Gross margin", value: "68%" },
      { label: "OpEx", value: "$2.1M" },
      { label: "Runway", value: "22 mo" },
    ],
  },
  {
    slug: "funnel",
    title: "Funnel",
    category: "Growth",
    branch: "product",
    layout: "funnel",
    flagship: true,
    blurb: "Conversion funnel with stage drop-offs and experiment callouts.",
    accent: "#2f6fed",
    accentSoft: "#e4ecff",
    surface: "#f7f9fb",
    ink: "#1a2330",
    tagline: "Where users leave — and why.",
    metrics: [
      { label: "Visit→Trial", value: "12.4%" },
      { label: "Trial→Paid", value: "28%" },
      { label: "Lift", value: "+6.2%" },
    ],
  },
  {
    slug: "cohort",
    title: "Cohort",
    category: "Retention",
    branch: "product",
    layout: "cohort",
    blurb: "Retention heat and cohort curves for product teams.",
    accent: "#0d9488",
    accentSoft: "#d5f5f0",
    surface: "#ffffff",
    ink: "#152033",
    tagline: "Who stays, who slips, by week.",
    metrics: [
      { label: "W4 retain", value: "41%" },
      { label: "Churn", value: "3.2%" },
      { label: "Expansion", value: "+9%" },
    ],
  },
  {
    slug: "fieldmap",
    title: "Fieldmap",
    category: "Regional",
    branch: "ops",
    layout: "geo",
    blurb: "Regional performance map with territory scorecards.",
    accent: "#5b8cff",
    accentSoft: "#e8efff",
    surface: "#eef1f4",
    ink: "#1a2330",
    tagline: "Territory truth on a map.",
    metrics: [
      { label: "Regions", value: "14" },
      { label: "Top lift", value: "+18%" },
      { label: "Gaps", value: "3" },
    ],
  },
  {
    slug: "pulse",
    title: "Pulse",
    category: "Realtime",
    branch: "ops",
    layout: "realtime",
    blurb: "Activity feed + sparkline pulse for live product health.",
    accent: "#38bdf8",
    accentSoft: "#e0f4fe",
    surface: "#070b14",
    ink: "#e6ecf5",
    tagline: "The heartbeat of the product.",
    metrics: [
      { label: "Active", value: "8.2k" },
      { label: "Events/m", value: "42k" },
      { label: "Alerts", value: "1" },
    ],
  },
  {
    slug: "briefing",
    title: "Briefing",
    category: "Story",
    branch: "narrative",
    layout: "scroll-story",
    flagship: true,
    blurb: "Scroll-story data briefing for leadership offsites.",
    accent: "#7dd3fc",
    accentSoft: "#e0f2fe",
    surface: "#0b1220",
    ink: "#eef3fb",
    tagline: "A story, not a dashboard dump.",
    metrics: [
      { label: "Chapters", value: "5" },
      { label: "Decisions", value: "4" },
      { label: "Read time", value: "6 min" },
    ],
  },
  {
    slug: "scorecard",
    title: "Scorecard",
    category: "OKRs",
    branch: "executive",
    layout: "okr",
    blurb: "Balanced scorecard with objective progress and owner lanes.",
    accent: "#1096a9",
    accentSoft: "#c5e4ea",
    surface: "#f4f7f8",
    ink: "#141a22",
    tagline: "OKRs that stay readable.",
    metrics: [
      { label: "On track", value: "7/10" },
      { label: "At risk", value: "2" },
      { label: "Missed", value: "1" },
    ],
  },
  {
    slug: "supply",
    title: "Supply",
    category: "Logistics",
    branch: "ops",
    layout: "logistics",
    blurb: "Supply chain nodes, delays, and fill-rate clarity.",
    accent: "#c45c26",
    accentSoft: "#f5e6dc",
    surface: "#f7f4f0",
    ink: "#1c1712",
    tagline: "From warehouse to promise.",
    metrics: [
      { label: "Fill rate", value: "94%" },
      { label: "Late", value: "6%" },
      { label: "Nodes", value: "28" },
    ],
  },
  {
    slug: "audience",
    title: "Audience",
    category: "Marketing",
    branch: "product",
    layout: "channels",
    blurb: "Channel mix, CAC, and creative lift in one surface.",
    accent: "#ed4933",
    accentSoft: "#fde8e4",
    surface: "#ffffff",
    ink: "#152033",
    tagline: "Spend that earns its keep.",
    metrics: [
      { label: "CAC", value: "$48" },
      { label: "ROAS", value: "3.4x" },
      { label: "Share", value: "Paid 41%" },
    ],
  },
  {
    slug: "clinic",
    title: "Clinic",
    category: "Domain",
    branch: "narrative",
    layout: "domain",
    blurb: "Domain deep-dive for health or education programs.",
    accent: "#0d9488",
    accentSoft: "#d5f5f0",
    surface: "#f4f9f8",
    ink: "#152033",
    tagline: "Evidence for the people who decide.",
    metrics: [
      { label: "Coverage", value: "87%" },
      { label: "Outcomes", value: "+11%" },
      { label: "Sites", value: "42" },
    ],
  },
];

export function getConcept(slug: string) {
  return concepts.find((c) => c.slug === slug);
}

export function conceptsByBranch(branch: ConceptBranch) {
  return concepts.filter((c) => c.branch === branch);
}
