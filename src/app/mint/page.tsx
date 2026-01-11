"use client";

import { useState } from "react";
import { useWallets } from "@privy-io/react-auth"; // Usamos Privy directamente
import { prepareContractCall, encode } from "thirdweb"; // Importamos encode
import { contract } from "@/lib/thirdweb";
import { useRouter } from "next/navigation";
import { BIOTA_CONTRACT_ADDRESS } from "@/constants/abis/BiotaPassport";

export default function MintPage() {
  const { wallets } = useWallets(); // Obtenemos la wallet de Privy
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ubicacion: "",
    area: "",
    estado: "En Transición",
    metodos: "Agroecología",
  });

  const handleMint = async () => {
    // 1. Verificamos wallet
    const wallet = wallets[0];
    if (!wallet) return alert("Por favor conecta tu wallet primero");

    setLoading(true);

    try {
      // 2. Preparamos datos (Thirdweb)
      const transaction = prepareContractCall({
        contract,
        method:
          "function mintPasaporte(address recipient, string tokenURI, string _ubicacionGeografica, uint256 _areaM2, uint8 _cmSueloRecuperado, string _estadoBiologico, string _hashAnalisisLab, string _ingredientesHash, string _metodosAgricolas) returns (uint256)",
        params: [
          wallet.address as `0x${string}`, // <--- Corrección de tipo aquí
          "ipfs://QmEjemplo...",
          formData.ubicacion,
          BigInt(formData.area || 0),
          5,
          formData.estado,
          "HashLab123",
          "Compost,Biochar",
          formData.metodos,
        ],
      });

      // 3. Codificamos a datos hexadecimales
      const data = await encode(transaction);

      // 4. Enviamos con Privy (El código que me preguntaste)
      const provider = await wallet.getEthereumProvider();

      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: wallet.address as `0x${string}`, // <--- Corrección de tipo aquí
            to: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
            data: data as `0x${string}`,
          },
        ],
      });

      alert(`¡Éxito! Hash: ${txHash}`);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al firmar. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-green-100">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Nuevo Lote</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ubicación (Coordenadas)
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border-gray-300 border p-3"
              placeholder="6.1234, -75.5678"
              onChange={(e) =>
                setFormData({ ...formData, ubicacion: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Área (m2)
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border-gray-300 border p-3"
              placeholder="1000"
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleMint}
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg mt-4 hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Abriendo Wallet..." : "Firmar Pasaporte"}
          </button>

          <button
            onClick={() => router.back()}
            className="w-full text-gray-500 text-sm mt-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
