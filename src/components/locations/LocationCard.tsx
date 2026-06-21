import Link from 'next/link'
import type { Location } from '@/types'

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className="card-lift group flex flex-col rounded-2xl border border-brand-border bg-white overflow-hidden">
      {/* Top accent */}
      <div className="h-[3px] w-full bg-teal-mid shrink-0" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-tint shrink-0">
            <svg className="h-4 w-4 text-teal-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <h3 className="font-heading mb-1 text-base font-bold text-teal-dark group-hover:text-teal-mid transition-colors">
          {location.name}
        </h3>
        <p className="text-sm text-brand-muted">{location.address}</p>
        <p className="mb-4 text-sm text-brand-muted">{location.city}, {location.state} {location.zip}</p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-tint px-3 py-1 text-[11px] font-medium text-teal-mid">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-mid" />
            {location.officeHours}
          </span>
          {location.saturdayHours && (
            <span className="inline-flex items-center gap-1 rounded-full bg-coral/10 px-3 py-1 text-[11px] font-medium text-coral">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              {location.saturdayHours}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link
            href={`/locations/${location.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-mid transition-colors hover:text-teal-dark group-hover:gap-2"
          >
            View Clinic →
          </Link>
        </div>
      </div>
    </div>
  )
}
