'use client'
import { useLanguage } from '@/contexts/LanguageContext'
import { PHONE_CALL, HEALOW_URL, PAY_ONLINE_URL, PORTAL_URL } from '@/lib/constants'

export default function UrgencyBar() {
  const { t } = useLanguage()

  return (
    <div className="overflow-hidden bg-teal-dark border-b border-white/[0.07] py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-coral/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-coral">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          {t('urgency.openNow')}
        </span>
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <a href={HEALOW_URL}     target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/55 transition-colors hover:text-white">{t('nav.appointments')}</a>
          <span className="text-white/20">·</span>
          <a href={PAY_ONLINE_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/55 transition-colors hover:text-white">{t('nav.payOnline')}</a>
          <span className="text-white/20">·</span>
          <a href={PORTAL_URL}     target="_blank" rel="noopener noreferrer" className="text-[11px] text-white/55 transition-colors hover:text-white">{t('nav.patientPortal')}</a>
          <span className="text-white/20">|</span>
          <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="text-xs font-semibold text-coral transition-colors hover:text-white">{PHONE_CALL}</a>
        </div>
        <a href={`tel:${PHONE_CALL.replace(/\D/g, '')}`} className="shrink-0 text-xs font-semibold text-coral transition-colors hover:text-white md:hidden">
          {PHONE_CALL}
        </a>
      </div>
    </div>
  )
}
