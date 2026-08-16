/** Lightweight delivery strip — not the websites-studio process grid */
const beats = [
  { t: "Frame", d: "Decisions & audiences" },
  { t: "Model", d: "Metrics & sources" },
  { t: "Compose", d: "Surfaces & motion" },
  { t: "Enable", d: "Handoff & agents" },
];

export function ProcessSection() {
  return (
    <section id="process" className="border-b border-line bg-void">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 rounded-lg border border-line bg-raised/60 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-mono text-[11px] text-faint">how we ship</p>
          <ol className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-3 sm:justify-end">
            {beats.map((b, i) => (
              <li key={b.t} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="hidden h-px w-6 bg-line sm:block" aria-hidden />
                )}
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{b.t}</p>
                  <p className="text-xs text-muted">{b.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
