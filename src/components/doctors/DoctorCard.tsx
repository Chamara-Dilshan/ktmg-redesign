import Link from 'next/link'
import type { Doctor } from '@/types'

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

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const idx = doctor.name.charCodeAt(0) % gradients.length
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group overflow-hidden rounded-2xl border border-brand-border bg-white text-center transition-all duration-300 hover:-translate-y-1 hover:border-teal-mid/30 hover:shadow-xl"
    >
      {/* Avatar */}
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${gradients[idx]}`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30">
          <span className="font-heading text-xl font-extrabold text-white">{initials(doctor.name)}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading mb-0.5 text-sm font-bold text-teal-dark group-hover:text-teal-mid">
          {doctor.name}
        </h3>
        <p className="text-xs font-medium text-coral">{doctor.credentials}</p>
        {doctor.locations[0] && (
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-brand-muted">
            {doctor.locations[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </p>
        )}
        <span className="mt-3 block text-xs font-bold text-teal-mid transition-colors group-hover:text-coral">
          View Profile →
        </span>
      </div>
    </Link>
  )
}
