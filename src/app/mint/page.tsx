"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  Loader2,
  ArrowLeft,
  MapPin,
  Maximize,
  Leaf,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import {
  BIOTA_CONTRACT_ADDRESS,
  BIOTA_ABI,
} from "@/constants/abis/BiotaPassport";

export default function MintPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  // 🛠️ MOTOR WAGMI: Escritura en Blockchain
  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  // Esperamos confirmación
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [formData, setFormData] = useState({
    ubicacion: "",
    area: "",
    estado: "En Transición",
    metodos: "Agroecología",
  });

  const handleMint = async () => {
    if (!isConnected || !address)
      return alert("Por favor conecta tu wallet primero");

    try {
      // 🚀 EJECUCIÓN: Llamada directa al contrato
      await writeContractAsync({
        address: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
        abi: BIOTA_ABI,
        functionName: "mintPasaporte",
        args: [
          address, // Recipient (tu misma wallet)
          "ipfs://QmDefaultBiotaV1", // TokenURI (Placeholder o dinámico si tienes IPFS)
          formData.ubicacion,
          BigInt(formData.area || "0"),
          BigInt(5), // Valor inicial de suelo recuperado (Regla de negocio)
          formData.estado,
          "HashLab-Pendiente", // Hash análisis lab
          "N/A", // Ingredientes Hash
          formData.metodos,
        ],
      });

      // No redirigimos inmediatamente para mostrar el éxito en pantalla
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof Error ? err.message : "Error al firmar transacción";
      alert(msg);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-[#0a0a0a] border border-emerald-500/30 p-10 rounded-[40px] text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black italic uppercase mb-2">
            ¡Lote Registrado!
          </h2>
          <p className="text-stone-400 text-sm mb-6">
            Tu pasaporte biológico ha sido acuñado en la blockchain.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition-all"
          >
            Ir al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 flex items-center justify-center">
      {/* Botón Flotante para volver */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-stone-400 hover:text-white"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-2 text-emerald-500 mb-6">
          <Leaf size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Minting V3
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-8 leading-none">
          Nuevo Lote <br /> <span className="text-stone-600">Productivo</span>
        </h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
              Ubicación (Coords o Vereda)
            </label>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl focus-within:border-emerald-500 transition-all">
              <MapPin size={18} className="text-stone-500" />
              <input
                type="text"
                className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-stone-700 font-bold"
                placeholder="Ej. 6.1234, -75.5678"
                onChange={(e) =>
                  setFormData({ ...formData, ubicacion: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
              Área del Lote (m²)
            </label>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl focus-within:border-emerald-500 transition-all">
              <Maximize size={18} className="text-stone-500" />
              <input
                type="number"
                className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-stone-700 font-bold"
                placeholder="Ej. 5000"
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 mb-2 px-2">
              <Sprout size={14} className="text-emerald-500" />
              <span className="text-[9px] uppercase font-bold text-stone-400">
                Datos por Defecto:
              </span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-stone-500 border border-white/5">
                Estado: En Transición
              </span>
              <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-stone-500 border border-white/5">
                Método: Agroecología
              </span>
            </div>
          </div>

          <button
            onClick={handleMint}
            disabled={isPending || isConfirming || !isConnected}
            className="w-full bg-emerald-600 text-black py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Procesando...
              </>
            ) : !isConnected ? (
              "Conecta tu Wallet"
            ) : (
              "Firmar Pasaporte"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
