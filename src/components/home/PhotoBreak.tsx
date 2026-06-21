import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'

export default function PhotoBreak() {
  return (
    <div className="relative h-72 overflow-hidden md:h-96">
      <Image
        src="/pediatric-consultation.jpg"
        alt="Doctor consulting with a child and parent"
        fill
        className="object-cover object-center"
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-teal-dark/65" />

      {/* Editorial quote overlay */}
      <div className="absolute inset-0 flex items-center px-6 md:px-12">
        <div className="mx-auto max-w-7xl w-full">
          <FadeIn>
            <div className="max-w-2xl">
              <div className="mb-5 h-0.5 w-14 bg-coral" />
              <p className="font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold italic leading-snug text-white">
                &ldquo;Every child deserves expert care close to home.&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-white/50">
                25 clinics across Los Angeles · Since 2006
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
