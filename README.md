# KTMG Redesign

Website redesign for KT Medical Group — a modern, bilingual (EN/ES) patient-facing site built with Next.js 14.

**Live site:** [ktmg-redesign.vercel.app](https://ktmg-redesign.vercel.app)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** React Context + localStorage (EN/ES)
- **Deployment:** Vercel (auto-deploy on push to `main`)

## Fonts

- **Bricolage Grotesque** — headings
- **Plus Jakarta Sans** — body text

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── doctors/          # Doctor listing + profile pages
│   ├── services/         # Service detail pages
│   ├── locations/        # Location pages
│   └── ...
├── components/
│   ├── home/             # Homepage sections
│   ├── layout/           # Navbar, Footer, PageHero, etc.
│   └── ui/               # Shared UI primitives
├── contexts/             # LanguageContext (i18n)
└── lib/
    ├── constants.ts      # Site-wide URLs and config
    └── translations/     # EN/ES flat key translation files
```

## i18n

Language is toggled via the pill in the Navbar and persisted to `localStorage`. Translation keys live in `src/lib/translations/` as flat objects — add new keys to both `en.ts` and `es.ts`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm test` | Run Jest tests |
