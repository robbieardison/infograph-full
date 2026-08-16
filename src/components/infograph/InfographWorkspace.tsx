"use client";

import html2canvas from "html2canvas";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { aggregate } from "./aggregate";
import { ExportButton } from "./ExportButton";
import { InfographControls } from "./InfographControls";
import { InfographicCanvas } from "./InfographicCanvas";
import { loadSampleCsv, parseFile, validateFile } from "./parseCsv";
import { ThemeChips } from "./ThemeChips";
import {
  THEME_KEY,
  THEMES,
  capitalize,
  formatNumber,
  inferColumnTypes,
  suggestMapping,
  type ChartType,
  type CsvRow,
  type InfographTheme,
} from "./types";
import type { ChartSnapshot } from "@/lib/agent-scripts";

type Toast = { message: string; isError?: boolean } | null;

type Props = {
  onSnapshot?: (snap: ChartSnapshot) => void;
  autoLoadSample?: boolean;
};

export function InfographWorkspace({ onSnapshot, autoLoadSample = true }: Props) {
  const [theme, setTheme] = useState<InfographTheme>("signal");
  const [themeSwap, setThemeSwap] = useState(false);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [truncated, setTruncated] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseTitle, setParseTitle] = useState("Reading CSV…");
  const [parsePct, setParsePct] = useState(0);
  const [parseDetail, setParseDetail] = useState("");
  const [toast, setToast] = useState<Toast>(null);
  const [title, setTitle] = useState("Regional Performance");
  const [subtitle, setSubtitle] = useState("Revenue story from your CSV");
  const [titleTouched, setTitleTouched] = useState(false);
  const [subtitleTouched, setSubtitleTouched] = useState(false);
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [series, setSeries] = useState("");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [exporting, setExporting] = useState(false);
  const canvasElRef = useRef<HTMLElement | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadedSample = useRef(false);

  const showToast = useCallback((message: string, isError?: boolean) => {
    setToast({ message, isError });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5200);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as InfographTheme | null;
    if (saved && THEMES.includes(saved)) setTheme(saved);
  }, []);

  const applyTheme = (t: InfographTheme) => {
    setTheme(t);
    localStorage.setItem(THEME_KEY, t);
    setThemeSwap(true);
    requestAnimationFrame(() => {
      setTimeout(() => setThemeSwap(false), 350);
    });
  };

  const rowMeta = truncated
    ? `${rows.length.toLocaleString()} rows kept (capped)`
    : `${rows.length.toLocaleString()} rows`;

  const fileMeta = `${fileName || "dataset"} · ${rowMeta}`;

  const ingest = useCallback(
    (nextRows: CsvRow[], meta: { fileName: string; truncated: boolean }) => {
      if (!nextRows.length) {
        showToast("No rows found in that CSV.", true);
        return;
      }
      const cols = Object.keys(nextRows[0]).filter((k) => k && !k.startsWith("__"));
      if (!cols.length) {
        showToast("Could not read column headers.", true);
        return;
      }
      const types = inferColumnTypes(nextRows, cols);
      const suggestion = suggestMapping(cols, types);
      setRows(nextRows);
      setColumns(cols);
      setFileName(meta.fileName);
      setTruncated(meta.truncated);
      setCategory(suggestion.category);
      setValue(suggestion.value);
      setSeries(suggestion.series);
      if (!titleTouched) {
        setTitle(
          suggestion.category && suggestion.value
            ? `${capitalize(suggestion.value)} by ${capitalize(suggestion.category)}`
            : capitalize(meta.fileName.replace(/\.csv$/i, "").replace(/[-_]/g, " "))
        );
      }
      if (!subtitleTouched) {
        const n = meta.truncated
          ? `${nextRows.length.toLocaleString()} rows kept (capped)`
          : `${nextRows.length.toLocaleString()} rows`;
        setSubtitle(`${n} · ${cols.length} columns`);
      }
      if (meta.truncated) {
        showToast("File was large — kept the first 25,000 rows for a smooth chart.");
      }
    },
    [showToast, titleTouched, subtitleTouched]
  );

  const handleProgress = useCallback(
    (p: { rowsKept: number; bytesRead: number; totalBytes: number; truncated: boolean }) => {
      const byBytes =
        p.totalBytes > 0 ? Math.min(99, Math.round((p.bytesRead / p.totalBytes) * 100)) : null;
      const byRows = Math.min(99, Math.round((p.rowsKept / 25000) * 100));
      setParsePct(p.truncated ? 100 : byBytes ?? byRows);
      const sizeHint =
        p.totalBytes > 0
          ? ` · ${(p.bytesRead / (1024 * 1024)).toFixed(1)} / ${(p.totalBytes / (1024 * 1024)).toFixed(1)} MB`
          : "";
      setParseDetail(
        p.truncated
          ? "Reached 25,000 row limit — stopping"
          : `${p.rowsKept.toLocaleString()} rows${sizeHint}`
      );
    },
    []
  );

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file || parsing) return;
      const err = validateFile(file);
      if (err) {
        showToast(err, true);
        return;
      }
      setParsing(true);
      setParseTitle(`Reading ${file.name}…`);
      setParsePct(0);
      setParseDetail("Starting…");
      try {
        const result = await parseFile(file, handleProgress);
        setParsePct(100);
        ingest(result.rows, {
          fileName: result.fileName,
          truncated: result.truncated,
        });
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Parse failed", true);
      } finally {
        setParsing(false);
      }
    },
    [parsing, showToast, handleProgress, ingest]
  );

  const handleSample = useCallback(async () => {
    if (parsing) return;
    setParsing(true);
    setParseTitle("Loading sample…");
    setParsePct(0);
    try {
      const result = await loadSampleCsv(handleProgress);
      ingest(result.rows, { fileName: result.fileName, truncated: result.truncated });
    } catch {
      showToast("Could not load sample.", true);
    } finally {
      setParsing(false);
    }
  }, [parsing, handleProgress, ingest, showToast]);

  useEffect(() => {
    if (!autoLoadSample || loadedSample.current) return;
    loadedSample.current = true;
    void handleSample();
  }, [autoLoadSample, handleSample]);

  const agg = useMemo(
    () => aggregate(rows, category, value, series),
    [rows, category, value, series]
  );

  useEffect(() => {
    if (!onSnapshot || !agg.flat.length) return;
    const total = agg.values.reduce((a, b) => a + b, 0);
    const peak = agg.values.length ? Math.max(...agg.values) : 0;
    onSnapshot({
      title,
      subtitle,
      chartType,
      topLabel: agg.flat[0]?.label,
      topValue: agg.flat[0] ? formatNumber(agg.flat[0].value) : undefined,
      total: formatNumber(total),
      peak: formatNumber(peak),
    });
  }, [agg, title, subtitle, chartType, onSnapshot]);

  const exportPng = async () => {
    const el = canvasElRef.current;
    if (!el || parsing) return;
    setExporting(true);
    try {
      const root = el.closest(".infograph-root") as HTMLElement | null;
      const bg =
        (root && getComputedStyle(root).getPropertyValue("--canvas").trim()) || "#fff";
      const canvas = await html2canvas(el, {
        backgroundColor: bg,
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `infograph-${theme}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      showToast("Export failed. Try again.", true);
    } finally {
      setExporting(false);
    }
  };

  const hasData = rows.length > 0;

  return (
    <div
      className={`infograph-root${parsing ? " is-parsing" : ""}`}
      data-theme={theme}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        if ((e.target as HTMLElement).closest(".drop-zone")) return;
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        if (file && /\.csv$/i.test(file.name)) void handleFile(file);
      }}
    >
      <div className="ig-app">
        <header className="ig-app-header">
          <div className="brand-block">
            <p className="brand-mark">Infograph</p>
            <p className="brand-tagline">CSV in. Story out.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="btn btn-ghost" onClick={() => void handleSample()}>
              Load sample
            </button>
            <label className="btn btn-primary file-btn">
              Upload CSV
              <input
                type="file"
                accept=".csv,text/csv"
                hidden
                onChange={(e) => void handleFile(e.target.files?.[0])}
              />
            </label>
            <ExportButton
              disabled={!hasData}
              exporting={exporting}
              onExport={() => void exportPng()}
            />
          </div>
        </header>

        <ThemeChips theme={theme} onChange={applyTheme} />

        <div className="workspace">
          {hasData && (
            <InfographControls
              fileMeta={fileMeta}
              title={title}
              subtitle={subtitle}
              columns={columns}
              category={category}
              value={value}
              series={series}
              chartType={chartType}
              onTitle={setTitle}
              onSubtitle={setSubtitle}
              onCategory={setCategory}
              onValue={setValue}
              onSeries={setSeries}
              onChartType={setChartType}
              onDropFile={(f) => void handleFile(f)}
              titleTouched={titleTouched}
              subtitleTouched={subtitleTouched}
              onTitleTouch={() => setTitleTouched(true)}
              onSubtitleTouch={() => setSubtitleTouched(true)}
            />
          )}

          <main className="stage">
            {!hasData ? (
              <div className="empty-state">
                <p className="empty-brand">Infograph</p>
                <h1>Turn a spreadsheet into a one-page story</h1>
                <p className="empty-copy">
                  Upload a CSV or load the sample. Client-side only — best under 25k rows /
                  10&nbsp;MB.
                </p>
                <div className="empty-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => void handleSample()}
                  >
                    Load sample
                  </button>
                  <label className="btn btn-ghost file-btn">
                    Choose file
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      hidden
                      onChange={(e) => void handleFile(e.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <InfographicCanvas
                title={title}
                subtitle={subtitle}
                agg={agg}
                chartType={chartType}
                valueCol={value}
                categoryCol={category}
                rowMeta={rowMeta}
                columnCount={columns.length}
                theme={theme}
                themeSwap={themeSwap}
                canvasRef={canvasElRef}
              />
            )}
          </main>
        </div>
      </div>

      {parsing && (
        <div className="parse-overlay" role="status">
          <div className="parse-card">
            <p className="parse-title">{parseTitle}</p>
            <div className="parse-bar">
              <div className="parse-bar-fill" style={{ width: `${parsePct}%` }} />
            </div>
            <p className="parse-detail">{parseDetail || "Starting…"}</p>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast${toast.isError ? " is-error" : ""}`} role="status">
          {toast.message}
        </div>
      )}
    </div>
  );
}
