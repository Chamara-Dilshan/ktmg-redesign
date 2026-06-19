import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import './globals.css'
import UrgencyBar from '@/components/layout/UrgencyBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBookingBar from '@/components/layout/MobileBookingBar'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kids & Teens Medical Group | Pediatric Care Los Angeles',
    template: '%s | Kids & Teens Medical Group',
  },
  description: "LA's largest pediatric network. 25 clinics, 50+ board-certified doctors, same-day appointments. Serving children ages 0–21.",
  openGraph: {
    type: 'website',
    siteName: 'Kids & Teens Medical Group',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KTDoctorGroup',
  },
  metadataBase: new URL('https://www.ktdoctor.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body className="font-body bg-brand-bg pb-20 text-brand-text antialiased md:pb-0">
        <UrgencyBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  )
}
