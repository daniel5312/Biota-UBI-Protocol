"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// CONFIGURACIÓN MANUAL PARA PRIVY (Soluciona el error de rpcUrls)
const sepoliaConfig = {
  id: 11155111,
  name: "Sepolia",
  network: "sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/eth_sepolia"],
    },
    public: {
      http: ["https://rpc.ankr.com/eth_sepolia"],
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
      <ThirdwebProvider>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
          config={{
            appearance: { theme: "light", accentColor: "#22c55e" },
            embeddedWallets: {
              ethereum: { createOnLogin: "users-without-wallets" },
            },
            // Usamos la configuración manual que sí tiene rpcUrls
            defaultChain: sepoliaConfig,
            supportedChains: [sepoliaConfig],
          }}
        >
          {children}
        </PrivyProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
