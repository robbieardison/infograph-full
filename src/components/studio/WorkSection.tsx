"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BRANCH_LABELS,
  concepts,
  type Concept,
  type ConceptBranch,
} from "@/lib/concepts";

const filters: Array<"all" | ConceptBranch> = [
  "all",
  "executive",
  "ops",
  "product",
  "narrative",
];

export function WorkSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");

  const items = useMemo(
    () => (filter === "all" ? concepts : concepts.filter((c) => c.branch === filter)),
    [filter]
  );

  return (
    <section id="gallery" className="border-b border-line bg-void">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] text-red">03 · gallery</p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Analytics sites we can ship
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            Live speculative demos. Open one to feel the density, rhythm, and chart craft.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
          {filters.map((f) => {
            const active = filter === f;
            const label = f === "all" ? "All" : BRANCH_LABELS[f];
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-petrol text-white"
                    : "bg-raised text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <ul className="mt-6 divide-y divide-line border border-line">
          {items.map((c) => (
            <GalleryRow key={c.slug} concept={c} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function GalleryRow({ concept }: { concept: Concept }) {
  return (
    <li>
      <Link
        href={`/work/${concept.slug}`}
        className="group grid gap-3 bg-panel/50 px-4 py-4 transition hover:bg-raised sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6 sm:px-5"
      >
        <div className="flex items-center gap-3">
          <span
            className="h-8 w-1 shrink-0 rounded-sm"
            style={{ background: concept.accent }}
            aria-hidden
          />
          <div>
            <p className="font-display text-lg font-semibold text-ink group-hover:text-petrol-soft">
              {concept.title}
            </p>
            <p className="font-mono text-[10px] text-faint">
              {BRANCH_LABELS[concept.branch]} · {concept.category}
              {concept.flagship ? " · flagship" : ""}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted sm:max-w-xl">{concept.blurb}</p>
        <div className="flex items-center gap-4 sm:justify-end">
          <div className="hidden gap-4 md:flex">
            {concept.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="text-right">
                <p className="font-mono text-[9px] uppercase text-faint">{m.label}</p>
                <p className="font-display text-sm font-semibold" style={{ color: concept.accent }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
          <span className="font-mono text-xs text-petrol transition group-hover:text-orange">
            open →
          </span>
        </div>
      </Link>
    </li>
  );
}
