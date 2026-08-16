"use client";

import Link from "next/link";
import { CONTACT_URL, PARENT_URL } from "@/lib/concepts";

const links = [
  { href: "/#tool", label: "Workbench" },
  { href: "/#modes", label: "Modes" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#agent", label: "Analyst" },
];

export function StudioHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-void/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="sp-triad-gradient h-6 w-1.5 shrink-0 rounded-sm" aria-hidden />
            <span className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
              Infograph
            </span>
          </Link>
          <span className="hidden font-mono text-[10px] text-faint sm:inline">
            by{" "}
            <a href={PARENT_URL} className="text-petrol transition hover:text-petrol-soft">
              Stable Panther
            </a>
          </span>
        </div>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition hover:bg-raised hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={CONTACT_URL}
          className="inline-flex items-center gap-2 rounded-md bg-red px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-red-deep"
        >
          Brief us
        </a>
      </div>
    </header>
  );
}
