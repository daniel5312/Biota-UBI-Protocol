"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, useMemo, useRef } from "react";

// CONFIGURACIÓN PARA CELO SEPOLIA (Red ID 11142220)
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
    default: { http: ["https://forno.sepolia.celo.org"] },
    public: { http: ["https://forno.sepolia.celo.org"] },
  },
  blockExplorers: {
    default: {
      name: "CeloScan",
      url: "https://sepolia.celoscan.io",
    },
  },
  testnet: true,
};

// Check if we're in a cross-origin iframe where window.ethereum access would throw
function isInCrossOriginIframe(): boolean {
  try {
    if (typeof window === "undefined") return false;
    // If window.top is inaccessible, we're in a cross-origin iframe
    const _ = window.top?.location.href;
    return false;
  } catch {
    return true;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const patchedRef = useRef(false);

  // Mantenemos el QueryClient persistente
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    // Patch window.ethereum access to prevent cross-origin SecurityError in iframes
    if (!patchedRef.current && isInCrossOriginIframe()) {
      patchedRef.current = true;
      try {
        // If ethereum is not directly on this window, define a safe fallback
        if (!Object.getOwnPropertyDescriptor(window, "ethereum")) {
          Object.defineProperty(window, "ethereum", {
            get() {
              return undefined;
            },
            configurable: true,
          });
        }
      } catch {
        // Silently ignore - the property may already exist or be non-configurable
      }
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const PRIVY_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={PRIVY_ID as string} //cambiarappId={PRIVY_ID || ""}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#22c55e", // El verde de Biota
            showWalletLoginFirst: true,
          },
          embeddedWallets: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
          // Disable external wallet detection in cross-origin iframes to prevent SecurityError
          ...(isInCrossOriginIframe() && {
            externalWallets: {
              coinbaseWallet: { connectionOptions: "all" },
            },
          }),
          defaultChain: celoSepoliaConfig,
          supportedChains: [celoSepoliaConfig],
        }}
      >
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}
/*"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { celoSepolia } from "wagmi/chains";
import { useEffect, useState, useMemo } from "react";

// 1. Configuración de Wagmi (Esencial para que Privy y los contratos hablen el mismo idioma)
const wagmiConfig = createConfig({
  chains: [celoSepolia],
  transports: {
    [celoSepolia.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  // 2. QueryClient persistente (evita que los datos parpadeen al navegar)
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        config={{
          appearance: { 
            theme: "light",
            accentColor: "#22c55e", // Verde Biota
          },
          // 3. LA CLAVE: Configuración de Wallet Embebida para campesinos/sponsors
          embeddedWallets: {
            ethereum: { 
              createOnLogin: "users-without-wallets",
              requireUserPasswordOnCreate: false, // Facilidad total de acceso
            },
          },
          defaultChain: celoSepolia,
          supportedChains: [celoSepolia],
        }}
      >
        <WagmiProvider config={wagmiConfig}>
          <ThirdwebProvider>
              {children}
          </ThirdwebProvider>
        </WagmiProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}*/
