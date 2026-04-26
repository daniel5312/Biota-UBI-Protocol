"use client";

import { useState, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { Droplet, Wallet, ShieldAlert, CheckCircle2 } from "lucide-react";
import { BIOTA_PASSPORT_ADDRESS, BIOTA_UBI_ADDRESS, ABIS } from "@/constants/contracts";

export const BovedaPanel = () => {
  const { wallets } = useWallets();
  const wallet = wallets[0];
  
  const [hasPassport, setHasPassport] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isFlowActive, setIsFlowActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      if (!wallet) return;
      try {
        const ethereumProvider = await wallet.getEthereumProvider();
        const provider = new ethers.providers.Web3Provider(ethereumProvider as any);
        
        // Conectar a BiotaPassport
        const passportContract = new ethers.Contract(BIOTA_PASSPORT_ADDRESS, ABIS.PASSPORT, provider);

        // 1. Verificar si el usuario tiene un pasaporte
        const balance = await passportContract.balanceOf(wallet.address);
        const ownsPassport = balance.toNumber() > 0;
        setHasPassport(ownsPassport);

        if (ownsPassport) {
          const tokenId = 0; 

          // 2. Leer estado del lote
          const loteData = await passportContract.lotePasaporte(tokenId);
          setIsVerified(loteData.esVerificado);

          // 3. Verificar estado del flujo UBI (evita crasheo si la dirección está vacía)
          if (BIOTA_UBI_ADDRESS && BIOTA_UBI_ADDRESS !== "") {
            const ubiContract = new ethers.Contract(BIOTA_UBI_ADDRESS, ABIS.UBI, provider);
            const flowActive = await ubiContract.isFlowActive(tokenId);
            setIsFlowActive(flowActive);
          }
        }
      } catch (error) {
        console.error("Error leyendo blockchain:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockchainData();
  }, [wallet]);

  if (!wallet) return null;
  if (loading) return <div className="animate-pulse bg-white/5 h-32 rounded-3xl" />;

  return (
    <div className="bg-gradient-to-br from-emerald-900/40 to-[#0a0a0a] border border-emerald-500/20 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 opacity-5">
        <Droplet size={200} />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black italic uppercase text-white flex items-center gap-3">
            <Wallet className="text-emerald-500" /> Mi Bóveda ReFi
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Conectado: <span className="font-mono text-emerald-400">{wallet.address.slice(0,6)}...{wallet.address.slice(-4)}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border ${hasPassport ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            {hasPassport ? <CheckCircle2 size={16} /> : <ShieldAlert size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {hasPassport ? "Pasaporte Activo" : "Sin Pasaporte"}
            </span>
          </div>

          {hasPassport && (
            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border ${isVerified ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'}`}>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Impacto: {isVerified ? "Verificado" : "Pendiente de Auditoría"}
              </span>
            </div>
          )}

          {isVerified && (
            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border ${isFlowActive ? 'bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-green-400' : 'bg-stone-800 border-stone-700 text-stone-500'}`}>
              <Droplet size={16} className={isFlowActive ? "animate-bounce" : ""} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Stream UBI: {isFlowActive ? "Goteando G$" : "Detenido"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
