'use client'
import Image from 'next/image'
import BookingCTA from '@/components/ui/BookingCTA'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/contexts/LanguageContext'

const partnerLogos = [
  { name: 'Regal Medical Group',    src: '/partners/regal.png'      },
  { name: 'L.A. Care Health Plan',  src: '/partners/la-care.png'    },
  { name: 'Optum',                  src: '/partners/optum.webp'     },
  { name: 'Molina Healthcare',      src: '/partners/molina.webp'    },
  { name: "Children's Hospital LA", src: '/partners/chla.webp'      },
  { name: 'Cedars-Sinai',           src: '/partners/cedars.png'     },
  { name: 'Providence',             src: '/partners/providence.png' },
]

const textPartners = ['Medi-Cal', 'Blue Cross', 'Lakeside', 'Health Care Partners']

export default function InsuranceSection() {
  const { t } = useLanguage()

  const highlights = [
    'insurance.hmo',
    'insurance.medicaid',
    'insurance.selfPay',
  ]

  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">

          {/* Left */}
          <FadeIn>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">{t('insurance.label')}</p>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-teal-dark heading-tight">
              {t('insurance.headline1')}<br />
              {t('insurance.headline2')}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-brand-muted">
              {t('insurance.subtitle')}
            </p>

            <div className="mt-6 space-y-2.5">
              {highlights.map(key => (
                <div key={key} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-tint">
                    <svg className="h-3 w-3 text-teal-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-brand-text">{t(key)}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <BookingCTA label={t('insurance.checkInsurance')} />
            </div>
          </FadeIn>

          {/* Right — logos */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {partnerLogos.map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center justify-center rounded-2xl border border-brand-border bg-brand-bg p-4 transition-all duration-200 hover:border-teal-mid/20 hover:bg-teal-tint hover:shadow-sm"
                  style={{ transitionDelay: `${i * 35}ms` }}
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={100}
                    height={40}
                    className="max-h-9 w-auto object-contain opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {textPartners.map(p => (
                <span
                  key={p}
                  className="rounded-full border border-brand-border bg-brand-bg px-4 py-1.5 text-xs font-semibold text-brand-muted transition-colors hover:border-teal-mid/20 hover:bg-teal-tint"
                >
                  {p}
                </span>
              ))}
              <span className="rounded-full border border-dashed border-brand-border px-4 py-1.5 text-xs text-brand-muted">
                {t('insurance.andMore')}
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
