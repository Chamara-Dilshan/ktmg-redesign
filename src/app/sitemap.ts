import type { MetadataRoute } from 'next'
import locations from '@/data/locations.json'
import doctors from '@/data/doctors.json'
import type { Location, Doctor } from '@/types'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.ktdoctor.com'

  const staticPages = [
    '/', '/about-us', '/services', '/locations', '/doctors',
    '/patient-resources', '/insurance', '/careers', '/blog', '/share-your-experience',
    '/services/primary-care', '/services/telehealth', '/services/urgent-care',
    '/services/after-hours-care', '/services/prenatal-consultation', '/services/specialized-care',
  ].map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.8 }))

  const locationPages = (locations as Location[]).map(loc => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const doctorPages = (doctors as Doctor[]).map(doc => ({
    url: `${base}/doctors/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...locationPages, ...doctorPages]
}
