/** @type {import('next').NextConfig} */
import MiniCssExtractPlugin from "mini-css-extract-plugin";

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

  // Webpack configuration for EditorJS and CSS extraction
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // Support for Editor.js modules
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules\/@editorjs/,
      type: "javascript/auto",
    });

    // Add MiniCssExtractPlugin for CSS files (client-side only)
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash].css",
          chunkFilename: "static/css/[id].[contenthash].css",
        })
      );
    }

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
