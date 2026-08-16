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
    ? "border-black/15 bg-white/95 text-[#141a22] hover:bg-white"
    : "border-white/15 bg-black/60 text-white hover:bg-black/75";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between gap-3 px-3 pt-3 sm:px-4 sm:pt-4">
      <Link
        href="/#gallery"
        className={`pointer-events-auto rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition ${catalogClass}`}
      >
        ← Gallery
      </Link>
      <a
        href={CONTACT_URL}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
        style={{ background: accent }}
      >
        Brief us
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
