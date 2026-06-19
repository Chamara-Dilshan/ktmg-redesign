'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Location } from '@/types'

export default function ClinicFinder({ locations }: { locations: Location[] }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return locations.slice(0, 5)
    const q = query.toLowerCase()
    return locations.filter(loc =>
      loc.name.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.zip.includes(q) ||
      loc.address.toLowerCase().includes(q)
    ).slice(0, 5)
  }, [query, locations])

  return (
    <section className="bg-teal-dark px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-2">
        {/* Left: search + results */}
        <div>
          <SectionLabel className="mb-2 text-teal-light">25 Locations</SectionLabel>
          <h2 className="font-heading mb-3 text-3xl font-extrabold text-white">
            Find a Clinic Near You
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/65">
            We&apos;re spread across LA — from Santa Monica to Whittier, Beverly Hills to Northridge.
          </p>
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-4">
            <span className="text-white/50">📍</span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter city, zip, or neighborhood..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
            />
          </div>
          <ul className="space-y-3">
            {results.map(loc => (
              <li key={loc.slug} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-teal-light" />
                  <div>
                    <p className="text-sm font-semibold text-white">{loc.name}</p>
                    <p className="text-xs text-white/50">{loc.address}, {loc.city}</p>
                  </div>
                </div>
                <Link href={`/locations/${loc.slug}`} className="text-xs font-semibold text-coral hover:underline">
                  View →
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/locations" className="mt-4 block text-center text-sm font-semibold text-teal-light hover:underline">
            View all 25 locations →
          </Link>
        </div>

        {/* Right: map placeholder */}
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-white/30 md:h-80">
          <div className="text-center">
            <div className="mb-2 text-4xl">🗺️</div>
            <p className="text-sm">Interactive map</p>
            <p className="text-xs opacity-60">Google Maps / Mapbox embed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
