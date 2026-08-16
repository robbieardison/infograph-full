"use client";

import type { Concept } from "@/lib/concepts";
import { ConceptPitch } from "@/components/studio/ConceptPitch";
import { DemoChrome } from "@/components/studio/DemoChrome";

export function isDarkSurface(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 80;
}

export function DemoShell({
  concept,
  children,
}: {
  concept: Concept;
  children: React.ReactNode;
}) {
  const dark = isDarkSurface(concept.surface);
  return (
    <div
      className="min-h-screen"
      style={{ background: concept.surface, color: concept.ink }}
    >
      <DemoChrome accent={concept.accent} tone={dark ? "dark" : "light"} />
      {children}
      <ConceptPitch
        conceptTitle={concept.title}
        accent={concept.accent}
        tone={dark ? "dark" : "light"}
      />
      <footer
        className="border-t px-5 py-10 text-center text-sm opacity-55 sm:px-8"
        style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
      >
        {concept.title} · speculative {concept.category.toLowerCase()} concept · Infograph
      </footer>
    </div>
  );
}

export function MetricStrip({
  concept,
  dark,
}: {
  concept: Concept;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {concept.metrics.map((m) => (
        <div
          key={m.label}
          className="border p-4"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">
            {m.label}
          </p>
          <p className="mt-1 font-display text-2xl" style={{ color: concept.accent }}>
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
}
