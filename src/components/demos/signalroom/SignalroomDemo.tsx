"use client";

import { useEffect, useRef } from "react";
import { ensureChartJs } from "@/lib/chartjs";
import type { Concept } from "@/lib/concepts";
import { DemoShell, MetricStrip, isDarkSurface } from "../shells/DemoShell";

ensureChartJs();

const incidents = [
  { id: "INC-2041", sev: "SEV-2", title: "API latency spike — us-east", age: "12m" },
  { id: "INC-2039", sev: "SEV-3", title: "Webhook retries elevated", age: "41m" },
  { id: "INC-2035", sev: "SEV-3", title: "CDN cache miss rate", age: "2h" },
];

export function SignalroomDemo({ concept }: { concept: Concept }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dark = isDarkSurface(concept.surface);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const Chart = ensureChartJs();
    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["00", "04", "08", "12", "16", "20"],
        datasets: [
          {
            label: "P95 ms",
            data: [110, 98, 125, 142, 118, 105],
            backgroundColor: concept.accent,
            borderRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: "#9bb0b6" },
            grid: { display: false },
          },
          y: {
            ticks: { color: "#9bb0b6" },
            grid: { color: "rgba(255,255,255,0.06)" },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [concept.accent]);

  return (
    <DemoShell concept={concept}>
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: concept.accent }}
            >
              Ops console
            </p>
            <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              {concept.title}
            </h1>
            <p className="mt-2 opacity-65">{concept.tagline}</p>
          </div>
          <span
            className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{ background: concept.accent }}
          >
            Live · sample
          </span>
        </div>
        <div className="mt-10">
          <MetricStrip concept={concept} dark={dark} />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="border border-white/10 bg-black/30 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55">
              Latency P95 (today)
            </p>
            <div className="mt-4 h-52">
              <canvas ref={canvasRef} />
            </div>
          </div>
          <div className="border border-white/10 bg-black/30 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55">
              Open incidents
            </p>
            <ul className="mt-4 space-y-3">
              {incidents.map((inc) => (
                <li
                  key={inc.id}
                  className="flex items-start justify-between gap-3 border-b border-white/8 pb-3 text-sm"
                >
                  <div>
                    <p className="font-semibold">{inc.title}</p>
                    <p className="mt-0.5 text-xs opacity-50">
                      {inc.id} · {inc.sev}
                    </p>
                  </div>
                  <span className="text-xs opacity-50">{inc.age}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
