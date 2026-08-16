"use client";

import { InfographWorkspace } from "@/components/infograph/InfographWorkspace";
import type { ChartSnapshot } from "@/lib/agent-scripts";

export function StudioHero({ onSnapshot }: { onSnapshot?: (s: ChartSnapshot) => void }) {
  return (
    <section id="tool" className="border-b border-line bg-void">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-8 lg:py-10">
        <aside className="flex flex-col justify-between gap-6 lg:py-2">
          <div>
            <p className="font-mono text-[11px] text-petrol">01 · workbench</p>
            <h1 className="font-display mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              CSV in.
              <br />
              <span className="text-petrol">Story out.</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Upload data, theme it, export a PNG. This is the product — not a mockup of one.
            </p>
          </div>
          <ul className="space-y-2 font-mono text-[11px] text-faint">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-petrol" /> Client-side only
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Soft limit 25k rows
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red" /> Five visual themes
            </li>
          </ul>
        </aside>
        <div className="min-w-0 overflow-hidden rounded-lg border border-line bg-panel shadow-[0_0_0_1px_rgba(16,150,169,0.12)]">
          <InfographWorkspace onSnapshot={onSnapshot} autoLoadSample />
        </div>
      </div>
    </section>
  );
}
