'use client'
import { HEALOW_URL, PHONE_CALL } from '@/lib/constants'

export default function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="border-t border-white/[0.07] bg-teal-dark/95 px-4 pb-6 pt-3 backdrop-blur-xl">
        <div className="flex gap-2.5">
          <a
            href={`tel:${PHONE_CALL.replace(/\D/g, '')}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-white transition-colors hover:bg-white/[0.12]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <a
            href={HEALOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-coral py-3 text-sm font-semibold text-white shadow-lg shadow-coral/20 transition-transform active:scale-95"
          >
            Book Appointment
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
