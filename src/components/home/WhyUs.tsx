'use client'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import CountUp from '@/components/ui/CountUp'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhyUs() {
  const { t } = useLanguage()

  const features = [
    { stat: '25',   unitKey: 'whyUs.clinicsUnit',    descKey: 'whyUs.clinicsDesc'    },
    { stat: 'Same', unitKey: 'whyUs.sameDayUnit',    descKey: 'whyUs.sameDayDesc'    },
    { stat: '7',    unitKey: 'whyUs.telehealthUnit', descKey: 'whyUs.telehealthDesc' },
    { stat: 'All',  unitKey: 'whyUs.insuranceUnit',  descKey: 'whyUs.insuranceDesc'  },
  ]

  return (
    <section className="bg-teal-dark">
      {/* Editorial header — image split */}
      <div className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2">
            {/* Left: text */}
            <FadeIn>
              <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-20">
                <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.0] tracking-tight text-white heading-tight">
                  {t('whyUs.headline1')}<br />
                  <span className="text-coral">{t('whyUs.headline2')}</span>
                </h2>
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/50">
                  {t('whyUs.subtitle')}
                </p>
              </div>
            </FadeIn>

            {/* Right: image */}
            <FadeIn delay={0.15} direction="left">
              <div className="relative hidden min-h-[380px] overflow-hidden lg:block">
                <Image
                  src="/pediatric-highfive.jpg"
                  alt="Pediatric nurse high-fiving a child patient"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/70 via-teal-dark/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/40 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Feature columns */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.07] lg:grid-cols-4 lg:divide-y-0">
          {features.map((f, i) => (
            <FadeIn key={f.unitKey} delay={i * 0.08}>
              <div className="group px-8 py-12 transition-colors duration-300 hover:bg-white/[0.03] md:px-10">
                <p className="font-heading text-[2.75rem] font-extrabold leading-none tracking-tight text-white">
                  <CountUp value={f.stat} />
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-wide text-coral">{t(f.unitKey)}</p>
                <div className="my-5 h-px bg-white/[0.07]" />
                <p className="text-[13px] leading-relaxed text-white/45">{t(f.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
