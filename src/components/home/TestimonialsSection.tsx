import SectionLabel from '@/components/ui/SectionLabel'
import FadeIn from '@/components/ui/FadeIn'
import type { Testimonial } from '@/types'

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const avatarColors = ['bg-teal-dark', 'bg-teal-mid', 'bg-coral']

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="relative overflow-hidden bg-teal-tint px-6 py-16 md:px-12">
      {/* Decorative */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-mid/10" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-teal-light/20" />

      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel className="mb-2">Parent Reviews</SectionLabel>
          <h2 className="font-heading mb-10 text-3xl font-extrabold text-teal-dark">
            Trusted by LA Families
          </h2>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.1}>
              <div className="relative flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-brand-border/60 transition-shadow duration-300 hover:shadow-lg">
                {/* Large decorative quote */}
                <span className="pointer-events-none absolute right-5 top-2 select-none font-heading text-8xl font-extrabold leading-none text-teal-tint">
                  ❝
                </span>

                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-lg text-coral">★</span>
                  ))}
                </div>

                <p className="relative mb-6 flex-1 text-sm italic leading-relaxed text-brand-text">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[i % avatarColors.length]}`}>
                    {initials(t.author)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-teal-dark">{t.author}</p>
                    <p className="text-xs text-brand-muted">{t.location}</p>
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
