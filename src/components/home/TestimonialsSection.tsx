import SectionLabel from '@/components/ui/SectionLabel'
import FadeIn from '@/components/ui/FadeIn'
import type { Testimonial } from '@/types'

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const avatarColors = ['bg-teal-dark', 'bg-teal-mid', 'bg-coral']

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [featured, ...rest] = testimonials

  return (
    <section className="relative overflow-hidden bg-teal-tint px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-mid/10" />

      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel className="mb-2">Parent Reviews</SectionLabel>
          <h2 className="font-heading mb-10 text-3xl font-extrabold text-teal-dark">
            Trusted by LA Families
          </h2>
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Featured pull-quote — takes 2 columns */}
          <FadeIn className="lg:col-span-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-border/60 md:p-10">
              {/* Huge decorative quote — behind content */}
              <span className="pointer-events-none absolute -top-6 right-6 select-none font-heading text-[160px] font-black leading-none text-teal-tint">
                ❝
              </span>

              <div className="relative">
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: featured.rating }).map((_, j) => (
                    <span key={j} className="text-xl text-coral">★</span>
                  ))}
                </div>
                <p className="mb-8 text-xl italic leading-relaxed text-brand-text md:text-2xl">
                  &ldquo;{featured.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-brand-border pt-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColors[0]}`}>
                  {initials(featured.author)}
                </div>
                <div>
                  <p className="font-bold text-teal-dark">{featured.author}</p>
                  <p className="text-sm text-brand-muted">{featured.location}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Two secondary quotes stacked */}
          <div className="flex flex-col gap-5">
            {rest.slice(0, 2).map((t, i) => (
              <FadeIn key={t.id} delay={(i + 1) * 0.1}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-border/60">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-sm text-coral">★</span>
                    ))}
                  </div>
                  <p className="mb-4 flex-1 text-sm italic leading-relaxed text-brand-text">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5 border-t border-brand-border pt-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[(i + 1) % avatarColors.length]}`}>
                      {initials(t.author)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-teal-dark">{t.author}</p>
                      <p className="text-xs text-brand-muted">{t.location}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
