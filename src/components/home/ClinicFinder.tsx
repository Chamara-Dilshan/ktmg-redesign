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

  const cities = useMemo(
    () => [...new Set(locations.map(l => l.city))].sort(),
    [locations]
  )

  return (
    <section className="bg-teal-dark px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl items-start gap-10 md:grid-cols-2">

        {/* Left: search + results */}
        <div>
          <SectionLabel className="mb-2 text-teal-light">25 Locations</SectionLabel>
          <h2 className="font-heading mb-3 text-3xl font-extrabold text-white">
            Find a Clinic Near You
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/60">
            From Santa Monica to Whittier, Beverly Hills to Northridge — always close to home.
          </p>

          {/* Search */}
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-4 focus-within:border-teal-light/50 focus-within:bg-white/15 transition-all duration-200">
            <svg className="h-4 w-4 shrink-0 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter city, zip, or neighborhood..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
            />
          </div>

          {/* Results */}
          <ul className="space-y-2.5">
            {results.map(loc => (
              <li key={loc.slug} className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 transition-all duration-200 hover:border-white/20 hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  <div>
                    <p className="text-sm font-semibold text-white">{loc.name}</p>
                    <p className="text-xs text-white/45">{loc.address}, {loc.city}</p>
                  </div>
                </div>
                <Link href={`/locations/${loc.slug}`} className="text-xs font-bold text-coral opacity-0 transition-all duration-200 group-hover:opacity-100">
                  View →
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/locations" className="mt-5 block text-center text-sm font-semibold text-white/50 transition-colors hover:text-teal-light">
            View all 25 locations →
          </Link>
        </div>

        {/* Right: coverage panel */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
          {/* Large background number */}
          <span className="pointer-events-none absolute -right-4 -top-4 select-none font-heading text-[160px] font-black leading-none text-white/[0.03]">
            25
          </span>

          <div className="relative">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-teal-light">
              Coverage across Greater LA
            </p>
            <div className="mb-6 mt-3 h-0.5 w-10 bg-coral" />

            {/* City scatter */}
            <div className="flex flex-wrap gap-x-2 gap-y-1.5">
              {cities.map((city, i) => (
                <span key={city} className="text-sm text-white/50 after:ml-2 after:text-white/20 after:content-['·'] last:after:content-['']">
                  {city}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-white/40 leading-relaxed">
                Can&apos;t make it in? Telehealth is available 7 days a week — same trusted KTMG doctors, from wherever you are.
              </p>
              <Link
                href="/locations"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-coral transition-colors hover:text-white"
              >
                See all clinic details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
