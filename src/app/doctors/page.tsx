'use client'
import { useState, useMemo } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import DoctorCard from '@/components/doctors/DoctorCard'
import doctors from '@/data/doctors.json'
import locations from '@/data/locations.json'
import type { Doctor, Location } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DoctorsPage() {
  const [locationFilter, setLocationFilter] = useState('')
  const [credFilter, setCredFilter]         = useState('')
  const { t } = useLanguage()

  const filtered = useMemo(() => {
    return (doctors as Doctor[]).filter(doc => {
      const matchLoc  = !locationFilter || doc.locations.includes(locationFilter)
      const matchCred = !credFilter     || doc.credentials.toLowerCase().includes(credFilter.toLowerCase())
      return matchLoc && matchCred
    })
  }, [locationFilter, credFilter])

  const credOptions = ['MD', 'FAAP', 'PA', 'NP', 'PNP']

  return (
    <>
      {/* Page hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.07]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel className="mb-3 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">{t('doctorsPage.label')}</SectionLabel>
          <h1 className="font-heading mt-1 text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold tracking-tight text-white heading-tight">
            {t('doctorsPage.title')}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            {t('doctorsPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="bg-brand-bg px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:gap-3">
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="flex-1 rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm text-brand-text transition-colors focus:border-teal-mid focus:outline-none"
            >
              <option value="">{t('doctorsPage.allLocations')}</option>
              {(locations as Location[]).map(loc => (
                <option key={loc.slug} value={loc.slug}>{loc.name}</option>
              ))}
            </select>
            <select
              value={credFilter}
              onChange={e => setCredFilter(e.target.value)}
              className="flex-1 rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm text-brand-text transition-colors focus:border-teal-mid focus:outline-none"
            >
              <option value="">{t('doctorsPage.allCredentials')}</option>
              {credOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {(locationFilter || credFilter) && (
              <button
                onClick={() => { setLocationFilter(''); setCredFilter('') }}
                className="rounded-xl border border-brand-border px-4 py-2.5 text-sm text-brand-muted transition-colors hover:border-teal-mid hover:text-teal-mid"
              >
                {t('doctorsPage.clearFilters')}
              </button>
            )}
          </div>

          <p className="mb-6 text-sm text-brand-muted">
            <span className="font-semibold text-teal-dark">{filtered.length}</span>{' '}
            {filtered.length !== 1 ? t('doctorsPage.providers') : t('doctorsPage.provider')}{' '}
            {t('doctorsPage.found')}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map(doc => <DoctorCard key={doc.slug} doctor={doc} />)}
          </div>
        </div>
      </div>
    </>
  )
}
