/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    optimizeCss: false,
  },
  webpack: (config) => {
    // Reduce CSS preloading aggressiveness
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
      },
    };
    return config;
  },
};

module.exports = nextConfig;
