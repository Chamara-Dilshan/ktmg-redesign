'use client'
import Link from 'next/link'
import DoctorCard from '@/components/doctors/DoctorCard'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Doctor } from '@/types'

export default function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  const preview = doctors.slice(0, 4)
  const { t } = useLanguage()

  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-12 flex flex-col gap-5 border-b border-brand-border pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">{t('doctorsPreview.label')}</p>
              <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.0] tracking-tight text-teal-dark heading-tight">
                {t('doctorsPreview.headline')}<br />
                <span className="text-brand-muted font-semibold text-[0.6em] tracking-normal">{t('doctorsPreview.subheadline')}</span>
              </h2>
            </div>
            <Link
              href="/doctors"
              className="shrink-0 rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-semibold text-brand-text transition-colors hover:border-teal-mid hover:text-teal-mid"
            >
              {t('doctorsPreview.viewAll')}
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((doc, i) => (
            <FadeIn key={doc.slug} delay={i * 0.08}>
              <DoctorCard doctor={doc} />
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <FadeIn delay={0.36}>
          <div className="mt-10 flex items-center justify-between rounded-2xl border border-brand-border bg-teal-tint px-7 py-5">
            <div>
              <p className="font-heading text-base font-bold text-teal-dark">{t('doctorsPreview.faapTitle')}</p>
              <p className="text-sm text-brand-muted">{t('doctorsPreview.faapSub')}</p>
            </div>
            <Link href="/doctors" className="hidden shrink-0 text-sm font-semibold text-teal-mid transition-colors hover:text-teal-dark sm:block">
              {t('doctorsPreview.browseAll')}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
