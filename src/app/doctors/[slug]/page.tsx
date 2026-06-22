import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
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

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const gradients = [
  'from-teal-dark to-teal-mid',
  'from-teal-mid to-teal-light',
  'from-teal-dark to-coral',
  'from-coral to-teal-mid',
]

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const doctor = (doctors as Doctor[]).find(d => d.slug === params.slug)
  if (!doctor) notFound()

  const gradient = gradients[doctor.name.charCodeAt(0) % gradients.length]
  const doctorInitials = initials(doctor.name)
  const doctorLocations = (locations as Location[]).filter(l => doctor.locations.includes(l.slug))
  const isFAAP = doctor.credentials.includes('FAAP')

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

      {/* Hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.07]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-[320px] w-[320px] rounded-full bg-coral/[0.04]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/doctors"
            className="mb-5 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Doctors
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${gradient} ring-4 ring-white/20 md:h-28 md:w-28`}
              >
                {doctor.photo ? (
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top"
                    sizes="112px"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 rounded-full bg-white/5" />
                    <span className="font-heading relative text-2xl font-extrabold text-white md:text-3xl">
                      {doctorInitials}
                    </span>
                  </>
                )}
              </div>
              {isFAAP && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-coral-ink px-2 py-0.5 text-[9px] font-bold text-white ring-2 ring-teal-dark">
                  FAAP
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-light">
                Kids &amp; Teens Medical Group
              </p>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {doctor.name}
              </h1>
              <p className="mt-2 text-sm text-white/60">{doctor.credentials}</p>
              <div className="mt-6">
                <BookingCTA label={`Book with ${doctor.name.split(' ').pop()}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-brand-bg px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Status strip */}
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-brand-border bg-white px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-semibold text-teal-dark">Accepting New Patients</span>
            </div>
            <div className="hidden h-4 w-px bg-brand-border sm:block" />
            <span className="text-sm text-brand-muted">Pediatrics · Ages 0–21</span>
            {doctorLocations.length > 0 && (
              <>
                <div className="hidden h-4 w-px bg-brand-border sm:block" />
                <span className="text-sm text-brand-muted">
                  {doctorLocations.length} clinic{doctorLocations.length !== 1 ? 's' : ''} in LA
                </span>
              </>
            )}
          </div>

          {/* Locations */}
          {doctorLocations.length > 0 && (
            <div>
              <h2 className="font-heading mb-5 text-xl font-extrabold text-teal-dark">
                Clinic Locations
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {doctorLocations.map(loc => (
                  <LocationCard key={loc.slug} location={loc} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
