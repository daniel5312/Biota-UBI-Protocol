"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import {
  Leaf,
  LogOut,
  ShoppingBag,
  LayoutDashboard,
  Wallet,
  ChevronDown,
} from "lucide-react";

export const Navbar = () => {
  const { authenticated, logout, user } = usePrivy();
  const { wallets } = useWallets();

  if (!authenticated) return null;

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const switchNetwork = async (chainId: number) => {
    const wallet = wallets[0];
    if (wallet) {
      try {
        await wallet.switchChain(chainId);
      } catch (error) {
        console.error("Error switching network:", error);
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* LOGO BIOTA */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Leaf size={18} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic font-sans">
            BIOTA.
          </span>
        </Link>

        {/* NAVEGACIÓN Y CONTROLES WEB3 */}
        <div className="flex items-center gap-3">
          {/* SELECTOR DE RED CELO CON DROPDOWN */}
          <div className="group relative">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
              <div className="relative w-4 h-4">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-70" />
                <div className="absolute inset-0 rounded-full border-2 border-yellow-500 translate-x-1 opacity-70" />
              </div>
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-emerald-400">
                {wallets[0]?.chainId === "eip155:42220"
                  ? "Celo Mainnet"
                  : "Celo Sepolia"}
              </span>
              <ChevronDown
                size={12}
                className="text-stone-500 group-hover:rotate-180 transition-transform"
              />
            </div>

            {/* MENÚ DE REDES */}
            <div className="absolute top-full right-0 mt-2 w-44 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[110] overflow-hidden">
              <button
                onClick={() => switchNetwork(42220)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-[10px] font-bold uppercase text-stone-300 hover:text-white border-b border-white/5"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-500" /> Celo
                Mainnet
              </button>
              <button
                onClick={() => switchNetwork(11142220)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-[10px] font-bold uppercase text-stone-300 hover:text-white"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Celo
                Sepolia
              </button>
            </div>
          </div>

          {/* BOTONES DE SECCIÓN */}
          <div className="flex items-center gap-2 md:gap-4 border-l border-white/10 pl-4">
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

          {/* WALLET ADDRESS & LOGOUT */}
          <div className="flex items-center gap-2 ml-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <Wallet size={14} className="text-emerald-500" />
              <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">
                {user?.wallet?.address
                  ? formatAddress(user.wallet.address)
                  : "0x00...000"}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-stone-500 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
