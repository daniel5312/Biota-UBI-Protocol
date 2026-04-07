import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biota Protocol | MiniApp",
  description: "Pasaporte de Regeneración y UBI en Celo",
  manifest: "/manifest.json",
  other: {
    // Farcaster Frames
    "fc:frame": "vNext",
    "fc:frame:image": "https://biota-protocol.vercel.app/splash.png",
    "fc:frame:button:1": "Entrar",
    // Talent App Verification
    "talentapp:project_verification":
      "4de05a49a858761b6123ea7d55be3c785ab116dbebcc72d4a17b695d5ea7474221cec01d2b7309439ef722a3853b9b18e441cc788343404737a3c507c56fd8f1",
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
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
