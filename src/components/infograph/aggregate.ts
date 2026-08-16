import { LIMITS, toNumber, type AggregateResult, type CsvRow } from "./types";

function capFlat(flat: { label: string; value: number }[], max: number) {
  if (flat.length <= max) return flat;
  const head = flat.slice(0, max - 1);
  const otherValue = flat.slice(max - 1).reduce((sum, d) => sum + d.value, 0);
  return [...head, { label: "Other", value: otherValue }];
}

export function aggregate(
  rows: CsvRow[],
  catCol: string,
  valCol: string,
  seriesCol: string
): AggregateResult {
  const maxCat = LIMITS.maxChartCategories;
  const maxSeries = LIMITS.maxSeries;

  if (!catCol || !valCol || !rows.length) {
    return { labels: [], values: [], seriesMap: null, flat: [] };
  }

  if (seriesCol) {
    const catTotals = new Map<string, number>();
    const seriesTotals = new Map<string, number>();
    const matrix = new Map<string, Map<string, number>>();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cat = String(row[catCol] ?? "—");
      const series = String(row[seriesCol] ?? "—");
      const val = toNumber(row[valCol]);
      catTotals.set(cat, (catTotals.get(cat) || 0) + val);
      seriesTotals.set(series, (seriesTotals.get(series) || 0) + val);
      if (!matrix.has(series)) matrix.set(series, new Map());
      const m = matrix.get(series)!;
      m.set(cat, (m.get(cat) || 0) + val);
    }

    const topCats = [...catTotals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxCat - (catTotals.size > maxCat ? 1 : 0))
      .map(([k]) => k);
    const useOtherCat = catTotals.size > maxCat;
    const catKeys = useOtherCat ? [...topCats, "Other"] : topCats;

    const topSeries = [...seriesTotals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxSeries - (seriesTotals.size > maxSeries ? 1 : 0))
      .map(([k]) => k);
    const useOtherSeries = seriesTotals.size > maxSeries;
    const seriesNames = useOtherSeries ? [...topSeries, "Other"] : topSeries;

    const foldCat = (cat: string) => (useOtherCat && !topCats.includes(cat) ? "Other" : cat);
    const foldSeries = (s: string) => (useOtherSeries && !topSeries.includes(s) ? "Other" : s);

    const rolled = new Map<string, Map<string, number>>();
    matrix.forEach((cats, series) => {
      const sKey = foldSeries(series);
      if (!rolled.has(sKey)) rolled.set(sKey, new Map());
      const target = rolled.get(sKey)!;
      cats.forEach((val, cat) => {
        const cKey = foldCat(cat);
        target.set(cKey, (target.get(cKey) || 0) + val);
      });
    });

    const datasets = seriesNames.map((s) => ({
      label: s,
      data: catKeys.map((c) => rolled.get(s)?.get(c) || 0),
    }));

    const totals = catKeys.map((c, i) => datasets.reduce((sum, d) => sum + (d.data[i] || 0), 0));
    const flat = catKeys
      .map((label, i) => ({ label, value: totals[i] }))
      .sort((a, b) => b.value - a.value);

    return {
      labels: flat.map((d) => d.label),
      values: flat.map((d) => d.value),
      seriesMap: {
        seriesNames,
        datasets: datasets.map((ds) => ({
          label: ds.label,
          data: flat.map((f) => {
            const idx = catKeys.indexOf(f.label);
            return idx >= 0 ? ds.data[idx] : 0;
          }),
        })),
      },
      flat,
    };
  }

  const map = new Map<string, number>();
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const key = String(row[catCol] ?? "—");
    map.set(key, (map.get(key) || 0) + toNumber(row[valCol]));
  }
  let flat = [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
  flat = capFlat(flat, maxCat);

  return {
    labels: flat.map((d) => d.label),
    values: flat.map((d) => d.value),
    seriesMap: null,
    flat,
  };
}
