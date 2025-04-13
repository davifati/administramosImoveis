import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/boletos/diario',
        permanent: true, // ou false se preferir
      },
    ];
  },
};

export default nextConfig;
