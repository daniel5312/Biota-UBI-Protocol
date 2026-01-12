"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Leaf,
  MoveRight,
  ShieldCheck,
  Zap,
  Heart,
  Microscope,
  Wallet,
  Share2,
  Database,
  LayoutGrid,
} from "lucide-react";

export default function LandingPage() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#F9FAFB]" />;

  const handleCTA = (path: string) => {
    if (authenticated) {
      router.push(path);
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-emerald-500/30 antialiased overflow-x-hidden">
      {/* DEGRADADO RADIAL GLOBAL DE FONDO */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      {/* NAVBAR ESTILO ASTAR DARK */}
      <nav className="fixed top-0 w-full z-[100] bg-[#030712]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Leaf size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-white">
              BIOTA<span className="text-emerald-500">.</span>
            </span>
          </div>
          <button
            onClick={login}
            className="text-[10px] font-black tracking-[0.2em] bg-white text-black px-6 py-2.5 rounded-full hover:bg-emerald-400 transition-all uppercase"
          >
            {ready && authenticated ? "Ir al Portal" : "Conectar"}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* HERO SECTION DARK */}
        <section className="text-center mb-24 relative">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            SANA TU TIERRA. <br />{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-blue-400 bg-clip-text text-transparent italic">
              COBRA POR REGENERAR.
            </span>
          </h1>
          <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            El protocolo **ReFi** que transforma la agricultura tradicional en
            activos digitales, **Bonos Verdes** y Renta Básica (**UBI**) en
            Antioquia.
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
              className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-white/10 transition-all shadow-sm"
            >
              SER SPONSOR
            </button>
          </div>
        </section>
        {/* GRID DE INFORMACIÓN (TUCop & CELO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* TuCOP Wallet */}
          <div className="bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 shadow-2xl transition-shadow group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 to-transparent opacity-50" />
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Wallet size={24} />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 italic relative z-10">
              TuCOP Wallet & DeFi
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 relative z-10">
              Recibe tu UBI en <b>cCOP</b>. Billetera inteligente para el
              productor: liquidez real, respaldada y verificada 100% on-chain
              con protocolos <b>DeFi</b>.
            </p>
            <div className="bg-white/5 p-4 rounded-2xl font-mono text-[10px] text-emerald-500 border border-white/5 relative z-10">
              0xBIOTA...CONNECTED_TO_CELO_SEPOLIA_11142220
            </div>
          </div>

          {/* Celo Infrastructure */}
          <div className="bg-gradient-to-br from-emerald-900 to-[#030712] p-10 rounded-[40px] text-white shadow-xl relative overflow-hidden border border-white/5 group">
            <Database className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-emerald-500/5 group-hover:rotate-12 transition-transform duration-700" />
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Zap size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black mb-4 italic relative z-10">
              Infraestructura Celo
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed relative z-10">
              Red móvil-primero y carbono-neutral. Transacciones instantáneas y{" "}
              <b>Bonos Verdes</b> tokenizados. La base técnica de nuestro{" "}
              <b>Self-Protocol</b>.
            </p>
          </div>
        </div>

        {/* SECCIÓN REFI & NODO ANTIOQUIA - MODO DARK RADIAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent opacity-50" />
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest uppercase mb-4">
                <Share2 size={14} /> Nodo Antioquia • REFI
              </div>
              <h3 className="text-3xl font-black text-white mb-4 italic tracking-tight">
                Nodo Génesis Envigado.
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Centro de mando en Envigado. Laboratorio para monitorear la
                salud del suelo y transformar el impacto ambiental en{" "}
                <b>Tokens Biota</b> negociables.
              </p>
            </div>
            <div className="w-full md:w-48 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative z-10 group-hover:bg-white/10 transition-all">
              <Microscope
                size={64}
                className="text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="bg-emerald-500 p-10 rounded-[40px] text-[#030712] flex flex-col justify-between group cursor-pointer hover:bg-emerald-400 transition-all shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <Heart
              size={32}
              className="group-hover:scale-125 transition-transform"
            />
            <div>
              <h3 className="text-2xl font-black italic mb-2 uppercase">
                ReFi Hub
              </h3>
              <p className="text-[#030712]/70 text-[10px] font-bold tracking-widest leading-relaxed uppercase">
                Finanzas que regeneran la vida de Antioquia.
              </p>
            </div>
          </div>
        </div>
      </main>

      <main className="max-w-7xl mx-auto px-6 pt-22 pb-20">
        {/* GRID DE INFORMACIÓN (TUCop & CELO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* TuCOP Wallet */}
          <div className="bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 shadow-2xl transition-shadow group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 to-transparent opacity-50" />
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Wallet size={24} />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 italic relative z-10">
              TuCOP Wallet & DeFi
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 relative z-10">
              Recibe tu UBI en <b>cCOP</b>. Billetera inteligente para el
              productor: liquidez real, respaldada y verificada 100% on-chain
              con protocolos <b>DeFi</b>.
            </p>
            <div className="bg-white/5 p-4 rounded-2xl font-mono text-[10px] text-emerald-500 border border-white/5 relative z-10">
              0xBIOTA...CONNECTED_TO_CELO_SEPOLIA_11142220
            </div>
          </div>

          {/* Celo Infrastructure */}
          <div className="bg-gradient-to-br from-emerald-900 to-[#030712] p-10 rounded-[40px] text-white shadow-xl relative overflow-hidden border border-white/5 group">
            <Database className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-emerald-500/5 group-hover:rotate-12 transition-transform duration-700" />
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Zap size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black mb-4 italic relative z-10">
              Infraestructura Celo
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed relative z-10">
              Red móvil-primero y carbono-neutral. Transacciones instantáneas y{" "}
              <b>Bonos Verdes</b> tokenizados. La base técnica de nuestro{" "}
              <b>Self-Protocol</b>.
            </p>
          </div>
        </div>

        {/* SECCIÓN REFI & NODO ANTIOQUIA - MODO DARK RADIAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent opacity-50" />
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest uppercase mb-4">
                <Share2 size={14} /> Nodo Antioquia • REFI
              </div>
              <h3 className="text-3xl font-black text-white mb-4 italic tracking-tight">
                Nodo Génesis Envigado.
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Centro de mando en Envigado. Laboratorio para monitorear la
                salud del suelo y transformar el impacto ambiental en{" "}
                <b>Tokens Biota</b> negociables.
              </p>
            </div>
            <div className="w-full md:w-48 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative z-10 group-hover:bg-white/10 transition-all">
              <Microscope
                size={64}
                className="text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="bg-emerald-500 p-10 rounded-[40px] text-[#030712] flex flex-col justify-between group cursor-pointer hover:bg-emerald-400 transition-all shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <Heart
              size={32}
              className="group-hover:scale-125 transition-transform"
            />
            <div>
              <h3 className="text-2xl font-black italic mb-2 uppercase">
                ReFi Hub
              </h3>
              <p className="text-[#030712]/70 text-[10px] font-bold tracking-widest leading-relaxed uppercase">
                Finanzas que regeneran la vida de Antioquia.
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 pt-22 pb-20">
        {/* GRID DE INFORMACIÓN (TUCop & CELO) - MODO DARK RADIAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* TuCOP Wallet */}
          <div className="bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 shadow-2xl transition-shadow group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 to-transparent opacity-50" />
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Wallet size={24} />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 italic relative z-10">
              TuCOP Wallet & DeFi
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 relative z-10">
              Recibe tu UBI en <b>cCOP</b>. Billetera inteligente para el
              productor: liquidez real, respaldada y verificada 100% on-chain
              con protocolos <b>DeFi</b>.
            </p>
            <div className="bg-white/5 p-4 rounded-2xl font-mono text-[10px] text-emerald-500 border border-white/5 relative z-10">
              0xBIOTA...CONNECTED_TO_CELO_SEPOLIA_11142220
            </div>
          </div>

          {/* Celo Infrastructure */}
          <div className="bg-gradient-to-br from-emerald-900 to-[#030712] p-10 rounded-[40px] text-white shadow-xl relative overflow-hidden border border-white/5 group">
            <Database className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-emerald-500/5 group-hover:rotate-12 transition-transform duration-700" />
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Zap size={24} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black mb-4 italic relative z-10">
              Infraestructura Celo
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed relative z-10">
              Red móvil-primero y carbono-neutral. Transacciones instantáneas y{" "}
              <b>Bonos Verdes</b> tokenizados. La base técnica de nuestro{" "}
              <b>Self-Protocol</b>.
            </p>
          </div>
        </div>

        {/* SECCIÓN REFI & NODO ANTIOQUIA - MODO DARK RADIAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[#0a0a0a] p-10 rounded-[40px] border border-white/10 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent opacity-50" />
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest uppercase mb-4">
                <Share2 size={14} /> Nodo Antioquia • REFI
              </div>
              <h3 className="text-3xl font-black text-white mb-4 italic tracking-tight">
                Nodo Génesis Envigado.
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Centro de mando en Envigado. Laboratorio para monitorear la
                salud del suelo y transformar el impacto ambiental en{" "}
                <b>Tokens Biota</b> negociables.
              </p>
            </div>
            <div className="w-full md:w-48 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative z-10 group-hover:bg-white/10 transition-all">
              <Microscope
                size={64}
                className="text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="bg-emerald-500 p-10 rounded-[40px] text-[#030712] flex flex-col justify-between group cursor-pointer hover:bg-emerald-400 transition-all shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <Heart
              size={32}
              className="group-hover:scale-125 transition-transform"
            />
            <div>
              <h3 className="text-2xl font-black italic mb-2 uppercase">
                ReFi Hub
              </h3>
              <p className="text-[#030712]/70 text-[10px] font-bold tracking-widest leading-relaxed uppercase">
                Finanzas que regeneran la vida de Antioquia.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-12 border-t border-stone-100 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            <ShieldCheck size={16} className="text-stone-300" />
            <LayoutGrid size={16} className="text-stone-300" />
          </div>
          <p className="text-stone-400 font-mono text-[9px] uppercase tracking-[0.3em]">
            &copy; 2026 BIOTA REFI NETWORK | BUILT ON CELO SEPOLIA
          </p>
        </div>
      </footer>
    </div>
  );
}
