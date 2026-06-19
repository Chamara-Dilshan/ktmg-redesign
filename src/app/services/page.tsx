import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import services from '@/data/services.json'
import type { Service } from '@/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pediatric Services',
  description: 'Kids & Teens Medical Group offers primary care, telehealth, urgent care, after-hours care, prenatal consultations, and specialized care for children 0–21.',
}

export default function ServicesPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Comprehensive Care</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Our Pediatric Services</h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          From routine well-child visits to urgent care and telehealth — we have everything your child needs, when they need it.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(services as Service[]).map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`}
                  className="group rounded-xl border border-brand-border bg-white p-7 transition-shadow hover:shadow-md">
              <div className="mb-4 text-3xl">{s.icon}</div>
              <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark group-hover:text-teal-mid">{s.name}</h2>
              {s.hours && <p className="mb-2 text-xs font-medium text-teal-mid">{s.hours}</p>}
              <p className="text-sm leading-relaxed text-brand-muted">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
