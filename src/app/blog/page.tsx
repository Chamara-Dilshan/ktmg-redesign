import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Health News & Stories',
  description: 'Pediatric health tips, news, and featured stories from Kids & Teens Medical Group.',
}

export default function BlogPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="mb-2">Blog</SectionLabel>
        <h1 className="font-heading mb-3 text-4xl font-extrabold text-teal-dark">Health News & Stories</h1>
        <p className="text-sm text-brand-muted">
          Articles and updates coming soon. Add blog posts as MDX files in <code>/src/content/blog/</code>.
        </p>
      </div>
    </div>
  )
}
