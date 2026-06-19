import type { Metadata } from 'next'
import BookingCTA from '@/components/ui/BookingCTA'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Pediatric Urgent Care LA',
  description: 'Immediate care for non-emergency illnesses and injuries. Kids & Teens Medical Group urgent care — less waiting, same trusted pediatric care for ages 0–21.',
}

export default function UrgentCarePage() {
  return (
    <>
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-teal-light">Urgent Care</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold text-white">When Your Child Needs Care Today</h1>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Non-emergency illnesses and injuries deserve immediate attention. Our urgent care clinics are staffed by experienced pediatricians, with minimal waiting and maximum peace of mind.
          </p>
          <div className="mt-6 flex gap-4">
            <BookingCTA label="Book Now" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Immediate Care',   desc: 'Fast assessment and treatment for fevers, coughs, ear infections, sprains, cuts, and other urgent needs.'      },
            { title: 'Less Waiting',      desc: 'Shorter wait times than emergency rooms, with streamlined check-in and efficient care.'         },
            { title: 'No ER Visit Needed', desc: 'Handle most minor injuries and illnesses right here — avoid the hospital when your child doesn&apos;t need it.'             },
            { title: 'Ages 0–21',        desc: 'Our urgent care clinics serve the full pediatric age range, from infants to young adults.'},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-teal-tint p-6">
          <p className="text-sm font-medium text-teal-dark">Walk-in or book ahead for faster service. Call or text for same-day appointments.</p>
        </div>
      </div>
    </>
  )
}
