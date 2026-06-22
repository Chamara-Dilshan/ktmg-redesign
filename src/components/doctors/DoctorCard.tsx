'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
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

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const isFAAP = doctor.credentials.includes('FAAP')
  const [imgError, setImgError] = useState(false)

  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white"
    >
      {/* Avatar area */}
      <div className="relative flex h-52 items-end justify-between overflow-hidden bg-teal-tint px-6 pb-5 pt-6">
        {doctor.photo && !imgError ? (
          <Image
            src={doctor.photo}
            alt={doctor.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <>
            {/* Large initials watermark */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-heading text-[5.5rem] font-extrabold leading-none text-teal-mid/[0.12]">
              {initials(doctor.name)}
            </span>
            {/* Initials chip */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-dark text-lg font-bold text-white ring-1 ring-teal-dark/20">
              {initials(doctor.name)}
            </div>
          </>
        )}
        {/* FAAP badge */}
        {isFAAP && (
          <span className="relative z-10 ml-auto rounded-full bg-coral-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
            FAAP
          </span>
        )}
      </div>

      {/* Coral accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-coral via-coral/60 to-transparent" />

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-[15px] font-bold leading-snug text-teal-dark transition-colors group-hover:text-teal-mid">
          {doctor.name}
        </h3>
        <p className="mt-0.5 text-xs font-semibold text-brand-muted">{doctor.credentials}</p>
        {doctor.locations[0] && (
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-brand-muted">
            <svg className="h-3 w-3 shrink-0 text-coral/70" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {doctor.locations[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </p>
        )}
        <div className="mt-auto pt-4">
          <span className="text-xs font-semibold text-teal-mid transition-colors group-hover:text-coral-ink">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  )
}
