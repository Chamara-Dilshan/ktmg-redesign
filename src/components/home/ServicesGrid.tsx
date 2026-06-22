'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { useLanguage, slugToCamel } from '@/contexts/LanguageContext'
import type { Service } from '@/types'

const URGENT_SLUGS = new Set(['urgent-care', 'after-hours-care'])

export default function ServicesGrid({ services }: { services: Service[] }) {
  const { t } = useLanguage()
  const [featured, ...rest] = services
  const regularCards = rest.slice(0, -1)
  const wideCard = rest[rest.length - 1]

  const tService = (service: Service) => ({
    ...service,
    name: t(`serviceData.${slugToCamel(service.slug)}.name`) || service.name,
    description: t(`serviceData.${slugToCamel(service.slug)}.description`) || service.description,
    hours: service.hours ? (t(`serviceData.${slugToCamel(service.slug)}.hours`) || service.hours) : undefined,
  })

  const tFeatured = tService(featured)
  const tWide = tService(wideCard)

  return (
    <section className="bg-brand-bg px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">{t('servicesGrid.label')}</p>
              <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.0] tracking-tight text-teal-dark heading-tight">
                {t('servicesGrid.headline1')}<br />
                {t('servicesGrid.headline2')}
              </h2>
            </div>
            <Link
              href="/services"
              className="shrink-0 rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-semibold text-brand-text transition-colors hover:border-teal-mid hover:text-teal-mid"
            >
              {t('servicesGrid.viewAll')}
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Featured card — large, spans 2 rows */}
          <FadeIn className="lg:col-span-1 lg:row-span-2">
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="h-full"
            >
              <Link
                href={`/services/${tFeatured.slug}`}
                className="group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl bg-teal-dark p-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-coral/20 blur-3xl"
                />
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/[0.06]" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/[0.06]" />

                <div>
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.1] text-white ring-1 ring-white/10"
                  >
                    <ServiceIcon slug={tFeatured.slug} className="h-7 w-7" />
                  </motion.div>
                  <div className="mb-4 h-px w-10 bg-coral" />
                  <h3 className="font-heading mb-3 text-2xl font-extrabold leading-snug text-white">
                    {tFeatured.name}
                  </h3>
                  {tFeatured.hours && (
                    <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-coral/20 px-3 py-1 text-xs font-semibold text-coral">
                      <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                      {tFeatured.hours}
                    </p>
                  )}
                  <p className="text-[13px] leading-relaxed text-white/55">{tFeatured.description}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-coral transition-all duration-200 group-hover:gap-3">
                  {t('servicesGrid.learnMore')}
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-coral/20 text-xs"
                  >→</motion.span>
                </span>
              </Link>
            </motion.div>
          </FadeIn>

          {/* Regular cards — 4 cards filling the 2×2 right of the featured */}
          {regularCards.map((service, i) => {
            const ts = tService(service)
            const isUrgent = URGENT_SLUGS.has(service.slug)
            return (
              <FadeIn key={service.slug} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(7,63,73,0.18)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white"
                  >
                    {/* Accent bar: 1/3 visible at rest, expands on hover */}
                    <div className="relative h-[3px] w-full shrink-0 overflow-hidden">
                      <div className={`h-full w-1/3 ${isUrgent ? 'bg-coral' : 'bg-teal-mid'}`} />
                      <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute inset-0 ${isUrgent ? 'bg-coral' : 'bg-teal-mid'}`}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <motion.div
                        whileHover={{ rotate: [-4, 4, -2, 0], scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-colors duration-300
                          ${isUrgent
                            ? 'bg-coral/10 text-coral ring-coral/20 group-hover:bg-coral group-hover:text-white group-hover:ring-0'
                            : 'bg-teal-tint text-teal-mid ring-teal-mid/15 group-hover:bg-teal-dark group-hover:text-white group-hover:ring-0'
                          }`}
                      >
                        <ServiceIcon slug={service.slug} className="h-5 w-5" />
                      </motion.div>
                      <h3 className="font-heading mb-1.5 text-[15px] font-bold text-teal-dark transition-colors duration-200 group-hover:text-teal-mid">
                        {ts.name}
                      </h3>
                      {ts.hours && (
                        <p className={`mb-2 text-[11px] font-semibold ${isUrgent ? 'text-coral' : 'text-teal-mid'}`}>{ts.hours}</p>
                      )}
                      <p className="mb-5 flex-1 text-[13px] leading-relaxed text-brand-muted">{ts.description}</p>
                      <motion.span
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className={`flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:text-coral
                          ${isUrgent ? 'text-coral' : 'text-teal-mid'}`}
                      >
                        {t('servicesGrid.learnMore')} →
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              </FadeIn>
            )
          })}

          {/* Wide card — Specialized Care — spans full bottom row */}
          <FadeIn delay={0.24} className="lg:col-span-3">
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(7,63,73,0.14)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            >
              <Link
                href={`/services/${wideCard.slug}`}
                className="group flex flex-col gap-5 overflow-hidden rounded-2xl border border-brand-border bg-white p-6 sm:flex-row sm:items-center"
              >
                <motion.div
                  whileHover={{ rotate: [-4, 4, -2, 0], scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-tint text-teal-mid ring-1 ring-teal-mid/15 transition-colors duration-300 group-hover:bg-teal-dark group-hover:text-white group-hover:ring-0"
                >
                  <ServiceIcon slug={wideCard.slug} className="h-7 w-7" />
                </motion.div>

                <div className="min-w-0 shrink-0 sm:w-56">
                  <h3 className="font-heading text-[15px] font-bold text-teal-dark transition-colors duration-200 group-hover:text-teal-mid">
                    {tWide.name}
                  </h3>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-brand-muted">{tWide.description}</p>
                </div>

                <div className="hidden h-8 w-px shrink-0 bg-brand-border sm:block" />

                <div className="flex flex-wrap gap-2">
                  {['ADHD & Behavioral', 'Allergy Care', 'Sports Physicals', 'Adolescent Health'].map(tag => (
                    <span key={tag} className="rounded-full bg-teal-tint px-3 py-1 text-[11px] font-semibold text-teal-mid ring-1 ring-teal-mid/15">
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.span
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-teal-mid transition-colors group-hover:text-coral sm:ml-auto sm:flex"
                >
                  {t('servicesGrid.learnMore')} →
                </motion.span>
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
