import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import testimonials from '@/data/testimonials.json'
import type { Testimonial } from '@/types'

export const metadata: Metadata = {
  title: 'Share Your Experience',
  description: 'Read what LA families say about Kids & Teens Medical Group. Share your own experience on Google or Yelp.',
}

export default function ShareExperiencePage() {
  return (
    <>
      <PageHero
        label="Reviews"
        title="Share Your Experience"
        subtitle="We love hearing from our families. Read what other parents say, and share your own experience on Google or Yelp."
      />

      <div className="bg-brand-bg px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Review CTAs */}
          <div className="mb-12 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.google.com/search?q=Kids+and+Teens+Medical+Group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-teal-dark bg-white px-7 py-3 text-sm font-bold text-teal-dark transition-colors hover:bg-teal-tint"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Leave a Google Review
            </a>
            <a
              href="https://www.yelp.com/search?find_desc=Kids+Teens+Medical+Group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-border bg-white px-7 py-3 text-sm font-bold text-brand-muted transition-colors hover:bg-brand-bg"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.16 12.73l-4.703 1.14a1.305 1.305 0 01-1.573-1.284c-.04-.446.154-.868.498-1.13l3.972-2.88a.977.977 0 011.372.2 7.187 7.187 0 01.434 3.954zm-7.032 3.078l-.544 4.808a.98.98 0 00.875 1.075 7.187 7.187 0 003.56-1.574.978.978 0 00.19-1.372l-2.896-3.964a1.305 1.305 0 00-1.185-.973zm-2.064-1.11l-4.4 2.028a.978.978 0 00-.449 1.303 7.187 7.187 0 002.386 2.854.977.977 0 001.372-.19l2.913-3.952a1.305 1.305 0 00-.437-1.86 1.305 1.305 0 00-1.385-.183zm-.648-2.306L5.64 11.19a.978.978 0 00-1.099.837 7.187 7.187 0 00.507 3.5.977.977 0 001.256.526l4.565-1.743a1.305 1.305 0 00.835-1.5 1.305 1.305 0 00-1.33-.935zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.49 7.484l.55-4.808a.978.978 0 00-.876-1.077 7.187 7.187 0 00-3.97 1.326.977.977 0 00-.21 1.367l2.852 4.01a1.305 1.305 0 001.654.182z" />
              </svg>
              Leave a Yelp Review
            </a>
          </div>

          {/* Curated testimonials */}
          <div className="grid gap-5 md:grid-cols-3">
            {(testimonials as Testimonial[]).map(t => (
              <div key={t.id} className="flex flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="h-3.5 w-3.5 fill-coral" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-5 flex-1 text-sm italic leading-relaxed text-brand-text">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-teal-dark">{t.author}</p>
                  <p className="text-xs text-brand-muted">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
