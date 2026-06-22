'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Location } from '@/types'

export default function ClinicFinder({ locations }: { locations: Location[] }) {
  const [query, setQuery] = useState('')
  const { t } = useLanguage()

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
    () => Array.from(new Set(locations.map(l => l.city))).sort(),
    [locations]
  )

  return (
    <section className="relative bg-teal-dark px-6 py-20 md:px-12 overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.06] translate-x-1/3 -translate-y-1/4" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-coral/[0.04] -translate-x-1/3 translate-y-1/4" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-2">
        {/* Left: search */}
        <div>
          <SectionLabel className="mb-3 [&>span:first-child]:bg-coral [&_p]:text-teal-light">{t('clinicFinder.label')}</SectionLabel>
          <h2 className="font-heading mb-3 text-4xl font-extrabold tracking-tight text-white heading-tight md:text-5xl">
            {t('clinicFinder.headline1')}<br />
            {t('clinicFinder.headline2')}
          </h2>
          <p className="mb-8 text-[14px] leading-relaxed text-white/75">
            {t('clinicFinder.subtitle')}
          </p>

          {/* Search input */}
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 ring-0 transition-all duration-200 focus-within:border-teal-light/40 focus-within:bg-white/[0.1]">
            <svg className="h-4 w-4 shrink-0 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('clinicFinder.placeholder')}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/55 outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Results */}
          <ul className="space-y-2">
            {results.map(loc => (
              <li key={loc.slug}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3.5 transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.09]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coral/15">
                      <div className="h-2 w-2 rounded-full bg-coral" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{loc.name}</p>
                      <p className="text-[11px] text-white/65">{loc.address}, {loc.city}</p>
                    </div>
                  </div>
                  <span className="ml-3 shrink-0 text-xs font-semibold text-coral opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {t('clinicFinder.view')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/locations" className="mt-5 block text-center text-xs font-semibold text-white/60 transition-colors hover:text-teal-light">
            {t('clinicFinder.viewAll')}
          </Link>
        </div>

        {/* Right: coverage panel */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-white p-8 md:p-10 shadow-sm">
          <span className="pointer-events-none absolute right-4 top-2 select-none font-heading text-[130px] font-extrabold leading-none text-teal-dark/[0.05]">
            25
          </span>

          <div className="relative">
            <SectionLabel className="mb-4 [&>span:first-child]:bg-teal-mid [&_p]:text-teal-mid">{t('clinicFinder.coverageLabel')}</SectionLabel>
            <h3 className="font-heading mb-6 text-xl font-bold text-teal-dark">{t('clinicFinder.coverageTitle')}</h3>

            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {cities.map((city) => (
                <div key={city} className="flex items-center gap-2 text-sm text-brand-muted">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-coral/60" />
                  {city}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-brand-border bg-teal-tint p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-mid/15 text-teal-mid">
                  <ServiceIcon slug="telehealth" className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-teal-dark">{t('clinicFinder.cantMakeIt')}</p>
                  <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                    {t('clinicFinder.telehealthDesc')}
                  </p>
                  <Link
                    href="/services/telehealth"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-coral-ink transition-colors hover:text-teal-dark"
                  >
                    {t('clinicFinder.learnTelehealth')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
