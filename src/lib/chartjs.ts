"use client";

import {
  Chart,
  BarController,
  LineController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

let registered = false;

/** Register Chart.js controllers once (tree-shakeable build requires this). */
export function ensureChartJs() {
  if (registered) return Chart;
  Chart.register(
    BarController,
    LineController,
    DoughnutController,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Filler,
    Tooltip,
    Legend
  );
  registered = true;
  return Chart;
}

export { Chart };
