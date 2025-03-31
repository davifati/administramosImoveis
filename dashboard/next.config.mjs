/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/reports",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true, // Necessário para exportação estática, mas não aplica aqui para renderização dinâmica
  },
  //output: 'export',
  eslint: {
    ignoreDuringBuilds: true, // Ignora ESLint durante o build
  },
};

export default nextConfig;

