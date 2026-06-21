import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import BookingCTA from '@/components/ui/BookingCTA'
import { EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Insurance Accepted',
  description: 'Kids & Teens Medical Group accepts all insurance including HMO, PPO, Medi-Cal, and commercial plans. Same-day IPA transfers available.',
}

const partnerLogos = [
  { name: 'Regal Medical Group',          src: '/partners/regal.png'      },
  { name: 'L.A. Care Health Plan',        src: '/partners/la-care.png'    },
  { name: 'Optum',                        src: '/partners/optum.webp'     },
  { name: 'Providence',                   src: '/partners/providence.png' },
  { name: 'Molina Healthcare',            src: '/partners/molina.webp'    },
  { name: 'Cedars-Sinai',                 src: '/partners/cedars.png'     },
  { name: "Children's Hospital LA",       src: '/partners/chla.webp'      },
]

const textPartners = ['Lakeside', 'Health Care Partners', 'Eastland', 'Blue Cross']

export default function InsurancePage() {
  return (
    <>
      <PageHero
        label="Insurance"
        title="Insurance is never a reason to delay care."
        subtitle="We accept HMO, PPO, Medi-Cal, and most commercial plans. No insurance? Ask us about affordable payment options."
      />

      <div className="bg-brand-bg px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Partner logos */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {partnerLogos.map(p => (
              <div
                key={p.name}
                className="flex items-center justify-center rounded-2xl border border-brand-border bg-white p-4 shadow-sm"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={120}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Text-only partners */}
          <div className="mb-10 flex flex-wrap gap-2">
            {textPartners.map(p => (
              <span
                key={p}
                className="rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-semibold text-brand-muted"
              >
                {p}
              </span>
            ))}
            <span className="rounded-full border border-dashed border-brand-border bg-white px-5 py-2 text-sm font-semibold text-brand-muted/60">
              + many more
            </span>
          </div>

          {/* IPA transfer */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-teal-mid/20 bg-teal-tint">
            <div className="border-l-[3px] border-coral p-6">
              <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">Same-Day IPA Transfer</h2>
              <p className="text-sm leading-relaxed text-brand-muted">
                Need to switch your insurance to KTMG? We can process a same-day IPA (Independent Physician Association)
                transfer so you can start seeing our doctors immediately.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-coral hover:underline"
              >
                Email us to start a transfer →
              </a>
            </div>
          </div>

          {/* Serendib callout */}
          <div className="mb-10 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
            <div className="border-l-[3px] border-teal-mid p-6">
              <div className="mb-4">
                <Image
                  src="/partners/serendib.png"
                  alt="Serendib Healthways"
                  width={160}
                  height={48}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              <h2 className="font-heading mb-2 text-lg font-bold text-teal-dark">
                SoCal&apos;s Best Kept Secret — Serendib Healthways
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-brand-muted">
                No doctor restrictions. Serendib Healthways offers flexible health coverage that lets you see any KTMG
                doctor without referrals or network limitations.
              </p>
              <a
                href="https://www.serendibhealthways.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-coral hover:underline"
              >
                Check Eligibility at Serendib Healthways →
              </a>
            </div>
          </div>

          <BookingCTA label="Book an Appointment" />
        </div>
      </div>
    </>
  )
}
