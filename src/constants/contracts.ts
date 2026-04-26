// src/constants/contracts.ts
import { BIOTA_PASSPORT_ABI } from "./abis/BiotaPassport";
import { BIOTA_UBI_ABI } from "./abis/BiotaUBI";

// Direcciones Oficiales en Celo Mainnet
export const BIOTA_PASSPORT_ADDRESS = process.env.NEXT_PUBLIC_PASSPORT_ADDRESS || "0xBf1A8642c045E0178A300CDBAE6608571f745C80";
export const BIOTA_UBI_ADDRESS = process.env.NEXT_PUBLIC_UBI_ADDRESS || ""; // Añade esto a tu .env cuando lo tengas

export const ABIS = {
  PASSPORT: BIOTA_PASSPORT_ABI,
  UBI: BIOTA_UBI_ABI,
};
