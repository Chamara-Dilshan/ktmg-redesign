# KTMG UI Polish — Design Spec

**Date:** 2026-06-22  
**Approach:** Option A — Surgical fixes, in-place per file  
**Scope:** 5 targeted UI/UX improvements to the existing redesign

---

## 1. Palette — Introduce Warmth

**Problem:** Four teal values plus a cool off-white background make the site read as a corporate clinic rather than a pediatric family practice.

**Changes:**

| Token | Old | New |
|---|---|---|
| `brand-bg` | `#F8FAFB` | `#FBF8F4` |
| `brand-border` | `#E0EAED` | `#E8E2D9` |
| `brand-amber` | *(new)* | `#F5A623` |

**Rules for `brand-amber`:**
- Use for: icon background fills, badge chips, small callout highlights
- Never use for: CTA buttons (coral owns that), large background sections, text
- Tailwind token name: `amber` (e.g. `bg-amber`, `text-amber`)

**Teal tokens unchanged:** `teal-dark (#073f49)`, `teal-mid (#047391)`, `teal-light (#7dd3e8)`, `teal-tint (#E8F4F7)`

**Files to change:**
- `tailwind.config.ts` — update `brand-bg`, `brand-border`, add `brand-amber`

---

## 2. Hero — One Job

**Problem:** The hero has 5 competing elements (parallax bg, trust badge, staggered headline, marquee ticker, 2 CTAs + phone link). One hero, one job.

**Hero's single job:** Get a parent to book an appointment.

**Remove:**
- Marquee ticker (entire `<motion.div>` ticker/marquee block at the bottom of hero)
- Secondary ghost "Learn More" button

**Keep:**
- Parallax background image
- Headline + subheadline
- Trust badge — simplified: one line of text, no icon cluster
- Primary "Book Appointment" CTA (coral, glow pulse) — links to Healow
- Phone number as a plain text link beneath the CTA (not a button)

**Result:** headline → subheadline → trust badge → CTA → phone link. Five elements, clear top-to-bottom read.

**Files to change:**
- `src/components/home/Hero.tsx` — remove ticker block, remove secondary ghost button, simplify trust badge

---

## 3. Glass Morphism + Grain — Remove

**Problem:** `backdrop-filter: blur()` and grain texture are 2022 design trends that age the site and read as AI-generated defaults.

**Remove entirely:**
- `.grain` class definition and pseudo-element from `globals.css`
- All `className` usages of `grain` across components

**Replace `.glass` usages with solid alternatives:**

| Location | Old | New |
|---|---|---|
| Navbar (on scroll) | `bg-white/80 backdrop-blur-md` | `bg-white border-b border-brand-border` |
| Clinic Finder panel | `glass` class | `bg-white shadow-sm` |
| Testimonial cards | `glass` class | `bg-white` with `border border-brand-border` |

**Do not delete the `.glass` CSS class definition** — remove its usage from components. The class can stay dormant in `globals.css` in case it's referenced elsewhere.

**Files to change:**
- `globals.css` — remove `.grain` class entirely
- `src/components/layout/Navbar.tsx` — replace glass/blur with solid white
- `src/components/home/ClinicFinder.tsx` — replace glass with `bg-white shadow-sm`
- `src/components/home/TestimonialsSection.tsx` — replace glass cards with solid white bordered cards

---

## 4. Animation — Intentional Easing

**Problem:** All animations use the same easing curve `[0.22, 1, 0.36, 1]`, making motion feel AI-generated rather than deliberate.

**Three easing contexts:**

| Context | Curve | Where |
|---|---|---|
| Scroll entrance | `[0.22, 1, 0.36, 1]` | `FadeIn.tsx`, section reveals |
| Staggered reveals | `[0.16, 1, 0.3, 1]` | Multi-item grids (services, doctors, stats) |
| Hover / tap | Spring `{ stiffness: 380, damping: 22 }` | Card hovers, button taps, icon interactions |

**Implementation:**
- `FadeIn.tsx` — keep its current easing `[0.22, 1, 0.36, 1]` (correct for scroll entrance)
- `ServicesGrid.tsx`, `DoctorsPreview.tsx` stagger children — switch to `[0.16, 1, 0.3, 1]`
- All `whileHover` and `whileTap` with `scale` transforms — switch from `duration`-based to spring `{ stiffness: 380, damping: 22 }`
- Icon `whileHover` rotate animations — use spring `{ stiffness: 300, damping: 18 }`

**Files to change:**
- `src/components/home/ServicesGrid.tsx`
- `src/components/home/DoctorsPreview.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/BookingCTA.tsx`

---

## 5. Accessibility — Dark Section Contrast

**Problem:** `text-white/30` and `text-white/40` on `#1A1A2E` backgrounds fail WCAG AA (require 4.5:1 for body text, 3:1 for large text).

**Contrast floor on dark backgrounds (`bg-brand-text` = `#1A1A2E`):**

| Role | Old | New | WCAG |
|---|---|---|---|
| Section headings | `text-white` | `text-white` | AAA ✓ |
| Body / supporting text | `text-white/50` or lower | `text-white/75` minimum | AA ✓ |
| Secondary / muted text | `text-white/40` | `text-white/60` minimum | AA ✓ |
| Decorative / disabled | `text-white/30` | Remove or bump to `text-white/50` | Use sparingly |

**Audit scope:** `TestimonialsSection.tsx` (primary location), any other component using dark `bg-brand-text` background.

**Files to change:**
- `src/components/home/TestimonialsSection.tsx`
- Any other component using `bg-brand-text` with low-opacity white text (audit with search for `text-white/[0-4]`)

---

## Implementation Order

1. **Palette tokens** (`tailwind.config.ts`) — foundation, enables visual check of everything else
2. **Grain + glass removal** (`globals.css`, Navbar, ClinicFinder, Testimonials) — cleanest diff, no logic changes
3. **Accessibility fixes** (`TestimonialsSection.tsx` + audit) — low risk, high impact
4. **Hero simplification** (`Hero.tsx`) — contained to one file
5. **Animation easing** (ServicesGrid, DoctorsPreview, hover components) — last, most files touched

---

## Out of Scope

- No new pages or routes
- No changes to data files (JSON)
- No changes to booking flow or Healow integration
- No typography changes (Bricolage Grotesque + Plus Jakarta Sans stay)
- Beverly Hills clinic address city name decision — deferred (tracked in previous spec)
