'use client'
import SectionLabel from '@/components/ui/SectionLabel'
import LocationCard from '@/components/locations/LocationCard'
import locations from '@/data/locations.json'
import type { Location } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LocationsContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Page hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.07]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel className="mb-3 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">{t('locationsPage.label')}</SectionLabel>
          <h1 className="font-heading mt-1 text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold tracking-tight text-white heading-tight">
            {t('locationsPage.title')}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            {t('locationsPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="bg-brand-bg px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(locations as Location[]).map(loc => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
