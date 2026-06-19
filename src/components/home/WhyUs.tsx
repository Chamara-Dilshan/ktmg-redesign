import FadeIn from '@/components/ui/FadeIn'

const features = [
  { icon: '📍', title: '25 Locations', desc: 'Always close to home across LA' },
  { icon: '⏰', title: 'Extended Hours', desc: 'Evenings, weekends & same-day' },
  { icon: '📱', title: 'Telehealth 7 Days', desc: 'See us from anywhere, anytime' },
  { icon: '💳', title: 'All Insurance', desc: 'HMO, PPO, Medi-Cal & more' },
]

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-dark to-teal-mid px-6 py-2 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <div className="flex flex-col items-center gap-2 px-4 py-7 text-center transition-colors duration-200 hover:bg-white/5 md:px-8">
                <span className="text-3xl">{f.icon}</span>
                <p className="font-heading text-sm font-extrabold text-white md:text-base">{f.title}</p>
                <p className="text-xs leading-relaxed text-white/55">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
