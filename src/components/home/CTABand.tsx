import FadeIn from '@/components/ui/FadeIn'
import { HEALOW_URL } from '@/lib/constants'

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-dark via-teal-mid to-coral px-6 py-20 md:px-12">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/[0.05]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute left-1/2 top-8 h-2 w-2 -translate-x-1/2 rounded-full bg-white/30" />

      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Same-day appointments available
          </p>
          <h2 className="font-heading mb-5 text-4xl font-extrabold leading-[1.08] text-white md:text-5xl lg:text-6xl">
            Your Child&apos;s Health<br className="hidden sm:block" /> Can&apos;t Wait.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/70">
            25 clinics across Los Angeles. Board-certified pediatricians. All insurance accepted. Ages 0–21.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={HEALOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-10 py-4 text-base font-extrabold text-teal-dark shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-teal-tint active:scale-95"
            >
              Book Appointment
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/locations"
              className="text-sm font-semibold text-white/75 underline underline-offset-4 transition-colors hover:text-white"
            >
              Find a clinic near you
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-white/55">
            <span>✓ No referral needed</span>
            <span>✓ All insurance accepted</span>
            <span>✓ Telehealth 7 days/week</span>
            <span>✓ Ages 0–21</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
