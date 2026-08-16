const steps = [
  { n: "01", title: "Discover", body: "Goals, audiences, and the decisions the site must unlock." },
  { n: "02", title: "Model", body: "Metrics, sources, and the story structure behind the charts." },
  { n: "03", title: "Visualize", body: "Interactive surfaces — boards, narratives, ops consoles." },
  { n: "04", title: "Enable", body: "Handoff, consulting cadence, optional AI analyst on top." },
];

export function ProcessSection() {
  return (
    <section id="process" className="border-t border-line bg-cream/50 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-petrol">Process</p>
        <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
          Discover → Model → Visualize → Enable
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <article key={s.n} className="border border-line bg-card p-5">
              <p className="font-mono text-xs font-semibold text-petrol">{s.n}</p>
              <h3 className="font-display mt-2 text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
