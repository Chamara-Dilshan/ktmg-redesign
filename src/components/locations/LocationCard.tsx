import Link from 'next/link'
import type { Location } from '@/types'

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-5 transition-shadow hover:shadow-md">
      <h3 className="font-heading mb-1 text-base font-bold text-teal-dark">{location.name}</h3>
      <p className="mb-1 text-sm text-brand-muted">{location.address}</p>
      <p className="mb-3 text-sm text-brand-muted">{location.city}, {location.state} {location.zip}</p>
      <div className="mb-4 space-y-1">
        <span className="inline-block rounded-full bg-teal-tint px-3 py-1 text-xs font-medium text-teal-mid">
          {location.officeHours}
        </span>
        {location.saturdayHours && (
          <span className="ml-2 inline-block rounded-full bg-coral/10 px-3 py-1 text-xs font-medium text-coral">
            {location.saturdayHours} ★
          </span>
        )}
      </div>
      <Link href={`/locations/${location.slug}`} className="text-sm font-semibold text-coral hover:underline">
        View Clinic →
      </Link>
    </div>
  )
}
