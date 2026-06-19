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
    <section className="bg-white px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-20">

          {/* Left — declaration */}
          <FadeIn>
            <SectionLabel className="mb-3">Insurance</SectionLabel>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-teal-dark md:text-4xl">
              Insurance is never a reason<br className="hidden md:block" /> to delay care.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              HMO, PPO, Medi-Cal, and most commercial plans accepted. No insurance? Ask about affordable self-pay options.
            </p>
            <div className="mt-6">
              <BookingCTA label="Check Your Insurance" />
            </div>
          </FadeIn>

          {/* Right — logos */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {partnerLogos.map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center justify-center rounded-xl border border-brand-border bg-brand-bg p-4 transition-all duration-200 hover:border-teal-mid/30 hover:bg-teal-tint hover:shadow-sm"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={100}
                    height={40}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {textPartners.map(p => (
                <span
                  key={p}
                  className="rounded-lg border border-brand-border bg-brand-bg px-4 py-2 text-xs font-semibold text-brand-muted transition-colors hover:border-teal-mid/30 hover:bg-teal-tint"
                >
                  {p}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
