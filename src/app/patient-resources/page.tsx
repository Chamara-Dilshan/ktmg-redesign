import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { PORTAL_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Patient Resources',
  description: 'Vaccine schedules, developmental milestone guides, sports letters, patient forms, and educational resources from Kids & Teens Medical Group.',
}

const resources = [
  {
    title: 'Immunization Schedule',
    desc: 'AAP-recommended vaccine schedule for children from birth through 18 years.',
    action: 'Download PDF',
    href: '/resources/immunization-schedule.pdf',
  },
  {
    title: 'Sports Policy Letter',
    desc: 'Required letter for school or athletic participation. Download and bring to your next visit.',
    action: 'Download PDF',
    href: '/resources/sports-policy-letter.pdf',
  },
  {
    title: 'Patient Forms / Refills / Labs',
    desc: 'Access and submit patient forms, request prescription refills, and view lab results.',
    action: 'Go to Portal',
    href: PORTAL_URL,
    external: true,
  },
]

const milestones = [
  { age: '2 Months',  href: '/resources/milestones-2mo.pdf'  },
  { age: '4 Months',  href: '/resources/milestones-4mo.pdf'  },
  { age: '6 Months',  href: '/resources/milestones-6mo.pdf'  },  // previously broken — upload PDF before launch
  { age: '12 Months', href: '/resources/milestones-12mo.pdf' },
  { age: '18 Months', href: '/resources/milestones-18mo.pdf' },  // previously broken — upload PDF before launch
  { age: '24 Months', href: '/resources/milestones-24mo.pdf' },
]

export default function PatientResourcesPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Patient Resources</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Resources for Your Family</h1>
        <p className="mb-12 max-w-xl text-sm leading-relaxed text-brand-muted">
          Everything you need to support your child&apos;s health journey — from vaccination schedules to developmental milestones.
        </p>

        {/* Main resources */}
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {resources.map(r => (
            <div key={r.title} className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-heading mb-2 font-bold text-teal-dark">{r.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-brand-muted">{r.desc}</p>
              <a href={r.href}
                 target={r.external ? '_blank' : undefined}
                 rel={r.external ? 'noopener noreferrer' : undefined}
                 className="text-sm font-semibold text-coral hover:underline">
                {r.action} →
              </a>
            </div>
          ))}
        </div>

        {/* Developmental milestones */}
        <div>
          <h2 className="font-heading mb-5 text-2xl font-bold text-teal-dark">Developmental Milestone Guides</h2>
          <p className="mb-6 text-sm text-brand-muted">
            Download age-specific guides to track your child&apos;s growth and development.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:flex md:flex-wrap">
            {milestones.map(m => (
              <a key={m.age} href={m.href}
                 className="rounded-lg border border-brand-border bg-white px-4 py-2.5 text-center text-sm font-medium text-teal-dark hover:bg-teal-tint md:px-5">
                {m.age}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
