"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { parseEther } from "viem";
import { Navbar } from "@/components/navbar";
import {
  Coffee,
  Carrot,
  Sprout,
  Apple,
  Loader2,
  Leaf,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

// Tesorería de Biota (Donde llega la plata)
const BIOTA_TREASURY =
  "0x6d4763715bf9cde401fd4aac9a6254ceb4382c9b" as `0x${string}`;
const CELO_SEPOLIA_ID = 11142220; // ID de la red correcta

const PRODUCTS = [
  {
    id: 1,
    name: "Café de Origen",
    price: "0.01",
    desc: "Orgánico.",
    icon: <Coffee size={40} />,
    color: "bg-amber-50",
  },
  {
    id: 2,
    name: "Canasta Bio",
    price: "0.05",
    desc: "Sin químicos.",
    icon: <Carrot size={40} />,
    color: "bg-orange-50",
  },
  {
    id: 3,
    name: "Bono Carbono",
    price: "0.1",
    desc: "Regenerativo.",
    icon: <Sprout size={40} />,
    color: "bg-emerald-50",
  },
  {
    id: 4,
    name: "Miel Silvestre",
    price: "0.02",
    desc: "Pura.",
    icon: <Apple size={40} />,
    color: "bg-yellow-50",
  },
];

export default function Marketplace() {
  const { isConnected } = useAccount();
  const chainId = useChainId();

  const { switchChainAsync } = useSwitchChain();

  const [mounted, setMounted] = useState(false);

  // 🛠️ MOTOR: Envío de transacciones
  const { sendTransactionAsync, data: hash, isPending } = useSendTransaction();

  // Esperamos la confirmación
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBuy = async (price: string) => {
    if (!isConnected) return alert("Por favor, conecta tu billetera primero.");

    try {
      // 🛡️ BLOQUEO DE SEGURIDAD: ¿Estás en la red correcta?
      if (chainId !== CELO_SEPOLIA_ID) {
        try {
          await switchChainAsync({ chainId: CELO_SEPOLIA_ID });
        } catch (switchError) {
          // ✅ CORREGIDO: Renombrado a switchError y lo usamos en consola
          console.error("Error cambiando red:", switchError);
          return alert("Debes estar en Celo Sepolia para comprar.");
        }
      }

      // Si ya estamos en la red correcta, enviamos la transacción
      console.log(`Comprando por ${price} CELO...`);

      await sendTransactionAsync({
        to: BIOTA_TREASURY,
        value: parseEther(price),
      });
    } catch (err: unknown) {
      console.error("Error en compra:", err);
      const msg = err instanceof Error ? err.message : "Transacción rechazada";

      // Filtramos mensajes feos de metamask
      if (!msg.includes("User rejected")) {
        alert("Error: Fondos insuficientes o cancelaste la operación.");
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 text-stone-900 selection:bg-emerald-200 antialiased">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-32">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black flex items-center gap-3 tracking-tighter uppercase italic">
              <Leaf className="text-emerald-600" /> Mercado Biota
            </h1>
            <p className="text-stone-500 mt-2 font-medium">
              Apoya la regeneración directa de Envigado.
            </p>
          </div>

          {/* Aviso de Red si está equivocada */}
          {isConnected && chainId !== CELO_SEPOLIA_ID && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2 animate-pulse">
              <AlertTriangle size={16} /> Estás en la red incorrecta (Cambia al
              comprar)
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={`${p.color} p-8 rounded-[32px] border-2 border-stone-200/60 flex flex-col items-center shadow-sm hover:shadow-md transition-all group relative overflow-hidden`}
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                {p.icon}
              </div>
              <h2 className="text-xl font-black uppercase italic tracking-tighter relative z-10">
                {p.name}
              </h2>
              <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mt-1 mb-8 relative z-10">
                {p.desc}
              </p>

              <button
                onClick={() => handleBuy(p.price)}
                disabled={isPending || isConfirming}
                className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex justify-center items-center gap-2 disabled:opacity-50 active:scale-95 transition-all relative z-10 hover:bg-emerald-600"
              >
                {isPending || isConfirming ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  `${p.price} CELO`
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Notificación de Éxito */}
        {isSuccess && hash && (
          <div className="mt-12 p-6 bg-white border border-emerald-100 rounded-[32px] flex flex-col items-center gap-2 animate-in zoom-in-95 duration-500 shadow-xl shadow-emerald-500/5 mx-auto max-w-md text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-emerald-600" />
            </div>
            <p className="font-black uppercase text-[10px] tracking-[0.2em] text-emerald-600">
              ¡Compra Exitosa!
            </p>
            <p className="font-mono text-[9px] text-stone-400 break-all">
              Tx: {hash}
            </p>
            <a
              href={`https://sepolia.celoscan.io/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold underline text-stone-800 hover:text-emerald-600"
            >
              Ver en Explorador
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
