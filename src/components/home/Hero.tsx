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
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark to-teal-mid px-6 py-16 md:px-12 md:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-teal-light/[0.07]" />
      <div className="pointer-events-none absolute right-1/4 top-16 h-2 w-2 rounded-full bg-coral/60" />
      <div className="pointer-events-none absolute left-1/3 bottom-20 h-3 w-3 rounded-full bg-teal-light/50" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">

        {/* Left — content */}
        <div>
          <motion.div {...fadeUp(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm"
          >
            <span className="text-coral">★</span> LA&apos;s Largest Pediatric Network
          </motion.div>

          <motion.h1 {...fadeUp(0.1)}
            className="font-heading mb-5 text-5xl font-extrabold leading-[1.06] text-white md:text-6xl lg:text-7xl"
          >
            Compassionate<br />Care for{' '}
            <span className="text-teal-light">Every Child,<br />Every Stage</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)}
            className="mb-8 max-w-lg text-base leading-relaxed text-white/75"
          >
            25 clinics across Los Angeles. Board-certified pediatricians. Extended hours, same-day appointments, and telehealth — all under one trusted name.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
            <BookingCTA label="Book Appointment" className="animate-pulse-glow" />
            <Button variant="ghost" href="/locations">Find a Clinic Near You</Button>
          </motion.div>

          <motion.div {...fadeUp(0.42)}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/55"
          >
            <span>✓ Same-day appointments</span>
            <span>✓ All insurance accepted</span>
            <span>✓ Telehealth 7 days/week</span>
          </motion.div>

          <motion.div {...fadeUp(0.54)}
            className="mt-5 flex items-center gap-2.5"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="text-sm text-coral">★</span>
              ))}
            </div>
            <p className="text-xs text-white/50">4.9 on Google · 500+ parent reviews</p>
          </motion.div>
        </div>

        {/* Right — image + floating stat cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative h-72 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 md:h-[420px]">
            <Image
              src="/hero-clinic.png"
              alt="Kids & Teens Medical Group clinic"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/40 to-transparent" />
          </div>

          {/* Floating: Clinics */}
          <motion.div
            initial={{ opacity: 0, x: -16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-white px-5 py-3 shadow-2xl md:block"
          >
            <p className="font-heading text-2xl font-extrabold text-teal-dark">25+</p>
            <p className="text-xs text-brand-muted">Clinics in LA</p>
          </motion.div>

          {/* Floating: Doctors */}
          <motion.div
            initial={{ opacity: 0, x: 16, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="absolute -right-4 -top-4 hidden rounded-2xl bg-coral px-5 py-3 shadow-2xl md:block"
          >
            <p className="font-heading text-2xl font-extrabold text-white">50+</p>
            <p className="text-xs text-white/80">Doctors</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
