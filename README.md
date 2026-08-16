# Infograph Full

**Infograph** is Stable Panther’s analytics studio: try the Infograph tool (CSV → themed charts → PNG), browse live analytics website concepts, data consulting, and a scripted AI analyst demo.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 — dark console chrome with SP accents (petrol, red, orange)
- Chart.js, Papa Parse, html2canvas

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
| `/` | Workbench + modes + gallery + analyst + CTA |
| `/work/[slug]` | Live analytics concept demo |
| `/work` | Redirects to `/#gallery` |

## Contact

CTAs go to [stablepanther.com/#contact](https://stablepanther.com/#contact) (`CONTACT_URL` in `src/lib/concepts.ts`).
