import Link from 'next/link'
import type { Doctor } from '@/types'

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-border text-center">
      <div className="flex h-28 items-center justify-center bg-teal-tint text-4xl">
        👨‍⚕️
      </div>
      <div className="p-4">
        <h3 className="font-heading text-sm font-bold text-teal-dark">{doctor.name}</h3>
        <p className="text-xs text-brand-muted">{doctor.credentials}</p>
        {doctor.locations[0] && (
          <p className="mt-1 text-xs text-teal-mid">📍 {doctor.locations[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
        )}
        <Link href={`/doctors/${doctor.slug}`} className="mt-3 block text-xs font-semibold text-coral hover:underline">
          View Profile →
        </Link>
      </div>
    </div>
  )
}
