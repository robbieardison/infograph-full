"use client";

import { CONTACT_URL } from "@/lib/concepts";

type ConceptPitchProps = {
  conceptTitle: string;
  accent: string;
  tone?: "light" | "dark";
};

export function ConceptPitch({ conceptTitle, accent }: ConceptPitchProps) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#07090b] px-5 py-16 text-white sm:px-8">
      <div className="sp-triad-gradient absolute inset-x-0 top-0 h-0.5" />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: accent }}
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="font-mono text-[11px]" style={{ color: accent }}>
          concept · Infograph · Stable Panther
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {conceptTitle} is a speculative surface.
        </h2>
        <p className="mt-3 max-w-lg text-sm text-white/60">
          We can build yours with the same density — analytics websites, consulting, and optional AI
          analysts.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={CONTACT_URL}
            className="inline-flex rounded-md px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: accent }}
          >
            Brief Stable Panther
          </a>
          <a href="/#gallery" className="text-sm text-white/50 transition hover:text-white">
            Back to gallery
          </a>
        </div>
      </div>
    </section>
  );
}
