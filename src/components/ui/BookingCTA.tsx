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
        'inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90',
        className
      )}
    >
      {label} <span aria-hidden="true">→</span>
    </a>
  )
}
