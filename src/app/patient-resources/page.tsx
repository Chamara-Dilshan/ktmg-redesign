import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import { PORTAL_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Patient Resources',
  description: 'Vaccine schedules, developmental milestone guides, sports letters, patient forms, and educational resources from Kids & Teens Medical Group.',
}

const resources = [
  {
    icon: '💉',
    title: 'Immunization Schedule',
    desc: 'AAP-recommended vaccine schedule for children from birth through 18 years.',
    action: 'Download PDF',
    href: '/resources/immunization-schedule.pdf',
    external: false,
  },
  {
    icon: '🏃',
    title: 'Sports Policy Letter',
    desc: 'Required letter for school or athletic participation. Download and bring to your next visit.',
    action: 'Download PDF',
    href: '/resources/sports-policy-letter.pdf',
    external: false,
  },
  {
    icon: '📋',
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
  { age: '6 Months',  href: '/resources/milestones-6mo.pdf'  },
  { age: '12 Months', href: '/resources/milestones-12mo.pdf' },
  { age: '18 Months', href: '/resources/milestones-18mo.pdf' },
  { age: '24 Months', href: '/resources/milestones-24mo.pdf' },
]

export default function PatientResourcesPage() {
  return (
    <>
      <PageHero
        label="Patient Resources"
        title="Resources for Your Family"
        subtitle="Everything you need to support your child's health journey — from vaccination schedules to developmental milestones."
      />

      <div className="bg-brand-bg px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Main resources */}
          <div className="mb-12 grid gap-5 md:grid-cols-3">
            {resources.map(r => (
              <div key={r.title} className="flex flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-xl ring-1 ring-teal-mid/10">
                  {r.icon}
                </div>
                <div className="mb-3 h-px w-8 bg-coral/60" />
                <h3 className="font-heading mb-2 font-bold text-teal-dark">{r.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-brand-muted">{r.desc}</p>
                <a
                  href={r.href}
                  target={r.external ? '_blank' : undefined}
                  rel={r.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-coral hover:underline"
                >
                  {r.action} →
                </a>
              </div>
            ))}
          </div>

          {/* Developmental milestones */}
          <div>
            <h2 className="font-heading mb-2 text-xl font-extrabold text-teal-dark">
              Developmental Milestone Guides
            </h2>
            <p className="mb-5 text-sm text-brand-muted">
              Download age-specific guides to track your child&apos;s growth and development.
            </p>
            <div className="flex flex-wrap gap-2">
              {milestones.map(m => (
                <a
                  key={m.age}
                  href={m.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white px-5 py-2.5 text-sm font-medium text-teal-dark transition-colors hover:bg-teal-tint"
                >
                  {m.age}
                  <svg className="h-3 w-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
