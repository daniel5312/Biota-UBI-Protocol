import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Suspense } from "react"; // <--- 1. IMPORTANTE: Importamos Suspense

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biota Protocol | MiniApp",
  description: "Pasaporte de Regeneración y UBI en Celo",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Metadatos esenciales para Farcaster Frames v2 */}
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://biota-protocol.vercel.app/splash.png"
        />
        <meta property="fc:frame:button:1" content="Entrar" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* 2. SOLUCIÓN FINAL: Envolvemos todo en Suspense para evitar el error de cliente */}
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center bg-black text-emerald-500 font-mono animate-pulse">
              Iniciando Biota Protocol...
            </div>
          }
        >
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
