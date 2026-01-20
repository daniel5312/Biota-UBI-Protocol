"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Leaf,
  MoveRight,
  // ShieldCheck,
  Zap,
  Heart,
  Microscope,
  Wallet,
  Share2,
  Database,
  //LayoutGrid,
} from "lucide-react";

export default function LandingPage() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Función segura para Scroll
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#030712]" />;

  const handleCTA = (path: string) => {
    if (authenticated) {
      router.push(path);
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-emerald-500/30 antialiased overflow-x-hidden">
      {/* FONDO AMBIENTAL */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-[#030712]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Leaf size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-white">
              BIOTA<span className="text-emerald-500">.</span>
            </span>
          </div>
          <button
            onClick={
              ready && authenticated ? () => router.push("/dashboard") : login
            }
            className="text-[10px] font-black tracking-[0.2em] bg-white text-black px-6 py-2.5 rounded-full hover:bg-emerald-400 transition-all uppercase"
          >
            {ready && authenticated ? "Ir al Portal" : "Conectar"}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* HERO */}
        <section className="text-center mb-24 relative">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            SANA TU TIERRA. <br />
            <span className="bg-gradient-to-r from-emerald-500 to-blue-400 bg-clip-text text-transparent italic">
              COBRA POR REGENERAR.
            </span>
          </h1>
          <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Protocolo **ReFi** para agricultura regenerativa en Antioquia.
            Transforma impacto en **Bonos Verdes** y Renta Básica (**UBI**).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleCTA("/dashboard")}
              className="bg-emerald-500 text-black px-10 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
            >
              SOY PRODUCTOR <MoveRight size={18} />
            </button>
            <button
              onClick={() => handleCTA("/marketplace")}
              className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-white/10 transition-all"
            >
              SER SPONSOR
            </button>
          </div>
        </section>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
              <Wallet size={24} />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 italic">
              TuCOP Wallet
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Recibe pagos en **cUSD/cCOP**. Billetera inteligente: liquidez
              real verificada 100% on-chain.
            </p>
            <div className="bg-white/5 p-4 rounded-2xl font-mono text-[10px] text-emerald-500 border border-white/5">
              NETWORK: CELO_SEPOLIA_11142220
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 to-[#030712] p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
            <Database className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-emerald-500/5" />
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black mb-4 italic">
              Infraestructura Celo
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed">
              Red móvil-primero y carbono-neutral. Transacciones instantáneas
              para el **Génesis Envigado**.
            </p>
          </div>
        </div>

        {/* REFI SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest uppercase mb-4">
                <Share2 size={14} /> Nodo Antioquia • REFI
              </div>
              <h3 className="text-3xl font-black text-white mb-4 italic">
                Nodo Génesis Envigado
              </h3>
              <p className="text-stone-400 text-sm">
                Monitoreo de salud del suelo y transformación de impacto en
                **Impact-NFTs**.
              </p>
            </div>
            <div className="w-full md:w-48 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
              <Microscope size={64} className="text-emerald-500 opacity-40" />
            </div>
          </div>

          <div className="bg-emerald-500 p-10 rounded-[40px] text-[#030712] flex flex-col justify-between group hover:bg-emerald-400 transition-all">
            <Heart size={32} />
            <div>
              <h3 className="text-2xl font-black italic mb-2 uppercase">
                ReFi Hub
              </h3>
              <p className="text-[#030712]/70 text-[10px] font-bold tracking-widest uppercase">
                Finanzas que regeneran la vida.
              </p>
            </div>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
              <Wallet size={24} />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 italic">
              TuCOP Wallet
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Recibe pagos en **cUSD/cCOP**. Billetera inteligente: liquidez
              real verificada 100% on-chain.
            </p>
            <div className="bg-white/5 p-4 rounded-2xl font-mono text-[10px] text-emerald-500 border border-white/5">
              NETWORK: CELO_SEPOLIA_11142220
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 to-[#030712] p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
            <Database className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-emerald-500/5" />
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black mb-4 italic">
              Infraestructura Celo
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed">
              Red móvil-primero y carbono-neutral. Transacciones instantáneas
              para el **Génesis Envigado**.
            </p>
          </div>
        </div>

        {/* REFI SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest uppercase mb-4">
                <Share2 size={14} /> Nodo Antioquia • REFI
              </div>
              <h3 className="text-3xl font-black text-white mb-4 italic">
                Nodo Génesis Envigado
              </h3>
              <p className="text-stone-400 text-sm">
                Monitoreo de salud del suelo y transformación de impacto en
                **Impact-NFTs**.
              </p>
            </div>
            <div className="w-full md:w-48 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
              <Microscope size={64} className="text-emerald-500 opacity-40" />
            </div>
          </div>

          <div className="bg-emerald-500 p-10 rounded-[40px] text-[#030712] flex flex-col justify-between group hover:bg-emerald-400 transition-all">
            <Heart size={32} />
            <div>
              <h3 className="text-2xl font-black italic mb-2 uppercase">
                ReFi Hub
              </h3>
              <p className="text-[#030712]/70 text-[10px] font-bold tracking-widest uppercase">
                Finanzas que regeneran la vida.
              </p>
            </div>
          </div>
        </div>
        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
              <Wallet size={24} />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 italic">
              TuCOP Wallet
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Recibe pagos en **cUSD/cCOP**. Billetera inteligente: liquidez
              real verificada 100% on-chain.
            </p>
            <div className="bg-white/5 p-4 rounded-2xl font-mono text-[10px] text-emerald-500 border border-white/5">
              NETWORK: CELO_SEPOLIA_11142220
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 to-[#030712] p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
            <Database className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-emerald-500/5" />
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black mb-4 italic">
              Infraestructura Celo
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed">
              Red móvil-primero y carbono-neutral. Transacciones instantáneas
              para el **Génesis Envigado**.
            </p>
          </div>
        </div>

        {/* REFI SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest uppercase mb-4">
                <Share2 size={14} /> Nodo Antioquia • REFI
              </div>
              <h3 className="text-3xl font-black text-white mb-4 italic">
                Nodo Génesis Envigado
              </h3>
              <p className="text-stone-400 text-sm">
                Monitoreo de salud del suelo y transformación de impacto en
                **Impact-NFTs**.
              </p>
            </div>
            <div className="w-full md:w-48 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
              <Microscope size={64} className="text-emerald-500 opacity-40" />
            </div>
          </div>

          <div className="bg-emerald-500 p-10 rounded-[40px] text-[#030712] flex flex-col justify-between group hover:bg-emerald-400 transition-all">
            <Heart size={32} />
            <div>
              <h3 className="text-2xl font-black italic mb-2 uppercase">
                ReFi Hub
              </h3>
              <p className="text-[#030712]/70 text-[10px] font-bold tracking-widest uppercase">
                Finanzas que regeneran la vida.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-stone-500 font-mono text-[9px] uppercase tracking-[0.3em]">
          &copy; 2026 BIOTA REFI NETWORK | CELO SEPOLIA
        </p>
      </footer>
    </div>
  );
}
