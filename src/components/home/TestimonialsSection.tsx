import SectionLabel from '@/components/ui/SectionLabel'
import type { Testimonial } from '@/types'

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-teal-tint px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Parent Reviews</SectionLabel>
        <h2 className="font-heading mb-10 text-3xl font-extrabold text-teal-dark">Trusted by LA Families</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.id} className="rounded-xl border border-brand-border bg-white p-6">
              <div className="mb-3 text-coral">{'★'.repeat(t.rating)}</div>
              <p className="mb-5 text-sm italic leading-relaxed text-brand-text">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-tint text-sm">👤</div>
                <div>
                  <p className="text-sm font-semibold text-teal-dark">{t.author}</p>
                  <p className="text-xs text-brand-muted">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
