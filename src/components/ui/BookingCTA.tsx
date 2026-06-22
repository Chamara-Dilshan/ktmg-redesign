'use client'
import { motion } from 'framer-motion'
import { HEALOW_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface BookingCTAProps {
  label?: string
  className?: string
}

export default function BookingCTA({ label = 'Book Appointment', className }: BookingCTAProps) {
  return (
    <motion.a
      href={HEALOW_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30',
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
    </motion.a>
  )
}
