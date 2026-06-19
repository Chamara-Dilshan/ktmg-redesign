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

