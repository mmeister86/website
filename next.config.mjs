/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    // Unterstützung für Editor.js-Module
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules\/@editorjs/,
      type: 'javascript/auto'
    });

    return config;
  },
  // Zusätzliche Konfigurationen für Editor.js
  transpilePackages: ['@editorjs/editorjs', '@editorjs/header', '@editorjs/paragraph']
};

export default nextConfig;
