'use client'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/contexts/LanguageContext'
import { HEALOW_URL, PHONE_CALL } from '@/lib/constants'

export default function CTABand() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-teal-dark px-6 py-24 md:px-12 md:py-28">
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-teal-mid/[0.07]" />
        <div className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-coral/[0.04]" />
      </div>

      <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-heading text-[13vw] font-extrabold leading-none text-white/[0.03]">
        KTMG
      </span>

      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">

            {/* Left — massive headline */}
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                <span className="text-[11px] font-medium text-white/75">{t('cta.badge')}</span>
              </div>
              <h2 className="font-heading leading-[0.92] tracking-tight text-white heading-tighter"
                  style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)' }}>
                {t('cta.headline1')}<br />
                {t('cta.headline2')}<br />
                <span className="text-coral">{t('cta.headline3')}</span>
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/70">
                {t('cta.subtitle')}
              </p>
            </div>

            {/* Right — CTA stack */}
            <div className="flex flex-col gap-4 lg:min-w-[300px] lg:items-stretch">
              <a
                href={HEALOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl bg-coral px-8 py-5 shadow-2xl shadow-coral/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral/90 hover:shadow-coral/35 active:scale-[0.98]"
              >
                <span className="font-heading text-lg font-bold text-white">{t('cta.bookAppointment')}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>

              <a
                href={`tel:${PHONE_CALL.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-8 py-4 text-sm font-medium text-white/80 transition-all hover:bg-white/[0.09] hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('common.call')} {PHONE_CALL}
              </a>

              <div className="mt-1 flex flex-col gap-2 text-xs text-white/70">
                {[t('cta.noReferral'), t('cta.allInsurance'), t('cta.telehealth7')].map(item => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-coral/20 text-coral">
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item.replace(/^✓\s*/, '')}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  )
}
