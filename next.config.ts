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
  // 🛡️ BLINDAJE DE SEGURIDAD (Protección contra ataques comunes y DoS pasivo)
  async headers() {
    return [
      {
        // Aplica a todas las rutas de la DApp
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' }, // Previene Clickjacking
          { key: 'X-XSS-Protection', value: '1; mode=block' }, // Previene Cross-Site Scripting
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }, // Fuerza HTTPS
        ],
      },
    ];
  },
};

export default nextConfig;