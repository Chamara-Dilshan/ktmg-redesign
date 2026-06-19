/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/testimonials',
        destination: '/share-your-experience',
        permanent: true,
      },
      {
        source: '/parent-resources',
        destination: '/patient-resources',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
