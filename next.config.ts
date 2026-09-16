import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Notion 첨부 이미지 도메인
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
    ],
  },
  // 성능 최적화
  swcMinify: true,
  compress: true,
};

export default nextConfig;
