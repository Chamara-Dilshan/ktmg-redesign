import FadeIn from '@/components/ui/FadeIn'
import type { Testimonial } from '@/types'

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, j) => (
        <svg key={j} className={`h-3.5 w-3.5 ${j < count ? 'text-coral' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const accentColors = ['bg-coral', 'bg-teal-mid', 'bg-teal-light']

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [featured, ...rest] = testimonials

  return (
    <section className="bg-brand-text px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header row */}
        <FadeIn>
          <div className="mb-16 flex items-center justify-between border-b border-white/[0.06] pb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">Parent Reviews</p>
            <div className="flex items-center gap-2.5">
              <Stars count={5} />
              <span className="text-xs text-white/30">4.9 · 500+ reviews</span>
            </div>
          </div>
        </FadeIn>

        {/* Main editorial pull quote */}
        <FadeIn delay={0.1}>
          <div className="mb-16">
            <blockquote className="font-heading max-w-5xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold italic leading-[1.3] text-white">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-10 flex items-center gap-5">
              <div className="h-px w-14 shrink-0 bg-coral" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-bold text-white">
                  {initials(featured.author)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{featured.author}</p>
                  <p className="text-xs text-white/35">{featured.location}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Secondary testimonials */}
        <div className="grid gap-5 border-t border-white/[0.06] pt-10 sm:grid-cols-2">
          {rest.slice(0, 2).map((t, i) => (
            <FadeIn key={t.id} delay={(i + 1) * 0.1}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                <Stars count={t.rating} />
                <p className="mt-4 text-sm italic leading-relaxed text-white/55">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/[0.05] pt-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${accentColors[(i + 1) % accentColors.length]}`}>
                    {initials(t.author)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{t.author}</p>
                    <p className="text-[10px] text-white/30">{t.location}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
