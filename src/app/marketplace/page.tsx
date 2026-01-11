"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import {
  Coffee,
  Carrot,
  Sprout,
  Apple,
  Loader2,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { ethers, providers } from "ethers";

const BIOTA_TREASURY = "0x6d4763715bf9cde401fd4aac9a6254ceb4382c9b";

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
  const { authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const [mounted, setMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBuy = async (price: string) => {
    if (!authenticated || wallets.length === 0)
      return alert("Billetera no conectada");

    try {
      setIsPending(true);
      const wallet = wallets[0];
      await wallet.switchChain(11142220);

      const eip1193Provider = await wallet.getEthereumProvider();
      const provider = new providers.Web3Provider(eip1193Provider);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: BIOTA_TREASURY,
        value: ethers.utils.parseEther(price),
      });

      setTxHash(tx.hash);
      await tx.wait();
    } catch (err) {
      console.error(err);
      alert("Transacción fallida");
    } finally {
      setIsPending(false);
    }
  };

  if (!mounted || !ready) return null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 text-stone-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-32">
        <h1 className="text-4xl font-black mb-12 flex items-center gap-3">
          <Leaf className="text-emerald-600" /> Mercado Biota
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={`${p.color} p-8 rounded-3xl border-2 border-stone-200 flex flex-col items-center shadow-sm`}
            >
              <div className="mb-4">{p.icon}</div>
              <h2 className="text-xl font-bold">{p.name}</h2>
              <p className="text-stone-500 text-sm mb-6">{p.desc}</p>
              <button
                onClick={() => handleBuy(p.price)}
                disabled={isPending}
                className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex justify-center disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  `${p.price} CELO`
                )}
              </button>
            </div>
          ))}
        </div>
        {txHash && (
          <div className="mt-12 p-4 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 justify-center border border-emerald-200">
            <CheckCircle2 /> <span>Hash: {txHash.slice(0, 30)}...</span>
          </div>
        )}
      </main>
    </div>
  );
}
