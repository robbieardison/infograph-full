"use client";

import { CONTACT_URL } from "@/lib/concepts";

type ConceptPitchProps = {
  conceptTitle: string;
  accent: string;
  tone?: "light" | "dark";
};

export function ConceptPitch({ conceptTitle, accent }: ConceptPitchProps) {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8" style={{ background: "#121416", color: "#fff" }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 85% 20%, ${accent}88, transparent 55%)`,
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>
          Want this analytics surface?
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-3xl tracking-tight sm:text-5xl">
          {conceptTitle} is a concept.
          <span className="mt-2 block text-white/70">We can ship yours with the same craft.</span>
        </h2>
        <p className="mt-5 max-w-lg text-white/60">
          Analytics websites, data consulting, and optional AI analysts — designed so charts and
          decisions stay connected.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={CONTACT_URL}
            className="inline-flex rounded-sm px-6 py-3 text-sm font-semibold text-white"
            style={{ background: accent }}
          >
            Start a project
          </a>
          <a href="/#work" className="text-sm font-semibold text-white/55 transition hover:text-white">
            Back to catalog
          </a>
        </div>
      </div>
    </section>
  );
}
