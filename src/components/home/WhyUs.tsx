'use client'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhyUs() {
  const { t } = useLanguage()

  const features = [
    { icon: 'pin',    unitKey: 'whyUs.clinicsUnit',    descKey: 'whyUs.clinicsDesc'    },
    { icon: 'clock',  unitKey: 'whyUs.sameDayUnit',    descKey: 'whyUs.sameDayDesc'    },
    { icon: 'video',  unitKey: 'whyUs.telehealthUnit', descKey: 'whyUs.telehealthDesc' },
    { icon: 'shield', unitKey: 'whyUs.insuranceUnit',  descKey: 'whyUs.insuranceDesc'  },
  ]

  const icons: Record<string, JSX.Element> = {
    pin:    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
    clock:  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    video:  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  }

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
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">
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
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-teal-light ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-coral group-hover:text-white group-hover:ring-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    {icons[f.icon]}
                  </svg>
                </div>
                <p className="font-heading mt-5 text-lg font-bold leading-snug text-white">{t(f.unitKey)}</p>
                <div className="my-4 h-px w-8 bg-coral" />
                <p className="text-[13px] leading-relaxed text-white/65">{t(f.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
