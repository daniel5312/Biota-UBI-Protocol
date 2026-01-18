"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Creamos un cliente para manejo de estado asíncrono (opcional pero recomendado)
const queryClient = new QueryClient();

// CONFIGURACIÓN PARA CELO SEPOLIA
const celoSepoliaConfig = {
  id: 11142220,
  name: "Celo Sepolia",
  network: "celo-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO",
  },
  rpcUrls: {
    default: {
      http: ["https://forno.sepolia.celo.org"],
    },
    public: {
      http: ["https://forno.sepolia.celo.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "CeloScan",
      url: "https://sepolia.celoscan.io",
    },
  },
  testnet: true,
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      {/* 1. Privy envuelve todo para gestionar la sesión del usuario */}
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#22c55e",
            showWalletLoginFirst: true,
          },
          // Configuración de wallet embebida corregida para TS
          embeddedWallets: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
          defaultChain: celoSepoliaConfig,
          supportedChains: [celoSepoliaConfig],
        }}
      >
        {/* 2. Thirdweb va ADENTRO para aprovechar la sesión si es necesario */}
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}
