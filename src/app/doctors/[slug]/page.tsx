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
          <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${gradient} ring-4 ring-white/20`}>
            <span className="font-heading text-2xl font-extrabold text-white">{doctorInitials}</span>
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
