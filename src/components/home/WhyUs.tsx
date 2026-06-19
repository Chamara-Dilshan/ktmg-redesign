import FadeIn from '@/components/ui/FadeIn'

const features = [
  { icon: '📍', title: '25 Locations', desc: 'Always close to home across LA' },
  { icon: '⏰', title: 'Extended Hours', desc: 'Evenings, weekends & same-day' },
  { icon: '📱', title: 'Telehealth 7 Days', desc: 'See us from anywhere, anytime' },
  { icon: '💳', title: 'All Insurance', desc: 'HMO, PPO, Medi-Cal & more' },
]

export default function WhyUs() {
  return (
    <section className="border-b border-brand-border bg-brand-bg px-6 py-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <div className="flex items-start gap-3 rounded-xl p-4 transition-all duration-200 hover:bg-white hover:shadow-sm">
                <span className="mt-0.5 text-2xl">{f.icon}</span>
                <div>
                  <p className="font-heading text-sm font-bold text-teal-dark">{f.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">{f.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
