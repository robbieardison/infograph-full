const modes = [
  {
    id: "build",
    accent: "petrol" as const,
    title: "Build the surface",
    body: "Analytics websites — boards, ops consoles, funnels, briefings — shipped as products people actually use.",
    cue: "Websites",
  },
  {
    id: "consult",
    accent: "orange" as const,
    title: "Shape the analysis",
    body: "Data consulting: metrics that matter, source truth, and the questions to ask before you draw a chart.",
    cue: "Consulting",
  },
  {
    id: "agent",
    accent: "red" as const,
    title: "Explain with an agent",
    body: "Optional AI analyst that talks through charts and next steps — demo below; production on your stack.",
    cue: "AI agent",
  },
];

const accentClass = {
  petrol: "accent-bar-petrol",
  orange: "accent-bar-orange",
  red: "accent-bar-red",
};

const cueClass = {
  petrol: "text-petrol",
  orange: "text-orange",
  red: "text-red",
};

export function OfferSection() {
  return (
    <section id="modes" className="border-b border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] text-orange">02 · engagement modes</p>
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Three ways to work with us
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Infograph is Stable Panther’s analytics lane — craft for charts, narrative, and
            decisions.
          </p>
        </div>

        <div className="mt-10 grid gap-0 border border-line md:grid-cols-3">
          {modes.map((m, i) => (
            <article
              key={m.id}
              className={`relative bg-void/40 p-6 sm:p-8 ${i < modes.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""}`}
            >
              <div className={`absolute inset-y-0 left-0 w-1 ${accentClass[m.accent]}`} />
              <p className={`font-mono text-[11px] ${cueClass[m.accent]}`}>{m.cue}</p>
              <h3 className="font-display mt-3 text-xl font-semibold text-ink">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
