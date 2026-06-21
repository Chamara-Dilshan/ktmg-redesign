import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import BookingCTA from '@/components/ui/BookingCTA'

export const metadata: Metadata = {
  title: 'Health News & Stories',
  description: 'Pediatric health tips, news, and featured stories from Kids & Teens Medical Group.',
}

const topics = [
  { icon: '💉', label: 'Immunizations & Vaccines'  },
  { icon: '🌱', label: 'Child Development'          },
  { icon: '🤒', label: 'Illness & When to Visit'   },
  { icon: '🏃', label: 'Sports & Physical Health'  },
  { icon: '🧠', label: 'Mental Health & ADHD'      },
  { icon: '🍎', label: 'Nutrition & Growth'         },
]

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Health Blog"
        title="Health News & Stories"
        subtitle="Expert pediatric health tips, developmental guides, and updates from our board-certified doctors — coming soon."
      />

      <div className="bg-brand-bg px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Topics preview */}
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {topics.map(t => (
              <div
                key={t.label}
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-brand-border bg-white p-5 text-center shadow-sm"
              >
                <span className="text-3xl">{t.icon}</span>
                <span className="text-xs font-semibold leading-tight text-brand-muted">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Coming soon callout */}
          <div className="rounded-3xl bg-teal-dark px-8 py-10 text-center md:py-14">
            <div className="mb-4 text-4xl">✍️</div>
            <h2 className="font-heading mb-3 text-2xl font-extrabold text-white">Articles Coming Soon</h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/55">
              Our pediatricians are preparing expert articles on child health, development, and
              wellness. In the meantime, book an appointment or find resources below.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookingCTA label="Book Appointment" />
              <Link
                href="/patient-resources"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
              >
                Patient Resources →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
