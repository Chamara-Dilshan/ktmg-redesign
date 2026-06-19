# KTMG Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full Kids & Teens Medical Group website in Next.js 14 — homepage, 25 location pages, 55+ doctor profiles, 6 service pages, About Us, Patient Resources, Insurance, Careers (3 countries), Blog, and Testimonials — as a statically generated site replacing ktdoctor.com.

**Architecture:** Next.js 14 App Router with SSG. All location and doctor pages are pre-rendered at build time from `/src/data/*.json` files. Interactive features (clinic search, doctor filter) run client-side in leaf components. No backend — all booking links to Healow externally.

**Tech Stack:** Next.js 14 · TypeScript 5 · Tailwind CSS 3 · next/font · Jest + React Testing Library

## Global Constraints

- Healow booking URL: store as `HEALOW_URL` in `src/lib/constants.ts` — confirm exact URL with KTMG before launch (use `https://healow.com/` as placeholder)
- Colors — exact hex, no substitutions: `#073f49` (teal-dark), `#047391` (teal-mid), `#E8612C` (coral), `#F8FAFB` (bg), `#1A1A2E` (text), `#6B7280` (muted), `#E0EAED` (border), `#E8F4F7` (teal-tint)
- Fonts: Poppins 700/800 headings · Roboto 400/500 body — via `next/font/google`
- Logo: `/public/logo.svg` downloaded from current site
- Phone (call): `(818) 361-5437` · Text EN: `(626) 298-7121` · Text ES: `(818) 423-5637` · Email: `customerservice@ktdoctor.com`
- Every page exports a `metadata` object (Next.js App Router)
- No `'use client'` at page level — keep it in leaf components only
- All "Book Appointment" / "Book Now" CTAs use `HEALOW_URL` — never hardcode the URL inline
- Run tests: `npm test` · Build check: `npm run build`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                      # Root layout: fonts, UrgencyBar, Navbar, Footer
│   ├── page.tsx                        # Homepage (assembles home sections)
│   ├── globals.css
│   ├── sitemap.ts                      # Auto-generates sitemap
│   ├── about-us/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── primary-care/page.tsx
│   │   ├── telehealth/page.tsx
│   │   ├── urgent-care/page.tsx
│   │   ├── after-hours-care/page.tsx
│   │   ├── prenatal-consultation/page.tsx
│   │   └── specialized-care/page.tsx
│   ├── locations/
│   │   ├── page.tsx                    # All 25 clinics grid + search
│   │   └── [slug]/page.tsx             # Individual clinic (generateStaticParams)
│   ├── doctors/
│   │   ├── page.tsx                    # Filterable directory (client component)
│   │   └── [slug]/page.tsx             # Individual doctor profile
│   ├── patient-resources/page.tsx
│   ├── insurance/page.tsx
│   ├── careers/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── share-your-experience/page.tsx
├── components/
│   ├── ui/
│   │   ├── BookingCTA.tsx              # Coral button → HEALOW_URL
│   │   ├── Button.tsx                  # Base button variants
│   │   └── SectionLabel.tsx            # Uppercase teal label above headings
│   ├── layout/
│   │   ├── UrgencyBar.tsx              # Top phone/same-day bar
│   │   ├── Navbar.tsx                  # Sticky teal nav + dropdown + mobile
│   │   └── Footer.tsx                  # 4-col dark teal footer
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── StatsBar.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── ClinicFinder.tsx            # 'use client' — zip search + results
│   │   ├── DoctorsPreview.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── InsuranceSection.tsx
│   ├── locations/
│   │   └── LocationCard.tsx
│   └── doctors/
│       └── DoctorCard.tsx
├── data/
│   ├── locations.json                  # 25 entries
│   ├── doctors.json                    # 55+ entries
│   ├── services.json                   # 6 entries
│   └── testimonials.json              # curated reviews
├── types/
│   └── index.ts                        # Location, Doctor, Service, Testimonial
└── lib/
    ├── constants.ts                    # HEALOW_URL, phone numbers, socials
    └── utils.ts                        # slugify, getDistance, cn()
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: full Next.js project at `D:\Pet Projects\KTMG-Redesign\` (scaffold into existing dir)
- Create: `tailwind.config.ts`
- Create: `src/lib/constants.ts`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

**Interfaces:**
- Produces: Tailwind tokens `teal-dark`, `teal-mid`, `coral`, `brand-bg`, `brand-text`, `brand-muted`, `brand-border`, `teal-tint`; CSS variables `--font-poppins`, `--font-roboto`; exported constants `HEALOW_URL`, `PHONE_CALL`, `PHONE_TEXT_EN`, `PHONE_TEXT_ES`, `EMAIL`, `SOCIAL`

- [ ] **Step 1: Scaffold the project**

Run from `D:\Pet Projects\` (NOT inside KTMG-Redesign — create-next-app will create the directory):
```bash
# If KTMG-Redesign already exists with docs/, scaffold into it:
cd "D:\Pet Projects\KTMG-Redesign"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-git
# When prompted about existing files: confirm yes to continue
# Turbopack prompt: No
```

- [ ] **Step 2: Install test dependencies**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

- [ ] **Step 3: Create `jest.config.ts`**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],  // Jest 27+: key is setupFilesAfterFramework
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create `jest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to `package.json`**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

- [ ] **Step 6: Replace `tailwind.config.ts` with brand tokens**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'teal-dark':   '#073f49',
        'teal-mid':    '#047391',
        'coral':       '#E8612C',
        'brand-bg':    '#F8FAFB',
        'brand-text':  '#1A1A2E',
        'brand-muted': '#6B7280',
        'brand-border':'#E0EAED',
        'teal-tint':   '#E8F4F7',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body:    ['var(--font-roboto)',   'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 7: Create `src/lib/constants.ts`**

```typescript
export const HEALOW_URL = 'https://healow.com/'  // TODO: confirm exact URL with KTMG

export const PHONE_CALL     = '(818) 361-5437'
export const PHONE_TEXT_EN  = '(626) 298-7121'
export const PHONE_TEXT_ES  = '(818) 423-5637'
export const EMAIL          = 'customerservice@ktdoctor.com'

export const PAY_ONLINE_URL  = 'https://healowpay.com/'
export const PORTAL_URL      = 'https://ecwcloud.com/'

export const SOCIAL = {
  facebook:  'https://www.facebook.com/kidsandteensmedicalgroup/',
  instagram: 'https://www.instagram.com/ktmedicalgroup/',
  twitter:   'https://x.com/KTDoctorGroup',
  youtube:   'https://www.youtube.com/channel/UC5pMXGZ_F2OZUFdfy6YbIew',
}
```

- [ ] **Step 8: Create `src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}
```

Install clsx and tailwind-merge:
```bash
npm install clsx tailwind-merge
```

- [ ] **Step 9: Set up fonts and root layout**

Replace `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kids & Teens Medical Group | Pediatric Care Los Angeles',
    template: '%s | Kids & Teens Medical Group',
  },
  description: "LA's largest pediatric network. 25 clinics, 50+ board-certified doctors, same-day appointments. Serving children ages 0–21.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body className="font-body bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 10: Download logo**

```powershell
Invoke-WebRequest -Uri "https://www.ktdoctor.com/wp-content/uploads/2023/07/Kids-and-teen-pediatric-Clinic-logo-2023.svg" -OutFile "public\logo.svg"
```

- [ ] **Step 11: Verify build and tests run**

```bash
npm run build
npm test -- --passWithNoTests
```
Expected: build succeeds, test suite passes (empty).

- [ ] **Step 12: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 14 project with Tailwind brand tokens, fonts, and Jest"
```

---

### Task 2: TypeScript Types and JSON Data Files

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/locations.json`
- Create: `src/data/doctors.json`
- Create: `src/data/services.json`
- Create: `src/data/testimonials.json`
- Create: `src/__tests__/data.test.ts`

**Interfaces:**
- Produces: `Location`, `Doctor`, `Service`, `Testimonial` TypeScript types — consumed by every component and page from Task 3 onwards
- Produces: all 25 locations, 55+ doctors, 6 services, testimonials as typed JSON

- [ ] **Step 1: Write the failing type test**

Create `src/__tests__/data.test.ts`:
```typescript
import locations from '@/data/locations.json'
import doctors from '@/data/doctors.json'
import services from '@/data/services.json'
import testimonials from '@/data/testimonials.json'

describe('data files', () => {
  test('locations has 25 entries each with required fields', () => {
    expect(locations).toHaveLength(25)
    locations.forEach((loc: any) => {
      expect(loc).toHaveProperty('slug')
      expect(loc).toHaveProperty('name')
      expect(loc).toHaveProperty('address')
      expect(loc).toHaveProperty('city')
      expect(loc).toHaveProperty('state')
      expect(loc).toHaveProperty('zip')
      expect(loc).toHaveProperty('officeHours')
      expect(loc).toHaveProperty('telehealthHours')
      expect(loc).toHaveProperty('providers')
    })
  })

  test('doctors has at least 50 entries each with required fields', () => {
    expect(doctors.length).toBeGreaterThanOrEqual(50)
    doctors.forEach((doc: any) => {
      expect(doc).toHaveProperty('slug')
      expect(doc).toHaveProperty('name')
      expect(doc).toHaveProperty('credentials')
      expect(doc).toHaveProperty('locations')
    })
  })

  test('services has exactly 6 entries', () => {
    expect(services).toHaveLength(6)
  })

  test('testimonials has at least 3 entries', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(3)
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- data.test
```
Expected: FAIL — cannot find module `@/data/locations.json`

- [ ] **Step 3: Create TypeScript types**

Create `src/types/index.ts`:
```typescript
export interface Location {
  slug: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  lat?: number
  lng?: number
  officeHours: string        // e.g. "Mon–Fri 9AM–6PM"
  saturdayHours?: string     // Only Downey: "Sat 8AM–4PM"
  telehealthHours: string    // e.g. "Mon–Sun 9AM–8PM"
  providers: string[]        // doctor slugs at this location
  mapsEmbed?: string         // Google Maps embed src URL
}

export interface Doctor {
  slug: string
  name: string
  credentials: string        // e.g. "MD, FAAP"
  locations: string[]        // location slugs
  photo?: string             // path to /public/doctors/{slug}.jpg
  bio?: string
}

export interface Service {
  slug: string
  name: string
  icon: string               // emoji or icon name
  description: string
  hours?: string
  ctaLabel: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  rating: number
}
```

- [ ] **Step 4: Add `resolveJsonModule` to `tsconfig.json`**

In `tsconfig.json`, ensure `compilerOptions` includes:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

- [ ] **Step 5: Create `src/data/services.json`**

```json
[
  {
    "slug": "primary-care",
    "name": "Primary Care",
    "icon": "🩺",
    "description": "Routine check-ups, immunizations, and ongoing wellness care for children 0–21. Walk-in or same-day appointments available.",
    "hours": "Mon–Fri 9AM–6PM",
    "ctaLabel": "Book Now"
  },
  {
    "slug": "telehealth",
    "name": "Telehealth",
    "icon": "💻",
    "description": "Video visits from the comfort of home. Available Mon–Sat 9AM–9PM and Sun 12PM–6PM, plus evening hours 7–9PM.",
    "hours": "Mon–Sun 9AM–8PM",
    "ctaLabel": "Book Now"
  },
  {
    "slug": "urgent-care",
    "name": "Urgent Care",
    "icon": "⚡",
    "description": "Immediate care for non-emergency illnesses and injuries. Less waiting, same trusted pediatric care for ages 0–21.",
    "ctaLabel": "Book Now"
  },
  {
    "slug": "after-hours-care",
    "name": "After-Hours Care",
    "icon": "🌙",
    "description": "Evening and weekend availability when your child needs care outside of regular office hours.",
    "ctaLabel": "Learn More"
  },
  {
    "slug": "prenatal-consultation",
    "name": "Prenatal Consultation",
    "icon": "🍼",
    "description": "Meet your pediatrician before baby arrives. We coordinate first hospital visits with our partner hospitals for families delivering nearby.",
    "ctaLabel": "Learn More"
  },
  {
    "slug": "specialized-care",
    "name": "Specialized Care",
    "icon": "🧠",
    "description": "ADHD evaluation and management, allergy care, sports physicals, and adolescent health services.",
    "ctaLabel": "Learn More"
  }
]
```

- [ ] **Step 6: Create `src/data/testimonials.json`**

```json
[
  {
    "id": "t1",
    "quote": "We've been coming to KTMG since my daughter was born. The doctors are warm, thorough, and genuinely care. Same-day appointments have saved us so many times.",
    "author": "Maria R.",
    "location": "Santa Monica · Mother of 2",
    "rating": 5
  },
  {
    "id": "t2",
    "quote": "The telehealth option is a lifesaver. When my son was sick I booked a video visit for early morning. Diagnosed and prescribed before 9AM.",
    "author": "James T.",
    "location": "Pasadena · Father of 3",
    "rating": 5
  },
  {
    "id": "t3",
    "quote": "The Beverly Hills clinic staff are amazing. Dr. Fineberg takes time to explain everything. My kids actually look forward to their check-ups!",
    "author": "Aisha K.",
    "location": "Beverly Hills · Mother of 1",
    "rating": 5
  }
]
```

- [ ] **Step 7: Create `src/data/locations.json`**

Create the file with all 25 entries. Full structure — every entry must have all required fields from the `Location` type:

```json
[
  {
    "slug": "agoura-hills",
    "name": "Agoura Hills",
    "address": "5115 Clareton Drive, Suite 150",
    "city": "Agoura Hills",
    "state": "CA",
    "zip": "91301",
    "lat": 34.1536,
    "lng": -118.7606,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": ["mark-snyder"]
  },
  {
    "slug": "arcadia",
    "name": "Arcadia",
    "address": "16 E Huntington Drive",
    "city": "Arcadia",
    "state": "CA",
    "zip": "91006",
    "lat": 34.1397,
    "lng": -118.0353,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": ["sylvia-lam", "erika-lee", "jocelyn-zuniga", "najma-qamar"]
  },
  {
    "slug": "beverly-hills",
    "name": "Beverly Hills",
    "address": "8733 Beverly Blvd., #200",
    "city": "West Hollywood",
    "state": "CA",
    "zip": "90048",
    "lat": 34.0788,
    "lng": -118.3803,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": ["martin-fineberg", "sharmetha-ramanan", "rohina-furmuly", "yussef-sakhai"]
  },
  {
    "slug": "camarillo",
    "name": "Camarillo",
    "address": "2486 Ponderosa Dr. N., Suite D-211",
    "city": "Camarillo",
    "state": "CA",
    "zip": "93010",
    "lat": 34.2164,
    "lng": -119.0376,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "canyon-country",
    "name": "Canyon Country",
    "address": "20655 Soledad Canyon Road, #25",
    "city": "Canyon Country",
    "state": "CA",
    "zip": "91351",
    "lat": 34.4219,
    "lng": -118.4838,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "culver-city",
    "name": "Culver City",
    "address": "3831 Hughes Avenue, Suite 602",
    "city": "Culver City",
    "state": "CA",
    "zip": "90232",
    "lat": 34.0219,
    "lng": -118.3965,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "downey",
    "name": "Downey",
    "address": "8201 4th St",
    "city": "Downey",
    "state": "CA",
    "zip": "90241",
    "lat": 33.9401,
    "lng": -118.1332,
    "officeHours": "Mon–Fri 9AM–6PM",
    "saturdayHours": "Sat 8AM–4PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "glendale",
    "name": "Glendale",
    "address": "1530 E Chevy Chase Dr, Ste 202",
    "city": "Glendale",
    "state": "CA",
    "zip": "91206",
    "lat": 34.1500,
    "lng": -118.2229,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "hollywood",
    "name": "Hollywood",
    "address": "5255 W Sunset Blvd.",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "90027",
    "lat": 34.0979,
    "lng": -118.3262,
    "officeHours": "Mon–Fri 8:30AM–5PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "la-canada-flintridge",
    "name": "La Cañada Flintridge",
    "address": "1021 Foothill Blvd",
    "city": "La Cañada Flintridge",
    "state": "CA",
    "zip": "91011",
    "lat": 34.1997,
    "lng": -118.2003,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": ["janesri-de-silva", "mealynne-ngu", "tatiana-genjoyan"]
  },
  {
    "slug": "la-mirada",
    "name": "La Mirada",
    "address": "12675 La Mirada Blvd #200",
    "city": "La Mirada",
    "state": "CA",
    "zip": "90638",
    "lat": 33.9017,
    "lng": -118.0120,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "mission-hills",
    "name": "Mission Hills",
    "address": "10200 Sepulveda Blvd, Suite #220",
    "city": "Mission Hills",
    "state": "CA",
    "zip": "91345",
    "lat": 34.2647,
    "lng": -118.4656,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "northridge",
    "name": "Northridge",
    "address": "8628 Reseda Blvd",
    "city": "Northridge",
    "state": "CA",
    "zip": "91324",
    "lat": 34.2283,
    "lng": -118.5357,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": ["hilma-benjamin", "palak-shelat", "brian-bhatt", "narindar-nat", "victoria-millet"]
  },
  {
    "slug": "pasadena",
    "name": "Pasadena",
    "address": "504 S Sierra Madre Blvd",
    "city": "Pasadena",
    "state": "CA",
    "zip": "91107",
    "lat": 34.1434,
    "lng": -118.0988,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "pico-rivera",
    "name": "Pico Rivera",
    "address": "8337 Telegraph Rd #119",
    "city": "Pico Rivera",
    "state": "CA",
    "zip": "90660",
    "lat": 33.9831,
    "lng": -118.0967,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "san-fernando",
    "name": "San Fernando",
    "address": "777 Truman Street, Suite 105",
    "city": "San Fernando",
    "state": "CA",
    "zip": "91340",
    "lat": 34.2817,
    "lng": -118.4384,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "san-pedro",
    "name": "San Pedro",
    "address": "887 W 9th St",
    "city": "San Pedro",
    "state": "CA",
    "zip": "90731",
    "lat": 33.7365,
    "lng": -118.2920,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "santa-monica",
    "name": "Santa Monica",
    "address": "2221 Lincoln Blvd #200",
    "city": "Santa Monica",
    "state": "CA",
    "zip": "90405",
    "lat": 34.0195,
    "lng": -118.4912,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "tarzana",
    "name": "Tarzana",
    "address": "18372 Clark St Ste 226",
    "city": "Tarzana",
    "state": "CA",
    "zip": "91356",
    "lat": 34.1686,
    "lng": -118.5487,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "torrance",
    "name": "Torrance",
    "address": "3524 Torrance Blvd, Suite 101",
    "city": "Torrance",
    "state": "CA",
    "zip": "90503",
    "lat": 33.8358,
    "lng": -118.3406,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "valencia",
    "name": "Valencia",
    "address": "24330 McBean Pkwy",
    "city": "Valencia",
    "state": "CA",
    "zip": "91355",
    "lat": 34.3917,
    "lng": -118.5720,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "van-nuys",
    "name": "Van Nuys",
    "address": "14426 Gilmore Street, Suite B",
    "city": "Van Nuys",
    "state": "CA",
    "zip": "91401",
    "lat": 34.1897,
    "lng": -118.4495,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "west-hills",
    "name": "West Hills",
    "address": "7345 Medical Center Drive, #400",
    "city": "West Hills",
    "state": "CA",
    "zip": "91307",
    "lat": 34.1968,
    "lng": -118.6448,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "whittier",
    "name": "Whittier",
    "address": "13470 Telegraph Road",
    "city": "Whittier",
    "state": "CA",
    "zip": "90605",
    "lat": 33.9592,
    "lng": -118.0328,
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  },
  {
    "slug": "arcadia-2",
    "name": "Arcadia (2nd Location)",
    "address": "TBD — confirm with KTMG",
    "city": "Arcadia",
    "state": "CA",
    "zip": "91006",
    "officeHours": "Mon–Fri 9AM–6PM",
    "telehealthHours": "Mon–Sun 9AM–8PM",
    "providers": []
  }
]
```

Note: 24 confirmed locations above. The 25th entry is a placeholder — confirm the 25th location address with KTMG.

- [ ] **Step 8: Create `src/data/doctors.json`**

Create with all known providers. Representative structure (complete the full list from the site audit):
```json
[
  { "slug": "janesri-de-silva",   "name": "Dr. Janesri De Silva",   "credentials": "MD, FAAP",   "locations": ["la-canada-flintridge"] },
  { "slug": "mark-snyder",        "name": "Dr. Mark Snyder",        "credentials": "MD, FAAP",   "locations": ["agoura-hills"] },
  { "slug": "martin-fineberg",    "name": "Dr. Martin Fineberg",    "credentials": "MD, FAAP",   "locations": ["beverly-hills"] },
  { "slug": "sylvia-lam",         "name": "Dr. Sylvia Lam",         "credentials": "MD, FAAP",   "locations": ["arcadia"] },
  { "slug": "erika-lee",          "name": "Erika Lee",              "credentials": "PNP",        "locations": ["arcadia"] },
  { "slug": "jocelyn-zuniga",     "name": "Dr. Jocelyn Zuniga",     "credentials": "MD",         "locations": ["arcadia"] },
  { "slug": "najma-qamar",        "name": "Dr. Najma Qamar",        "credentials": "MD",         "locations": ["arcadia"] },
  { "slug": "sharmetha-ramanan",  "name": "Sharmetha Ramanan",      "credentials": "PNP",        "locations": ["beverly-hills"] },
  { "slug": "rohina-furmuly",     "name": "Rohina Furmuly",         "credentials": "PA-C",       "locations": ["beverly-hills"] },
  { "slug": "yussef-sakhai",      "name": "Dr. Yussef Sakhai",      "credentials": "MD",         "locations": ["beverly-hills"] },
  { "slug": "mealynne-ngu",       "name": "Mealynne Ngu",           "credentials": "PNP",        "locations": ["la-canada-flintridge"] },
  { "slug": "tatiana-genjoyan",   "name": "Tatiana Genjoyan",       "credentials": "PNP",        "locations": ["la-canada-flintridge"] },
  { "slug": "hilma-benjamin",     "name": "Dr. Hilma Benjamin",     "credentials": "MD, FAAP",   "locations": ["northridge"] },
  { "slug": "palak-shelat",       "name": "Dr. Palak Shelat",       "credentials": "MD, FAAP",   "locations": ["northridge"] },
  { "slug": "brian-bhatt",        "name": "Dr. Brian Bhatt",        "credentials": "MD, FAAP",   "locations": ["northridge"] },
  { "slug": "narindar-nat",       "name": "Dr. Narindar Nat",       "credentials": "MD, FAAP",   "locations": ["northridge"] },
  { "slug": "victoria-millet",    "name": "Dr. Victoria Millet",    "credentials": "MD, FAAP",   "locations": ["northridge"] }
]
```

Complete this list to 55+ entries by referring to the site audit at `D:\Pet Projects\KTMG-Redesign\ktdoctor-site-audit.html`.

- [ ] **Step 9: Run tests — verify they pass**

```bash
npm test -- data.test
```
Expected: PASS — all 4 assertions green.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add TypeScript types and JSON data files for all 25 locations and 55+ doctors"
```

---

### Task 3: Core UI Primitives

**Files:**
- Create: `src/components/ui/BookingCTA.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/__tests__/components/ui/BookingCTA.test.tsx`

**Interfaces:**
- Produces: `<BookingCTA label? className? />` — always renders coral button linking to `HEALOW_URL`
- Produces: `<Button variant="primary"|"ghost"|"outline" href? onClick? className? />` — base button
- Produces: `<SectionLabel>text</SectionLabel>` — uppercase teal-mid label
- Consumed by: every section component from Task 4 onwards

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/components/ui/BookingCTA.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import BookingCTA from '@/components/ui/BookingCTA'
import { HEALOW_URL } from '@/lib/constants'

describe('BookingCTA', () => {
  it('renders a link to HEALOW_URL', () => {
    render(<BookingCTA />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', HEALOW_URL)
  })

  it('renders default label "Book Appointment"', () => {
    render(<BookingCTA />)
    expect(screen.getByText(/book appointment/i)).toBeInTheDocument()
  })

  it('renders custom label when provided', () => {
    render(<BookingCTA label="Book Now" />)
    expect(screen.getByText('Book Now')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- BookingCTA
```
Expected: FAIL — cannot find module `@/components/ui/BookingCTA`

- [ ] **Step 3: Create `src/components/ui/BookingCTA.tsx`**

```typescript
import { HEALOW_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface BookingCTAProps {
  label?: string
  className?: string
}

export default function BookingCTA({ label = 'Book Appointment', className }: BookingCTAProps) {
  return (
    <a
      href={HEALOW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90',
        className
      )}
    >
      {label} <span aria-hidden="true">→</span>
    </a>
  )
}
```

- [ ] **Step 4: Create `src/components/ui/Button.tsx`**

```typescript
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  external?: boolean
}

export default function Button({ variant = 'primary', href, onClick, children, className, external }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90'
  const variants = {
    primary: 'bg-teal-dark text-white',
    ghost:   'border border-white/30 bg-white/10 text-white',
    outline: 'border-2 border-teal-dark text-teal-dark',
  }
  const cls = cn(base, variants[variant], className)

  if (href && external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  }
  if (href) {
    return <Link href={href} className={cls}>{children}</Link>
  }
  return <button onClick={onClick} className={cls}>{children}</button>
}
```

- [ ] **Step 5: Create `src/components/ui/SectionLabel.tsx`**

```typescript
import { cn } from '@/lib/utils'

export default function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs font-bold uppercase tracking-widest text-teal-mid', className)}>
      {children}
    </p>
  )
}
```

- [ ] **Step 6: Run tests — verify they pass**

```bash
npm test -- BookingCTA
```
Expected: PASS — 3 assertions green.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add BookingCTA, Button, and SectionLabel UI primitives"
```

---

### Task 4: Layout Components (UrgencyBar, Navbar, Footer)

**Files:**
- Create: `src/components/layout/UrgencyBar.tsx`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx` — wrap children with UrgencyBar + Navbar + Footer
- Create: `src/__tests__/components/layout/Navbar.test.tsx`

**Interfaces:**
- Produces: `<UrgencyBar />`, `<Navbar />`, `<Footer />`  — all server components (no `'use client'`)
- Exception: mobile hamburger state in Navbar uses a `'use client'` child component `<MobileMenu />`
- Consumed by: root `layout.tsx`

- [ ] **Step 1: Write the failing Navbar test**

Create `src/__tests__/components/layout/Navbar.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('renders the Book Appointment CTA linking to Healow', () => {
    render(<Navbar />)
    const cta = screen.getByRole('link', { name: /book appointment/i })
    expect(cta).toHaveAttribute('href', expect.stringContaining('healow.com'))
  })

  it('renders the main nav links', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /find a clinic/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /our doctors/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- Navbar
```
Expected: FAIL — cannot find module `@/components/layout/Navbar`

- [ ] **Step 3: Create `src/components/layout/UrgencyBar.tsx`**

```typescript
import { PHONE_CALL, PHONE_TEXT_EN } from '@/lib/constants'

export default function UrgencyBar() {
  return (
    <div className="bg-teal-mid px-6 py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
        <p className="text-white/90">
          📍 25 clinics across Los Angeles — Same-day appointments available
        </p>
        <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="font-semibold text-yellow-300 hover:text-white">
          Call {PHONE_CALL} →
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/layout/Navbar.tsx`**

```typescript
import Link from 'next/link'
import Image from 'next/image'
import BookingCTA from '@/components/ui/BookingCTA'
import { HEALOW_URL, PAY_ONLINE_URL, PORTAL_URL, PHONE_CALL } from '@/lib/constants'

const services = [
  { label: 'Primary Care',          href: '/services/primary-care' },
  { label: 'Telehealth',            href: '/services/telehealth' },
  { label: 'Urgent Care',           href: '/services/urgent-care' },
  { label: 'After-Hours Care',      href: '/services/after-hours-care' },
  { label: 'Prenatal Consultation', href: '/services/prenatal-consultation' },
  { label: 'Specialized Care',      href: '/services/specialized-care' },
]

export default function Navbar() {
  return (
    <header>
      {/* Utility bar */}
      <div className="border-b border-white/10 bg-teal-dark px-6 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-white/70">
          <div className="flex gap-4">
            <span>Text EN: (626) 298-7121</span>
            <span>Call: {PHONE_CALL}</span>
          </div>
          <div className="flex gap-4">
            <a href={HEALOW_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Appointments</a>
            <a href={PAY_ONLINE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Pay Online</a>
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Portal Login</a>
            <Link href="/locations" className="hover:text-white">Find a Location</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-teal-dark shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Kids & Teens Medical Group" width={40} height={40} priority />
            <span className="text-sm font-semibold leading-tight text-white">
              Kids & Teens Medical Group
              <span className="block text-xs font-normal text-white/60">Pediatric Care · Los Angeles</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {/* Services dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white/85 hover:text-white">
                Services <span className="text-xs">▾</span>
              </button>
              <div className="absolute left-0 top-full z-50 hidden w-56 rounded-lg bg-white py-2 shadow-xl group-hover:block">
                {services.map(s => (
                  <Link key={s.href} href={s.href} className="block px-4 py-2 text-sm text-brand-text hover:bg-teal-tint">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/locations"        className="text-sm font-medium text-white/85 hover:text-white">Find a Clinic</Link>
            <Link href="/doctors"          className="text-sm font-medium text-white/85 hover:text-white">Our Doctors</Link>
            <Link href="/about-us"         className="text-sm font-medium text-white/85 hover:text-white">About Us</Link>
            <Link href="/patient-resources" className="text-sm font-medium text-white/85 hover:text-white">Patient Resources</Link>
          </div>

          <BookingCTA label="Book Appointment" className="hidden md:inline-flex" />
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 5: Create `src/components/layout/Footer.tsx`**

```typescript
import Link from 'next/link'
import Image from 'next/image'
import { EMAIL, PHONE_CALL, PHONE_TEXT_EN, SOCIAL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-teal-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo.svg" alt="Kids & Teens Medical Group" width={36} height={36} />
              <span className="text-sm font-semibold text-white">Kids & Teens Medical Group</span>
            </div>
            <p className="text-sm leading-relaxed">
              The leading provider of pediatric care in Southern California. 25 clinics, extended hours, and a team that treats your child like family.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { href: SOCIAL.facebook,  label: 'Facebook'  },
                { href: SOCIAL.instagram, label: 'Instagram' },
                { href: SOCIAL.youtube,   label: 'YouTube'   },
                { href: SOCIAL.twitter,   label: 'X'         },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                   aria-label={s.label}
                   className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs hover:bg-white/20">
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              {['Primary Care', 'Telehealth', 'Urgent Care', 'After-Hours Care', 'Prenatal Consultation'].map(s => (
                <li key={s}><Link href={`/services/${s.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* For Patients */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">For Patients</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/locations"         className="hover:text-white">Find a Clinic</Link></li>
              <li><Link href="/doctors"            className="hover:text-white">Our Doctors</Link></li>
              <li><Link href="/insurance"          className="hover:text-white">Insurance</Link></li>
              <li><Link href="/patient-resources"  className="hover:text-white">Patient Resources</Link></li>
              <li><Link href="/share-your-experience" className="hover:text-white">Testimonials</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="hover:text-white">📞 {PHONE_CALL}</a></li>
              <li><a href={`tel:${PHONE_TEXT_EN.replace(/\D/g, '')}`} className="hover:text-white">💬 {PHONE_TEXT_EN} (Text EN)</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-white">✉️ {EMAIL}</a></li>
              <li><Link href="/about-us"  className="hover:text-white">About Us</Link></li>
              <li><Link href="/careers"   className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs">
          <span>© 2026 Kids & Teens Medical Group. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy"    className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-conditions"  className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Wire into root layout**

Replace `src/app/layout.tsx` body section:
```typescript
import UrgencyBar from '@/components/layout/UrgencyBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// (keep existing font imports and metadata export)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body className="font-body bg-brand-bg text-brand-text antialiased">
        <UrgencyBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Run tests — verify they pass**

```bash
npm test -- Navbar
```
Expected: PASS — 2 assertions green.

- [ ] **Step 8: Visual check**

```bash
npm run dev
```
Open http://localhost:3000. Verify: urgency bar in teal-mid, sticky nav in dark teal with logo + links + coral Book Appointment button, footer in dark teal with 4 columns.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add UrgencyBar, Navbar, and Footer layout components"
```

---

### Task 5: Homepage

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/StatsBar.tsx`
- Create: `src/components/home/ServicesGrid.tsx`
- Create: `src/components/home/ClinicFinder.tsx` (client component)
- Create: `src/components/home/DoctorsPreview.tsx`
- Create: `src/components/home/TestimonialsSection.tsx`
- Create: `src/components/home/InsuranceSection.tsx`
- Modify: `src/app/page.tsx` — assemble all sections
- Create: `src/__tests__/components/home/Hero.test.tsx`

**Interfaces:**
- Consumes: `Service[]` from `services.json`, `Doctor[]` from `doctors.json`, `Testimonial[]` from `testimonials.json`, `Location[]` from `locations.json`
- Consumes: `<BookingCTA />`, `<Button />`, `<SectionLabel />`
- `ClinicFinder` is `'use client'` — receives `locations: Location[]` as prop, does client-side text search

- [ ] **Step 1: Write failing Hero test**

Create `src/__tests__/components/home/Hero.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import Hero from '@/components/home/Hero'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/compassionate care/i)
  })

  it('renders a Book Appointment link to Healow', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link', { name: /book appointment/i })
    expect(links[0]).toHaveAttribute('href', expect.stringContaining('healow.com'))
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- Hero
```
Expected: FAIL — cannot find module `@/components/home/Hero`

- [ ] **Step 3: Create `src/components/home/Hero.tsx`**

```typescript
import BookingCTA from '@/components/ui/BookingCTA'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-teal-dark via-[#0a5566] to-teal-mid px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Content */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/90">
            ★ LA&apos;s Largest Pediatric Network
          </div>
          <h1 className="font-heading mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Compassionate Care for<br />
            <em className="not-italic text-[#7dd3e8]">Every Child, Every Stage</em>
          </h1>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-white/75">
            25 clinics across Los Angeles. Board-certified pediatricians. Extended hours, same-day appointments, and telehealth — all under one trusted name.
          </p>
          <div className="flex flex-wrap gap-3">
            <BookingCTA label="Book Appointment" />
            <Button variant="ghost" href="/locations">Find a Clinic Near You</Button>
          </div>
        </div>

        {/* Photo placeholder — replace with next/image before launch */}
        <div className="flex h-72 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/30 md:h-80">
          <div className="text-center">
            <div className="mb-2 text-5xl opacity-30">👨‍👩‍👧‍👦</div>
            <p className="text-sm">Hero photo — real family with doctor</p>
            <p className="text-xs opacity-50">Replace before launch</p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/home/StatsBar.tsx`**

```typescript
const stats = [
  { number: '25',   label: 'Clinic Locations in LA'      },
  { number: '50+',  label: 'Board-Certified Doctors'     },
  { number: '18',   label: 'Years of Excellence'         },
  { number: '0–21', label: 'Ages We Serve'               },
]

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 border-b border-brand-border bg-white md:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="border-r border-brand-border px-6 py-6 text-center last:border-r-0">
          <span className="font-heading block text-3xl font-extrabold text-teal-dark">{stat.number}</span>
          <span className="mt-1 block text-xs font-medium text-brand-muted">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Create `src/components/home/ServicesGrid.tsx`**

```typescript
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'
import type { Service } from '@/types'

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Our Services</SectionLabel>
        <h2 className="font-heading mb-3 text-3xl font-extrabold text-teal-dark">
          Everything Your Child Needs, All in One Place
        </h2>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          From routine check-ups to urgent care — with extended hours and telehealth options.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div key={service.slug} className="rounded-xl border border-brand-border bg-white p-7 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-xl">
                {service.icon}
              </div>
              <h3 className="font-heading mb-2 text-base font-bold text-teal-dark">{service.name}</h3>
              {service.hours && (
                <p className="mb-1 text-xs font-medium text-teal-mid">{service.hours}</p>
              )}
              <p className="mb-5 text-sm leading-relaxed text-brand-muted">{service.description}</p>
              <BookingCTA label={service.ctaLabel} className="text-xs px-4 py-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create `src/components/home/ClinicFinder.tsx`**

```typescript
'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Location } from '@/types'

export default function ClinicFinder({ locations }: { locations: Location[] }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return locations.slice(0, 5)
    const q = query.toLowerCase()
    return locations.filter(loc =>
      loc.name.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.zip.includes(q) ||
      loc.address.toLowerCase().includes(q)
    ).slice(0, 5)
  }, [query, locations])

  return (
    <section className="bg-teal-dark px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-2">
        {/* Left: search + results */}
        <div>
          <SectionLabel className="mb-2 text-[#7dd3e8]">25 Locations</SectionLabel>
          <h2 className="font-heading mb-3 text-3xl font-extrabold text-white">
            Find a Clinic Near You
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/65">
            We&apos;re spread across LA — from Santa Monica to Whittier, Beverly Hills to Northridge.
          </p>
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-4">
            <span className="text-white/50">📍</span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter city, zip, or neighborhood..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
            />
          </div>
          <ul className="space-y-3">
            {results.map(loc => (
              <li key={loc.slug} className="flex items-center justify-between rounded-lg border border-white/12 bg-white/8 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#7dd3e8]" />
                  <div>
                    <p className="text-sm font-semibold text-white">{loc.name}</p>
                    <p className="text-xs text-white/50">{loc.address}, {loc.city}</p>
                  </div>
                </div>
                <Link href={`/locations/${loc.slug}`} className="text-xs font-semibold text-coral hover:underline">
                  View →
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/locations" className="mt-4 block text-center text-sm font-semibold text-[#7dd3e8] hover:underline">
            View all 25 locations →
          </Link>
        </div>

        {/* Right: map placeholder */}
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-white/30 md:h-80">
          <div className="text-center">
            <div className="mb-2 text-4xl">🗺️</div>
            <p className="text-sm">Interactive map</p>
            <p className="text-xs opacity-60">Google Maps / Mapbox embed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create `src/components/home/DoctorsPreview.tsx`**

```typescript
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import DoctorCard from '@/components/doctors/DoctorCard'
import type { Doctor } from '@/types'

export default function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  const preview = doctors.slice(0, 4)
  return (
    <section className="bg-white px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <SectionLabel className="mb-2">Our Team</SectionLabel>
            <h2 className="font-heading text-3xl font-extrabold text-teal-dark">Meet Our Pediatricians</h2>
            <p className="mt-2 text-sm text-brand-muted">50+ board-certified doctors and nurse practitioners across LA.</p>
          </div>
          <Link href="/doctors" className="rounded-lg border-2 border-teal-dark px-5 py-2.5 text-sm font-bold text-teal-dark hover:bg-teal-tint">
            View All Doctors
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map(doc => <DoctorCard key={doc.slug} doctor={doc} />)}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Create `src/components/doctors/DoctorCard.tsx`**

```typescript
import Link from 'next/link'
import type { Doctor } from '@/types'

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-border text-center">
      <div className="flex h-28 items-center justify-center bg-teal-tint text-4xl">
        👨‍⚕️
      </div>
      <div className="p-4">
        <h3 className="font-heading text-sm font-bold text-teal-dark">{doctor.name}</h3>
        <p className="text-xs text-brand-muted">{doctor.credentials}</p>
        {doctor.locations[0] && (
          <p className="mt-1 text-xs text-teal-mid">📍 {doctor.locations[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
        )}
        <Link href={`/doctors/${doctor.slug}`} className="mt-3 block text-xs font-semibold text-coral hover:underline">
          View Profile →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 9: Create `src/components/home/TestimonialsSection.tsx`**

```typescript
import SectionLabel from '@/components/ui/SectionLabel'
import type { Testimonial } from '@/types'

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-teal-tint px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Parent Reviews</SectionLabel>
        <h2 className="font-heading mb-10 text-3xl font-extrabold text-teal-dark">Trusted by LA Families</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.id} className="rounded-xl border border-brand-border bg-white p-6">
              <div className="mb-3 text-yellow-400">{'★'.repeat(t.rating)}</div>
              <p className="mb-5 text-sm italic leading-relaxed text-brand-text">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-tint text-sm">👤</div>
                <div>
                  <p className="text-sm font-semibold text-teal-dark">{t.author}</p>
                  <p className="text-xs text-brand-muted">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 10: Create `src/components/home/InsuranceSection.tsx`**

```typescript
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'

const partners = ['Regal Medical Group', 'LA Care', 'Molina Healthcare', 'Medi-Cal', 'Blue Cross', 'Optum', 'Cedar Sinai', 'CHLA']

export default function InsuranceSection() {
  return (
    <section className="border-y border-brand-border bg-white px-6 py-14 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-3">
        <div className="md:col-span-1">
          <SectionLabel className="mb-2">Insurance</SectionLabel>
          <h2 className="font-heading mb-3 text-2xl font-extrabold text-teal-dark">We Accept All Insurance</h2>
          <p className="mb-6 text-sm leading-relaxed text-brand-muted">
            Including HMO, PPO, Medi-Cal, and most commercial plans. No insurance? Ask about affordable options.
          </p>
          <BookingCTA label="Check Your Insurance" />
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-2">
          {partners.map(p => (
            <span key={p} className="rounded-lg border border-brand-border bg-brand-bg px-4 py-2 text-xs font-semibold text-brand-muted">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 11: Assemble in `src/app/page.tsx`**

```typescript
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import ServicesGrid from '@/components/home/ServicesGrid'
import ClinicFinder from '@/components/home/ClinicFinder'
import DoctorsPreview from '@/components/home/DoctorsPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import InsuranceSection from '@/components/home/InsuranceSection'
import services from '@/data/services.json'
import doctors from '@/data/doctors.json'
import testimonials from '@/data/testimonials.json'
import locations from '@/data/locations.json'
import type { Service, Doctor, Testimonial, Location } from '@/types'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid services={services as Service[]} />
      <ClinicFinder locations={locations as Location[]} />
      <DoctorsPreview doctors={doctors as Doctor[]} />
      <TestimonialsSection testimonials={testimonials as Testimonial[]} />
      <InsuranceSection />
    </>
  )
}
```

- [ ] **Step 12: Run tests**

```bash
npm test -- Hero
```
Expected: PASS — 2 assertions green.

- [ ] **Step 13: Visual check**

```bash
npm run dev
```
Open http://localhost:3000. Verify all 7 homepage sections render in correct order with correct colors.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "feat: complete homepage with Hero, StatsBar, ServicesGrid, ClinicFinder, DoctorsPreview, Testimonials, Insurance"
```

---

### Task 6: Location Pages

**Files:**
- Create: `src/components/locations/LocationCard.tsx`
- Create: `src/app/locations/page.tsx`
- Create: `src/app/locations/[slug]/page.tsx`
- Create: `src/__tests__/app/locations.test.tsx`

**Interfaces:**
- Consumes: `locations.json`, `doctors.json`, `Location` type, `Doctor` type
- `generateStaticParams` returns all 25 location slugs
- Each location page has `MedicalClinic` JSON-LD schema

- [ ] **Step 1: Write failing test**

Create `src/__tests__/app/locations.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import LocationCard from '@/components/locations/LocationCard'
import type { Location } from '@/types'

const mockLocation: Location = {
  slug: 'beverly-hills',
  name: 'Beverly Hills',
  address: '8733 Beverly Blvd., #200',
  city: 'West Hollywood',
  state: 'CA',
  zip: '90048',
  officeHours: 'Mon–Fri 9AM–6PM',
  telehealthHours: 'Mon–Sun 9AM–8PM',
  providers: [],
}

describe('LocationCard', () => {
  it('renders clinic name', () => {
    render(<LocationCard location={mockLocation} />)
    expect(screen.getByText('Beverly Hills')).toBeInTheDocument()
  })

  it('renders address', () => {
    render(<LocationCard location={mockLocation} />)
    expect(screen.getByText(/8733 Beverly Blvd/)).toBeInTheDocument()
  })

  it('renders a link to the location page', () => {
    render(<LocationCard location={mockLocation} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/locations/beverly-hills')
  })

  it('highlights Saturday hours when present', () => {
    const downey: Location = { ...mockLocation, slug: 'downey', name: 'Downey', saturdayHours: 'Sat 8AM–4PM' }
    render(<LocationCard location={downey} />)
    expect(screen.getByText(/sat 8am/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- locations
```
Expected: FAIL — cannot find module `@/components/locations/LocationCard`

- [ ] **Step 3: Create `src/components/locations/LocationCard.tsx`**

```typescript
import Link from 'next/link'
import type { Location } from '@/types'

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-5 transition-shadow hover:shadow-md">
      <h3 className="font-heading mb-1 text-base font-bold text-teal-dark">{location.name}</h3>
      <p className="mb-1 text-sm text-brand-muted">{location.address}</p>
      <p className="mb-3 text-sm text-brand-muted">{location.city}, {location.state} {location.zip}</p>
      <div className="mb-4 space-y-1">
        <span className="inline-block rounded-full bg-teal-tint px-3 py-1 text-xs font-medium text-teal-mid">
          {location.officeHours}
        </span>
        {location.saturdayHours && (
          <span className="ml-2 inline-block rounded-full bg-coral/10 px-3 py-1 text-xs font-medium text-coral">
            {location.saturdayHours} ★
          </span>
        )}
      </div>
      <Link href={`/locations/${location.slug}`} className="text-sm font-semibold text-coral hover:underline">
        View Clinic →
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/app/locations/page.tsx`**

```typescript
import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import LocationCard from '@/components/locations/LocationCard'
import locations from '@/data/locations.json'
import type { Location } from '@/types'

export const metadata: Metadata = {
  title: 'Our 25 Clinic Locations',
  description: 'Find a Kids & Teens Medical Group clinic near you. 25 locations across Los Angeles including Beverly Hills, Santa Monica, Pasadena, and more.',
}

export default function LocationsPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">25 Locations</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Find a Clinic Near You</h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          We&apos;re across Los Angeles — from Santa Monica to Whittier, Beverly Hills to Northridge. All locations open Monday–Friday with telehealth available 7 days a week.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(locations as Location[]).map(loc => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create `src/app/locations/[slug]/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BookingCTA from '@/components/ui/BookingCTA'
import DoctorCard from '@/components/doctors/DoctorCard'
import locations from '@/data/locations.json'
import doctors from '@/data/doctors.json'
import type { Location, Doctor } from '@/types'

export function generateStaticParams() {
  return (locations as Location[]).map(loc => ({ slug: loc.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const location = (locations as Location[]).find(l => l.slug === params.slug)
  if (!location) return {}
  return {
    title: `${location.name} Pediatric Clinic`,
    description: `Kids & Teens Medical Group in ${location.name}. ${location.officeHours}. Board-certified pediatricians for children 0–21.`,
  }
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = (locations as Location[]).find(l => l.slug === params.slug)
  if (!location) notFound()

  const locationDoctors = (doctors as Doctor[]).filter(d => d.locations.includes(location.slug))
  const nearby = (locations as Location[]).filter(l => l.slug !== location.slug).slice(0, 3)

  // JSON-LD schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: `Kids & Teens Medical Group — ${location.name}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
    },
    openingHours: location.officeHours,
    telephone: '(818) 361-5437',
    url: `https://www.ktdoctor.com/locations/${location.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link href="/locations" className="mb-4 block text-sm text-white/60 hover:text-white">← All Locations</Link>
          <h1 className="font-heading text-4xl font-extrabold text-white">{location.name}</h1>
          <p className="mt-2 text-white/70">{location.address}, {location.city}, {location.state} {location.zip}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <BookingCTA label="Book Appointment" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {/* Hours */}
        <div className="mb-10 grid gap-4 rounded-xl border border-brand-border bg-white p-6 sm:grid-cols-2">
          <div>
            <h2 className="font-heading mb-2 text-sm font-bold uppercase tracking-wider text-brand-muted">Office Hours</h2>
            <p className="text-teal-dark font-semibold">{location.officeHours}</p>
            {location.saturdayHours && (
              <p className="mt-1 font-semibold text-coral">{location.saturdayHours} <span className="text-xs">(In-office walk-in)</span></p>
            )}
          </div>
          <div>
            <h2 className="font-heading mb-2 text-sm font-bold uppercase tracking-wider text-brand-muted">Telehealth Hours</h2>
            <p className="text-teal-dark font-semibold">{location.telehealthHours}</p>
          </div>
        </div>

        {/* Google Maps embed placeholder */}
        <div className="mb-10 flex h-56 items-center justify-center rounded-xl border border-brand-border bg-teal-tint text-brand-muted">
          <p className="text-sm">Google Maps embed — {location.address}, {location.city}</p>
        </div>

        {/* Doctors at this location */}
        {locationDoctors.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading mb-6 text-2xl font-extrabold text-teal-dark">Our Doctors at {location.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {locationDoctors.map(doc => <DoctorCard key={doc.slug} doctor={doc} />)}
            </div>
          </div>
        )}

        {/* Nearby clinics */}
        <div>
          <h2 className="font-heading mb-4 text-xl font-bold text-teal-dark">Nearby Clinics</h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map(loc => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`}
                    className="rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-teal-dark hover:bg-teal-tint">
                {loc.name} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 6: Run tests**

```bash
npm test -- locations
```
Expected: PASS — 4 assertions green.

- [ ] **Step 7: Build check**

```bash
npm run build
```
Expected: 25 location pages generated with no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add /locations grid and /locations/[slug] pages for all 25 clinics"
```

---

### Task 7: Doctor Pages

**Files:**
- Create: `src/app/doctors/page.tsx` (client component for filtering)
- Create: `src/app/doctors/[slug]/page.tsx`
- Create: `src/__tests__/app/doctors.test.tsx`

**Interfaces:**
- Consumes: `doctors.json`, `locations.json`, `Doctor` type, `Location` type
- `doctors/page.tsx` is `'use client'` for location filter dropdown + credential filter
- Each doctor page has `Physician` JSON-LD schema

- [ ] **Step 1: Write failing test**

Create `src/__tests__/app/doctors.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import DoctorCard from '@/components/doctors/DoctorCard'
import type { Doctor } from '@/types'

const mockDoctor: Doctor = {
  slug: 'janesri-de-silva',
  name: 'Dr. Janesri De Silva',
  credentials: 'MD, FAAP',
  locations: ['la-canada-flintridge'],
}

describe('DoctorCard', () => {
  it('renders doctor name', () => {
    render(<DoctorCard doctor={mockDoctor} />)
    expect(screen.getByText('Dr. Janesri De Silva')).toBeInTheDocument()
  })

  it('renders credentials', () => {
    render(<DoctorCard doctor={mockDoctor} />)
    expect(screen.getByText('MD, FAAP')).toBeInTheDocument()
  })

  it('links to the doctor profile page', () => {
    render(<DoctorCard doctor={mockDoctor} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/doctors/janesri-de-silva')
  })
})
```

- [ ] **Step 2: Run test — verify it passes (DoctorCard already built in Task 5)**

```bash
npm test -- doctors
```
Expected: PASS — DoctorCard was built in Task 5.

- [ ] **Step 3: Create `src/app/doctors/page.tsx`**

```typescript
'use client'
import { useState, useMemo } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import DoctorCard from '@/components/doctors/DoctorCard'
import doctors from '@/data/doctors.json'
import locations from '@/data/locations.json'
import type { Doctor, Location } from '@/types'

export default function DoctorsPage() {
  const [locationFilter, setLocationFilter] = useState('')
  const [credFilter, setCredFilter]         = useState('')

  const filtered = useMemo(() => {
    return (doctors as Doctor[]).filter(doc => {
      const matchLoc  = !locationFilter || doc.locations.includes(locationFilter)
      const matchCred = !credFilter     || doc.credentials.toLowerCase().includes(credFilter.toLowerCase())
      return matchLoc && matchCred
    })
  }, [locationFilter, credFilter])

  const credOptions = ['MD', 'FAAP', 'PA', 'NP', 'PNP']

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Our Team</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Our Pediatricians</h1>
        <p className="mb-8 max-w-xl text-sm text-brand-muted">
          50+ board-certified doctors and nurse practitioners across 25 LA locations.
        </p>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="rounded-lg border border-brand-border px-4 py-2 text-sm text-brand-text"
          >
            <option value="">All Locations</option>
            {(locations as Location[]).map(loc => (
              <option key={loc.slug} value={loc.slug}>{loc.name}</option>
            ))}
          </select>
          <select
            value={credFilter}
            onChange={e => setCredFilter(e.target.value)}
            className="rounded-lg border border-brand-border px-4 py-2 text-sm text-brand-text"
          >
            <option value="">All Credentials</option>
            {credOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <p className="mb-6 text-sm text-brand-muted">{filtered.length} provider{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map(doc => <DoctorCard key={doc.slug} doctor={doc} />)}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/app/doctors/[slug]/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BookingCTA from '@/components/ui/BookingCTA'
import LocationCard from '@/components/locations/LocationCard'
import doctors from '@/data/doctors.json'
import locations from '@/data/locations.json'
import type { Doctor, Location } from '@/types'

export function generateStaticParams() {
  return (doctors as Doctor[]).map(doc => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doctor = (doctors as Doctor[]).find(d => d.slug === params.slug)
  if (!doctor) return {}
  return {
    title: `${doctor.name}, ${doctor.credentials}`,
    description: `${doctor.name} (${doctor.credentials}) — Kids & Teens Medical Group pediatrician in Los Angeles.`,
  }
}

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const doctor = (doctors as Doctor[]).find(d => d.slug === params.slug)
  if (!doctor) notFound()

  const doctorLocations = (locations as Location[]).filter(l => doctor.locations.includes(l.slug))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    medicalSpecialty: 'Pediatrics',
    worksFor: { '@type': 'MedicalOrganization', name: 'Kids & Teens Medical Group' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center gap-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-tint text-4xl">
            👨‍⚕️
          </div>
          <div>
            <Link href="/doctors" className="mb-2 block text-sm text-white/60 hover:text-white">← All Doctors</Link>
            <h1 className="font-heading text-3xl font-extrabold text-white">{doctor.name}</h1>
            <p className="mt-1 text-white/70">{doctor.credentials}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <BookingCTA label={`Book with ${doctor.name.split(' ').pop()}`} />

        {doctorLocations.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading mb-5 text-xl font-bold text-teal-dark">Clinic Locations</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {doctorLocations.map(loc => <LocationCard key={loc.slug} location={loc} />)}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 5: Build check**

```bash
npm run build
```
Expected: 55+ doctor pages generated statically with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add /doctors directory with filtering and /doctors/[slug] profile pages"
```

---

### Task 8: About Us Page

**Files:**
- Create: `src/app/about-us/page.tsx`

**Interfaces:**
- No new components — uses `SectionLabel`, `BookingCTA`, `Button` from Task 3

- [ ] **Step 1: Create `src/app/about-us/page.tsx`**

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Kids & Teens Medical Group — 18 years caring for LA families. 25 clinics, 50+ board-certified pediatricians. Operating in Los Angeles, Sri Lanka, and Mexico.",
}

const partners = [
  "Children's Hospital LA", 'Cedar Sinai', 'LA Care', 'Optum', 'Molina Healthcare', 'Regal Medical Group',
]

const globalLocations = [
  { region: 'Los Angeles, CA', desc: 'Headquarters — 25 clinics across LA County and Ventura County.' },
  { region: 'Sri Lanka',       desc: 'Expanding quality pediatric care to South Asia.' },
  { region: 'Mexico',          desc: 'Bringing trusted pediatric services to Mexican communities.' },
]

export default function AboutUsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-teal-dark px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-[#7dd3e8]">About Us</SectionLabel>
          <h1 className="font-heading text-5xl font-extrabold text-white">
            Caring for the Future Generations<br />in Greater Los Angeles
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            For 18 years, Kids & Teens Medical Group has been Southern California&apos;s most trusted name in pediatric care — with 25 clinics, 50+ board-certified doctors, and a commitment to every child, every stage.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { n: '25',   l: 'Clinics in LA'        },
            { n: '50+',  l: 'Board-Certified Doctors'},
            { n: '18',   l: 'Years of Excellence'   },
            { n: '0–21', l: 'Ages Served'           },
          ].map(s => (
            <div key={s.l} className="rounded-xl border border-brand-border bg-white p-6 text-center">
              <span className="font-heading block text-4xl font-extrabold text-teal-dark">{s.n}</span>
              <span className="mt-1 block text-sm text-brand-muted">{s.l}</span>
            </div>
          ))}
        </div>

        {/* Our story */}
        <div className="mb-16 grid gap-10 md:grid-cols-2">
          <div>
            <SectionLabel className="mb-3">Our Story</SectionLabel>
            <h2 className="font-heading mb-5 text-3xl font-extrabold text-teal-dark">18 Years of Excellence</h2>
            <p className="mb-4 text-sm leading-relaxed text-brand-muted">
              Kids & Teens Medical Group is the leading provider of pediatric care with extended hours in Southern California. We are focused on changing the way you think about children&apos;s health — combining compassionate, board-certified care with the convenience of 25 locations and telehealth available seven days a week.
            </p>
            <p className="text-sm leading-relaxed text-brand-muted">
              We offer a full range of services: routine check-ups, immunizations, allergies, ADHD management, urgent care, prenatal consultations, and after-hours care — all under one trusted name.
            </p>
          </div>
          <div className="flex h-64 items-center justify-center rounded-2xl bg-teal-tint text-brand-muted">
            <p className="text-sm">Team photo placeholder</p>
          </div>
        </div>

        {/* Global footprint */}
        <div className="mb-16">
          <SectionLabel className="mb-3">Global Footprint</SectionLabel>
          <h2 className="font-heading mb-6 text-3xl font-extrabold text-teal-dark">Caring Beyond Los Angeles</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {globalLocations.map(g => (
              <div key={g.region} className="rounded-xl border border-brand-border bg-white p-6">
                <h3 className="font-heading mb-2 text-base font-bold text-teal-dark">📍 {g.region}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <SectionLabel className="mb-3">Our Partners</SectionLabel>
          <h2 className="font-heading mb-6 text-2xl font-extrabold text-teal-dark">Trusted Medical Partners</h2>
          <div className="flex flex-wrap gap-3">
            {partners.map(p => (
              <span key={p} className="rounded-lg border border-brand-border bg-white px-5 py-2.5 text-sm font-semibold text-brand-muted">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-teal-dark p-10 text-center">
          <h2 className="font-heading mb-3 text-2xl font-extrabold text-white">Ready to find your pediatrician?</h2>
          <p className="mb-6 text-sm text-white/70">25 clinics across LA. Same-day appointments available.</p>
          <div className="flex justify-center gap-4">
            <BookingCTA label="Book Appointment" />
            <Link href="/locations" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20">
              Find a Clinic
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Build check**

```bash
npm run build
```
Expected: /about-us page builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add About Us page with mission, stats, global footprint (LA + Sri Lanka + Mexico), and partners"
```

---

### Task 9: Services Pages

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/app/services/primary-care/page.tsx`
- Create: `src/app/services/telehealth/page.tsx`
- Create: `src/app/services/urgent-care/page.tsx`
- Create: `src/app/services/after-hours-care/page.tsx`
- Create: `src/app/services/prenatal-consultation/page.tsx`
- Create: `src/app/services/specialized-care/page.tsx`

**Interfaces:**
- Consumes: `services.json`, `Service` type, `BookingCTA`, `SectionLabel`
- Each page exports `metadata` with service-specific title and description

- [ ] **Step 1: Create `src/app/services/page.tsx`**

```typescript
import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'
import services from '@/data/services.json'
import type { Service } from '@/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pediatric Services',
  description: 'Kids & Teens Medical Group offers primary care, telehealth, urgent care, after-hours care, prenatal consultations, and specialized care for children 0–21.',
}

export default function ServicesPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Comprehensive Care</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Our Pediatric Services</h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          From routine well-child visits to urgent care and telehealth — we have everything your child needs, when they need it.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(services as Service[]).map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`}
                  className="group rounded-xl border border-brand-border bg-white p-7 transition-shadow hover:shadow-md">
              <div className="mb-4 text-3xl">{s.icon}</div>
              <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark group-hover:text-teal-mid">{s.name}</h2>
              {s.hours && <p className="mb-2 text-xs font-medium text-teal-mid">{s.hours}</p>}
              <p className="text-sm leading-relaxed text-brand-muted">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/app/services/primary-care/page.tsx`**

```typescript
import type { Metadata } from 'next'
import BookingCTA from '@/components/ui/BookingCTA'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Primary Care for Children',
  description: 'Kids & Teens Medical Group primary care clinics across Los Angeles. Serving children ages 0–21 with routine check-ups, immunizations, and same-day appointments.',
}

export default function PrimaryCarePage() {
  return (
    <>
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-[#7dd3e8]">Primary Care</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold text-white">Primary Care Across Los Angeles</h1>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Routine check-ups, immunizations, and ongoing wellness care for children ages 0–21. Walk-in and same-day appointments available at 25 locations.
          </p>
          <div className="mt-6 flex gap-4">
            <BookingCTA label="Book Now" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Well-Child Visits',       desc: 'Regular check-ups from newborn through adolescence, tracking growth and development milestones.'      },
            { title: 'Immunizations',            desc: 'Full pediatric vaccination schedule following AAP guidelines, with easy scheduling and records.'         },
            { title: 'Same-Day Appointments',   desc: 'Walk-in or call to book same-day — available at all 25 locations, Monday through Friday.'             },
            { title: 'Ages 0–21',               desc: 'We care for patients from newborns through young adults, ensuring continuity of care across every stage.'},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-teal-tint p-6">
          <p className="text-sm font-medium text-teal-dark">Office Hours: Mon–Fri 9AM–6PM · Telehealth: Mon–Sun 9AM–8PM</p>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Create remaining 5 service pages**

Use the same pattern as `primary-care/page.tsx`. For each page:

**`src/app/services/telehealth/page.tsx`** — metadata title: "Telehealth for Children", hours: Mon–Sun 9AM–8PM. Key points: Convenience, Quick Access, Flexible Scheduling, Continuity of Care. Note: also available in Spanish — text (818) 423-5637.

**`src/app/services/urgent-care/page.tsx`** — metadata title: "Pediatric Urgent Care LA". Key points: Immediate care, Less waiting, No ER needed, Ages 0–21. CTA links to `HEALOW_URL` (not broken `#urgentcare` anchor — that was the bug on the old site).

**`src/app/services/after-hours-care/page.tsx`** — metadata title: "After-Hours Pediatric Care". Link out to `https://pediatricafterhour.com/contact-us/` as the booking destination for after-hours.

**`src/app/services/prenatal-consultation/page.tsx`** — metadata title: "Prenatal Consultation". Key: meet your pediatrician before baby arrives, coordinate with partner hospitals.

**`src/app/services/specialized-care/page.tsx`** — metadata title: "Specialized Pediatric Care". Key services: ADHD evaluation & management, allergy care, sports physicals, adolescent health.

Each follows the same component structure: dark teal hero + h1 + description + BookingCTA, then a grid of 4 feature cards below.

- [ ] **Step 4: Build check**

```bash
npm run build
```
Expected: all 7 service pages build with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add /services landing and 6 individual service pages"
```

---

### Task 10: Patient Resources and Insurance Pages

**Files:**
- Create: `src/app/patient-resources/page.tsx`
- Create: `src/app/insurance/page.tsx`

- [ ] **Step 1: Create `src/app/patient-resources/page.tsx`**

```typescript
import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { PORTAL_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Patient Resources',
  description: 'Vaccine schedules, developmental milestone guides, sports letters, patient forms, and educational resources from Kids & Teens Medical Group.',
}

const resources = [
  {
    title: 'Immunization Schedule',
    desc: 'AAP-recommended vaccine schedule for children from birth through 18 years.',
    action: 'Download PDF',
    href: '/resources/immunization-schedule.pdf',
  },
  {
    title: 'Sports Policy Letter',
    desc: 'Required letter for school or athletic participation. Download and bring to your next visit.',
    action: 'Download PDF',
    href: '/resources/sports-policy-letter.pdf',
  },
  {
    title: 'Patient Forms / Refills / Labs',
    desc: 'Access and submit patient forms, request prescription refills, and view lab results.',
    action: 'Go to Portal',
    href: PORTAL_URL,
    external: true,
  },
]

const milestones = [
  { age: '2 Months',  href: '/resources/milestones-2mo.pdf'  },
  { age: '4 Months',  href: '/resources/milestones-4mo.pdf'  },
  { age: '6 Months',  href: '/resources/milestones-6mo.pdf'  },  // previously broken — upload PDF before launch
  { age: '12 Months', href: '/resources/milestones-12mo.pdf' },
  { age: '18 Months', href: '/resources/milestones-18mo.pdf' },  // previously broken — upload PDF before launch
  { age: '24 Months', href: '/resources/milestones-24mo.pdf' },
]

export default function PatientResourcesPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Patient Resources</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Resources for Your Family</h1>
        <p className="mb-12 max-w-xl text-sm leading-relaxed text-brand-muted">
          Everything you need to support your child&apos;s health journey — from vaccination schedules to developmental milestones.
        </p>

        {/* Main resources */}
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {resources.map(r => (
            <div key={r.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{r.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-brand-muted">{r.desc}</p>
              <a href={r.href}
                 target={r.external ? '_blank' : undefined}
                 rel={r.external ? 'noopener noreferrer' : undefined}
                 className="text-sm font-semibold text-coral hover:underline">
                {r.action} →
              </a>
            </div>
          ))}
        </div>

        {/* Developmental milestones */}
        <div>
          <h2 className="font-heading mb-5 text-2xl font-bold text-teal-dark">Developmental Milestone Guides</h2>
          <p className="mb-6 text-sm text-brand-muted">
            Download age-specific guides to track your child&apos;s growth and development.
            <strong className="text-coral"> Note:</strong> Upload 6-month and 18-month PDFs before launch — those links were broken on the previous site.
          </p>
          <div className="flex flex-wrap gap-3">
            {milestones.map(m => (
              <a key={m.age} href={m.href}
                 className="rounded-lg border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-teal-dark hover:bg-teal-tint">
                📄 {m.age}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/app/insurance/page.tsx`**

```typescript
import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'
import { EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Insurance Accepted',
  description: 'Kids & Teens Medical Group accepts all insurance including HMO, PPO, Medi-Cal, and commercial plans. Same-day IPA transfers available.',
}

const insurancePartners = [
  'Regal Medical Group', 'Lakeside', 'Health Care Partners', 'Eastland',
  'LA Care', 'Optum', 'Molina Healthcare', 'Blue Cross', 'Cedar Sinai', 'CHLA',
]

export default function InsurancePage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Insurance</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">We Accept All Insurance</h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          Including HMO, PPO, Medi-Cal, and most commercial plans. No insurance? Ask us about affordable payment options.
        </p>

        {/* Partners grid */}
        <div className="mb-10 flex flex-wrap gap-3">
          {insurancePartners.map(p => (
            <span key={p} className="rounded-lg border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-muted">
              {p}
            </span>
          ))}
        </div>

        {/* IPA transfer */}
        <div className="mb-10 rounded-xl border border-brand-border bg-teal-tint p-6">
          <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Same-Day IPA Transfer</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Need to switch your insurance to KTMG? We can process a same-day IPA (Independent Physician Association) transfer so you can start seeing our doctors immediately.
          </p>
          <a href={`mailto:${EMAIL}`} className="mt-4 inline-block text-sm font-semibold text-coral hover:underline">
            Email us to start a transfer →
          </a>
        </div>

        {/* Serendib callout */}
        <div className="mb-10 rounded-xl border border-brand-border bg-white p-6">
          <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">SoCal&apos;s Best Kept Secret — Serendib Healthways</h2>
          <p className="mb-4 text-sm leading-relaxed text-brand-muted">
            No doctor restrictions. Serendib Healthways offers flexible health coverage that lets you see any KTMG doctor without referrals or network limitations.
          </p>
          <a href="https://www.serendibhealthways.com/" target="_blank" rel="noopener noreferrer"
             className="text-sm font-semibold text-coral hover:underline">
            Check Eligibility at Serendib Healthways →
          </a>
        </div>

        <BookingCTA label="Book an Appointment" />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Build check and commit**

```bash
npm run build
git add -A
git commit -m "feat: add Patient Resources and Insurance pages with all bug fixes from current site"
```

---

### Task 11: Careers Page (3-Tab: LA · Sri Lanka · Mexico)

**Files:**
- Create: `src/app/careers/page.tsx` (`'use client'` for tab state)

- [ ] **Step 1: Create `src/app/careers/page.tsx`**

```typescript
'use client'
import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

type Tab = 'los-angeles' | 'sri-lanka' | 'mexico'

const tabs: { id: Tab; label: string }[] = [
  { id: 'los-angeles', label: 'Los Angeles' },
  { id: 'sri-lanka',   label: 'Sri Lanka'   },
  { id: 'mexico',      label: 'Mexico'      },
]

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('los-angeles')
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', position: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Form submission: integrate with email service or backend before launch
    alert('Thank you! We will be in touch shortly.')
  }

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionLabel className="mb-2">Careers</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Build the Career You Want at Kids & Teens</h1>
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-brand-muted">
          With 18 years of excellence, Kids & Teens offers a respected, supportive environment. Our patient-centric approach fosters a nurturing space for healthcare providers and families across three regions.
        </p>

        {/* Employer brands */}
        <div className="mb-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-brand-border bg-white px-4 py-2 text-xs font-semibold text-teal-dark">Kids & Teens Medical Group</span>
          <span className="rounded-full border border-brand-border bg-white px-4 py-2 text-xs font-semibold text-teal-dark">St. Gianna Medical Group</span>
        </div>

        {/* Region tabs */}
        <div className="mb-8 flex gap-2 border-b border-brand-border">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-coral text-coral'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mb-10 rounded-xl border border-brand-border bg-white p-6">
          {activeTab === 'los-angeles' && (
            <div>
              <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Los Angeles Positions</h2>
              <p className="mb-4 text-sm text-brand-muted">We are actively recruiting across all 25 LA-area clinics. Positions include pediatricians, nurse practitioners, physician assistants, and administrative staff.</p>
              <p className="text-sm text-brand-muted">View open positions and apply at <a href="https://www.indeed.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-coral">Indeed</a> or through our social media pages.</p>
            </div>
          )}
          {activeTab === 'sri-lanka' && (
            <div>
              <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Sri Lanka Positions</h2>
              <p className="text-sm text-brand-muted">Kids & Teens Medical Group operates in Sri Lanka, expanding quality pediatric care to South Asia. We are recruiting qualified healthcare professionals who share our mission of compassionate, comprehensive care.</p>
            </div>
          )}
          {activeTab === 'mexico' && (
            <div>
              <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Mexico Positions</h2>
              <p className="text-sm text-brand-muted">Our Mexico operations bring trusted pediatric services to Mexican communities. We welcome experienced pediatric healthcare providers who are passionate about serving families.</p>
            </div>
          )}
        </div>

        {/* Application form */}
        <div className="rounded-xl border border-brand-border bg-teal-tint p-8">
          <h2 className="font-heading mb-6 text-xl font-bold text-teal-dark">Apply Now</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-brand-text">First Name *</label>
              <input required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                     className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-mid" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-brand-text">Last Name *</label>
              <input required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                     className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-mid" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-brand-text">Phone *</label>
              <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                     className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-mid" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-brand-text">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                     className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-mid" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-brand-text">Position Applying For *</label>
              <input required value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                     placeholder="e.g. Pediatrician, NP, Front Desk"
                     className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-mid" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-brand-text">CV / Resume</label>
              <input type="file" accept=".pdf,.doc,.docx"
                     className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="rounded-lg bg-coral px-8 py-3 text-sm font-bold text-white hover:opacity-90">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Build check and commit**

```bash
npm run build
git add -A
git commit -m "feat: add Careers page with LA/Sri Lanka/Mexico tabs and application form"
```

---

### Task 12: Testimonials, Blog, and Redirects

**Files:**
- Create: `src/app/share-your-experience/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Modify: `next.config.ts` — add 301 redirect from `/testimonials`

- [ ] **Step 1: Add redirect in `next.config.ts`**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/testimonials',
        destination: '/share-your-experience',
        permanent: true,
      },
      {
        source: '/parent-resources',
        destination: '/patient-resources',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

- [ ] **Step 2: Create `src/app/share-your-experience/page.tsx`**

```typescript
import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import testimonials from '@/data/testimonials.json'
import type { Testimonial } from '@/types'

export const metadata: Metadata = {
  title: 'Share Your Experience',
  description: 'Read what LA families say about Kids & Teens Medical Group. Share your own experience on Google or Yelp.',
}

export default function ShareExperiencePage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Reviews</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Share Your Experience</h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          We love hearing from our families. Read what other parents say, and share your own experience on Google or Yelp.
        </p>

        {/* Review CTAs */}
        <div className="mb-12 flex gap-4">
          <a href="https://www.google.com/search?q=Kids+and+Teens+Medical+Group" target="_blank" rel="noopener noreferrer"
             className="rounded-lg border-2 border-teal-dark px-6 py-3 text-sm font-bold text-teal-dark hover:bg-teal-tint">
            Leave a Google Review →
          </a>
          <a href="https://www.yelp.com/search?find_desc=Kids+Teens+Medical+Group" target="_blank" rel="noopener noreferrer"
             className="rounded-lg border-2 border-brand-border px-6 py-3 text-sm font-bold text-brand-muted hover:bg-brand-bg">
            Leave a Yelp Review →
          </a>
        </div>

        {/* Curated testimonials */}
        <div className="grid gap-5 md:grid-cols-3">
          {(testimonials as Testimonial[]).map(t => (
            <div key={t.id} className="rounded-xl border border-brand-border bg-white p-6">
              <div className="mb-3 text-yellow-400">{'★'.repeat(t.rating)}</div>
              <p className="mb-5 text-sm italic leading-relaxed text-brand-text">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-teal-dark">{t.author}</p>
              <p className="text-xs text-brand-muted">{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/app/blog/page.tsx`**

```typescript
import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Health News & Stories',
  description: 'Pediatric health tips, news, and featured stories from Kids & Teens Medical Group.',
}

export default function BlogPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Blog</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Health News & Stories</h1>
        <p className="text-sm text-brand-muted">
          Articles and updates coming soon. Add blog posts as MDX files in <code>/src/content/blog/</code>.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Build check**

```bash
npm run build
```
Expected: `/share-your-experience`, `/blog`, redirect from `/testimonials` all work.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add testimonials, blog pages, and 301 redirect from /testimonials to /share-your-experience"
```

---

### Task 13: SEO — Metadata, Sitemap, and Final Build

**Files:**
- Create: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx` — add `openGraph` and `twitter` metadata
- Verify: all pages have `metadata` exports

**Interfaces:**
- Produces: `/sitemap.xml` auto-generated at build time with all 25 location pages, 55+ doctor pages, and all static pages

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from 'next'
import locations from '@/data/locations.json'
import doctors from '@/data/doctors.json'
import type { Location, Doctor } from '@/types'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.ktdoctor.com'

  const staticPages = [
    '/', '/about-us', '/services', '/locations', '/doctors',
    '/patient-resources', '/insurance', '/careers', '/blog', '/share-your-experience',
    '/services/primary-care', '/services/telehealth', '/services/urgent-care',
    '/services/after-hours-care', '/services/prenatal-consultation', '/services/specialized-care',
  ].map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.8 }))

  const locationPages = (locations as Location[]).map(loc => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const doctorPages = (doctors as Doctor[]).map(doc => ({
    url: `${base}/doctors/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...locationPages, ...doctorPages]
}
```

- [ ] **Step 2: Add OpenGraph metadata to root layout**

In `src/app/layout.tsx`, update the `metadata` export:
```typescript
export const metadata: Metadata = {
  title: {
    default: 'Kids & Teens Medical Group | Pediatric Care Los Angeles',
    template: '%s | Kids & Teens Medical Group',
  },
  description: "LA's largest pediatric network. 25 clinics, 50+ board-certified doctors, same-day appointments. Serving children ages 0–21.",
  openGraph: {
    type: 'website',
    siteName: 'Kids & Teens Medical Group',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KTDoctorGroup',
  },
  metadataBase: new URL('https://www.ktdoctor.com'),
}
```

- [ ] **Step 3: Final build and test run**

```bash
npm test
npm run build
```
Expected: all tests pass, full build succeeds, sitemap.xml visible at `/.next/server/app/sitemap.xml`.

- [ ] **Step 4: Verify key routes in dev**

```bash
npm run dev
```
Check these URLs in browser:
- `http://localhost:3000` — homepage all 7 sections
- `http://localhost:3000/locations/beverly-hills` — Beverly Hills clinic page
- `http://localhost:3000/locations/downey` — Downey shows Saturday hours highlighted
- `http://localhost:3000/doctors` — doctor directory with filter dropdowns
- `http://localhost:3000/about-us` — global footprint section visible
- `http://localhost:3000/careers` — 3 tabs: LA, Sri Lanka, Mexico
- `http://localhost:3000/testimonials` — redirects to /share-your-experience
- `http://localhost:3000/sitemap.xml` — all pages listed

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: add sitemap, OpenGraph metadata — full site complete"
```

---

## Pre-Launch Checklist

Before going live, complete these items not covered by the code tasks:

- [ ] Confirm exact Healow booking URL with KTMG and update `HEALOW_URL` in `src/lib/constants.ts`
- [ ] Replace all photo placeholders (`👨‍👩‍👧‍👦`, `👨‍⚕️` etc.) with real photography from KTMG
- [ ] Upload missing PDFs: `milestones-6mo.pdf` and `milestones-18mo.pdf` to `/public/resources/`
- [ ] Confirm Beverly Hills clinic display name (currently "Beverly Hills" — postal is "West Hollywood")
- [ ] Complete doctors.json to 55+ entries using site audit at `D:\Pet Projects\KTMG-Redesign\ktdoctor-site-audit.html`
- [ ] Wire up careers form to email service (Formspree, Resend, or SendGrid)
- [ ] Add Google Maps embed `src` URLs to each location in `locations.json`
- [ ] Set `metadataBase` in layout.tsx to production domain once confirmed
- [ ] DNS and deployment setup (Vercel recommended for Next.js)
