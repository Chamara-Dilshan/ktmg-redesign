import FadeIn from '@/components/ui/FadeIn'
import { HEALOW_URL } from '@/lib/constants'

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark to-teal-mid px-6 py-16 md:px-12 md:py-20">
      {/* Decorative large text watermark */}
      <span className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-heading text-[160px] font-black leading-none text-white/[0.04] md:text-[220px]">
        KTMG
      </span>

      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left — copy */}
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Same-day appointments available
              </p>
              <h2 className="font-heading text-4xl font-extrabold leading-[1.06] text-white md:text-5xl lg:text-6xl">
                Your Child&apos;s Health<br />Can&apos;t Wait.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/60">
                25 clinics across LA. All insurance accepted. Ages 0–21.
              </p>
            </div>

            {/* Right — CTA block */}
            <div className="flex flex-col gap-5 lg:items-end">
              <a
                href={HEALOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-2xl bg-coral px-10 py-4 text-base font-extrabold text-white shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-coral/40 active:scale-95"
              >
                Book Appointment
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <div className="flex flex-col gap-1.5 text-xs text-white/40 lg:text-right">
                <span>✓ No referral needed</span>
                <span>✓ All insurance accepted</span>
                <span>✓ Telehealth 7 days/week</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
