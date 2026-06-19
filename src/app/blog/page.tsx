import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
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
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Health Blog</SectionLabel>
        <h1 className="font-heading mb-3 text-3xl font-extrabold text-teal-dark md:text-4xl">
          Health News &amp; Stories
        </h1>
        <p className="mb-12 max-w-xl text-sm leading-relaxed text-brand-muted">
          Expert pediatric health tips, developmental guides, and updates from our board-certified
          doctors — coming soon.
        </p>

        {/* Topics preview */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {topics.map(t => (
            <div key={t.label}
                 className="flex flex-col items-center gap-2 rounded-xl border border-brand-border bg-white p-4 text-center">
              <span className="text-3xl">{t.icon}</span>
              <span className="text-xs font-semibold text-brand-muted">{t.label}</span>
            </div>
          ))}
        </div>

        {/* Coming soon callout */}
        <div className="rounded-2xl border border-brand-border bg-teal-tint p-8 text-center md:p-12">
          <div className="mb-4 text-4xl">✍️</div>
          <h2 className="font-heading mb-3 text-2xl font-extrabold text-teal-dark">
            Articles Coming Soon
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-brand-muted">
            Our pediatricians are preparing expert articles on child health, development, and
            wellness. In the meantime, book an appointment or find a clinic near you.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookingCTA label="Book Appointment" />
            <Link href="/patient-resources"
                  className="rounded-lg border border-teal-dark px-6 py-3 text-center text-sm font-bold text-teal-dark hover:bg-teal-tint">
              Patient Resources →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
