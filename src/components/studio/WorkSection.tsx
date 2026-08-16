"use client";

import { concepts, type ConceptBranch, BRANCH_LABELS } from "@/lib/concepts";
import { ConceptCard } from "./ConceptCard";

const order: ConceptBranch[] = ["executive", "ops", "product", "narrative"];

export function WorkSection() {
  return (
    <section id="work" className="border-t border-line px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-petrol">Work</p>
        <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
          Analytics website concepts
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Live speculative demos — open any site to see a design we can tailor for your team.
        </p>

        {order.map((branch) => {
          const items = concepts.filter((c) => c.branch === branch);
          if (!items.length) return null;
          return (
            <div key={branch} className="mt-14" id={`${branch}-work`}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                {BRANCH_LABELS[branch]}
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <ConceptCard key={c.slug} concept={c} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
