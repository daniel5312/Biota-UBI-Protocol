"use client";

import { useState, ChangeEvent } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  MapPin,
  User,
  Smartphone,
  Maximize,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Landmark,
  Sprout,
  ClipboardCheck,
} from "lucide-react";
import {
  BIOTA_CONTRACT_ADDRESS,
  BIOTA_ABI,
} from "@/constants/abis/BiotaPassport";

interface FormData {
  nombre: string;
  cedula: string;
  celular: string;
  vereda: string;
  municipio: string;
  area: string;
  tipoCultivo: string;
  practicas: string;
}

export const RegistroProductor = () => {
  // 🛠️ MOTOR NUEVO: Wagmi para escritura y estado de cuenta
  const { address, isConnected } = useAccount();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();

  // Esperamos la confirmación de la transacción
  const { isLoading: isWaiting } = useWaitForTransactionReceipt({ hash });

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    cedula: "",
    celular: "",
    vereda: "",
    municipio: "Envigado",
    area: "",
    tipoCultivo: "Café",
    practicas: "Orgánico en transición",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMintPassport = async (): Promise<void> => {
    if (!isConnected || !address)
      return alert("Por favor conecta tu wallet primero");

    try {
      // 🛠️ PREPARACIÓN DE DATOS
      const ubicacion = `${formData.municipio}, ${formData.vereda}`;
      const metodosExtra = `Cultivo: ${formData.tipoCultivo} | Prácticas: ${formData.practicas} | Tel: ${formData.celular}`;
      const areaValue = formData.area
        ? BigInt(Math.floor(Number(formData.area)))
        : BigInt(0);

      // 🚀 EJECUCIÓN: Llamada a los 9 parámetros en el orden exacto del ABI
      await writeContractAsync({
        address: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
        abi: BIOTA_ABI,
        functionName: "mintPasaporte",
        args: [
          address, // 1. recipient
          "ipfs://biota-pass-v1", // 2. tokenURI
          ubicacion, // 3. _ubicacionGeografica
          areaValue, // 4. _areaM2 (BigInt para uint256)
          BigInt(0), // 5. _cmSueloRecuperado
          "Génesis", // 6. _estadoBiologico
          formData.cedula || "N/A", // 7. _hashAnalisisLab
          "BIO-VERIFIED", // 8. _ingredientesHash
          metodosExtra, // 9. _metodosAgricolas
        ],
      });

      setStep(4);
    } catch (err: unknown) {
      console.error("Error al emitir pasaporte:", err);
      const msg = err instanceof Error ? err.message : "Error desconocido";
      alert(`Error: ${msg}`);
    }
  };

  // Mantenemos toda tu UI original...
  return (
    <section
      id="form"
      className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500"
    >
      <div
        className={`${
          step === 4 ? "bg-blue-600" : "bg-emerald-600"
        } p-8 flex justify-between items-center transition-colors duration-700`}
      >
        <div>
          <h3 className="text-2xl font-black italic uppercase text-white leading-none tracking-tighter">
            {step === 4 ? "Identidad Activa" : "Registro de Predio"}
          </h3>
          <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
            Paso {step} de 4 • Protocolo ReFi Biota
          </p>
        </div>
        <ShieldCheck size={40} className="text-white/40" />
      </div>

      <div className="p-10">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
                  Nombre del Productor
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl focus-within:border-emerald-500 transition-all">
                  <User size={18} className="text-stone-500" />
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    className="bg-transparent border-none outline-none w-full text-sm text-white"
                  />
                </div>
              </div>
              {/* Cédula y Celular... (Mismo código que tenías) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
                  Cédula / NIT
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Landmark size={18} className="text-stone-500" />
                  <input
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-sm text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
                  Celular
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Smartphone size={18} className="text-stone-500" />
                  <input
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-sm text-white"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all"
            >
              Continuar <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* PASO 2: UBICACIÓN (Mismo diseño original) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
                  Vereda / Municipio
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <MapPin size={18} className="text-stone-500" />
                  <input
                    name="vereda"
                    value={formData.vereda}
                    onChange={handleInputChange}
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-sm text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
                  Área (m2)
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Maximize size={18} className="text-stone-500" />
                  <input
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    type="number"
                    className="bg-transparent border-none outline-none w-full text-sm text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 border border-white/10 py-4 rounded-2xl font-black text-xs uppercase text-white/50"
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: FINALIZAR */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
                  Cultivo Principal
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Sprout size={18} className="text-stone-500" />
                  <input
                    name="tipoCultivo"
                    value={formData.tipoCultivo}
                    onChange={handleInputChange}
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-sm text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-500 ml-2 tracking-widest">
                  Prácticas
                </label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <ClipboardCheck size={18} className="text-stone-500" />
                  <input
                    name="practicas"
                    value={formData.practicas}
                    onChange={handleInputChange}
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-sm text-white"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleMintPassport}
              disabled={isPending || isWaiting}
              className="w-full bg-emerald-500 text-black py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
              {isPending || isWaiting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Finalizar y Emitir Pasaporte"
              )}
            </button>
          </div>
        )}

        {/* PASO 4: ÉXITO */}
        {step === 4 && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-blue-500/10">
              <CheckCircle2 size={48} className="text-blue-500" />
            </div>
            <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              Pasaporte <span className="text-emerald-500">Emitido</span>
            </h4>
            <div className="p-6 bg-[#0c0c0c] border border-white/5 rounded-[32px] space-y-3">
              <p className="text-[8px] font-black uppercase text-stone-600 tracking-widest">
                Hash de Transacción
              </p>
              <p className="font-mono text-[9px] text-emerald-500/60 break-all leading-tight">
                {hash}
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all"
            >
              Ver mi Pasaporte en el Dashboard
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
