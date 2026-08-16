import { CONTACT_URL, PARENT_URL } from "@/lib/concepts";

export function CtaSection() {
  return (
    <section id="contact" className="bg-void">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="overflow-hidden rounded-xl border border-line bg-panel">
          <div className="sp-triad-gradient h-1 w-full" />
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-[11px] text-faint">05 · next</p>
              <h2 className="font-display mt-2 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Need a surface, a readout, or an agent?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted">
                Tell Stable Panther what you’re measuring. Infograph ships the analytics experience —
                websites, consulting, AI explainers.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={CONTACT_URL}
                className="inline-flex justify-center rounded-md bg-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-deep"
              >
                Start on Stable Panther
              </a>
              <a
                href={PARENT_URL}
                className="inline-flex justify-center rounded-md border border-line bg-void px-6 py-3 text-sm font-semibold text-ink transition hover:border-petrol"
              >
                Main site
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
