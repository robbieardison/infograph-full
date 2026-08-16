"use client";

import Link from "next/link";
import { CONTACT_URL } from "@/lib/concepts";

const links = [
  { href: "/#tool", label: "Try Infograph" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#agent", label: "AI Analyst" },
];

export function StudioHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Infograph
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-petrol sm:inline">
            Studio
          </span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={CONTACT_URL}
          className="inline-flex rounded-sm bg-petrol px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-petrol-deep"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
