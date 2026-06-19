import FadeIn from '@/components/ui/FadeIn'

const features = [
  {
    stat: '25 CLINICS',
    desc: 'From Santa Monica to Northridge, Whittier to the Valley. Always close to home across LA.',
  },
  {
    stat: 'SAME-DAY',
    desc: 'Walk-in or book for today. Evenings and weekends too — care that fits your schedule.',
  },
  {
    stat: 'TELEHEALTH\n7 DAYS',
    desc: 'Video visits every day including evenings and holidays. No commute, no waiting room.',
  },
  {
    stat: 'ALL\nINSURANCE',
    desc: 'HMO · PPO · Medi-Cal · Blue Shield & more. Coverage is never a barrier to care.',
  },
]

export default function WhyUs() {
  return (
    <section className="bg-teal-dark">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10 md:py-0">
          {features.map((f, i) => (
            <FadeIn key={f.stat} delay={i * 0.08}>
              <div className="flex flex-col md:px-8 md:py-12">
                <div className="mb-4 h-0.5 w-8 bg-coral" />
                <p className="font-heading whitespace-pre-line text-lg font-black uppercase leading-tight tracking-tight text-white md:text-xl">
                  {f.stat}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-white/50">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
