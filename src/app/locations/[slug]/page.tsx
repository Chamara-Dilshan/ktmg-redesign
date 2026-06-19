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
