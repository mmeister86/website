/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true  // If you want to keep existing image handling
  },
  typescript: {
    ignoreBuildErrors: false
  }
}

module.exports = nextConfig
