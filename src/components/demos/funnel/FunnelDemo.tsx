"use client";

import { useEffect, useRef } from "react";
import { ensureChartJs } from "@/lib/chartjs";
import type { Concept } from "@/lib/concepts";
import { DemoShell, MetricStrip, isDarkSurface } from "../shells/DemoShell";

ensureChartJs();

const stages = [
  { label: "Visit", value: 100 },
  { label: "Signup", value: 42 },
  { label: "Activate", value: 28 },
  { label: "Trial", value: 18 },
  { label: "Paid", value: 12.4 },
];

export function FunnelDemo({ concept }: { concept: Concept }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dark = isDarkSurface(concept.surface);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const Chart = ensureChartJs();
    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: stages.map((s) => s.label),
        datasets: [
          {
            data: stages.map((s) => s.value),
            backgroundColor: stages.map((_, i) =>
              i === stages.length - 1 ? concept.accent : `${concept.accent}99`
            ),
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            max: 100,
            ticks: { color: "#5a6b7c", callback: (v) => `${v}%` },
            grid: { color: "rgba(0,0,0,0.06)" },
          },
          y: {
            ticks: { color: "#1a2330", font: { weight: "bold" } },
            grid: { display: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [concept.accent]);

  return (
    <DemoShell concept={concept}>
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8">
        <p
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: concept.accent }}
        >
          Growth analytics
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">{concept.title}</h1>
        <p className="mt-2 max-w-lg opacity-70">{concept.tagline}</p>
        <div className="mt-10">
          <MetricStrip concept={concept} dark={dark} />
        </div>
        <div className="mt-10 border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">
            Conversion funnel (%)
          </p>
          <div className="mt-4 h-72">
            <canvas ref={canvasRef} />
          </div>
        </div>
        <p className="mt-6 border-l-2 pl-4 text-sm opacity-75" style={{ borderColor: concept.accent }}>
          Largest drop: Visit → Signup (−58%). Experiment: shorten signup to email-only for mobile.
        </p>
      </div>
    </DemoShell>
  );
}
