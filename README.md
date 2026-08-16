# Infograph Full

Analytics studio portfolio: try **Infograph** (CSV → themed charts → PNG) on the homepage, browse live analytics website concepts, and explore data consulting + a scripted AI analyst demo.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Chart.js, Papa Parse, html2canvas
- Motion-friendly UI with `prefers-reduced-motion` respected in CSS

## Develop

```bash
cd /Users/robbieardison/Documents/projects/infograph-full
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Infograph tool + services, work catalog, process, AI demo, CTA |
| `/work/[slug]` | Live analytics concept demo |
| `/work` | Redirects to `/#work` |

## Infograph tool

Ported from the standalone `infograph` prototype:

- Upload / drag-drop CSV (soft limits: 10 MB, 25k rows)
- Column mapping, bar / line / doughnut
- Five themes (Atelier, Signal, Lattice, Lumen, Nocturne)
- KPI strip, rankings, PNG export
- Sample auto-loads from `/samples/sample-data.csv`

## Concepts

Twelve speculative analytics sites under `src/lib/concepts.ts` (executive / ops / product / narrative). Flagships: `northstar`, `signalroom`, `funnel`, `briefing`.

## AI analyst

Scripted demo only (`src/lib/agent-scripts.ts`) — no API keys, no LLM. Badge: “Demo · sample answers”.

## Contact

Default CTA: `mailto:hello@infograph.studio` (change `CONTACT_URL` in `src/lib/concepts.ts`).
