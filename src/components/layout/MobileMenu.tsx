'use client'
import { useState } from 'react'
import Link from 'next/link'
import { HEALOW_URL, PHONE_CALL } from '@/lib/constants'

const navLinks = [
  { label: 'Find a Clinic',     href: '/locations',         icon: '📍' },
  { label: 'Our Doctors',       href: '/doctors',           icon: '👨‍⚕️' },
  { label: 'About Us',          href: '/about-us',          icon: 'ℹ️' },
  { label: 'Patient Resources', href: '/patient-resources', icon: '📋' },
  { label: 'Insurance',         href: '/insurance',         icon: '🛡️' },
  { label: 'Careers',           href: '/careers',           icon: '💼' },
]

const serviceLinks = [
  { label: 'Primary Care',          href: '/services/primary-care',          icon: '🩺' },
  { label: 'Telehealth',            href: '/services/telehealth',            icon: '💻' },
  { label: 'Urgent Care',           href: '/services/urgent-care',           icon: '⚡' },
  { label: 'After-Hours Care',      href: '/services/after-hours-care',      icon: '🌙' },
  { label: 'Prenatal Consultation', href: '/services/prenatal-consultation', icon: '🌱' },
  { label: 'Specialized Care',      href: '/services/specialized-care',      icon: '✨' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl bg-white/[0.07] p-2 transition-colors hover:bg-white/[0.12] md:hidden"
      >
        <span className={`block h-[1.5px] w-5 bg-white transition-all duration-250 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
        <span className={`block h-[1.5px] w-5 bg-white transition-all duration-250 ${open ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`block h-[1.5px] w-5 bg-white transition-all duration-250 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
      </button>

      {/* Slide-down mobile menu */}
      {open && (
        <div
          className="absolute left-0 top-full z-50 w-full border-t border-white/[0.07] bg-teal-dark/97 backdrop-blur-xl shadow-2xl md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="px-5 py-5">
            {/* Services */}
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Services</p>
            <div className="mb-5 grid grid-cols-2 gap-1.5">
              {serviceLinks.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <span className="text-base">{s.icon}</span>
                  {s.label}
                </Link>
              ))}
            </div>

            <div className="mb-5 border-t border-white/[0.07] pt-4 space-y-0.5">
              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <span className="text-base">{l.icon}</span>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-2.5">
              <a
                href={HEALOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-coral px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/20"
              >
                Book Appointment →
              </a>
              <a
                href={`tel:${PHONE_CALL.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3.5 text-sm font-medium text-white/65"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {PHONE_CALL}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
