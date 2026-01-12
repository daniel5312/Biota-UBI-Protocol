"use client";

import { usePrivy } from "@privy-io/react-auth";
import {
  Sprout,
  Database,
  LineChart,
  ClipboardCheck,
  MessageSquare,
  Microscope,
  Globe,
  Zap,
  Heart,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { RegistroProductor } from "@/components/forms/registroProductor";

export default function ProducerDashboard() {
  const { ready } = usePrivy();

  if (!ready) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 antialiased">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-24">
        <header className="border-b border-white/5 pb-10">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            Portal del Productor
          </h1>
          <p className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">
            Protocolo ReFi • Nodo Génesis Envigado
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 bg-white/5 p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap size={120} />
          </div>
          <div className="space-y-6 relative z-10">
            <h2 className="text-3xl font-black italic uppercase">
              Acompañamiento en tu Transición
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              La agricultura regenerativa no es solo cambiar insumos, es sanar
              el ecosistema. Biota te acompaña con técnicos en campo para
              restaurar la <b>microbiología del suelo</b>. Sabemos que este
              proceso toma tiempo, por eso, mientras la tierra sana, recibes tu{" "}
              <b>UBI (Renta Básica)</b> directamente en tu TuCOP Wallet.
            </p>
            <div className="flex gap-4">
              <div className="bg-emerald-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase">
                Asistencia Técnica
              </div>
              <div className="bg-blue-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase">
                Garantía UBI
              </div>
            </div>
          </div>
          <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-4">
            <h4 className="text-xs font-black uppercase text-emerald-500">
              ¿Por qué Regenerar?
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed italic">
              &ldquo;Buscamos que el productor deje de ser un extractor y se
              convierta en un guardián de la vida. El UBI financia tu
              tranquilidad mientras la naturaleza recupera su capacidad
              productiva.&rdquo;
            </p>
          </div>
        </section>

        <section className="space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black italic uppercase mb-4 flex items-center gap-3">
              <Microscope className="text-blue-500" /> Datos que Generan Valor
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Mientras regeneras, recopilamos evidencia física para garantizar
              datos en tiempo real. Esta información se tokeniza para vender{" "}
              <b>Bonos Verdes</b> a sponsors globales que financian el
              protocolo.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { t: "Carbono", d: "Captura de CO2 (Ton)", icon: <Globe /> },
              {
                t: "Microbiología",
                d: "Salud fúngica y bacteriana",
                icon: <Sprout />,
              },
              {
                t: "Biodiversidad",
                d: "Conteo de especies locales",
                icon: <Heart />,
              },
              {
                t: "Suelo",
                d: "cm de suelo recuperado/año",
                icon: <Database />,
              },
              {
                t: "Alimentario",
                d: "Calidad nutricional real",
                icon: <Zap />,
              },
              { t: "Ecosistema", d: "Retención hídrica", icon: <LineChart /> },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[32px] hover:border-emerald-500/40 transition-all"
              >
                <div className="text-emerald-500 mb-4">{item.icon}</div>
                <p className="text-sm font-black uppercase italic">{item.t}</p>
                <p className="text-[9px] text-stone-500 uppercase mt-1 leading-tight">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="registro" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black italic uppercase">
              Inscribe tu Predio
            </h2>
            <p className="text-stone-500 text-sm max-w-xl mx-auto italic">
              Al finalizar este registro y pasar el diagnóstico inicial,
              crearemos tu <b>Identidad Self</b> y tu certificado Biota
              verificado en Celo.
            </p>
          </div>
          <RegistroProductor />
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 p-10 rounded-[40px] border border-white/5">
            <h3 className="text-xl font-black italic uppercase mb-4">
              Comunícate con Biota
            </h3>
            <p className="text-stone-400 text-xs mb-6">
              Agenda una visita técnica o inscríbete en nuestros talleres y
              workshops de concientización.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase">
                <MessageSquare size={14} /> WhatsApp Soporte
              </button>
              <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-white/10">
                <ClipboardCheck size={14} /> Agendar Taller
              </button>
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[40px] flex flex-col justify-center text-center">
            <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest mb-2">
              Ubicación Nodo
            </p>
            <p className="text-sm font-bold italic">
              Génesis Envigado, Antioquia
            </p>
            <p className="text-[9px] text-stone-500 mt-4 uppercase">
              Laboratorio de Transición ReFi
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
