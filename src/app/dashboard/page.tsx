"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useReadContract } from "thirdweb/react"; // Importamos el lector
import { contract } from "@/lib/thirdweb";
import { Navbar } from "@/components/navbar";

export default function Dashboard() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();

  // Protección de ruta
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  // LEER DATOS DE LA BLOCKCHAIN
  // 1. Consultamos el balance (Cuántos pasaportes tiene el usuario)
  const { data: balance, isLoading } = useReadContract({
    contract,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [
      (user?.wallet?.address ||
        "0x0000000000000000000000000000000000000000") as `0x${string}`,
    ],
  });

  if (!ready || !authenticated) return null;

  const formatAddress = (addr: string) =>
    `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-bold text-gray-800">Biota</span>
        </div>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:text-red-700 font-medium bg-red-50 px-3 py-1 rounded-lg transition-colors"
        >
          Salir
        </button>
      </nav>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Tarjeta de Identidad */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-gray-500 text-sm font-medium mb-1">
            Identidad Conectada
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full"></div>
            <div>
              <p className="font-mono text-lg font-bold text-gray-800">
                {user?.wallet
                  ? formatAddress(user.wallet.address)
                  : "Cargando..."}
              </p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs text-green-600 font-medium">
                  Celo Sepolia Activo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTADOR DE PASAPORTES (Lectura Blockchain) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm">Mis Lotes</p>
            <p className="text-4xl font-bold text-green-600">
              {isLoading ? "..." : balance?.toString() || "0"}
            </p>
          </div>

          {/* Botón de Acción */}
          <Link href="/mint" className="block">
            <div className="h-full bg-green-600 p-6 rounded-2xl border border-green-600 shadow-lg shadow-green-100 flex flex-col justify-center items-center text-white hover:bg-green-700 transition-all active:scale-95 cursor-pointer">
              <span className="text-2xl mb-1">+</span>
              <span className="font-bold">Nuevo</span>
            </div>
          </Link>
        </div>

        {/* Lista Visual (Placeholder condicional) */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Inventario</h3>
          {balance && balance > BigInt(0) ? (
            <div className="bg-white p-6 rounded-2xl border border-green-200 bg-green-50/30">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📜</span>
                <div>
                  <h4 className="font-bold text-gray-800">
                    Pasaporte Digital #{balance.toString()}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Estado: Verificado en Blockchain
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Regeneración Activa
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center">
              <p className="text-gray-400">
                No tienes pasaportes registrados aún.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
