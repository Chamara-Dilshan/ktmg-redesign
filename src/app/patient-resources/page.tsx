import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import { PORTAL_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Patient Resources',
  description: 'Vaccine schedules, developmental milestone guides, sports letters, patient forms, and educational resources from Kids & Teens Medical Group.',
}

function RIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
      className="h-6 w-6" aria-hidden="true">
      {children}
    </svg>
  )
}

const resources = [
  {
    icon: (
      <RIcon>
        {/* ClipboardDocumentCheck — immunization schedule */}
        <path d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </RIcon>
    ),
    title: 'Immunization Schedule',
    desc: 'AAP-recommended vaccine schedule for children from birth through 18 years.',
    action: 'Download PDF',
    href: '/resources/immunization-schedule.pdf',
    external: false,
  },
  {
    icon: (
      <RIcon>
        {/* DocumentArrowDown — sports policy letter download */}
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </RIcon>
    ),
    title: 'Sports Policy Letter',
    desc: 'Required letter for school or athletic participation. Download and bring to your next visit.',
    action: 'Download PDF',
    href: '/resources/sports-policy-letter.pdf',
    external: false,
  },
  {
    icon: (
      <RIcon>
        {/* ClipboardDocumentList — patient forms / portal */}
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </RIcon>
    ),
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
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal-mid ring-1 ring-teal-mid/10">
                  {r.icon}
                </div>
                <div className="mb-3 h-px w-8 bg-coral/60" />
                <h3 className="font-heading mb-2 font-bold text-teal-dark">{r.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-brand-muted">{r.desc}</p>
                <a
                  href={r.href}
                  target={r.external ? '_blank' : undefined}
                  rel={r.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-coral-ink hover:underline"
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
