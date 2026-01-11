// Dirección donde desplegaste el contrato en Celo Sepolia:
export const BIOTA_CONTRACT_ADDRESS = "0x602272Dc864dc4A04AEd982face98af3793A9f5F" as const;

// La Interfaz del Contrato (ABI) - Solo incluimos la función que vamos a usar
export const BIOTA_ABI = [
    {
        inputs: [
            { internalType: "address", name: "recipient", type: "address"
            },
            { internalType: "string", name: "tokenURI", type: "string"
            },
            { internalType: "string", name: "_ubicacionGeografica", type: "string"
            },
            { internalType: "uint256", name: "_areaM2", type: "uint256"
            },
            { internalType: "uint8", name: "_cmSueloRecuperado", type: "uint8"
            },
            { internalType: "string", name: "_estadoBiologico", type: "string"
            },
            { internalType: "string", name: "_hashAnalisisLab", type: "string"
            },
            { internalType: "string", name: "_ingredientesHash", type: "string"
            },
            { internalType: "string", name: "_metodosAgricolas", type: "string"
            },
        ],
        name: "mintPasaporte",
        outputs: [
            { internalType: "uint256", name: "", type: "uint256"
            }
        ],
        stateMutability: "nonpayable", // Significa que modifica el estado (paga gas)
        type: "function",
    },
    // Opcional: Agregamos una función de lectura para obtener los datos de un lote
    {
        inputs: [
            { internalType: "uint256", name: "", type: "uint256"
            }
        ],
        name: "lotePasaporte",
        outputs: [
            { internalType: "uint256", name: "fechaRegistro", type: "uint256"
            },
            { internalType: "string", name: "ubicacionGeografica", type: "string"
            },
            { internalType: "uint256", name: "areaM2", type: "uint256"
            },
            { internalType: "uint8", name: "cmSueloRecuperado", type: "uint8"
            },
            { internalType: "string", name: "estadoBiologico", type: "string"
            },
            { internalType: "string", name: "hashAnalisisLab", type: "string"
            },
            { internalType: "string", name: "ingredientesHash", type: "string"
            },
            { internalType: "string", name: "metodosAgricolas", type: "string"
            },
            { internalType: "address", name: "verificador", type: "address"
            },
        ],
        stateMutability: "view", // Es una función de sólo lectura (no paga gas)
        type: "function",
    },
] as const;