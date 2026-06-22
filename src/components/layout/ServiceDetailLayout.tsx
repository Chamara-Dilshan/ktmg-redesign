import PageHero from '@/components/layout/PageHero'
import BookingCTA from '@/components/ui/BookingCTA'
import FeatureIcon from '@/components/ui/FeatureIcon'
import Link from 'next/link'

interface Feature {
  icon?: string
  title: string
  desc: string
}

interface InfoBadge {
  label: string
  value: string
  accent?: boolean
}

interface ServiceDetailLayoutProps {
  label: string
  title: string
  subtitle: string
  features: Feature[]
  infoBadges?: InfoBadge[]
  note?: string
  noteExtra?: React.ReactNode
  heroCta?: React.ReactNode
}

export default function ServiceDetailLayout({
  label, title, subtitle, features, infoBadges, note, noteExtra, heroCta,
}: ServiceDetailLayoutProps) {
  return (
    <>
      <PageHero
        label={label}
        title={title}
        subtitle={subtitle}
        backHref="/services"
        backLabel="All Services"
        ctaLabel={heroCta ? undefined : 'Book Appointment'}
      >
        {heroCta && <div className="mt-7">{heroCta}</div>}
      </PageHero>

      <div className="bg-brand-bg px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Feature grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group flex flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {f.icon && (
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal-mid ring-1 ring-teal-mid/15">
                    <FeatureIcon name={f.icon} className="h-6 w-6" />
                  </div>
                )}
                <div className="mb-3 h-px w-8 bg-coral/60" />
                <h3 className="font-heading mb-2 font-bold text-teal-dark">{f.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-brand-muted" dangerouslySetInnerHTML={{ __html: f.desc }} />
              </div>
            ))}
          </div>

          {/* Info badges */}
          {infoBadges && infoBadges.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {infoBadges.map(b => (
                <div
                  key={b.label}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 ${b.accent ? 'bg-coral/10 ring-1 ring-coral/20' : 'bg-teal-tint ring-1 ring-teal-mid/15'}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${b.accent ? 'bg-coral' : 'bg-teal-mid'}`} />
                  <span className={`text-xs font-semibold ${b.accent ? 'text-coral-ink' : 'text-teal-dark'}`}>{b.label}:</span>
                  <span className={`text-xs ${b.accent ? 'text-coral-ink' : 'text-teal-mid'}`}>{b.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Note */}
          {note && (
            <div className="mt-6 rounded-2xl border border-brand-border bg-white px-7 py-5">
              <p className="text-sm leading-relaxed text-brand-muted">{note}</p>
              {noteExtra}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-teal-dark px-8 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-lg font-bold text-white">Ready to book?</p>
              <p className="mt-1 text-sm text-white/55">Same-day appointments available at 25 LA locations.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookingCTA label="Book Now" />
              <Link href="/locations" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10">
                Find a Clinic →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
