"use client";

import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import Link from "next/link";
import {
  Leaf,
  LogOut,
  ShoppingBag,
  LayoutDashboard,
  Wallet,
  ChevronDown, // 👈 Ahora sí lo vamos a usar
  User,
} from "lucide-react";

// Definimos la interfaz para evitar errores de tipo con window.waap
interface WaapWindow {
  waap?: { login: () => Promise<void> };
}

export const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleLogin = () => {
    const customWindow = window as unknown as WaapWindow;
    customWindow.waap?.login();
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Leaf size={18} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic font-sans">
            BIOTA<span className="text-emerald-500">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* BOTONES DE NAVEGACIÓN */}
          <div className="flex items-center gap-2 md:gap-4 border-r border-white/10 pr-4 mr-2">
            <Link
              href="/dashboard"
              className="p-2 text-stone-400 hover:text-white transition-colors"
              title="Dashboard"
            >
              <LayoutDashboard size={18} />
            </Link>
            <Link
              href="/marketplace"
              className="p-2 text-stone-400 hover:text-white transition-colors"
              title="Tienda"
            >
              <ShoppingBag size={18} />
            </Link>
          </div>

          {/* ESTADO DE CONEXIÓN */}
          {isConnected ? (
            <div className="flex items-center gap-2">
              {/* SELECTOR DE RED (Solo visible si conectado) */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all group relative">
                <div
                  className={`w-2 h-2 rounded-full ${
                    chainId === 42220 ? "bg-yellow-500" : "bg-emerald-400"
                  }`}
                />
                <span className="text-[10px] font-black uppercase text-stone-300">
                  {chainId === 42220 ? "Mainnet" : "Sepolia"}
                </span>

                {/* ✅ AQUÍ USAMOS EL CHEVRONDOWN QUE DABA ERROR */}
                <ChevronDown
                  size={12}
                  className="text-stone-500 group-hover:rotate-180 transition-transform"
                />

                {/* Menú Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-32 bg-[#0a0a0a] border border-white/10 rounded-xl hidden group-hover:block overflow-hidden shadow-xl">
                  <button
                    onClick={() => switchChain({ chainId: 11142220 })}
                    className="w-full text-left px-4 py-3 text-[10px] hover:bg-emerald-500 hover:text-black font-bold uppercase border-b border-white/5"
                  >
                    Sepolia
                  </button>
                  <button
                    onClick={() => switchChain({ chainId: 42220 })}
                    className="w-full text-left px-4 py-3 text-[10px] hover:bg-yellow-500 hover:text-black font-bold uppercase"
                  >
                    Mainnet
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Wallet size={14} className="text-emerald-500" />
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">
                  {address ? formatAddress(address) : "..."}
                </span>
              </div>
              <button
                onClick={() => disconnect()}
                className="p-2 text-stone-500 hover:text-red-400 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all"
            >
              <User size={14} /> Conectar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
