'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { HEALOW_URL, PHONE_CALL } from '@/lib/constants'

const NAV_ICONS: Record<string, React.ReactNode> = {
  locations: (
    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  ),
  doctors: (
    <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
  'about-us': (
    <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  ),
  'patient-resources': (
    <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  ),
  insurance: (
    <path d="M12 2.25L3.375 6.75v5.625c0 5.135 3.667 9.824 8.625 11.25 4.958-1.426 8.625-6.115 8.625-11.25V6.75L12 2.25z" />
  ),
  careers: (
    <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  ),
}

function NavIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? 'h-5 w-5'}
      aria-hidden="true"
    >
      {NAV_ICONS[name] ?? null}
    </svg>
  )
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => { setMounted(true) }, [])

  const serviceLinks = [
    { labelKey: 'nav.primaryCare',         href: '/services/primary-care',          slug: 'primary-care' },
    { labelKey: 'nav.telehealth',           href: '/services/telehealth',            slug: 'telehealth' },
    { labelKey: 'nav.urgentCare',           href: '/services/urgent-care',           slug: 'urgent-care' },
    { labelKey: 'nav.afterHoursCare',       href: '/services/after-hours-care',      slug: 'after-hours-care' },
    { labelKey: 'nav.prenatalConsultation', href: '/services/prenatal-consultation', slug: 'prenatal-consultation' },
    { labelKey: 'nav.specializedCare',      href: '/services/specialized-care',      slug: 'specialized-care' },
  ]

  const navLinks = [
    { labelKey: 'mobile.findClinic',       href: '/locations',         iconKey: 'locations' },
    { labelKey: 'mobile.ourDoctors',       href: '/doctors',           iconKey: 'doctors' },
    { labelKey: 'mobile.aboutUs',          href: '/about-us',          iconKey: 'about-us' },
    { labelKey: 'mobile.patientResources', href: '/patient-resources', iconKey: 'patient-resources' },
    { labelKey: 'mobile.insurance',        href: '/insurance',         iconKey: 'insurance' },
    { labelKey: 'mobile.careers',          href: '/careers',           iconKey: 'careers' },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl bg-teal-tint p-2 transition-colors hover:bg-teal-light/30 md:hidden"
      >
        <span className="block h-[1.5px] w-5 bg-teal-dark" />
        <span className="block h-[1.5px] w-5 bg-teal-dark" />
        <span className="block h-[1.5px] w-5 bg-teal-dark" />
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[200] flex flex-col bg-teal-dark">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Kids & Teens Medical Group"
                width={38}
                height={38}
                className="rounded-xl"
              />
              <div>
                <span className="block text-sm font-semibold leading-snug text-white">Kids & Teens</span>
                <span className="block text-[10px] font-medium leading-none tracking-wide text-white/60">Medical Group</span>
              </div>
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07] text-white transition-colors hover:bg-white/[0.12]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {/* Services */}
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{t('nav.services')}</p>
            <div className="mb-5 grid grid-cols-2 gap-1.5">
              {serviceLinks.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <ServiceIcon slug={s.slug} className="h-4 w-4 shrink-0 opacity-60" />
                  {t(s.labelKey)}
                </Link>
              ))}
            </div>

            <div className="mb-5 space-y-0.5 border-t border-white/[0.07] pt-4">
              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <NavIcon name={l.iconKey} className="h-4 w-4 shrink-0 opacity-50" />
                  {t(l.labelKey)}
                </Link>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-2.5">
              <a
                href={HEALOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-coral-ink px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/20"
              >
                {t('mobile.bookAppointment')}
              </a>
              <a
                href={`tel:${PHONE_CALL.replace(/\D/g, '')}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3.5 text-sm font-medium text-white/65"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('mobile.call')} {PHONE_CALL}
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
