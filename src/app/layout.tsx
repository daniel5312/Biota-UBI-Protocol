import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

// Configuración de metadatos siguiendo el estándar de Next.js
export const metadata: Metadata = {
  title: "Biota Protocol | MiniApp",
  description: "Pasaporte de Regeneración y UBI en Celo",
  manifest: "/manifest.json",
  other: {
    // Metadatos de Farcaster Frames v2 integrados correctamente
    "fc:frame": "vNext",
    "fc:frame:image": "https://biota-protocol.vercel.app/splash.png",
    "fc:frame:button:1": "Entrar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center bg-black text-emerald-500 font-mono animate-pulse">
              Iniciando Biota Protocol...
            </div>
          }
        >
          {/* Asegúrate de que el archivo Providers.tsx que arreglamos 
              esté exactamente en src/components/providers.tsx 
          */}
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
