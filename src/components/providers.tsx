"use client";

import { useState, useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, type State } from "wagmi";
// 👇 IMPORTANTE: Traemos el ID desde la configuración central
import { config, WC_PROJECT_ID } from "@/config/waap.config";
import { initWaaP } from "@human.tech/waap-sdk";

export function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  // 👮‍♂️ AQUÍ ESTÁ EL PORTERO (WaaP)
  useEffect(() => {
    // Solo inicia si estamos en el navegador y no se ha iniciado antes
    if (typeof window !== "undefined" && !window.waap) {
      try {
        console.log("👮‍♂️ Portero WaaP: Iniciando turno...");
        console.log("🔑 Usando ID:", WC_PROJECT_ID); // <--- DEBE IMPRIMIR TU ID REAL

        initWaaP({
          config: {
            authenticationMethods: ["email", "phone", "wallet"],
            allowedSocials: ["google", "twitter", "github", "discord"],
            styles: {
              darkMode: true,
              // Opcional: Ajustar colores para que combine con Biota
              // Emerald-500
            },
          },
          useStaging: false, // ⚠️ IMPORTANTE: Pon false para producción real
          // 👇 ESTA ES LA CLAVE MAESTRA:
          walletConnectProjectId: WC_PROJECT_ID,
        });

        console.log("✅ Portero WaaP: Listo y escuchando.");
      } catch (e) {
        console.error("❌ El Portero se durmió (Error Init):", e);
      }
    }
  }, []);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
