import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'
import type { Service } from '@/types'

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Our Services</SectionLabel>
        <h2 className="font-heading mb-3 text-3xl font-extrabold text-teal-dark">
          Everything Your Child Needs, All in One Place
        </h2>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          From routine check-ups to urgent care — with extended hours and telehealth options.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div key={service.slug} className="rounded-xl border border-brand-border bg-white p-7 transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-xl">
                {service.icon}
              </div>
              <h3 className="font-heading mb-2 text-base font-bold text-teal-dark">{service.name}</h3>
              {service.hours && (
                <p className="mb-1 text-xs font-medium text-teal-mid">{service.hours}</p>
              )}
              <p className="mb-5 text-sm leading-relaxed text-brand-muted">{service.description}</p>
              <BookingCTA label={service.ctaLabel} className="text-xs px-4 py-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
