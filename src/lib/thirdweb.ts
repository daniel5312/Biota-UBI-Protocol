import { createThirdwebClient, getContract, defineChain } from "thirdweb";
import { BIOTA_CONTRACT_ADDRESS } from "@/constants/abis/BiotaPassport";

export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

// USAMOS EL ID NUEVO QUE ME DISTE (11142220)
export const chain = defineChain(11142220);

export const contract = getContract({
    client,
    chain,
    address: BIOTA_CONTRACT_ADDRESS,
});