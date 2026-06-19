import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeIn from '@/components/ui/FadeIn'
import type { Service } from '@/types'

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel className="mb-2">Our Services</SectionLabel>
          <h2 className="font-heading mb-3 text-3xl font-extrabold text-teal-dark">
            Everything Your Child Needs, All in One Place
          </h2>
          <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
            From routine check-ups to urgent care — with extended hours and telehealth options.
          </p>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.07}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-brand-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-mid/40 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-tint text-2xl ring-1 ring-teal-mid/20 transition-all duration-300 group-hover:bg-teal-dark group-hover:ring-teal-dark">
                  <span className="transition-transform duration-300 group-hover:scale-110">{service.icon}</span>
                </div>
                <h3 className="font-heading mb-1 text-base font-bold text-teal-dark transition-colors group-hover:text-teal-mid">
                  {service.name}
                </h3>
                {service.hours && (
                  <p className="mb-2 text-xs font-semibold text-coral">{service.hours}</p>
                )}
                <p className="mb-5 flex-1 text-sm leading-relaxed text-brand-muted">{service.description}</p>
                <span className="text-xs font-bold text-teal-mid transition-colors duration-200 group-hover:text-coral">
                  Learn more →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
