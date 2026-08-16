"use client";

import Link from "next/link";
import { CONTACT_URL } from "@/lib/concepts";

type DemoChromeProps = {
  accent?: string;
  tone?: "light" | "dark";
};

export function DemoChrome({ accent = "#1096A9", tone = "light" }: DemoChromeProps) {
  const light = tone === "light";
  const catalogClass = light
    ? "border-black/10 bg-white/90 text-ink hover:bg-white"
    : "border-white/15 bg-black/55 text-white hover:bg-black/70";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between gap-3 px-3 pt-3 sm:px-4 sm:pt-4">
      <Link
        href="/#work"
        className={`pointer-events-auto rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-sm backdrop-blur transition ${catalogClass}`}
      >
        ← Catalog
      </Link>
      <a
        href={CONTACT_URL}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition hover:brightness-110"
        style={{ background: accent }}
      >
        Build yours
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
