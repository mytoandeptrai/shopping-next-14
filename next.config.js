const path = require('path');
const withReactSvg = require('next-react-svg')({
  include: path.resolve(__dirname, 'src/assets/svg'),
});

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: isProd,
  reactStrictMode: false,
  images: {
    domains: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 1800,
  },
  output: 'standalone',
};

module.exports = withReactSvg(nextConfig);
