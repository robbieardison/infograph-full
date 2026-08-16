"use client";

import { CONTACT_URL } from "@/lib/concepts";

export function StudioFooter() {
  return (
    <footer className="border-t border-line bg-cream/40 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-ink">Infograph</p>
          <p className="mt-1 text-sm text-muted">
            Analytics websites · Data consulting · AI analyst demos
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="/#work" className="font-medium text-petrol hover:underline">
            Work
          </a>
          <a href={CONTACT_URL} className="font-medium text-petrol hover:underline">
            Contact
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-muted">
        Concept demos are speculative. Charts use sample data unless you upload your own CSV.
      </p>
    </footer>
  );
}
