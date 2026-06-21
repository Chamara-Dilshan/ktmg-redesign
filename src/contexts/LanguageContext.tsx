'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from '@/lib/translations/en'
import es from '@/lib/translations/es'

export type Locale = 'en' | 'es'

const translations: Record<Locale, Record<string, string>> = { en, es }

interface LanguageContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => en[key] ?? key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kt_locale') as Locale | null
      if (stored === 'en' || stored === 'es') {
        setLocaleState(stored)
        document.documentElement.lang = stored
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale)
    try {
      localStorage.setItem('kt_locale', newLocale)
    } catch {
      // ignore
    }
    document.documentElement.lang = newLocale
  }

  const t = (key: string): string => translations[locale][key] ?? key

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function slugToCamel(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
}
