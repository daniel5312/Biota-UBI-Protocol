// Dirección donde desplegaste el contrato en Celo Sepolia:
// 👇 ESTA ES LA NUEVA (La que acabamos de desplegar en Celo Sepolia)
//export const BIOTA_CONTRACT_ADDRESS = "0xD1d164ef770ae1Ea45C45E0a80A0e0D80CC9A731" as const;

// 👉 OPCIÓN B: CELO MAINNET (Producción - Real) 🔥 ACTIVA
// src/constants/abis/BiotaPassport.ts

// ========================================================
// 🎛️ SELECTOR DE RED
// ========================================================

// 👉 OPCIÓN A: CELO SEPOLIA (Testnet)
export const BIOTA_CONTRACT_ADDRESS = "0x0b3A1C8F0D6FE87aCAA0C038fb62ff4c9075462d" as const;

// 👉 OPCIÓN B: CELO MAINNET (Producción) 🔥 ACTIVA
//export const BIOTA_CONTRACT_ADDRESS = "0x0BE81e6651edBf914F1aa8523eB4C357E980d5aF" as const;

// ========================================================

// ABI COMPLETO Y SEGURO (Estándar ERC721 + Biota)
export const BIOTA_ABI = [
    {
        inputs: [
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "string", name: "tokenURI", type: "string" },
            { internalType: "string", name: "_ubicacionGeografica", type: "string" },
            { internalType: "uint256", name: "_areaM2", type: "uint256" },
            { internalType: "uint256", name: "_cmSueloRecuperado", type: "uint256" },
            { internalType: "string", name: "_estadoBiologico", type: "string" },
            { internalType: "string", name: "_hashAnalisisLab", type: "string" },
            { internalType: "string", name: "_ingredientesHash", type: "string" },
            { internalType: "string", name: "_metodosAgricolas", type: "string" },
        ],
        name: "mintPasaporte",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "_nuevoCmSuelo", type: "uint256" },
            { internalType: "string", name: "_nuevoEstado", type: "string" },
            { internalType: "string", name: "_nuevoHashLab", type: "string" },
            { internalType: "string", name: "_nuevosMetodos", type: "string" }
        ],
        name: "actualizarEvidencia",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "lotePasaporte",
        outputs: [
            { internalType: "uint256", name: "fechaRegistro", type: "uint256" },
            { internalType: "uint256", name: "ultimaActualizacion", type: "uint256" }, // 🆕 Agregado
            { internalType: "string", name: "ubicacionGeografica", type: "string" },
            { internalType: "uint256", name: "areaM2", type: "uint256" },
            { internalType: "uint256", name: "cmSueloRecuperado", type: "uint256" },
            { internalType: "string", name: "estadoBiologico", type: "string" },
            { internalType: "string", name: "hashAnalisisLab", type: "string" },
            { internalType: "string", name: "ingredientesHash", type: "string" },
            { internalType: "string", name: "metodosAgricolas", type: "string" },
            { internalType: "address", name: "verificador", type: "address" },
            { internalType: "bool", name: "esVerificado", type: "bool" } // 🆕 Agregado
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    // 🔥 EVENTO AGREGADO PARA FILTRAR EL TOKENID
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "PassportMinted",
        type: "event",
    },
] as const;