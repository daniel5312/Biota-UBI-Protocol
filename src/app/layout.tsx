import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Suspense } from "react";
import { headers } from "next/headers"; // 1. Importar headers
import { cookieToInitialState } from "wagmi"; // 2. Importar utilitario de Wagmi
import { config } from "@/config/waap.config"; // 3. Importar tu config

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biota Protocol | MiniApp",
  description: "Pasaporte de Regeneración y UBI en Celo",
  manifest: "/manifest.json",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://biota-protocol.vercel.app/splash.png",
    "fc:frame:button:1": "Entrar",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🟢 MAGIA DE WAGMI + NEXT 15:
  // Leemos la cookie del navegador desde el servidor
  // En Next 15, headers() debe ser await
  const headersList = await headers();
  const initialState = cookieToInitialState(config, headersList.get("cookie"));

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#030712]`}
        suppressHydrationWarning
      >
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center bg-[#030712] text-emerald-500 font-mono animate-pulse">
              Iniciando Biota Protocol...
            </div>
          }
        >
          {/* Pasamos el initialState al Provider. 
             Esto hace que si el usuario ya estaba conectado, 
             aparezca conectado INSTANTÁNEAMENTE sin parpadeo.
          */}
          <Providers initialState={initialState}>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
