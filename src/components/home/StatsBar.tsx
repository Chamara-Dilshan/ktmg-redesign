import CountUp from '@/components/ui/CountUp'

const stats = [
  { value: '25',   label: 'Clinic Locations', icon: '📍' },
  { value: '50+',  label: 'Board-Certified Doctors', icon: '👨‍⚕️' },
  { value: '18',   label: 'Years of Excellence', icon: '🏆' },
  { value: '0–21', label: 'Ages We Serve', icon: '👶' },
]

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 border-b border-brand-border bg-white md:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group border-r border-brand-border px-3 py-6 text-center transition-colors duration-200 hover:bg-teal-tint last:border-r-0 md:px-6 md:py-8"
        >
          <span className="mb-2 block text-xl transition-transform duration-200 group-hover:scale-110">{stat.icon}</span>
          <CountUp
            value={stat.value}
            className="font-heading block text-xl font-extrabold text-teal-dark transition-colors group-hover:text-teal-mid md:text-3xl"
          />
          <span className="mt-1 block text-xs font-medium text-brand-muted">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
