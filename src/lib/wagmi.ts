import { createPublicClient, http } from 'viem'
import { celoSepolia } from 'viem/chains'
import { BIOTA_CONTRACT_ADDRESS, BIOTA_ABI } from "@/constants/abis/BiotaPassport";

// 1. Cliente público para leer datos de la blockchain sin necesidad de wallet
export const publicClient = createPublicClient({
    chain: celoSepolia,
    transport: http("https://forno.celo-sepolia.celo-testnet.org")
})

// 2. Exportamos el objeto del contrato para usarlo con los hooks de Wagmi (useReadContract, useWriteContract)
export const biotaContract = {
    address: BIOTA_CONTRACT_ADDRESS as `0x${string}`,
    abi: BIOTA_ABI,
} as const; // 'as const' ayuda a TypeScript con el tipado de las funciones del ABI