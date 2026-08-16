import { CONTACT_URL, PARENT_URL } from "@/lib/concepts";

export function StudioFooter() {
  return (
    <footer className="border-t border-line bg-panel px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="sp-triad-gradient h-5 w-1 rounded-sm" aria-hidden />
            <p className="font-display text-base font-semibold text-ink">Infograph</p>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Analytics studio by{" "}
            <a href={PARENT_URL} className="text-petrol hover:underline">
              Stable Panther
            </a>
            . Charts, consulting, agents.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <a href="/#tool" className="hover:text-ink">
            Workbench
          </a>
          <a href="/#gallery" className="hover:text-ink">
            Gallery
          </a>
          <a href={CONTACT_URL} className="hover:text-ink">
            Contact
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl font-mono text-[10px] text-faint">
        Speculative demos use sample data unless you upload your own CSV.
      </p>
    </footer>
  );
}
