import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import type { Service } from '@/types'


export default function ServicesGrid({ services }: { services: Service[] }) {
  const [featured, ...rest] = services

  return (
    <section className="bg-brand-bg px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">Our Services</p>
              <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.0] tracking-tight text-teal-dark heading-tight">
                Every kind of care<br />
                your child needs.
              </h2>
            </div>
            <Link
              href="/services"
              className="shrink-0 rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-semibold text-brand-text transition-colors hover:border-teal-mid hover:text-teal-mid"
            >
              View all services →
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Featured card */}
          <FadeIn className="lg:col-span-1 lg:row-span-2">
            <Link
              href={`/services/${featured.slug}`}
              className="group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl bg-teal-dark p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-dark/30"
            >
              {/* Decorative arc */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/[0.06]" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/[0.06]" />

              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.1] text-3xl ring-1 ring-white/10">
                  {featured.icon}
                </div>
                <div className="mb-4 h-px w-10 bg-coral" />
                <h3 className="font-heading mb-3 text-2xl font-extrabold leading-snug text-white">
                  {featured.name}
                </h3>
                {featured.hours && (
                  <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-coral/20 px-3 py-1 text-xs font-semibold text-coral">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                    {featured.hours}
                  </p>
                )}
                <p className="text-[13px] leading-relaxed text-white/55">{featured.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-coral transition-all duration-200 group-hover:gap-3">
                Learn more
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral/20 text-xs transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          </FadeIn>

          {/* Remaining cards */}
          {rest.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white"
              >
                {/* Top accent line */}
                <div className={`h-[3px] w-full shrink-0 ${i % 2 === 0 ? 'bg-coral' : 'bg-teal-mid'}`} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-xl ring-1 ring-teal-mid/15 transition-all duration-200 group-hover:bg-teal-dark group-hover:ring-0">
                    <span className="transition-transform duration-200 group-hover:scale-110">{service.icon}</span>
                  </div>
                  <h3 className="font-heading mb-1.5 text-[15px] font-bold text-teal-dark group-hover:text-teal-mid">
                    {service.name}
                  </h3>
                  {service.hours && (
                    <p className="mb-2 text-[11px] font-semibold text-coral">{service.hours}</p>
                  )}
                  <p className="mb-5 flex-1 text-[13px] leading-relaxed text-brand-muted">{service.description}</p>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-mid transition-colors group-hover:text-coral">
                    Learn more →
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
