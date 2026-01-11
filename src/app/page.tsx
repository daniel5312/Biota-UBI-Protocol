"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import Link from "next/link";
import {
  Leaf,
  MoveRight,
  Sprout,
  ArrowUpRight,
  Coins,
  ShieldCheck,
  Loader2,
  // Eliminamos Landmark de aquí
} from "lucide-react";

export default function LandingPage() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Evita errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirección automática si ya está logueado
  useEffect(() => {
    if (ready && authenticated) {
      router.push("/dashboard");
    }
  }, [ready, authenticated, router]);

  if (!mounted) return <div className="min-h-screen bg-[#FAFAF9]" />;

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 font-sans selection:bg-emerald-100">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* LOGO */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform duration-300">
                <Leaf size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-stone-900">
                BIOTA<span className="text-emerald-500">.</span>
              </span>
            </div>

            {/* BOTÓN DE LOGIN (Conectado a Privy) */}
            <div>
              {ready && !authenticated ? (
                <button
                  onClick={login}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-stone-200 hover:shadow-emerald-200"
                >
                  Conectar Wallet
                </button>
              ) : (
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Cargando...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center justify-center pt-40 pb-20 px-6 text-center">
        <div className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold mb-6 animate-pulse">
          💎 Proof of Regeneration: Celo Sepolia
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
          BIOTA<span className="text-emerald-500">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-2xl leading-relaxed mx-auto">
          Transformamos la salud del suelo en <b>Renta Básica Digital</b> para
          los héroes del campo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* BOTÓN NEGRO: Productor */}
          <button
            onClick={() =>
              authenticated ? router.push("/dashboard") : login()
            }
            className="px-10 py-4 bg-stone-900 text-white rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-2"
          >
            Soy Productor <MoveRight size={20} />
          </button>

          {/* BOTÓN BLANCO: Sponsor (Tienda) */}
          <button
            onClick={() =>
              authenticated ? router.push("/marketplace") : login()
            }
            className="px-10 py-4 bg-white border-2 border-stone-200 text-stone-600 rounded-full font-bold text-lg hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
          >
            Ser Sponsor <ArrowUpRight size={20} />
          </button>
        </div>
      </section>

      {/* --- INFO SECTION --- */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center border-t border-stone-100">
        <div className="space-y-6">
          <div className="inline-flex p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
            <Sprout size={32} />
          </div>
          <h2 className="text-4xl font-black">
            Biota UBI: <br />
            <span className="text-emerald-600">Monthly Renta Básica</span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Los productores reciben pagos mensuales en <b>cCOP</b> (Celo
            stablecoin) mientras sanan su suelo. Dinero real, directo a tu
            celular, sin bancos.
          </p>
          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="flex items-center gap-3 font-bold text-stone-700">
              <Coins className="text-emerald-500" /> Liquidez mensual
              garantizada
            </div>
            <div className="flex items-center gap-3 font-bold text-stone-700">
              <ShieldCheck className="text-emerald-500" /> Certificación
              On-Chain
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-stone-100 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
          <div className="absolute top-0 right-0 p-4 bg-emerald-500 text-white font-bold rounded-bl-2xl">
            LIVE IMPACT
          </div>
          <h3 className="text-6xl font-black text-emerald-600 mb-2">+25%</h3>
          <p className="text-stone-400 uppercase tracking-widest font-bold text-sm">
            Salud Microbiótica
          </p>
          <hr className="my-8 border-stone-100" />
          <div className="flex gap-6">
            <div className="flex-1 bg-stone-50 p-6 rounded-3xl text-center">
              <p className="text-2xl font-bold">40%</p>
              <p className="text-xs text-stone-400">Agua</p>
            </div>
            <div className="flex-1 bg-stone-50 p-6 rounded-3xl text-center">
              <p className="text-2xl font-bold">Bio+</p>
              <p className="text-xs text-stone-400">Fauna</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pb-12 text-center text-stone-400 text-xs uppercase tracking-[0.3em]">
        © 2026 Biota Network | Built on Celo Sepolia
      </footer>
    </div>
  );
}
