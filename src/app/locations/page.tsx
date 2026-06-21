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
    <>
      {/* Page hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.07]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel className="mb-3 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">25 Locations</SectionLabel>
          <h1 className="font-heading mt-1 text-4xl font-extrabold tracking-tight text-white heading-tight md:text-5xl">
            Find a Clinic Near You
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            We&apos;re across Los Angeles — from Santa Monica to Whittier, Beverly Hills to Northridge. All locations open Monday–Friday with telehealth available 7 days a week.
          </p>
        </div>
      </div>

      <div className="bg-brand-bg px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(locations as Location[]).map(loc => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
