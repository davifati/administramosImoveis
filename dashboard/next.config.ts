import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',  // Adiciona esta linha para exportar a aplicação
  images: {
    unoptimized: true, // Imagens não otimizadas para exportação
  },
};

export default nextConfig;
