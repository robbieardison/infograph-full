"use client";

import type { ChartType } from "./types";

type Props = {
  fileMeta: string;
  title: string;
  subtitle: string;
  columns: string[];
  category: string;
  value: string;
  series: string;
  chartType: ChartType;
  onTitle: (v: string) => void;
  onSubtitle: (v: string) => void;
  onCategory: (v: string) => void;
  onValue: (v: string) => void;
  onSeries: (v: string) => void;
  onChartType: (v: ChartType) => void;
  onDropFile: (file: File) => void;
  titleTouched: boolean;
  subtitleTouched: boolean;
  onTitleTouch: () => void;
  onSubtitleTouch: () => void;
};

export function InfographControls({
  fileMeta,
  title,
  subtitle,
  columns,
  category,
  value,
  series,
  chartType,
  onTitle,
  onSubtitle,
  onCategory,
  onValue,
  onSeries,
  onChartType,
  onDropFile,
  onTitleTouch,
  onSubtitleTouch,
}: Props) {
  return (
    <aside className="controls">
      <h2 className="controls-title">Map columns</h2>
      <p className="controls-hint">{fileMeta}</p>

      <label className="field">
        <span>Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            onTitleTouch();
            onTitle(e.target.value);
          }}
        />
      </label>
      <label className="field">
        <span>Subtitle</span>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => {
            onSubtitleTouch();
            onSubtitle(e.target.value);
          }}
        />
      </label>

      <label className="field">
        <span>Category</span>
        <select value={category} onChange={(e) => onCategory(e.target.value)}>
          {columns.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Value</span>
        <select value={value} onChange={(e) => onValue(e.target.value)}>
          {columns.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>
          Series <em>(optional)</em>
        </span>
        <select value={series} onChange={(e) => onSeries(e.target.value)}>
          <option value="">None</option>
          {columns.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Primary chart</span>
        <select
          value={chartType}
          onChange={(e) => onChartType(e.target.value as ChartType)}
        >
          <option value="bar">Bars</option>
          <option value="line">Line</option>
          <option value="doughnut">Doughnut</option>
        </select>
      </label>

      <div
        className="drop-zone"
        onDragEnter={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("is-dragover");
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("is-dragover");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("is-dragover");
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("is-dragover");
          const file = e.dataTransfer?.files?.[0];
          if (file) onDropFile(file);
        }}
      >
        <p>Drop another CSV here</p>
      </div>
    </aside>
  );
}
