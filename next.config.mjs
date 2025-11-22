/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration - remote patterns for TMDB and Spoonacular
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

  // Webpack configuration for EditorJS
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // Support for Editor.js modules
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules\/@editorjs/,
      type: "javascript/auto",
    });

    return config;
  },

  // Transpile EditorJS packages for compatibility
  transpilePackages: [
    "@editorjs/editorjs",
    "@editorjs/header",
    "@editorjs/paragraph",
  ],
};

export default nextConfig;
