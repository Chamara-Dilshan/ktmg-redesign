'use client'
import { HEALOW_URL } from '@/lib/constants'

export default function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-r from-teal-dark to-teal-mid px-4 pb-5 pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.18)]">
        <a
          href={HEALOW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl bg-coral py-3.5 text-center text-sm font-extrabold text-white shadow-lg transition-transform active:scale-95"
        >
          Book Appointment →
        </a>
      </div>
    </div>
  )
}
