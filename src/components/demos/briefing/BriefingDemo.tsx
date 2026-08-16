"use client";

import type { Concept } from "@/lib/concepts";
import { DemoShell, MetricStrip, isDarkSurface } from "../shells/DemoShell";

const chapters = [
  {
    title: "The year in one number",
    body: "Revenue grew 34% while headcount grew 12% — leverage showed up in product, not sales headcount.",
  },
  {
    title: "Where growth concentrated",
    body: "Two regions drove 71% of net-new ARR. The rest of the map needs a coverage plan, not another campaign.",
  },
  {
    title: "The quiet risk",
    body: "Expansion revenue is healthy, but logo churn in the $10–25k band is rising. Fix before it hits the board slide.",
  },
  {
    title: "Decision for the room",
    body: "Fund the mid-market save motion for one quarter. Measure win-back and expansion, not vanity MQLs.",
  },
];

export function BriefingDemo({ concept }: { concept: Concept }) {
  const dark = isDarkSurface(concept.surface);

  return (
    <DemoShell concept={concept}>
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-24 sm:px-8">
        <p
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: concept.accent }}
        >
          Data briefing
        </p>
        <h1 className="font-display mt-4 text-4xl tracking-tight sm:text-6xl">{concept.title}</h1>
        <p className="mt-4 text-lg opacity-70">{concept.tagline}</p>
        <div className="mt-10">
          <MetricStrip concept={concept} dark={dark} />
        </div>
        <div className="mt-16 space-y-16">
          {chapters.map((ch, i) => (
            <article key={ch.title} className="scroll-mt-24">
              <p className="font-mono text-xs opacity-45">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display mt-2 text-2xl sm:text-3xl">{ch.title}</h2>
              <p className="mt-4 text-base leading-relaxed opacity-75 sm:text-lg">{ch.body}</p>
              <div
                className="mt-6 h-px w-full opacity-20"
                style={{ background: concept.accent }}
              />
            </article>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}
