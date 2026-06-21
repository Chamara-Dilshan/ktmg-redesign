import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import CountUp from '@/components/ui/CountUp'

const features = [
  { stat: '25',   unit: 'Clinics',        desc: 'From Santa Monica to Northridge, Whittier to the Valley. Always within reach.' },
  { stat: 'Same', unit: 'Day Care',       desc: 'Walk-in or book for today. Evenings and weekends — care that fits your schedule.' },
  { stat: '7',    unit: 'Day Telehealth', desc: 'Video visits every day including evenings and holidays. No waiting room, no commute.' },
  { stat: 'All',  unit: 'Insurance',      desc: 'HMO · PPO · Medi-Cal · Blue Shield & more. Coverage is never a barrier to care.' },
]

export default function WhyUs() {
  return (
    <section className="bg-teal-dark">
      {/* Editorial header — image split */}
      <div className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2">
            {/* Left: text */}
            <FadeIn>
              <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-20">
                <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.0] tracking-tight text-white heading-tight">
                  Built entirely around<br />
                  <span className="text-coral">your child.</span>
                </h2>
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/50">
                  25 clinics. Same-day care. 7-day telehealth. Every insurance accepted. No single barrier between your family and excellent pediatric care.
                </p>
              </div>
            </FadeIn>

            {/* Right: image */}
            <FadeIn delay={0.15} direction="left">
              <div className="relative hidden min-h-[380px] overflow-hidden lg:block">
                <Image
                  src="/pediatric-highfive.jpg"
                  alt="Pediatric nurse high-fiving a child patient"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                {/* Blend edge into the dark bg */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/70 via-teal-dark/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/40 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Feature columns — with CountUp on numeric values */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.07] lg:grid-cols-4 lg:divide-y-0">
          {features.map((f, i) => (
            <FadeIn key={f.unit} delay={i * 0.08}>
              <div className="group px-8 py-12 transition-colors duration-300 hover:bg-white/[0.03] md:px-10">
                <p className="font-heading text-[2.75rem] font-extrabold leading-none tracking-tight text-white">
                  <CountUp value={f.stat} />
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-wide text-coral">{f.unit}</p>
                <div className="my-5 h-px bg-white/[0.07]" />
                <p className="text-[13px] leading-relaxed text-white/45">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
