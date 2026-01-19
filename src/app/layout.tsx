import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
