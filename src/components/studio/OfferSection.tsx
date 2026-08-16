const pillars = [
  {
    title: "Analytics websites",
    body: "Purpose-built dashboards and narrative sites — executive boards, ops consoles, product funnels — designed as products, not slide decks.",
  },
  {
    title: "Data consulting",
    body: "Help defining metrics, cleaning pipelines, and framing the questions that matter before a single chart ships.",
  },
  {
    title: "AI analyst agent",
    body: "An optional co-pilot that explains charts and suggests next steps — demos below; production agents wired to your stack.",
  },
];

export function OfferSection() {
  return (
    <section id="services" className="border-t border-line bg-card px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-petrol">Services</p>
        <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
          Not just dashboards — decisions
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Hire Infograph as a data consultant and analytics studio: we build the surfaces and help
          with the analysis behind them.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="border border-line bg-paper p-6">
              <h3 className="font-display text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
