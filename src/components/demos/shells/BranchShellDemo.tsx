"use client";

import { useEffect, useRef } from "react";
import { ensureChartJs } from "@/lib/chartjs";
import type { Concept } from "@/lib/concepts";
import { DemoShell, MetricStrip, isDarkSurface } from "./DemoShell";

ensureChartJs();

/** Generic branch shell for non-flagship concepts */
export function BranchShellDemo({ concept }: { concept: Concept }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dark = isDarkSurface(concept.surface);
  const chartType =
    concept.branch === "product"
      ? "doughnut"
      : concept.branch === "narrative"
        ? "line"
        : "bar";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const Chart = ensureChartJs();
    const labels = ["A", "B", "C", "D", "E", "F"];
    const data = [42, 38, 55, 31, 48, 36];
    const chart = new Chart(canvas, {
      type: chartType === "doughnut" ? "doughnut" : chartType,
      data: {
        labels,
        datasets: [
          {
            label: "Index",
            data,
            backgroundColor:
              chartType === "doughnut"
                ? labels.map((_, i) => `${concept.accent}${[99, 88, 77, 66, 55, 44][i]}`)
                : concept.accent,
            borderColor: concept.accent,
            tension: 0.35,
            fill: chartType === "line",
            borderWidth: chartType === "line" ? 2 : 0,
            borderRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: chartType === "doughnut", labels: { color: dark ? "#9bb0b6" : "#5a6b7c" } },
        },
        scales:
          chartType === "doughnut"
            ? {}
            : {
                x: {
                  ticks: { color: dark ? "#9bb0b6" : "#5a6b7c" },
                  grid: { color: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" },
                },
                y: {
                  ticks: { color: dark ? "#9bb0b6" : "#5a6b7c" },
                  grid: { color: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" },
                },
              },
        cutout: chartType === "doughnut" ? "58%" : undefined,
      },
    });
    return () => chart.destroy();
  }, [concept.accent, chartType, dark]);

  return (
    <DemoShell concept={concept}>
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-24 sm:px-8">
        <p
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: concept.accent }}
        >
          {concept.category} · {concept.layout}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">{concept.title}</h1>
        <p className="mt-3 max-w-xl opacity-70">{concept.tagline}</p>
        <p className="mt-2 max-w-xl text-sm opacity-55">{concept.blurb}</p>
        <div className="mt-10">
          <MetricStrip concept={concept} dark={dark} />
        </div>
        <div
          className="mt-10 border p-5"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
            background: dark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.85)",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55">
            Sample series
          </p>
          <div className="mt-4 h-64">
            <canvas ref={canvasRef} />
          </div>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {["Primary insight panel", "Owner + next action", "Segment comparison", "Export / share"].map(
            (item) => (
              <li
                key={item}
                className="border px-4 py-3 text-sm"
                style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}
              >
                {item}
              </li>
            )
          )}
        </ul>
      </div>
    </DemoShell>
  );
}
