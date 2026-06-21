import { HEALOW_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface BookingCTAProps {
  label?: string
  className?: string
}

export default function BookingCTA({ label = 'Book Appointment', className }: BookingCTAProps) {
  return (
    <a
      href={HEALOW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/25 transition-all duration-200 hover:bg-coral/90 hover:shadow-xl hover:shadow-coral/30 hover:-translate-y-0.5 active:scale-95',
        className
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  )
}
