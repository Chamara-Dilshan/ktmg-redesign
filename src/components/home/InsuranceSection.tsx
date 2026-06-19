import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import BookingCTA from '@/components/ui/BookingCTA'
import FadeIn from '@/components/ui/FadeIn'

const partnerLogos = [
  { name: 'Regal Medical Group',    src: '/partners/regal.png'      },
  { name: 'L.A. Care Health Plan',  src: '/partners/la-care.png'    },
  { name: 'Optum',                  src: '/partners/optum.webp'     },
  { name: 'Molina Healthcare',      src: '/partners/molina.webp'    },
  { name: "Children's Hospital LA", src: '/partners/chla.webp'      },
  { name: 'Cedars-Sinai',           src: '/partners/cedars.png'     },
  { name: 'Providence',             src: '/partners/providence.png' },
]

const textPartners = ['Medi-Cal', 'Blue Cross', 'Lakeside', 'Health Care Partners']

export default function InsuranceSection() {
  return (
    <section className="border-y border-brand-border bg-white px-6 py-14 md:px-12">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel className="mb-2">Insurance</SectionLabel>
              <h2 className="font-heading text-2xl font-extrabold text-teal-dark">We Accept All Insurance</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-muted">
                HMO, PPO, Medi-Cal, and most commercial plans. No insurance? Ask about affordable options.
              </p>
            </div>
            <BookingCTA label="Check Your Insurance" />
          </div>
        </FadeIn>

        {/* Partner logos */}
        <FadeIn delay={0.1}>
          <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {partnerLogos.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center justify-center rounded-xl border border-brand-border bg-brand-bg p-3 transition-all duration-200 hover:border-teal-mid/30 hover:bg-teal-tint hover:shadow-sm"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <Image src={p.src} alt={p.name} width={100} height={40} className="max-h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Text-only partners */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2">
            {textPartners.map(p => (
              <span key={p} className="rounded-lg border border-brand-border bg-brand-bg px-4 py-2 text-xs font-semibold text-brand-muted transition-colors hover:border-teal-mid/30 hover:bg-teal-tint">
                {p}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
