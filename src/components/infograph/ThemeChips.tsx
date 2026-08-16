"use client";

import {
  THEME_LABELS,
  THEMES,
  type InfographTheme,
} from "./types";

export function ThemeChips({
  theme,
  onChange,
}: {
  theme: InfographTheme;
  onChange: (t: InfographTheme) => void;
}) {
  return (
    <section className="theme-bar" aria-label="Design themes">
      <p className="theme-label">Style</p>
      <div className="theme-chips" role="tablist">
        {THEMES.map((t) => {
          const active = t === theme;
          return (
            <button
              key={t}
              type="button"
              className={`theme-chip${active ? " is-active" : ""}`}
              data-theme={t}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t)}
            >
              {THEME_LABELS[t]}
            </button>
          );
        })}
      </div>
    </section>
  );
}
