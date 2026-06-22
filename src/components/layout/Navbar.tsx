'use client'
import Link from 'next/link'
import Image from 'next/image'
import BookingCTA from '@/components/ui/BookingCTA'
import MobileMenu from '@/components/layout/MobileMenu'
import LanguageToggle from '@/components/ui/LanguageToggle'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { t } = useLanguage()

  const services = [
    { labelKey: 'nav.primaryCare',          href: '/services/primary-care',          slug: 'primary-care' },
    { labelKey: 'nav.telehealth',            href: '/services/telehealth',            slug: 'telehealth' },
    { labelKey: 'nav.urgentCare',            href: '/services/urgent-care',           slug: 'urgent-care' },
    { labelKey: 'nav.afterHoursCare',        href: '/services/after-hours-care',      slug: 'after-hours-care' },
    { labelKey: 'nav.prenatalConsultation',  href: '/services/prenatal-consultation', slug: 'prenatal-consultation' },
    { labelKey: 'nav.specializedCare',       href: '/services/specialized-care',      slug: 'specialized-care' },
  ]

  return (
    <header>
      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-brand-border">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="overflow-hidden rounded-xl">
              <Image src="/logo.png" alt="Kids & Teens Medical Group" width={42} height={42} priority className="transition-transform duration-200 group-hover:scale-105" />
            </div>
            <div>
              <span className="block text-sm font-semibold leading-snug text-teal-dark">
                Kids & Teens
              </span>
              <span className="block text-[10px] font-medium leading-none tracking-wide text-brand-muted">
                Medical Group
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {/* Services dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-brand-text/70 transition-colors hover:bg-teal-tint hover:text-teal-dark">
                {t('nav.services')}
                <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full z-50 hidden w-64 rounded-2xl border border-brand-border bg-white py-2 shadow-xl shadow-teal-dark/10 group-hover:block">
                <div className="px-3 pb-2 pt-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-muted">{t('nav.ourServices')}</p>
                </div>
                {services.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-3 px-3 py-2.5 mx-1 rounded-xl text-sm text-brand-text/70 transition-all duration-150 hover:bg-teal-tint hover:text-teal-dark"
                  >
                    <ServiceIcon slug={s.slug} className="h-4 w-4 shrink-0 text-teal-mid" />
                    {t(s.labelKey)}
                  </Link>
                ))}
                <div className="mx-3 mt-2 border-t border-brand-border pt-2">
                  <Link href="/services" className="block px-2 py-1.5 text-xs font-semibold text-coral transition-colors hover:text-teal-dark">
                    {t('nav.viewAllServices')}
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/locations"         className="rounded-lg px-3.5 py-2 text-sm font-medium text-brand-text/70 transition-colors hover:bg-teal-tint hover:text-teal-dark">{t('nav.findClinic')}</Link>
            <Link href="/doctors"           className="rounded-lg px-3.5 py-2 text-sm font-medium text-brand-text/70 transition-colors hover:bg-teal-tint hover:text-teal-dark">{t('nav.doctors')}</Link>
            <Link href="/about-us"          className="rounded-lg px-3.5 py-2 text-sm font-medium text-brand-text/70 transition-colors hover:bg-teal-tint hover:text-teal-dark">{t('nav.about')}</Link>
            <Link href="/patient-resources" className="rounded-lg px-3.5 py-2 text-sm font-medium text-brand-text/70 transition-colors hover:bg-teal-tint hover:text-teal-dark">{t('nav.resources')}</Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle />
            <BookingCTA label={t('nav.bookNow')} />
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}
