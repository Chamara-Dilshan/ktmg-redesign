import type { Metadata } from 'next'
import BookingCTA from '@/components/ui/BookingCTA'
import SectionLabel from '@/components/ui/SectionLabel'
import { PHONE_TEXT_ES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Telehealth for Children',
  description: 'Video visits from the comfort of home. Kids & Teens Medical Group telehealth services available Mon–Sun 9AM–8PM. Also available in Spanish.',
}

export default function TelehealthPage() {
  return (
    <>
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-teal-light">Telehealth</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold text-white">Convenient Care from Home</h1>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Video visits with our pediatricians from the comfort of your home. Available seven days a week, plus evening hours for working families.
          </p>
          <div className="mt-6 flex gap-4">
            <BookingCTA label="Book Now" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Convenience',       desc: 'No travel time — video visits from home, school, or anywhere with a safe, private space.'      },
            { title: 'Quick Access',      desc: 'Often same-day or next-day appointments available, with shorter wait times than in-person visits.'         },
            { title: 'Flexible Scheduling', desc: 'Open seven days a week, including early mornings and evenings to fit your family&apos;s schedule.'             },
            { title: 'Continuity of Care', desc: 'Work with your child&apos;s regular pediatrician or another trusted KTMG provider via secure video.'},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-teal-tint p-6">
          <p className="text-sm font-medium text-teal-dark">Hours: Mon–Sun 9AM–8PM</p>
          <p className="mt-3 text-xs text-teal-dark">Also available in Spanish — text {PHONE_TEXT_ES}</p>
        </div>
      </div>
    </>
  )
}
