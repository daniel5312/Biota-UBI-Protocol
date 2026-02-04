"use client";

import { useEffect, useState, useCallback } from "react";
import {
  useAccount,
  useReadContract,
  usePublicClient,
  useConnect,
  useDisconnect,
} from "wagmi";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { RegistroProductor } from "@/components/forms/registroProductor";
import { ActualizarEvidenciaModal } from "@/components/modals/actualizarEvidenciaModal";
import {
  Loader2,
  LayoutDashboard,
  AlertCircle,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Maximize,
  RefreshCw,
  QrCode,
  Globe,
  Wallet,
  LogOut,
} from "lucide-react";
import {
  BIOTA_CONTRACT_ADDRESS,
  BIOTA_ABI,
} from "@/constants/abis/BiotaPassport";

// NO NECESITAMOS DEFINIR 'WaapWindow' AQUÍ, YA LO TIENES EN EL D.TS GLOBAL 🏆

type LotePasaporteResult = readonly [
  bigint,
  bigint,
  string,
  bigint,
  bigint,
  string,
  string,
  string,
  string,
  `0x${string}`,
  boolean,
];

interface PassportData {
  id: string;
  ubicacionGeografica: string;
  areaM2: string;
  cmSueloRecuperado: string;
  estadoBiologico: string;
  metodosAgricolas: string;
  esVerificado: boolean;
  verificador: string;
}

export default function DashboardPage() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const publicClient = usePublicClient();
  const router = useRouter();

  const [hasPassport, setHasPassport] = useState<boolean | null>(null);
  const [passportData, setPassportData] = useState<PassportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- LOGIN ---

  const handleHumanLogin = async () => {
    // Usamos window.waap directo gracias a tu archivo d.ts
    if (typeof window !== "undefined" && window.waap) {
      await window.waap.login();
    }
  };

  const handleQRLogin = () => {
    const wc = connectors.find((c) => c.id === "walletConnect");
    if (wc) {
      connect({ connector: wc });
    } else {
      alert("El conector QR no cargó. Revisa la consola.");
      console.log("Conectores:", connectors);
    }
  };

  const handleMetaMaskLogin = () => {
    const injected = connectors.find((c) => c.id === "injected");
    if (injected) connect({ connector: injected });
    else {
      const others = connectors.filter((c) => c.id !== "walletConnect");
      if (others.length > 0) connect({ connector: others[0] });
    }
  };

  // --- LÓGICA DE DATOS (Sin cambios, estaba perfecta) ---

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
    abi: BIOTA_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const checkPassport = useCallback(async () => {
    if (isConnecting || isReconnecting) return;

    if (!isConnected || !address || !publicClient) {
      setLoading(false);
      return;
    }

    try {
      if (balance && Number(balance) > 0) {
        const logs = await publicClient.getContractEvents({
          address: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
          abi: BIOTA_ABI,
          eventName: "PassportMinted",
          args: { to: address as `0x${string}` },
          fromBlock: BigInt(0),
        });

        if (logs && logs.length > 0) {
          const log = logs[0] as unknown as { args: { tokenId: bigint } };
          const tokenId = log.args.tokenId;

          const data = (await publicClient.readContract({
            address: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
            abi: BIOTA_ABI,
            functionName: "lotePasaporte",
            args: [tokenId],
          })) as unknown as LotePasaporteResult;

          setPassportData({
            id: tokenId.toString(),
            ubicacionGeografica: data[2],
            areaM2: data[3].toString(),
            cmSueloRecuperado: data[4].toString(),
            estadoBiologico: data[5],
            metodosAgricolas: data[8],
            esVerificado: data[10],
            verificador: data[9],
          });
          setHasPassport(true);
        } else {
          setHasPassport(false);
        }
      } else {
        setHasPassport(false);
      }
    } catch (err: unknown) {
      console.error("Error checking passport:", err);
      setHasPassport(false);
    } finally {
      setLoading(false);
    }
  }, [
    isConnected,
    isConnecting,
    isReconnecting,
    address,
    publicClient,
    balance,
  ]);

  useEffect(() => {
    checkPassport();
  }, [checkPassport]);

  // --- RENDERIZADO ---

  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  if (isConnecting || isReconnecting || (isConnected && loading)) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-emerald-500">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-sm font-mono tracking-widest animate-pulse uppercase">
          Cargando...
        </p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center">
        <AlertCircle className="text-emerald-500 mb-4" size={48} />
        <h1 className="text-2xl font-black uppercase italic mb-2">
          Conecta tu Billetera
        </h1>
        <p className="text-stone-400 mb-8 max-w-xs text-sm">
          Elige cómo quieres acceder.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {/* QR */}
          <button
            onClick={handleQRLogin}
            className="bg-white text-black px-6 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-stone-200 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <QrCode size={18} /> <span>Escanear QR</span>
            </div>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Google */}
          <button
            onClick={handleHumanLogin}
            className="bg-emerald-600 text-white px-6 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <Globe size={18} /> <span>Google / Email</span>
            </div>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* MetaMask */}
          <button
            onClick={handleMetaMaskLogin}
            className="bg-white/5 border border-white/10 text-stone-300 px-6 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Wallet size={16} /> Extensión Navegador
          </button>

          <button
            onClick={() => router.push("/")}
            className="mt-4 text-stone-500 text-[10px] uppercase font-bold tracking-widest hover:text-white"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  // Dashboard con datos
  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] tracking-[0.3em] uppercase mb-2">
              <LayoutDashboard size={14} /> Panel Biota V3
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              {hasPassport ? "Tu Ecosistema" : "Crea tu Identidad"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => disconnect()}
              className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-red-500/20 transition-all"
            >
              <LogOut size={14} /> Salir
            </button>

            {hasPassport && (
              <div
                className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
                  passportData?.esVerificado
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {passportData?.esVerificado
                    ? "Verificado On-Chain"
                    : "Pendiente Validación"}
                </span>
              </div>
            )}
          </div>
        </header>

        {hasPassport === false ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <RegistroProductor />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-700">
            {/* CARD 1: INFORMACIÓN DEL PREDIO */}
            <div className="md:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10">
              <div className="flex justify-between items-start mb-10">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                  Predio #{passportData?.id}
                </h2>
                {passportData?.esVerificado && (
                  <ShieldCheck className="text-emerald-500" size={28} />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <MapPin className="text-emerald-500 mb-2" size={20} />
                  <p className="text-[9px] font-black uppercase text-stone-500">
                    Ubicación Registrada
                  </p>
                  <p className="text-sm font-bold italic">
                    {passportData?.ubicacionGeografica}
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <Maximize className="text-emerald-500 mb-2" size={20} />
                  <p className="text-[9px] font-black uppercase text-stone-500">
                    Área Protegida
                  </p>
                  <p className="text-sm font-bold">{passportData?.areaM2} m²</p>
                </div>
              </div>

              <div className="bg-emerald-500/10 p-8 rounded-3xl flex justify-between items-center border border-emerald-500/20">
                <div>
                  <p className="text-[10px] font-black uppercase text-emerald-500">
                    Recuperación de Suelo
                  </p>
                  <p className="text-4xl font-black italic">
                    +{passportData?.cmSueloRecuperado} cm
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-black p-4 rounded-xl hover:bg-emerald-500 transition-all active:scale-95"
                >
                  <RefreshCw size={24} />
                </button>
              </div>
            </div>

            {/* CARD 2: ESTADO BIOLÓGICO */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-[40px] p-10 flex flex-col justify-between italic font-black uppercase tracking-tighter text-white">
              <div>
                <h3 className="text-xl mb-2 text-white/60">Estado:</h3>
                <p className="text-3xl leading-none mb-6">
                  {passportData?.estadoBiologico}
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[9px] text-white/40 mb-2 tracking-widest">
                    Metodologías:
                  </p>
                  <p className="text-xs font-normal normal-case italic text-white/80 tracking-normal">
                    {passportData?.metodosAgricolas}
                  </p>
                </div>
              </div>
              <button
                onClick={() => (window.location.href = "/marketplace")}
                className="group flex items-center gap-2 text-[10px] tracking-widest mt-10"
              >
                Marketplace{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        )}
      </main>

      {passportData && (
        <ActualizarEvidenciaModal
          tokenId={passportData.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            refetchBalance();
            checkPassport();
          }}
        />
      )}
    </div>
  );
}
