'use client'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'
import { useLanguage } from '@/contexts/LanguageContext'

const partners = [
  "Children's Hospital LA", 'Cedar Sinai', 'LA Care', 'Optum', 'Molina Healthcare', 'Regal Medical Group',
]

const globalLocations = [
  { regionKey: 'aboutPage.laRegion',       descKey: 'aboutPage.laDesc',       emoji: '🇺🇸' },
  { regionKey: 'aboutPage.sriLankaRegion', descKey: 'aboutPage.sriLankaDesc', emoji: '🇱🇰' },
  { regionKey: 'aboutPage.mexicoRegion',   descKey: 'aboutPage.mexicoDesc',   emoji: '🇲🇽' },
]

const milestoneYears = ['2006', '2010', '2016', '2022']

const stats = [
  { n: '25',   lKey: 'aboutPage.stats.clinics',  subKey: 'aboutPage.stats.clinicsNote'  },
  { n: '50+',  lKey: 'aboutPage.stats.doctors',  subKey: 'aboutPage.stats.doctorsNote'  },
  { n: '18',   lKey: 'aboutPage.stats.years',    subKey: 'aboutPage.stats.yearsNote'    },
  { n: '0–21', lKey: 'aboutPage.stats.ages',     subKey: 'aboutPage.stats.agesNote'     },
]

export default function AboutContent() {
  const { t } = useLanguage()

  const titleLines = t('aboutPage.title').split('\n')

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-20 md:px-12 md:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-teal-mid/[0.07]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-[400px] w-[400px] rounded-full bg-coral/[0.04]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel className="mb-4 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">{t('aboutPage.label')}</SectionLabel>
          <h1 className="font-heading text-[clamp(2rem,6vw,4rem)] font-extrabold tracking-tight text-white heading-tight">
            {titleLines[0]}<br />{titleLines[1]}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60">
            {t('aboutPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="bg-brand-bg px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Stats grid */}
          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.lKey} className="rounded-2xl border border-brand-border bg-white p-6 text-center shadow-sm">
                <span className="font-heading block text-3xl font-extrabold tracking-tight text-teal-dark md:text-4xl">{s.n}</span>
                <div className="mx-auto my-2 h-px w-8 bg-coral" />
                <span className="block text-sm font-semibold text-brand-text">{t(s.lKey)}</span>
                <span className="block text-xs text-brand-muted mt-0.5">{t(s.subKey)}</span>
              </div>
            ))}
          </div>

          {/* Our story */}
          <div className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <SectionLabel className="mb-4">{t('aboutPage.storyLabel')}</SectionLabel>
              <h2 className="font-heading mb-6 text-3xl font-extrabold tracking-tight text-teal-dark heading-tight md:text-4xl">{t('aboutPage.storyTitle')}</h2>
              <p className="mb-4 text-[15px] leading-relaxed text-brand-muted">{t('aboutPage.story1')}</p>
              <p className="text-[15px] leading-relaxed text-brand-muted">{t('aboutPage.story2')}</p>
            </div>

            {/* Timeline */}
            <div className="relative overflow-hidden rounded-3xl bg-teal-dark p-8 md:p-10">
              <span className="pointer-events-none absolute -right-4 -top-4 select-none font-heading text-[130px] font-extrabold leading-none text-white/[0.035]">
                06
              </span>
              <div className="relative">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-light">{t('aboutPage.timelineLabel')}</p>
                <div className="mb-6 mt-3 h-px w-10 bg-coral" />
                <div className="space-y-5">
                  {milestoneYears.map((year, i) => (
                    <div key={year} className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-heading text-xs font-bold ${i === milestoneYears.length - 1 ? 'bg-coral text-white' : 'bg-white/10 text-white/60'}`}>
                        {year.slice(-2)}
                      </div>
                      <div>
                        <p className="text-xs text-white/35">{year}</p>
                        <p className="text-sm font-medium text-white">{t(`aboutPage.milestone.${i}`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Global footprint */}
          <div className="mb-16">
            <SectionLabel className="mb-4">{t('aboutPage.globalLabel')}</SectionLabel>
            <h2 className="font-heading mb-8 text-3xl font-extrabold tracking-tight text-teal-dark heading-tight">{t('aboutPage.globalTitle')}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {globalLocations.map(g => (
                <div key={g.regionKey} className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{g.emoji}</span>
                    <h3 className="font-heading text-base font-bold text-teal-dark">{t(g.regionKey)}</h3>
                  </div>
                  <div className="mb-3 h-px w-8 bg-coral/50" />
                  <p className="text-sm leading-relaxed text-brand-muted">{t(g.descKey)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="mb-16">
            <SectionLabel className="mb-4">{t('aboutPage.partnersLabel')}</SectionLabel>
            <h2 className="font-heading mb-6 text-2xl font-extrabold tracking-tight text-teal-dark">{t('aboutPage.partnersTitle')}</h2>
            <div className="flex flex-wrap gap-2.5">
              {partners.map(p => (
                <span key={p} className="rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-medium text-brand-muted shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-teal-dark p-10 text-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-mid/10" />
            <div className="relative">
              <h2 className="font-heading mb-3 text-3xl font-extrabold tracking-tight text-white heading-tight">{t('aboutPage.ctaTitle')}</h2>
              <p className="mb-7 text-[15px] text-white/60">{t('aboutPage.ctaSubtitle')}</p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <BookingCTA label={t('aboutPage.ctaBook')} />
                <Link href="/locations" className="rounded-full border border-white/20 bg-white/[0.07] px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]">
                  {t('aboutPage.ctaFind')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
