import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import testimonials from '@/data/testimonials.json'
import type { Testimonial } from '@/types'

export const metadata: Metadata = {
  title: 'Share Your Experience',
  description: 'Read what LA families say about Kids & Teens Medical Group. Share your own experience on Google or Yelp.',
}

export default function ShareExperiencePage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Reviews</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Share Your Experience</h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-brand-muted">
          We love hearing from our families. Read what other parents say, and share your own experience on Google or Yelp.
        </p>

        {/* Review CTAs */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a href="https://www.google.com/search?q=Kids+and+Teens+Medical+Group" target="_blank" rel="noopener noreferrer"
             className="rounded-lg border-2 border-teal-dark px-6 py-3 text-center text-sm font-bold text-teal-dark hover:bg-teal-tint sm:w-auto">
            Leave a Google Review →
          </a>
          <a href="https://www.yelp.com/search?find_desc=Kids+Teens+Medical+Group" target="_blank" rel="noopener noreferrer"
             className="rounded-lg border-2 border-brand-border px-6 py-3 text-center text-sm font-bold text-brand-muted hover:bg-brand-bg sm:w-auto">
            Leave a Yelp Review →
          </a>
        </div>

        {/* Curated testimonials */}
        <div className="grid gap-5 md:grid-cols-3">
          {(testimonials as Testimonial[]).map(t => (
            <div key={t.id} className="rounded-xl border border-brand-border bg-white p-6">
              <div className="mb-3 text-coral">{'★'.repeat(t.rating)}</div>
              <p className="mb-5 text-sm italic leading-relaxed text-brand-text">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-teal-dark">{t.author}</p>
              <p className="text-xs text-brand-muted">{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
