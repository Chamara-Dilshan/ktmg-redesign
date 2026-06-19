import type { Metadata } from 'next'
import BookingCTA from '@/components/ui/BookingCTA'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Primary Care for Children',
  description: 'Kids & Teens Medical Group primary care clinics across Los Angeles. Serving children ages 0–21 with routine check-ups, immunizations, and same-day appointments.',
}

export default function PrimaryCarePage() {
  return (
    <>
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-teal-light">Primary Care</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold text-white">Primary Care Across Los Angeles</h1>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Routine check-ups, immunizations, and ongoing wellness care for children ages 0–21. Walk-in and same-day appointments available at 25 locations.
          </p>
          <div className="mt-6 flex gap-4">
            <BookingCTA label="Book Now" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Well-Child Visits',       desc: 'Regular check-ups from newborn through adolescence, tracking growth and development milestones.'      },
            { title: 'Immunizations',            desc: 'Full pediatric vaccination schedule following AAP guidelines, with easy scheduling and records.'         },
            { title: 'Same-Day Appointments',   desc: 'Walk-in or call to book same-day — available at all 25 locations, Monday through Friday.'             },
            { title: 'Ages 0–21',               desc: 'We care for patients from newborns through young adults, ensuring continuity of care across every stage.'},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-teal-tint p-6">
          <p className="text-sm font-medium text-teal-dark">Office Hours: Mon–Fri 9AM–6PM · Telehealth: Mon–Sun 9AM–8PM</p>
        </div>
      </div>
    </>
  )
}
