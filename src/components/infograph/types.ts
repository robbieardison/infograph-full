export const THEME_KEY = "infograph-theme";
export const THEMES = ["atelier", "signal", "lattice", "lumen", "nocturne"] as const;
export type InfographTheme = (typeof THEMES)[number];

export const THEME_LABELS: Record<InfographTheme, string> = {
  atelier: "Atelier Ink",
  signal: "Signal Board",
  lattice: "Lattice",
  lumen: "Lumen Field",
  nocturne: "Nocturne",
};

export const LIMITS = {
  maxFileBytes: 10 * 1024 * 1024,
  maxRows: 25000,
  maxChartCategories: 12,
  maxSeries: 8,
};

export type ChartType = "bar" | "line" | "doughnut";
export type ColumnType = "number" | "category";
export type CsvRow = Record<string, string>;

export type AggregateResult = {
  labels: string[];
  values: number[];
  seriesMap: {
    seriesNames: string[];
    datasets: { label: string; data: number[] }[];
  } | null;
  flat: { label: string; value: number }[];
};

export function isNumericValue(v: unknown): boolean {
  if (v === null || v === undefined || v === "") return false;
  const n = Number(String(v).replace(/[,$%]/g, "").trim());
  return Number.isFinite(n);
}

export function toNumber(v: unknown): number {
  if (typeof v === "number") return v;
  return Number(String(v).replace(/[,$%]/g, "").trim()) || 0;
}

export function formatNumber(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(1);
}

export function capitalize(s: string): string {
  return String(s).replace(/\b\w/g, (c) => c.toUpperCase());
}

export function hexAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function inferColumnTypes(rows: CsvRow[], columns: string[]): Record<string, ColumnType> {
  const types: Record<string, ColumnType> = {};
  columns.forEach((col) => {
    let numeric = 0;
    let nonEmpty = 0;
    for (let i = 0; i < Math.min(rows.length, 40); i++) {
      const v = rows[i][col];
      if (v === null || v === undefined || String(v).trim() === "") continue;
      nonEmpty++;
      if (isNumericValue(v)) numeric++;
    }
    types[col] = nonEmpty > 0 && numeric / nonEmpty >= 0.7 ? "number" : "category";
  });
  return types;
}

export function suggestMapping(columns: string[], types: Record<string, ColumnType>) {
  const cats = columns.filter((c) => types[c] === "category");
  const nums = columns.filter((c) => types[c] === "number");
  const category =
    cats.find((c) =>
      /region|category|name|product|segment|city|country|label|family|source|protocol|attack/i.test(c)
    ) ||
    cats[0] ||
    columns[0];
  const value =
    nums.find((c) =>
      /revenue|sales|amount|value|total|count|orders|bytes|flows|fare|mass|length/i.test(c)
    ) ||
    nums[0] ||
    columns[1] ||
    columns[0];
  const series =
    cats.find(
      (c) => c !== category && /quarter|month|year|period|series|group|service|flag/i.test(c)
    ) || "";
  return { category, value, series };
}
