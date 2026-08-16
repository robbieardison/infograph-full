export type AgentIntent =
  | "stands-out"
  | "explain-peak"
  | "next-steps"
  | "exec-summary";

export type AgentPrompt = {
  id: AgentIntent;
  label: string;
};

export const AGENT_PROMPTS: AgentPrompt[] = [
  { id: "stands-out", label: "What stands out?" },
  { id: "explain-peak", label: "Explain the peak" },
  { id: "next-steps", label: "What should I do next?" },
  { id: "exec-summary", label: "Summarize for execs" },
];

export type ChartSnapshot = {
  title: string;
  subtitle?: string;
  chartType: string;
  topLabel?: string;
  topValue?: string;
  total?: string;
  peak?: string;
};

const DEFAULT: ChartSnapshot = {
  title: "Revenue by Region",
  subtitle: "Sample regional performance",
  chartType: "bar",
  topLabel: "North America",
  topValue: "$3.9M",
  total: "$8.7M",
  peak: "$1.1M",
};

export function getAgentReply(intent: AgentIntent, snap: ChartSnapshot = DEFAULT): string {
  const title = snap.title || DEFAULT.title;
  const top = snap.topLabel || DEFAULT.topLabel;
  const topVal = snap.topValue || DEFAULT.topValue;
  const total = snap.total || DEFAULT.total;
  const peak = snap.peak || DEFAULT.peak;
  const chart = snap.chartType || DEFAULT.chartType;

  switch (intent) {
    case "stands-out":
      return `**${title}** — ${top} leads at **${topVal}**, pulling ahead of the rest of the field. Total across categories is **${total}**. On a ${chart} view, the gap between #1 and the mid-pack is the story: concentration, not evenness.`;
    case "explain-peak":
      return `The peak (**${peak}**) sits with **${top}**. That usually means either a seasonal push, a pricing/mix effect, or simply a larger installed base. Compare the peak quarter (or category) against the prior period before treating it as a permanent trend.`;
    case "next-steps":
      return `1. **Validate** the ${top} lead with a second cut (by quarter or product).\n2. **Interview** the owners of the lagging categories — is it demand or coverage?\n3. **Ship one experiment** aimed at the largest gap, not the average.\n4. Revisit this ${chart} in two weeks with the same mapping.`;
    case "exec-summary":
      return `**Exec brief — ${title}**\n\n- Headline: ${top} dominates (${topVal}); overall ${total}.\n- Risk: over-reliance on one segment if the rest flatten.\n- Ask: what would it take to grow #2–#3 by 15% without hurting the leader?\n- Decision needed: double-down vs diversify this quarter.`;
    default:
      return "Pick a prompt to see a sample analysis.";
  }
}
