import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Post',
}

export default function BlogPostPage(): never {
  // Blog posts not yet migrated — placeholder until MDX content is added
  notFound()
}
