'use client'
import { useState, useMemo } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import DoctorCard from '@/components/doctors/DoctorCard'
import doctors from '@/data/doctors.json'
import locations from '@/data/locations.json'
import type { Doctor, Location } from '@/types'

export default function DoctorsPage() {
  const [locationFilter, setLocationFilter] = useState('')
  const [credFilter, setCredFilter]         = useState('')

  const filtered = useMemo(() => {
    return (doctors as Doctor[]).filter(doc => {
      const matchLoc  = !locationFilter || doc.locations.includes(locationFilter)
      const matchCred = !credFilter     || doc.credentials.toLowerCase().includes(credFilter.toLowerCase())
      return matchLoc && matchCred
    })
  }, [locationFilter, credFilter])

  const credOptions = ['MD', 'FAAP', 'PA', 'NP', 'PNP']

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Our Team</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Our Pediatricians</h1>
        <p className="mb-8 max-w-xl text-sm text-brand-muted">
          50+ board-certified doctors and nurse practitioners across 25 LA locations.
        </p>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="rounded-lg border border-brand-border px-4 py-2 text-sm text-brand-text"
          >
            <option value="">All Locations</option>
            {(locations as Location[]).map(loc => (
              <option key={loc.slug} value={loc.slug}>{loc.name}</option>
            ))}
          </select>
          <select
            value={credFilter}
            onChange={e => setCredFilter(e.target.value)}
            className="rounded-lg border border-brand-border px-4 py-2 text-sm text-brand-text"
          >
            <option value="">All Credentials</option>
            {credOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <p className="mb-6 text-sm text-brand-muted">{filtered.length} provider{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map(doc => <DoctorCard key={doc.slug} doctor={doc} />)}
        </div>
      </div>
    </div>
  )
}
