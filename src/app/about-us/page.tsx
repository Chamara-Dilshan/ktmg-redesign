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
          <SectionLabel className="mb-3 text-teal-light">About Us</SectionLabel>
          <h1 className="font-heading text-3xl font-extrabold text-white md:text-5xl">
            Caring for the Future Generations<br />in Greater Los Angeles
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            For 18 years, Kids & Teens Medical Group has been Southern California&apos;s most trusted name in pediatric care — with 25 clinics, 50+ board-certified doctors, and a commitment to every child, every stage.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {[
            { n: '25',   l: 'Clinics in LA'        },
            { n: '50+',  l: 'Board-Certified Doctors'},
            { n: '18',   l: 'Years of Excellence'   },
            { n: '0–21', l: 'Ages Served'           },
          ].map(s => (
            <div key={s.l} className="rounded-xl border border-brand-border bg-white p-4 text-center md:p-6">
              <span className="font-heading block text-2xl font-extrabold text-teal-dark md:text-4xl">{s.n}</span>
              <span className="mt-1 block text-xs text-brand-muted md:text-sm">{s.l}</span>
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
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <BookingCTA label="Book Appointment" />
            <Link href="/locations" className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white hover:bg-white/20">
              Find a Clinic
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
