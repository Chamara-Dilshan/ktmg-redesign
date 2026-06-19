'use client'
import { useState } from 'react'
import Link from 'next/link'
import { HEALOW_URL } from '@/lib/constants'

const navLinks = [
  { label: 'Find a Clinic',     href: '/locations'         },
  { label: 'Our Doctors',       href: '/doctors'           },
  { label: 'About Us',          href: '/about-us'          },
  { label: 'Patient Resources', href: '/patient-resources' },
  { label: 'Insurance',         href: '/insurance'         },
  { label: 'Careers',           href: '/careers'           },
]

const serviceLinks = [
  { label: 'Primary Care',          href: '/services/primary-care'          },
  { label: 'Telehealth',            href: '/services/telehealth'            },
  { label: 'Urgent Care',           href: '/services/urgent-care'           },
  { label: 'After-Hours Care',      href: '/services/after-hours-care'      },
  { label: 'Prenatal Consultation', href: '/services/prenatal-consultation' },
  { label: 'Specialized Care',      href: '/services/specialized-care'      },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex flex-col items-center justify-center gap-1.5 rounded p-2 md:hidden"
      >
        <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-6 bg-white transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {/* Slide-down mobile menu */}
      {open && (
        <div className="absolute left-0 top-full z-50 w-full bg-teal-dark shadow-xl md:hidden" onClick={() => setOpen(false)}>
          <div className="px-6 py-4">
            {/* Services sub-section */}
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/50">Services</p>
            <div className="mb-4 grid grid-cols-2 gap-1">
              {serviceLinks.map(s => (
                <Link key={s.href} href={s.href} className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                  {s.label}
                </Link>
              ))}
            </div>

            <div className="mb-4 border-t border-white/10 pt-4 space-y-1">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>

            <a href={HEALOW_URL} target="_blank" rel="noopener noreferrer"
               className="block w-full rounded-lg bg-coral px-4 py-3 text-center text-sm font-bold text-white hover:opacity-90">
              Book Appointment →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
