'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import BookingCTA from '@/components/ui/BookingCTA'
import { useLanguage } from '@/contexts/LanguageContext'
import { PHONE_CALL } from '@/lib/constants'
import { DISTANCE, DURATION, EASE_OUT } from '@/lib/motion'

// Hero animates on mount (it's above the fold) rather than on scroll-in,
// but shares the site's entrance curve/duration/distance for consistency.
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: DISTANCE },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION, delay, ease: EASE_OUT },
})

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], ['0%', '25%'])
  const { t } = useLanguage()

  return (
    <section ref={sectionRef} className="relative flex min-h-[94vh] flex-col overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 will-change-transform">
        <Image
          src="/hero-clinic.png"
          alt="Kids & Teens Medical Group clinic"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Overlays — mobile keeps a strong scrim across the full width so text stays
          legible over the bright image; desktop fades to reveal more of the photo. */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-dark via-teal-dark/92 to-teal-dark/80 md:via-teal-dark/88 md:to-teal-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/85 via-teal-dark/20 to-transparent md:from-teal-dark/80 md:via-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 md:px-12">
          <div className="max-w-[680px]">

            {/* Trust badge */}
            <motion.div
              {...fadeUp(0)}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-2"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-coral-ink text-[8px] text-white">★</span>
              <span className="text-xs font-medium tracking-wide text-white/80">{t('hero.badge')}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.08)}
              className="font-heading mb-7 text-[clamp(2.5rem,8.5vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-white heading-tighter"
            >
              {t('hero.headline1')}{' '}<br />
              {t('hero.headline2')}{' '}
              <span className="text-teal-light">{t('hero.headline3')}</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...fadeUp(0.18)}
              className="mb-9 max-w-md text-[15px] leading-[1.8] text-white/80"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.28)} className="flex flex-wrap items-center gap-3">
              <BookingCTA label={t('hero.bookAppointment')} className="animate-pulse-glow" />
              <a
                href={`tel:${PHONE_CALL.replace(/\D/g, '')}`}
                className="hidden items-center gap-2 text-sm text-white/65 transition-colors hover:text-white md:flex"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE_CALL}
              </a>
            </motion.div>

            {/* Trust signals — social proof rating + scannable feature pills */}
            <motion.div
              {...fadeUp(0.38)}
              className="mt-10 flex flex-wrap items-center gap-2.5"
            >
              <div className="flex items-center gap-1.5 pr-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-xs text-coral">★</span>
                  ))}
                </div>
                <span className="text-xs font-medium text-white/85">{t('hero.reviews')}</span>
              </div>

              {['hero.ticker.1', 'hero.ticker.2', 'hero.ticker.3'].map(key => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  {t(key)}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  )
}
