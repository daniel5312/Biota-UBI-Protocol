"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Loader2, X, RefreshCw } from "lucide-react";
import {
  BIOTA_CONTRACT_ADDRESS,
  BIOTA_ABI,
} from "@/constants/abis/BiotaPassport";

interface Props {
  tokenId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ActualizarEvidenciaModal = ({
  tokenId,
  isOpen,
  onClose,
  onSuccess,
}: Props) => {
  const { isConnected } = useAccount();

  // 🛠️ MOTOR: Wagmi para ejecutar la función del contrato
  const { writeContractAsync, data: hash } = useWriteContract();

  // Estado de espera de la transacción en el bloque
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nuevoCm: "",
    nuevoEstado: "Suelo en Recuperación",
    nuevoHashLab: "GÉNESIS-V3",
    nuevosMetodos: "",
  });

  const handleUpdate = async () => {
    if (!isConnected) return alert("Conecta tu wallet");
    setLoading(true);

    try {
      // 🚀 EJECUCIÓN: Llamada a 'actualizarEvidencia' (Viem/Wagmi)
      // Orden del ABI: tokenId, _nuevoCmSuelo, _nuevoEstado, _nuevoHashLab, _nuevosMetodos
      await writeContractAsync({
        address: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
        abi: BIOTA_ABI,
        functionName: "actualizarEvidencia",
        args: [
          BigInt(tokenId), // uint256
          BigInt(formData.nuevoCm || "0"), // uint256 (BigInt constructor para evitar 0n)
          formData.nuevoEstado, // string
          formData.nuevoHashLab, // string
          formData.nuevosMetodos, // string
        ],
      });

      // Nota: onSuccess se dispara después de que la wallet confirma el envío.
      // Si quieres esperar al bloque, puedes usar useEffect con isSuccess del Receipt.
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error("Error en actualización:", err);
      const msg = err instanceof Error ? err.message : "Error al firmar";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-[40px] p-10 relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-stone-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">
          Actualizar Evidencia
        </h3>
        <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-8">
          Token ID: #{tokenId} • Red Celo
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-emerald-500 ml-2 tracking-widest">
              Cm Suelo Recuperado
            </label>
            <input
              type="number"
              placeholder="Ej. 5"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500 transition-all font-bold"
              onChange={(e) =>
                setFormData({ ...formData, nuevoCm: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-stone-500 ml-2 tracking-widest">
              Nuevo Estado Biológico
            </label>
            <input
              type="text"
              placeholder="Ej. Suelo Regenerado"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, nuevoEstado: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-stone-500 ml-2 tracking-widest">
              Métodos Aplicados
            </label>
            <textarea
              placeholder="Ej. Biochar y Compost"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-emerald-500 h-28 resize-none transition-all text-sm leading-relaxed"
              onChange={(e) =>
                setFormData({ ...formData, nuevosMetodos: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading || isConfirming}
            className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading || isConfirming ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <RefreshCw size={14} /> Firmar en Blockchain
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
