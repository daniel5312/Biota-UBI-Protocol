"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, type State } from "wagmi"; // Importar type State
import { config, WC_PROJECT_ID } from "@/config/waap.config";
import { initWaaP } from "@human.tech/waap-sdk";

// Recibimos 'initialState' si usamos cookies (opcional pero recomendado)
export function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());

  // Inicialización de Human (Solo en cliente)
  if (typeof window !== "undefined" && !window.waap) {
    try {
      initWaaP({
        config: {
          authenticationMethods: ["email", "social", "wallet"],
          allowedSocials: ["google"],
          styles: { darkMode: true },
        },
        useStaging: true,
        walletConnectProjectId: WC_PROJECT_ID,
      });
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
