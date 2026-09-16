import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Phase 5에서 Notion 이미지 도메인 추가 예정
    ],
  },
};

export default nextConfig;
