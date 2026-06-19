import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeIn from '@/components/ui/FadeIn'
import type { Service } from '@/types'

const accentColors = ['bg-coral', 'bg-teal-mid', 'bg-teal-dark', 'bg-coral', 'bg-teal-mid']

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [featured, ...rest] = services

  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel className="mb-2">Our Services</SectionLabel>
          <h2 className="font-heading mb-10 text-3xl font-extrabold text-teal-dark">
            Everything Your Child Needs,<br className="hidden sm:block" /> All in One Place
          </h2>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Featured card — dark, spans 2 rows on large screens */}
          <FadeIn className="lg:col-span-1 lg:row-span-2">
            <Link
              href={`/services/${featured.slug}`}
              className="group flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl bg-teal-dark p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div>
                <div className="mb-5 text-5xl">{featured.icon}</div>
                <div className="mb-3 h-0.5 w-10 bg-coral" />
                <h3 className="font-heading mb-3 text-2xl font-extrabold text-white">
                  {featured.name}
                </h3>
                {featured.hours && (
                  <p className="mb-3 text-xs font-semibold text-coral">{featured.hours}</p>
                )}
                <p className="text-sm leading-relaxed text-white/60">{featured.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-coral transition-transform duration-200 group-hover:translate-x-1">
                Learn more →
              </span>
            </Link>
          </FadeIn>

          {/* Remaining cards */}
          {rest.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
              >
                <div className={`h-1 w-full flex-none ${accentColors[i % accentColors.length]}`} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-tint text-xl ring-1 ring-teal-mid/20 transition-all duration-300 group-hover:bg-teal-dark">
                    <span className="transition-transform duration-300 group-hover:scale-110">{service.icon}</span>
                  </div>
                  <h3 className="font-heading mb-1 text-sm font-bold text-teal-dark group-hover:text-teal-mid">
                    {service.name}
                  </h3>
                  {service.hours && (
                    <p className="mb-1 text-xs font-semibold text-coral">{service.hours}</p>
                  )}
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-brand-muted">{service.description}</p>
                  <span className="text-xs font-bold text-teal-mid group-hover:text-coral">Learn more →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
