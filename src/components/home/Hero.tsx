import BookingCTA from '@/components/ui/BookingCTA'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-teal-dark to-teal-mid px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Content */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/90">
            ★ LA&apos;s Largest Pediatric Network
          </div>
          <h1 className="font-heading mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Compassionate Care for<br />
            <em className="not-italic text-teal-light">Every Child, Every Stage</em>
          </h1>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-white/75">
            25 clinics across Los Angeles. Board-certified pediatricians. Extended hours, same-day appointments, and telehealth — all under one trusted name.
          </p>
          <div className="flex flex-wrap gap-3">
            <BookingCTA label="Book Appointment" />
            <Button variant="ghost" href="/locations">Find a Clinic Near You</Button>
          </div>
        </div>

        {/* Photo placeholder — replace with next/image before launch */}
        <div className="flex h-72 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/30 md:h-80">
          <div className="text-center">
            <div className="mb-2 text-5xl opacity-30">👨‍👩‍👧‍👦</div>
            <p className="text-sm">Hero photo — real family with doctor</p>
            <p className="text-xs opacity-50">Replace before launch</p>
          </div>
        </div>
      </div>
    </section>
  )
}
