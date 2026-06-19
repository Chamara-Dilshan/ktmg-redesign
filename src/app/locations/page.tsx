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
