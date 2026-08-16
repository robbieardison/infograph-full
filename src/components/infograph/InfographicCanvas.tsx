"use client";

import { useEffect, useMemo, useRef } from "react";
import { Chart, ensureChartJs } from "@/lib/chartjs";
import {
  capitalize,
  formatNumber,
  hexAlpha,
  LIMITS,
  type AggregateResult,
  type ChartType,
  type InfographTheme,
} from "./types";

ensureChartJs();

type Props = {
  title: string;
  subtitle: string;
  agg: AggregateResult;
  chartType: ChartType;
  valueCol: string;
  categoryCol: string;
  rowMeta: string;
  columnCount: number;
  theme: InfographTheme;
  themeSwap: boolean;
  canvasRef: React.RefObject<HTMLElement | null>;
};

function readPalette(el: HTMLElement | null): string[] {
  if (!el) return ["#1096a9", "#ed4933", "#c5e4ea"];
  const raw = getComputedStyle(el).getPropertyValue("--chart-palette").trim();
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readInk(el: HTMLElement | null) {
  if (!el) return { ink: "#222", muted: "#888", border: "#ddd", canvas: "#fff" };
  const s = getComputedStyle(el);
  return {
    ink: s.getPropertyValue("--canvas-ink").trim() || "#222",
    muted: s.getPropertyValue("--canvas-muted").trim() || "#888",
    border: s.getPropertyValue("--canvas-border").trim() || "#ddd",
    canvas: s.getPropertyValue("--canvas").trim() || "#fff",
  };
}

export function InfographicCanvas({
  title,
  subtitle,
  agg,
  chartType,
  valueCol,
  categoryCol,
  rowMeta,
  columnCount,
  theme,
  themeSwap,
  canvasRef,
}: Props) {
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const kpis = useMemo(() => {
    const values = agg.values;
    const total = values.reduce((a, b) => a + b, 0);
    const max = values.length ? Math.max(...values) : 0;
    const avg = values.length ? total / values.length : 0;
    const top = agg.flat[0];
    return [
      { label: "Total", value: formatNumber(total) },
      { label: "Average", value: formatNumber(avg) },
      { label: "Peak", value: formatNumber(max) },
      { label: "Top", value: top ? top.label : "—" },
    ];
  }, [agg]);

  const rank = useMemo(() => {
    const top = agg.flat.filter((d) => d.label !== "Other").slice(0, 6);
    const max = top[0]?.value || 1;
    return top.map((item) => ({ ...item, pct: (item.value / max) * 100 }));
  }, [agg]);

  const primaryLabel =
    chartType === "doughnut"
      ? `Share of ${valueCol}`
      : `${capitalize(valueCol)} by ${capitalize(categoryCol)}`;

  useEffect(() => {
    const canvas = chartCanvasRef.current;
    const root = rootRef.current?.closest(".infograph-root") as HTMLElement | null;
    if (!canvas || !agg.labels.length) return;

    const palette = readPalette(root);
    const colors = readInk(root);
    const hasSeries = !!agg.seriesMap && chartType !== "doughnut";
    let datasets;

    if (hasSeries && agg.seriesMap) {
      datasets = agg.seriesMap.datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        backgroundColor:
          chartType === "line"
            ? palette[i % palette.length]
            : hexAlpha(palette[i % palette.length], 0.85),
        borderColor: palette[i % palette.length],
        borderWidth: chartType === "line" ? 2.5 : 0,
        tension: 0.35,
        fill: false,
        pointRadius: chartType === "line" ? 3 : 0,
        borderRadius: chartType === "bar" ? 4 : 0,
      }));
    } else {
      const bg =
        chartType === "doughnut"
          ? agg.labels.map((_, i) => palette[i % palette.length])
          : chartType === "line"
            ? palette[0]
            : hexAlpha(palette[0], 0.9);
      datasets = [
        {
          label: valueCol,
          data: agg.values,
          backgroundColor: bg,
          borderColor:
            chartType === "line"
              ? palette[0]
              : chartType === "doughnut"
                ? colors.border
                : "transparent",
          borderWidth: chartType === "line" ? 2.5 : chartType === "doughnut" ? 2 : 0,
          tension: 0.35,
          fill: false,
          pointRadius: chartType === "line" ? 3 : 0,
          borderRadius: chartType === "bar" ? 4 : 0,
        },
      ];
    }

    const isDark = theme === "signal" || theme === "nocturne";

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new Chart(canvas, {
      type: chartType === "doughnut" ? "doughnut" : chartType,
      data: { labels: agg.labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 550, easing: "easeOutQuart" },
        plugins: {
          legend: {
            display: hasSeries || chartType === "doughnut",
            position: chartType === "doughnut" ? "bottom" : "top",
            labels: {
              color: colors.muted,
              boxWidth: 10,
              padding: 12,
              font: { size: 11 },
            },
          },
          tooltip: {
            backgroundColor: isDark ? "#0e1520" : "#1c1712",
            titleColor: "#fff",
            bodyColor: "#eee",
            padding: 10,
            cornerRadius: 6,
          },
        },
        scales:
          chartType === "doughnut"
            ? {}
            : {
                x: {
                  grid: { color: hexAlpha(colors.border, 0.6) },
                  ticks: { color: colors.muted, maxRotation: 45, font: { size: 10 } },
                },
                y: {
                  grid: { color: hexAlpha(colors.border, 0.6) },
                  ticks: {
                    color: colors.muted,
                    font: { size: 10 },
                    callback: (v) => formatNumber(Number(v)),
                  },
                },
              },
        cutout: chartType === "doughnut" ? "62%" : undefined,
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [agg, chartType, valueCol, theme]);

  return (
    <article
      className={`infographic${themeSwap ? " is-theme-swap" : ""}`}
      aria-live="polite"
      ref={(node) => {
        rootRef.current = node;
        if (canvasRef && "current" in canvasRef) {
          (canvasRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      }}
    >
      <header className="infographic-header">
        <h1 className="infographic-title">{title || "Untitled"}</h1>
        <p className="infographic-subtitle">{subtitle}</p>
      </header>

      <div className="kpi-strip">
        {kpis.map((item) => (
          <div className="kpi" key={item.label}>
            <span className="kpi-label">{item.label}</span>
            <span className="kpi-value">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="visual-row">
        <div className="panel">
          <p className="panel-label">{primaryLabel}</p>
          <div className="chart-wrap">
            <canvas ref={chartCanvasRef} />
          </div>
        </div>
        <div className="panel">
          <p className="panel-label">Top rankings</p>
          <ul className="rank-list">
            {rank.map((item, i) => (
              <li className="rank-item" key={item.label}>
                <span className="rank-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="rank-name" title={item.label}>
                  {item.label}
                </span>
                <span className="rank-value">{formatNumber(item.value)}</span>
                <div className="rank-bar-track">
                  <div className="rank-bar-fill" style={{ width: `${item.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="infographic-footer">
        <span className="footer-credit">Infograph</span>
        <span>
          {rowMeta} · {columnCount} fields · chart top {LIMITS.maxChartCategories}
        </span>
      </footer>
    </article>
  );
}
