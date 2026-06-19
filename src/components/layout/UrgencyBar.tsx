import { PHONE_CALL } from '@/lib/constants'

export default function UrgencyBar() {
  return (
    <div className="bg-teal-mid px-6 py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
        <p className="text-white/90">
          📍 25 clinics across Los Angeles — Same-day appointments available
        </p>
        <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="font-semibold text-coral hover:text-white">
          Call {PHONE_CALL} →
        </a>
      </div>
    </div>
  )
}
