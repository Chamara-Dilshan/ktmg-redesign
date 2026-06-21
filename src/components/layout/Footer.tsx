'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { EMAIL, PHONE_CALL, SOCIAL } from '@/lib/constants'

const FacebookIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const XIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-teal-dark text-white/60">
      <div className="h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-3 group">
              <div className="overflow-hidden rounded-xl">
                <Image src="/logo.png" alt="Kids & Teens Medical Group" width={42} height={42} />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white">Kids & Teens</span>
                <span className="block text-[10px] text-white/40">Medical Group</span>
              </div>
            </Link>
            <p className="text-[13px] leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { href: SOCIAL.facebook,  icon: <FacebookIcon />,  label: 'Facebook'  },
                { href: SOCIAL.instagram, icon: <InstagramIcon />, label: 'Instagram' },
                { href: SOCIAL.youtube,   icon: <YouTubeIcon />,   label: 'YouTube'   },
                { href: SOCIAL.twitter,   icon: <XIcon />,         label: 'X'         },
              ].map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{t('footer.services')}</h3>
            <ul className="space-y-2.5">
              {[
                ['footer.primaryCare',          '/services/primary-care'],
                ['footer.telehealth',            '/services/telehealth'],
                ['footer.urgentCare',            '/services/urgent-care'],
                ['footer.afterHoursCare',        '/services/after-hours-care'],
                ['footer.prenatalConsultation',  '/services/prenatal-consultation'],
                ['footer.specializedCare',       '/services/specialized-care'],
              ].map(([key, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white">{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Patients */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{t('footer.forPatients')}</h3>
            <ul className="space-y-2.5">
              {[
                ['footer.findClinic',       '/locations'],
                ['footer.ourDoctors',       '/doctors'],
                ['footer.insurance',        '/insurance'],
                ['footer.patientResources', '/patient-resources'],
                ['footer.shareExperience',  '/share-your-experience'],
                ['footer.blog',             '/blog'],
              ].map(([key, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white">{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="flex items-center gap-2.5 text-sm transition-colors hover:text-white">
                  <svg className="h-3.5 w-3.5 shrink-0 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {PHONE_CALL}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 text-sm transition-colors hover:text-white">
                  <svg className="h-3.5 w-3.5 shrink-0 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {EMAIL}
                </a>
              </li>
              <li className="pt-2">
                <Link href="/about-us"  className="block text-sm transition-colors hover:text-white">{t('footer.aboutUs')}</Link>
              </li>
              <li>
                <Link href="/careers"   className="block text-sm transition-colors hover:text-white">{t('footer.careers')}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.07] pt-6 text-xs sm:flex-row sm:justify-between">
          <span className="text-white/35">{t('footer.copyright')}</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy"   className="text-white/35 transition-colors hover:text-white/70">{t('footer.privacy')}</Link>
            <Link href="/terms-conditions" className="text-white/35 transition-colors hover:text-white/70">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
