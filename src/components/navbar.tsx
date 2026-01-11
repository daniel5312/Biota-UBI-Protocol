"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { Leaf, LogOut, ShoppingBag, LayoutDashboard } from "lucide-react";

export const Navbar = () => {
  const { authenticated, logout } = usePrivy();

  if (!authenticated) return null;

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
            <Leaf size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">BIOTA.</span>
        </Link>

        {/* LINKS DE NAVEGACIÓN */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-stone-600 hover:text-emerald-600"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            href="/marketplace"
            className="flex items-center gap-2 font-bold text-stone-600 hover:text-emerald-600"
          >
            <ShoppingBag size={20} /> Tienda
          </Link>

          <button
            onClick={logout}
            className="ml-4 p-2 text-stone-400 hover:text-red-500"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
