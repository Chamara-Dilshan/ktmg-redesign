'use client'
import { useState, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { CAREERS_FORM_URL } from '@/lib/constants'

type Tab = 'los-angeles' | 'sri-lanka' | 'mexico'
type SubmitState = 'idle' | 'sending' | 'success' | 'error'

const tabs: { id: Tab; label: string; flag: string }[] = [
  { id: 'los-angeles', label: 'Los Angeles', flag: '🇺🇸' },
  { id: 'sri-lanka',   label: 'Sri Lanka',   flag: '🇱🇰' },
  { id: 'mexico',      label: 'Mexico',      flag: '🇲🇽' },
]

export default function CareersPage() {
  const [activeTab, setActiveTab]     = useState<Tab>('los-angeles')
  const [form, setForm]               = useState({ firstName: '', lastName: '', phone: '', email: '', position: '' })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const cvRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitState('sending')

    const data = new FormData()
    data.append('firstName', form.firstName)
    data.append('lastName',  form.lastName)
    data.append('phone',     form.phone)
    data.append('email',     form.email)
    data.append('position',  form.position)
    if (cvRef.current?.files?.[0]) data.append('cv', cvRef.current.files[0])

    try {
      const res = await fetch(CAREERS_FORM_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitState('success')
        setForm({ firstName: '', lastName: '', phone: '', email: '', position: '' })
        if (cvRef.current) cvRef.current.value = ''
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-teal-dark px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-mid/[0.07]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-[320px] w-[320px] rounded-full bg-coral/[0.04]" />
        <div className="relative mx-auto max-w-4xl">
          <SectionLabel className="mb-4 [&_p]:text-teal-light [&>span:first-child]:bg-teal-light">
            Careers
          </SectionLabel>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Build the Career You Want at Kids &amp; Teens
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            With 18 years of excellence, Kids &amp; Teens offers a respected, supportive environment. Our
            patient-centric approach fosters a nurturing space for healthcare providers across three regions.
          </p>
          {/* Employer brands */}
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80">
              Kids &amp; Teens Medical Group
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80">
              St. Gianna Medical Group
            </span>
          </div>
        </div>
      </div>

      <div className="bg-brand-bg px-6 py-14 md:px-12">
        <div className="mx-auto max-w-4xl">

          {/* Region tabs */}
          <div className="mb-2 border-b border-brand-border">
            <div role="tablist" className="-mb-px flex gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap px-5 py-2.5 text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-coral text-coral'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  <span>{tab.flag}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div role="tabpanel" className="mb-10 rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
            {activeTab === 'los-angeles' && (
              <div>
                <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Los Angeles Positions</h2>
                <p className="mb-4 text-sm leading-relaxed text-brand-muted">
                  We are actively recruiting across all 25 LA-area clinics. Positions include pediatricians, nurse
                  practitioners, physician assistants, and administrative staff.
                </p>
                <p className="text-sm text-brand-muted">
                  View open positions and apply at{' '}
                  <a
                    href="https://www.indeed.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-coral hover:underline"
                  >
                    Indeed
                  </a>{' '}
                  or through our social media pages.
                </p>
              </div>
            )}
            {activeTab === 'sri-lanka' && (
              <div>
                <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Sri Lanka Positions</h2>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Kids &amp; Teens Medical Group operates in Sri Lanka, expanding quality pediatric care to South Asia.
                  We are recruiting qualified healthcare professionals who share our mission of compassionate,
                  comprehensive care.
                </p>
              </div>
            )}
            {activeTab === 'mexico' && (
              <div>
                <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Mexico Positions</h2>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Our Mexico operations bring trusted pediatric services to Mexican communities. We welcome experienced
                  pediatric healthcare providers who are passionate about serving families.
                </p>
              </div>
            )}
          </div>

          {/* Application form */}
          <div className="rounded-2xl border border-brand-border bg-white p-8 shadow-sm">
            <h2 className="font-heading mb-6 text-xl font-bold text-teal-dark">Apply Now</h2>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  First Name *
                </label>
                <input
                  id="firstName"
                  required
                  value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal-mid focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  required
                  value={form.lastName}
                  onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal-mid focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  Phone *
                </label>
                <input
                  id="phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal-mid focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  Email *
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal-mid focus:bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="position" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  Position Applying For *
                </label>
                <input
                  id="position"
                  required
                  value={form.position}
                  onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                  placeholder="e.g. Pediatrician, NP, Front Desk"
                  className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal-mid focus:bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cv" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  CV / Resume
                </label>
                <input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={cvRef}
                  className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                {submitState === 'success' ? (
                  <div className="rounded-xl border border-teal-mid bg-teal-tint px-6 py-4 text-sm font-semibold text-teal-dark">
                    ✅ Application received! We&apos;ll be in touch shortly.
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={submitState === 'sending'}
                      className="rounded-full bg-coral px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {submitState === 'sending' ? 'Sending…' : 'Submit Application'}
                    </button>
                    {submitState === 'error' && (
                      <p className="mt-2 text-xs text-coral">
                        Something went wrong. Please email us at customerservice@ktdoctor.com.
                      </p>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
