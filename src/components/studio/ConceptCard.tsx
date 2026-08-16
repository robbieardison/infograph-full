"use client";

import Link from "next/link";
import type { Concept } from "@/lib/concepts";
import { BRANCH_LABELS } from "@/lib/concepts";

export function ConceptCard({ concept }: { concept: Concept }) {
  const href = `/work/${concept.slug}`;
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-petrol/40 hover:shadow-[0_28px_70px_-34px_rgba(16,150,169,0.35)]"
    >
      <div
        className="relative h-40 overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${concept.surface} 0%, ${concept.accentSoft} 55%, ${concept.accent}55 100%)`,
        }}
      >
        <div className="absolute inset-0 studio-mesh opacity-40" />
        <div className="absolute bottom-3 left-4 z-10 flex flex-wrap gap-2">
          <span
            className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white"
            style={{ background: concept.accent }}
          >
            {concept.category}
          </span>
          <span className="inline-block bg-black/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
            {BRANCH_LABELS[concept.branch]}
          </span>
        </div>
        {concept.flagship && (
          <span className="absolute right-3 top-3 z-10 bg-ink/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
            Flagship
          </span>
        )}
        <p
          className="absolute left-4 top-4 font-display text-3xl tracking-tight"
          style={{ color: concept.ink === "#e8eef0" || concept.ink === "#f2f5f7" || concept.ink === "#e6ecf5" || concept.ink === "#eef3fb" ? concept.ink : concept.accent }}
        >
          {concept.title}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="font-display text-2xl tracking-tight text-ink">{concept.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{concept.blurb}</p>
        <p className="mt-auto pt-2 text-sm font-semibold text-petrol transition group-hover:translate-x-1">
          Open live site <span aria-hidden>→</span>
        </p>
      </div>
    </Link>
  );
}
