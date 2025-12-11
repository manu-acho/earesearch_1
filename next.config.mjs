/** @type {import('next').NextConfig} */
import { createContentlayerPlugin } from 'next-contentlayer2';

const withContentlayer = createContentlayerPlugin();

const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // Enable Turbopack support for Next.js 16
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withContentlayer(nextConfig);
