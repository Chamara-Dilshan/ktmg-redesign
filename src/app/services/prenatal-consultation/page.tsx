import type { Metadata } from 'next'
import BookingCTA from '@/components/ui/BookingCTA'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Prenatal Consultation',
  description: 'Meet your pediatrician before baby arrives. Kids & Teens Medical Group prenatal consultations help families prepare for their newborn\'s care.',
}

export default function PrenatalConsultationPage() {
  return (
    <>
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-teal-light">Prenatal Consultation</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold text-white">Meet Your Baby&apos;s Pediatrician</h1>
          <p className="mt-4 max-w-xl text-base text-white/75">
            Getting ready for baby&apos;s arrival? Schedule a prenatal consultation to meet your pediatrician, ask questions, and plan your newborn&apos;s first days of care.
          </p>
          <div className="mt-6 flex gap-4">
            <BookingCTA label="Book Now" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Meet Your Pediatrician', desc: 'Get to know the doctor who&apos;ll care for your newborn, discuss your parenting approach, and build trust before baby arrives.'      },
            { title: 'Answer Your Questions',   desc: 'Breastfeeding, sleep, feeding schedules, vaccines — ask everything. We&apos;re here to prepare you for success.'         },
            { title: 'Hospital Coordination',   desc: 'We coordinate with partner hospitals in LA for first visits and hospital birth follow-ups.'             },
            { title: 'Newborn Preparation',    desc: 'Learn what to expect during your newborn&apos;s first checkups, screening tests, and ongoing preventive care.'},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-teal-tint p-6">
          <p className="text-sm font-medium text-teal-dark">Schedule your consultation during the third trimester to ensure continuity of care for your newborn.</p>
        </div>
      </div>
    </>
  )
}
