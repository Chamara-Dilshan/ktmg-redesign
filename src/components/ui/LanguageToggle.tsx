'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Select language"
      className="flex items-center rounded-full border border-brand-border bg-brand-bg p-0.5 text-[11px] font-bold tracking-wide"
    >
      <button
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`rounded-full px-2.5 py-1 transition-all duration-150 ${
          locale === 'en'
            ? 'bg-teal-dark text-white shadow-sm'
            : 'text-brand-muted hover:text-teal-dark'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('es')}
        aria-pressed={locale === 'es'}
        className={`rounded-full px-2.5 py-1 transition-all duration-150 ${
          locale === 'es'
            ? 'bg-teal-dark text-white shadow-sm'
            : 'text-brand-muted hover:text-teal-dark'
        }`}
      >
        ES
      </button>
    </div>
  )
}
