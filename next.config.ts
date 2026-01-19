/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esto obliga a refrescar los recursos si hay un cambio de versión
  generateBuildId: async () => {
    return `biota-build-${Date.now()}`;
  },
  // Si usas imágenes externas (como las de Farcaster)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;