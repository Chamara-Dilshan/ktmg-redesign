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
        'group inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-bold text-white shadow-md shadow-coral/20 transition-all duration-200 hover:bg-coral/90 hover:shadow-lg hover:shadow-coral/30 active:scale-95',
        className
      )}
    >
      {label}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </a>
  )
}
