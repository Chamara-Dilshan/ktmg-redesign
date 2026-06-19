import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BookingCTA from '@/components/ui/BookingCTA'
import DoctorCard from '@/components/doctors/DoctorCard'
import locations from '@/data/locations.json'
import doctors from '@/data/doctors.json'
import type { Location, Doctor } from '@/types'
import { PHONE_CALL } from '@/lib/constants'

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
    telephone: PHONE_CALL,
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

        {/* Location info card */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-teal-dark">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Address + directions */}
            <div className="relative p-8 md:p-10">
              <span className="pointer-events-none absolute -right-4 -top-4 select-none font-heading text-[120px] font-black leading-none text-white/[0.03]">
                {location.city[0]}
              </span>
              <div className="relative">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-teal-light">Location</p>
                <div className="mb-4 mt-3 h-0.5 w-10 bg-coral" />
                <p className="text-base font-semibold text-white">{location.address}</p>
                <p className="text-sm text-white/60">{location.city}, {location.state} {location.zip}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address}, ${location.city}, ${location.state} ${location.zip}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-coral px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="border-t border-white/10 p-8 md:border-l md:border-t-0 md:p-10">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-teal-light">Hours</p>
              <div className="mb-4 mt-3 h-0.5 w-10 bg-coral" />
              <p className="text-sm font-semibold text-white">{location.officeHours}</p>
              {location.saturdayHours && (
                <p className="mt-2 text-sm font-semibold text-coral">
                  {location.saturdayHours}{' '}
                  <span className="text-xs font-normal text-white/50">(In-office walk-in)</span>
                </p>
              )}
              {location.telehealthHours && (
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Telehealth</p>
                  <p className="mt-1 text-sm font-semibold text-white">{location.telehealthHours}</p>
                </div>
              )}
            </div>
          </div>
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
