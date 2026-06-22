'use client'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PhotoBreak() {
  const { t } = useLanguage()

  return (
    <div className="relative h-72 overflow-hidden md:h-96">
      <Image
        src="/pediatric-consultation.jpg"
        alt="Doctor consulting with a child and parent"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-teal-dark/65" />

      <div className="absolute inset-0 flex items-center px-6 md:px-12">
        <div className="mx-auto max-w-7xl w-full">
          <FadeIn>
            <div className="max-w-2xl">
              <div className="mb-5 h-0.5 w-14 bg-coral" />
              <p className="font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold italic leading-snug text-white">
                &ldquo;{t('photoBreak.quote')}&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-white/70">
                {t('photoBreak.since')}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
