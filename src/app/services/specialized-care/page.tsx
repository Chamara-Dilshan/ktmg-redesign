import type { Metadata } from 'next'
import BookingCTA from '@/components/ui/BookingCTA'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Specialized Pediatric Care',
  description: 'ADHD evaluation and management, allergy care, sports physicals, and adolescent health services at Kids & Teens Medical Group.',
}

export default function SpecializedCarePage() {
  return (
    <>
      <div className="bg-teal-dark px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="mb-3 text-teal-light">Specialized Care</SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold text-white">Expert Care Beyond Routine Check-ups</h1>
          <p className="mt-4 max-w-xl text-base text-white/75">
            From managing ADHD to treating allergies and preparing for sports — our pediatricians offer specialized services that go beyond routine wellness visits.
          </p>
          <div className="mt-6 flex gap-4">
            <BookingCTA label="Book Now" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'ADHD Evaluation & Management', desc: 'Comprehensive assessment, behavior strategies, medication management, and school coordination for children with ADHD.'      },
            { title: 'Allergy Care',                 desc: 'Diagnosis and treatment of allergies and asthma, including allergen testing and management plans.'         },
            { title: 'Sports Physicals',            desc: 'Pre-sports evaluations to ensure your young athlete is healthy and safe to play at their best.'             },
            { title: 'Adolescent Health',           desc: 'Specialized services for teens: mental health screening, substance use prevention, reproductive health.'},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-teal-tint p-6">
          <p className="text-sm font-medium text-teal-dark">Talk to your regular pediatrician about referrals for specialized services, or book directly with our specialists.</p>
        </div>
      </div>
    </>
  )
}
