"use client";

import { InfographWorkspace } from "@/components/infograph/InfographWorkspace";
import type { ChartSnapshot } from "@/lib/agent-scripts";

export function StudioHero({ onSnapshot }: { onSnapshot?: (s: ChartSnapshot) => void }) {
  return (
    <section id="tool" className="relative studio-grain">
      <div className="pointer-events-none absolute inset-0 studio-mesh opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 pb-6 pt-10 sm:px-8 sm:pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-petrol">
          Analytics studio
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Infograph
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Try the tool below — upload a CSV, pick a theme, export a PNG. Then explore analytics
          websites we can build, plus consulting and an AI analyst demo.
        </p>
      </div>
      <div className="relative mx-auto max-w-6xl px-3 pb-16 sm:px-6">
        <InfographWorkspace onSnapshot={onSnapshot} autoLoadSample />
      </div>
    </section>
  );
}
