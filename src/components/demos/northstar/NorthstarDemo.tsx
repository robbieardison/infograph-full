"use client";

import { useEffect, useRef } from "react";
import { ensureChartJs } from "@/lib/chartjs";
import type { Concept } from "@/lib/concepts";
import { DemoShell, MetricStrip, isDarkSurface } from "../shells/DemoShell";

ensureChartJs();

export function NorthstarDemo({ concept }: { concept: Concept }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dark = isDarkSurface(concept.surface);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const Chart = ensureChartJs();
    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "ARR",
            data: [9.2, 9.5, 9.8, 10.1, 10.6, 11.2, 11.8, 12.4],
            borderColor: concept.accent,
            backgroundColor: `${concept.accent}33`,
            fill: true,
            tension: 0.35,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: dark ? "#9bb0b6" : "#5a6b7c" },
            grid: { color: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" },
          },
          y: {
            ticks: { color: dark ? "#9bb0b6" : "#5a6b7c" },
            grid: { color: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [concept.accent, dark]);

  return (
    <DemoShell concept={concept}>
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8">
        <p
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: concept.accent }}
        >
          Executive board
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">{concept.title}</h1>
        <p className="mt-3 max-w-lg opacity-70">{concept.tagline}</p>
        <div className="mt-10">
          <MetricStrip concept={concept} dark={dark} />
        </div>
        <div
          className="mt-10 border p-5"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            background: dark ? "rgba(0,0,0,0.25)" : "#fff",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55">
            ARR trajectory ($M)
          </p>
          <div className="mt-4 h-64">
            <canvas ref={canvasRef} />
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {["Double down on enterprise expansion", "Watch churn in mid-market"].map((t) => (
            <div
              key={t}
              className="border p-4 text-sm"
              style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}
            >
              <span className="font-semibold" style={{ color: concept.accent }}>
                Decision
              </span>
              <p className="mt-1 opacity-80">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}
