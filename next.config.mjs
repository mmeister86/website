/** @type {import('next').NextConfig} */
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // Unterstützung für Editor.js-Module
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: /node_modules\/@editorjs/,
      type: "javascript/auto",
    });

    // Hinzufügen des MiniCssExtractPlugin für CSS-Dateien
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
  // Zusätzliche Konfigurationen für Editor.js
  transpilePackages: [
    "@editorjs/editorjs",
    "@editorjs/header",
    "@editorjs/paragraph",
  ],
};

export default nextConfig;
