import Link from 'next/link'
import Image from 'next/image'
import BookingCTA from '@/components/ui/BookingCTA'
import MobileMenu from '@/components/layout/MobileMenu'
import { HEALOW_URL, PAY_ONLINE_URL, PORTAL_URL, PHONE_CALL } from '@/lib/constants'

const services = [
  { label: 'Primary Care',          href: '/services/primary-care',          icon: '🩺' },
  { label: 'Telehealth',            href: '/services/telehealth',            icon: '💻' },
  { label: 'Urgent Care',           href: '/services/urgent-care',           icon: '⚡' },
  { label: 'After-Hours Care',      href: '/services/after-hours-care',      icon: '🌙' },
  { label: 'Prenatal Consultation', href: '/services/prenatal-consultation', icon: '🌱' },
  { label: 'Specialized Care',      href: '/services/specialized-care',      icon: '✨' },
]

export default function Navbar() {
  return (
    <header>
      {/* Utility bar — desktop only */}
      <div className="hidden border-b border-white/[0.07] bg-teal-dark px-6 py-2 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-5 text-[11px] text-white/50">
            <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="flex items-center gap-1.5 transition-colors hover:text-white/80">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE_CALL}
            </a>
          </div>
          <div className="flex items-center gap-5 text-[11px] text-white/50">
            <a href={HEALOW_URL}     target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/80">Appointments</a>
            <span className="text-white/20">·</span>
            <a href={PAY_ONLINE_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/80">Pay Online</a>
            <span className="text-white/20">·</span>
            <a href={PORTAL_URL}     target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white/80">Patient Portal</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-teal-dark/95 shadow-[0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="overflow-hidden rounded-xl">
              <Image src="/logo.png" alt="Kids & Teens Medical Group" width={42} height={42} priority className="transition-transform duration-200 group-hover:scale-105" />
            </div>
            <div>
              <span className="block text-sm font-semibold leading-snug text-white">
                Kids & Teens
              </span>
              <span className="block text-[10px] font-medium leading-none tracking-wide text-white/45">
                Medical Group
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {/* Services dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white">
                Services
                <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full z-50 hidden w-64 rounded-2xl border border-white/[0.08] bg-teal-dark/95 py-2 shadow-2xl shadow-black/30 backdrop-blur-xl group-hover:block">
                <div className="px-3 pb-2 pt-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Our Services</p>
                </div>
                {services.map(s => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-3 px-3 py-2.5 mx-1 rounded-xl text-sm text-white/70 transition-all duration-150 hover:bg-white/[0.08] hover:text-white"
                  >
                    <span className="text-base">{s.icon}</span>
                    {s.label}
                  </Link>
                ))}
                <div className="mx-3 mt-2 border-t border-white/[0.08] pt-2">
                  <Link href="/services" className="block px-2 py-1.5 text-xs font-semibold text-coral transition-colors hover:text-white">
                    View all services →
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/locations"         className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white">Find a Clinic</Link>
            <Link href="/doctors"           className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white">Doctors</Link>
            <Link href="/about-us"          className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white">About</Link>
            <Link href="/patient-resources" className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white">Resources</Link>
          </div>

          <BookingCTA label="Book Now" className="hidden md:inline-flex" />
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
