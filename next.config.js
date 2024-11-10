/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'img.spoonacular.com',
        pathname: '/recipes/**',
      },
    ],
  },
};

module.exports = nextConfig;
