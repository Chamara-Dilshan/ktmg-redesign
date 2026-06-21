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
    <>
      {/* Page hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.07]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel className="mb-3 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">Comprehensive Care</SectionLabel>
          <h1 className="font-heading mt-1 text-4xl font-extrabold tracking-tight text-white heading-tight md:text-5xl">
            Our Pediatric Services
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            From routine well-child visits to urgent care and telehealth — we have everything your child needs, when they need it.
          </p>
        </div>
      </div>

      <div className="bg-brand-bg px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {(services as Service[]).map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white"
              >
                <div className={`h-[3px] shrink-0 ${i % 2 === 0 ? 'bg-teal-mid' : 'bg-coral'}`} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-tint text-2xl ring-1 ring-teal-mid/10 transition-all duration-200 group-hover:bg-teal-dark">
                    {s.icon}
                  </div>
                  <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark group-hover:text-teal-mid transition-colors">{s.name}</h2>
                  {s.hours && (
                    <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-coral">
                      <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                      {s.hours}
                    </p>
                  )}
                  <p className="flex-1 text-sm leading-relaxed text-brand-muted">{s.description}</p>
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-mid transition-colors group-hover:text-coral">
                      Learn more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
