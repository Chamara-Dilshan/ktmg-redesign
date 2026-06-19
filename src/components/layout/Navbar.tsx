import Link from 'next/link'
import Image from 'next/image'
import BookingCTA from '@/components/ui/BookingCTA'
import MobileMenu from '@/components/layout/MobileMenu'
import { HEALOW_URL, PAY_ONLINE_URL, PORTAL_URL, PHONE_CALL, PHONE_TEXT_EN } from '@/lib/constants'

const services = [
  { label: 'Primary Care',          href: '/services/primary-care' },
  { label: 'Telehealth',            href: '/services/telehealth' },
  { label: 'Urgent Care',           href: '/services/urgent-care' },
  { label: 'After-Hours Care',      href: '/services/after-hours-care' },
  { label: 'Prenatal Consultation', href: '/services/prenatal-consultation' },
  { label: 'Specialized Care',      href: '/services/specialized-care' },
]

export default function Navbar() {
  return (
    <header>
      {/* Utility bar */}
      <div className="border-b border-white/10 bg-teal-dark px-6 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-white/70">
          <div className="flex gap-4">
            <span>Text EN: {PHONE_TEXT_EN}</span>
            <span>Call: {PHONE_CALL}</span>
          </div>
          <div className="flex gap-4">
            <a href={HEALOW_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Appointments</a>
            <a href={PAY_ONLINE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Pay Online</a>
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Portal Login</a>
            <Link href="/locations" className="hover:text-white">Find a Location</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-teal-dark shadow-md">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Kids & Teens Medical Group" width={48} height={48} priority />
            <span className="text-sm font-semibold leading-tight text-white">
              Kids & Teens Medical Group
              <span className="block text-xs font-normal text-white/60">Pediatric Care · Los Angeles</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {/* Services dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white/85 hover:text-white">
                Services <span className="text-xs">▾</span>
              </button>
              <div className="absolute left-0 top-full z-50 hidden w-56 rounded-lg bg-white py-2 shadow-xl group-hover:block">
                {services.map(s => (
                  <Link key={s.href} href={s.href} className="block px-4 py-2 text-sm text-brand-text hover:bg-teal-tint">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/locations"        className="text-sm font-medium text-white/85 hover:text-white">Find a Clinic</Link>
            <Link href="/doctors"          className="text-sm font-medium text-white/85 hover:text-white">Our Doctors</Link>
            <Link href="/about-us"         className="text-sm font-medium text-white/85 hover:text-white">About Us</Link>
            <Link href="/patient-resources" className="text-sm font-medium text-white/85 hover:text-white">Patient Resources</Link>
          </div>

          <BookingCTA label="Book Appointment" className="hidden md:inline-flex" />
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
