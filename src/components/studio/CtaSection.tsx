import { CONTACT_URL } from "@/lib/concepts";

export function CtaSection() {
  return (
    <section id="contact" className="border-t border-line bg-charcoal px-5 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="brand-rail mb-8 h-1 w-24" />
        <h2 className="font-display max-w-2xl text-3xl tracking-tight sm:text-5xl">
          Ready for an analytics site that explains itself?
        </h2>
        <p className="mt-4 max-w-lg text-white/65">
          Tell us about your data, your audience, and whether you want consulting, a build, an AI
          agent — or all three.
        </p>
        <a
          href={CONTACT_URL}
          className="mt-10 inline-flex rounded-sm bg-petrol px-6 py-3 text-sm font-semibold text-white transition hover:bg-petrol-deep"
        >
          Start a project
        </a>
      </div>
    </section>
  );
}
