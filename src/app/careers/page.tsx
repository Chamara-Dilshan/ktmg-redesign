'use client'
import { useState, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import { useLanguage } from '@/contexts/LanguageContext'
import { CAREERS_FORM_URL } from '@/lib/constants'

type Tab = 'los-angeles' | 'sri-lanka' | 'mexico'
type SubmitState = 'idle' | 'sending' | 'success' | 'error'

export default function CareersPage() {
  const [activeTab, setActiveTab]     = useState<Tab>('los-angeles')
  const [form, setForm]               = useState({ firstName: '', lastName: '', phone: '', email: '', position: '' })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const cvRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  const tabs = [
    { id: 'los-angeles' as Tab, labelKey: 'careersPage.tabLA',        flag: '🇺🇸' },
    { id: 'sri-lanka'   as Tab, labelKey: 'careersPage.tabSriLanka',   flag: '🇱🇰' },
    { id: 'mexico'      as Tab, labelKey: 'careersPage.tabMexico',     flag: '🇲🇽' },
  ]

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
            {t('careersPage.label')}
          </SectionLabel>
          <h1 className="font-heading text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold tracking-tight text-white">
            {t('careersPage.title')}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            {t('careersPage.subtitle')}
          </p>
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
                      ? 'border-b-2 border-coral text-coral-ink'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  <span>{tab.flag}</span>
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div role="tabpanel" className="mb-10 rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
            {activeTab === 'los-angeles' && (
              <div>
                <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">{t('careersPage.laTitle')}</h2>
                <p className="mb-4 text-sm leading-relaxed text-brand-muted">{t('careersPage.laDesc1')}</p>
                <p className="text-sm text-brand-muted">
                  {t('careersPage.laDesc2')}{' '}
                  <a
                    href="https://www.indeed.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-coral-ink hover:underline"
                  >
                    {t('careersPage.indeedLabel')}
                  </a>{' '}
                  or through our social media pages.
                </p>
              </div>
            )}
            {activeTab === 'sri-lanka' && (
              <div>
                <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">{t('careersPage.sriLankaTitle')}</h2>
                <p className="text-sm leading-relaxed text-brand-muted">{t('careersPage.sriLankaDesc')}</p>
              </div>
            )}
            {activeTab === 'mexico' && (
              <div>
                <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">{t('careersPage.mexicoTitle')}</h2>
                <p className="text-sm leading-relaxed text-brand-muted">{t('careersPage.mexicoDesc')}</p>
              </div>
            )}
          </div>

          {/* Application form */}
          <div className="rounded-2xl border border-brand-border bg-white p-8 shadow-sm">
            <h2 className="font-heading mb-6 text-xl font-bold text-teal-dark">{t('careersPage.applyNow')}</h2>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  {t('careersPage.firstName')}
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
                  {t('careersPage.lastName')}
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
                  {t('careersPage.phone')}
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
                  {t('careersPage.email')}
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
                  {t('careersPage.position')}
                </label>
                <input
                  id="position"
                  required
                  value={form.position}
                  onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                  placeholder={t('careersPage.positionPlaceholder')}
                  className="w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal-mid focus:bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cv" className="mb-1.5 block text-xs font-semibold text-brand-text">
                  {t('careersPage.cv')}
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
                    {t('careersPage.success')}
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={submitState === 'sending'}
                      className="rounded-full bg-coral-ink px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {submitState === 'sending' ? t('careersPage.sending') : t('careersPage.submit')}
                    </button>
                    {submitState === 'error' && (
                      <p className="mt-2 text-xs text-coral-ink">{t('careersPage.error')}</p>
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
