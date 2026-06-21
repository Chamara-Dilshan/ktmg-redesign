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
  { region: 'Los Angeles, CA', desc: 'Headquarters — 25 clinics across LA County and Ventura County.', emoji: '🇺🇸' },
  { region: 'Sri Lanka',       desc: 'Expanding quality pediatric care to South Asia.',                  emoji: '🇱🇰' },
  { region: 'Mexico',          desc: 'Bringing trusted pediatric services to Mexican communities.',      emoji: '🇲🇽' },
]

const milestones = [
  { year: '2006', text: 'Founded in Los Angeles' },
  { year: '2010', text: 'Expanded to 10 clinics' },
  { year: '2016', text: 'Launched Telehealth services' },
  { year: '2022', text: 'Reached 25 LA locations' },
]

export default function AboutUsPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-20 md:px-12 md:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-teal-mid/[0.07]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-[400px] w-[400px] rounded-full bg-coral/[0.04]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel className="mb-4 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">About Us</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white heading-tight md:text-6xl">
            Caring for the Future<br />Generations in Greater LA
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60">
            For 18 years, Kids & Teens Medical Group has been Southern California&apos;s most trusted name in pediatric care — with 25 clinics, 50+ board-certified doctors, and a commitment to every child, every stage.
          </p>
        </div>
      </div>

      <div className="bg-brand-bg px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Stats grid */}
          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { n: '25',   l: 'Clinics in LA',         sub: 'Across LA County' },
              { n: '50+',  l: 'Board-Certified Doctors', sub: 'All FAAP' },
              { n: '18',   l: 'Years of Excellence',    sub: 'Est. 2006' },
              { n: '0–21', l: 'Ages Served',            sub: 'Newborn to Adult' },
            ].map(s => (
              <div key={s.l} className="rounded-2xl border border-brand-border bg-white p-6 text-center shadow-sm">
                <span className="font-heading block text-3xl font-extrabold tracking-tight text-teal-dark md:text-4xl">{s.n}</span>
                <div className="mx-auto my-2 h-px w-8 bg-coral" />
                <span className="block text-sm font-semibold text-brand-text">{s.l}</span>
                <span className="block text-xs text-brand-muted mt-0.5">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Our story */}
          <div className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <SectionLabel className="mb-4">Our Story</SectionLabel>
              <h2 className="font-heading mb-6 text-3xl font-extrabold tracking-tight text-teal-dark heading-tight md:text-4xl">18 Years of Excellence</h2>
              <p className="mb-4 text-[15px] leading-relaxed text-brand-muted">
                Kids & Teens Medical Group is the leading provider of pediatric care with extended hours in Southern California. We are focused on changing the way you think about children&apos;s health — combining compassionate, board-certified care with the convenience of 25 locations and telehealth available seven days a week.
              </p>
              <p className="text-[15px] leading-relaxed text-brand-muted">
                We offer a full range of services: routine check-ups, immunizations, allergies, ADHD management, urgent care, prenatal consultations, and after-hours care — all under one trusted name.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative overflow-hidden rounded-3xl bg-teal-dark p-8 md:p-10">
              <span className="pointer-events-none absolute -right-4 -top-4 select-none font-heading text-[130px] font-extrabold leading-none text-white/[0.035]">
                06
              </span>
              <div className="relative">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-light">Timeline</p>
                <div className="mb-6 mt-3 h-px w-10 bg-coral" />
                <div className="space-y-5">
                  {milestones.map((m, i) => (
                    <div key={m.year} className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-heading text-xs font-bold ${i === milestones.length - 1 ? 'bg-coral text-white' : 'bg-white/10 text-white/60'}`}>
                        {m.year.slice(-2)}
                      </div>
                      <div>
                        <p className="text-xs text-white/35">{m.year}</p>
                        <p className="text-sm font-medium text-white">{m.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Global footprint */}
          <div className="mb-16">
            <SectionLabel className="mb-4">Global Footprint</SectionLabel>
            <h2 className="font-heading mb-8 text-3xl font-extrabold tracking-tight text-teal-dark heading-tight">Caring Beyond Los Angeles</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {globalLocations.map(g => (
                <div key={g.region} className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{g.emoji}</span>
                    <h3 className="font-heading text-base font-bold text-teal-dark">{g.region}</h3>
                  </div>
                  <div className="mb-3 h-px w-8 bg-coral/50" />
                  <p className="text-sm leading-relaxed text-brand-muted">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="mb-16">
            <SectionLabel className="mb-4">Our Partners</SectionLabel>
            <h2 className="font-heading mb-6 text-2xl font-extrabold tracking-tight text-teal-dark">Trusted Medical Partners</h2>
            <div className="flex flex-wrap gap-2.5">
              {partners.map(p => (
                <span key={p} className="rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-medium text-brand-muted shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-teal-dark p-10 text-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-mid/10" />
            <div className="relative">
              <h2 className="font-heading mb-3 text-3xl font-extrabold tracking-tight text-white heading-tight">Ready to find your pediatrician?</h2>
              <p className="mb-7 text-[15px] text-white/60">25 clinics across LA. Same-day appointments available.</p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <BookingCTA label="Book Appointment" />
                <Link href="/locations" className="rounded-full border border-white/20 bg-white/[0.07] px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]">
                  Find a Clinic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
