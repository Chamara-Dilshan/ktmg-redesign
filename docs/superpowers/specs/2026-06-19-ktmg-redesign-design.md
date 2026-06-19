# KTMG Website Redesign — Design Spec
**Date:** 2026-06-19  
**Project:** Kids & Teens Medical Group (ktdoctor.com) full site redesign  
**Tech Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS  
**Content:** JSON data files for MVP; Sanity CMS as optional Phase 2 upgrade  
**Author:** Chamara Dilshan / Claude

---

## 1. Goals & Priority

| Priority | Goal | Measure |
|---|---|---|
| 1 | **Patient acquisition** | New families find the site and book via Healow |
| 2 | **Trust & credibility** | Site conveys KTMG's scale and 18-year track record |
| 3 | **Patient self-service** | Existing patients find resources, hours, doctors easily |

---

## 2. Target Audience

- **Primary:** Parents of young children (ages 0–12) looking for a trusted pediatrician in LA
- **Secondary:** Parents of teens (ages 13–21) seeking adolescent care, ADHD, sports physicals
- Decision-maker is the parent; the site must build emotional trust first, then convert

---

## 3. Brand & Visual Design

### Color Palette
| Role | Name | Hex |
|---|---|---|
| Primary (dark) | Deep teal | `#073f49` |
| Secondary | Mid teal | `#047391` |
| CTA / Accent | Warm coral | `#E8612C` |
| Background | Off-white | `#F8FAFB` |
| Surface | White | `#FFFFFF` |
| Text | Near-black | `#1A1A2E` |
| Muted text | Gray | `#6B7280` |
| Border | Light | `#E0EAED` |
| Light teal bg | Tint | `#E8F4F7` |

### Typography
- **Headings:** Poppins (700, 800 weights) — already used on current site
- **Body:** Roboto (400, 500) — already used on current site
- Load via `next/font/google` for performance

### Logo
- Use existing SVG: `/wp-content/uploads/2023/07/Kids-and-teen-pediatric-Clinic-logo-2023.svg`
- Download and commit to `/public/logo.svg` during build

### Design Direction
"Warm Family-First" — warm enough to feel caring, clean enough to feel credible. Generous whitespace, real photography (not stock), rounded cards, coral CTAs on dark teal backgrounds.

---

## 4. Site Architecture

```
/ ................................. Homepage
/about-us ......................... About Us (mission, history, global footprint)
/services ......................... Services overview landing
  /services/primary-care
  /services/telehealth
  /services/urgent-care
  /services/after-hours-care
  /services/prenatal-consultation
  /services/specialized-care
/locations ........................ All 25 clinics map + grid
  /locations/[slug] ............... Individual clinic page (25 pages)
/doctors .......................... Provider directory (filter by location/specialty)
  /doctors/[slug] ................. Individual provider profile (55+ pages)
/patient-resources ................ Vaccine schedule, forms, milestones, FAQs
/insurance ........................ Insurance accepted + Serendib Healthways
/careers .......................... Job listings (tabs: Los Angeles · Sri Lanka · Mexico)
/blog ............................. News & featured stories
  /blog/[slug]
/share-your-experience ............ Testimonials (fixes 404 at /testimonials/)
```

**Routing rules:**
- `/testimonials` → 301 redirect to `/share-your-experience`
- All pages statically generated at build time (ISR for blog/careers)

---

## 5. Navigation

### Top utility bar (above main nav)
```
Text (ENG): (626) 298-7121  |  Call: (818) 361-5437  |  customerservice@ktdoctor.com
```
Right side: `Appointments (Healow)` · `Pay Online` · `Portal Login` · `Find a Location`

### Primary navigation (sticky, dark teal `#073f49`)
```
[Logo]    Services ▾    Find a Clinic    Our Doctors    About Us    Patient Resources    [Book Appointment →]
```
- "Book Appointment" is always coral, always links to Healow
- Services dropdown: Primary Care · Telehealth · Urgent Care · After-Hours · Prenatal · Specialized
- Mobile: hamburger menu with same items

---

## 6. Homepage Sections (in order)

1. **Urgency bar** — "25 clinics across LA · Same-day appointments available" + phone CTA
2. **Nav** — sticky, see §5
3. **Hero** — Full-bleed split layout: headline left, real family photo right
   - Headline: "Compassionate Care for Every Child, Every Stage"
   - Sub: "25 clinics across Los Angeles. Board-certified pediatricians. Extended hours, same-day appointments, and telehealth — all under one trusted name."
   - CTAs: `Book Appointment →` (coral) + `Find a Clinic Near You` (ghost)
   - Badge: "★ LA's Largest Pediatric Network"
4. **Stats bar** — 25 Clinics · 50+ Doctors · 18 Years · Ages 0–21
5. **Services** — 6 cards (Primary Care, Telehealth, Urgent Care, After-Hours, Prenatal, Specialized), each with "Book now →" linking to Healow
6. **Find a Clinic** — dark teal section, zip/neighborhood search + interactive map + 3 nearest results
7. **Our Doctors** — 4 preview cards + "View All Doctors" link to /doctors
8. **Testimonials** — 3 parent review cards with stars, quote, name, location
9. **Insurance** — "We accept all insurance" + partner logos
10. **Footer** — see §10

---

## 7. Location Pages (`/locations/[slug]`)

Each of the 25 clinic pages contains:
- Clinic name + neighborhood heading
- Full address, office hours, telehealth hours
- Google Maps embed
- "Book Appointment" CTA → Healow
- Providers at this location (cards linking to /doctors/[slug])
- Nearby clinics (2–3 suggestions)

**Special cases:**
- Downey: highlight Saturday 8AM–4PM hours (only location with Saturday walk-in)
- Hollywood: hours are 8:30AM–5PM (differs from standard 9AM–6PM)
- Beverly Hills: address (8733 Beverly Blvd, West Hollywood CA 90048) straddles the border — **decision needed:** display as "Beverly Hills" (brand recognition) or "West Hollywood" (postal accuracy). Default: keep "Beverly Hills" unless legal requires otherwise.

**Data source:** JSON file at `/src/data/locations.json` (25 entries, each with slug, name, address, hours, providers[])

---

## 8. Doctor Profiles (`/doctors/[slug]`)

Each provider card shows:
- Name, credentials (MD, FAAP, PA-C, NP, PNP, etc.)
- Location(s)
- Photo placeholder (or actual photo if available)
- "Book with [Name]" → Healow

Provider directory (`/doctors`) supports filtering by:
- Location (dropdown of 25 clinics)
- Credential type

**Data source:** `/src/data/doctors.json` (55+ entries)

---

## 9. About Us Page

Sections:
1. **Mission statement** — "Caring for the Future Generations in Greater Los Angeles"
2. **Our story** — 18 years of excellence, founded in Southern California
3. **By the numbers** — 25 clinics · 50+ doctors · 18 years · Ages 0–21
4. **Global footprint** — KTMG operates in Los Angeles, Sri Lanka, and Mexico (currently hidden from all non-careers pages — surface here)
5. **Our team** — Link to /doctors
6. **Partners** — Children's Hospital LA, Cedar Sinai, LA Care, Optum, Molina, Regal

---

## 10. Careers Page

Three tabs: **Los Angeles** · **Sri Lanka** · **Mexico**

Each tab shows:
- Open positions (role, location, type)
- Application form: First Name, Last Name, Phone, Email, Position, CV upload
- Employer brand: Kids & Teens Medical Group + St. Gianna Medical Group (for family practice roles)

---

## 11. Patient Resources Page

Sections:
- Vaccine / Immunization Schedule (downloadable PDF)
- Sports Policy Letter (downloadable PDF)
- Developmental Milestone Guides: 2mo, 4mo, 6mo, 12mo, 18mo, 24mo (fix broken 6mo and 18mo links)
- Patient Forms / Refills / Labs → link to portal
- Educational videos

---

## 12. Insurance Page

- "We accept all insurance" headline
- HMO, PPO, Medi-Cal, commercial plans accepted
- Insurance logos: Regal Medical Group · Lakeside · Health Care Partners · Eastland · LA Care · Optum · Molina Healthcare · Blue Cross · Cedar Sinai · CHLA
- Same-day IPA transfer service
- Serendib Healthways callout (no doctor restrictions) → serendibhealthways.com
- Fix `milto:` email typo → `mailto:customerservice@ktdoctor.com`

---

## 13. Content Management

**MVP:** Static JSON files in `/src/data/`:
- `locations.json` — 25 entries (slug, name, address, hours, coords, providers[])
- `doctors.json` — 55+ entries (slug, name, credentials, locations[], photo)
- `services.json` — 6 entries
- `testimonials.json` — curated reviews

**Phase 2 (optional):** Migrate to Sanity CMS so non-developers can update location pages, doctor profiles, and blog posts without touching code. Schemas map 1:1 to the JSON structure above.

**Photography:** Real family/patient photos are required for the hero and doctor cards. Placeholder silhouettes used during development — production photos to be provided by KTMG team before launch.

---

## 14. Key Bug Fixes vs. Current Site

| Bug | Fix |
|---|---|
| Footer email `contact@mysite.com` | Replace with `customerservice@ktdoctor.com` |
| Camarillo page says "San Pedro office" | Write correct Camarillo copy |
| Tarzana page says "Beverly Hills on La Cienega" | Write correct Tarzana copy |
| Santa Monica page says "Santa Monica Blvd" | Fix to "Lincoln Blvd" |
| Urgent Care CTA links to broken `#urgentcare` | Link to Healow |
| `/testimonials/` 404 | Redirect to `/share-your-experience` |
| Insurance page `milto:` typo | Fix to `mailto:` |
| Parent resources: 6mo & 18mo PDFs missing | Source and upload PDFs |
| Homepage hospital birth CTA → `/careers/` | Fix to correct page |
| Downey Saturday hours not highlighted | Surface prominently |
| International operations invisible on site | Add to About Us + Careers tabs |
| Services, Locations, Doctors missing from nav | Add to primary navigation |

---

## 15. Component Inventory

| Component | Description |
|---|---|
| `<Navbar>` | Sticky, dark teal, utility bar above, mobile hamburger |
| `<Hero>` | Split layout, photo right, headline + CTAs left |
| `<StatsBar>` | 4-column stat strip |
| `<ServiceCard>` | Icon, title, description, CTA link |
| `<LocationCard>` | Clinic name, address, hours chip, "View →" |
| `<DoctorCard>` | Photo, name, credentials, location badge |
| `<TestimonialCard>` | Stars, quote, author avatar + name |
| `<InsuranceBadge>` | Partner logo pill |
| `<ClinicFinder>` | Zip search input + results list + map |
| `<Footer>` | 4-column, dark teal, social links |
| `<BookingCTA>` | Coral button, always links to Healow |
| `<LocationPage>` | Template for all 25 location pages |
| `<DoctorPage>` | Template for all 55+ doctor profiles |

---

## 16. Performance & SEO

- All pages statically generated (Next.js SSG)
- Images: `next/image` with WebP + AVIF, `priority` on hero
- Fonts: `next/font/google` — Poppins + Roboto, no layout shift
- Each location page has unique title, meta description, schema.org `MedicalClinic` JSON-LD
- Each doctor page has schema.org `Physician` JSON-LD
- Sitemap auto-generated via `next-sitemap`

---

## 17. Out of Scope

- Backend appointment booking (Healow handles this)
- Patient portal (links to ecwcloud)
- Online payment processing (links to healowpay.com)
- Authentication / user accounts
- Live chat
