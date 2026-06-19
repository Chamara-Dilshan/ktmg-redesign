'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import BookingCTA from '@/components/ui/BookingCTA'
import Button from '@/components/ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/hero-clinic.png"
        alt="Kids & Teens Medical Group clinic"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Left-to-right gradient: opaque teal on left, photo shows on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-dark via-teal-dark/80 to-teal-dark/20" />
      {/* Bottom vignette to ground the floating badges */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12">
        <div className="max-w-2xl">
          <motion.div
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm"
          >
            <span className="text-coral">★</span> LA&apos;s Largest Pediatric Network
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-heading mb-6 text-6xl font-extrabold leading-[1.03] text-white md:text-7xl lg:text-8xl"
          >
            Compassionate<br />
            Care for{' '}
            <span className="text-teal-light">Every<br />Child.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mb-8 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
          >
            25 clinics across Los Angeles. Board-certified pediatricians. Extended hours, same-day appointments, and telehealth — all under one trusted name.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
            <BookingCTA label="Book Appointment" className="animate-pulse-glow" />
            <Button variant="ghost" href="/locations">Find a Clinic Near You</Button>
          </motion.div>

          <motion.div
            {...fadeUp(0.42)}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50"
          >
            <span>✓ Same-day appointments</span>
            <span>✓ All insurance accepted</span>
            <span>✓ Telehealth 7 days/week</span>
          </motion.div>

          <motion.div {...fadeUp(0.54)} className="mt-5 flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="text-sm text-coral">★</span>
              ))}
            </div>
            <p className="text-xs text-white/50">4.9 on Google · 500+ parent reviews</p>
          </motion.div>
        </div>

        {/* Floating stat badges — bottom-right, visible on medium+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-10 right-6 hidden gap-3 md:flex md:right-12"
        >
          <div className="rounded-2xl bg-white px-5 py-3 shadow-2xl">
            <p className="font-heading text-2xl font-extrabold text-teal-dark">25+</p>
            <p className="text-xs text-brand-muted">Clinics in LA</p>
          </div>
          <div className="rounded-2xl bg-coral px-5 py-3 shadow-2xl">
            <p className="font-heading text-2xl font-extrabold text-white">50+</p>
            <p className="text-xs text-white/80">Doctors</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
