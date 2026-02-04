import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            viaIR: true, // Esto es lo que soluciona el error Stack too deep
        },
    },
    networks: {
        celoSepolia: {
            // Usando el RPC oficial que me diste antes
            url: "https://forno.celo-sepolia.celo-testnet.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 11142220,
        },
        celo: {
            url: "https://forno.celo.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 42220,
        },
    },
    etherscan: {
        apiKey: {
            celoSepolia: process.env.ETHERSCAN_API_KEY || "",
            celo: process.env.ETHERSCAN_API_KEY || "",
        },
    }
};

export default config;