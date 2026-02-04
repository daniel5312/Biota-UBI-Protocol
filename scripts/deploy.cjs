//eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable */
// @ts-nocheck
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("🚀 Preparando despliegue con la cuenta:", deployer.address);

    const network = await hre.ethers.provider.getNetwork();
    console.log("🌐 Red detectada:", network.chainId === 42220 ? "Mainnet" : "Sepolia");

    const BiotaFactory = await hre.ethers.getContractFactory("BiotaPassport");

    // Pasamos el deployer.address como 'initialOwner'
    const contract = await BiotaFactory.deploy(deployer.address);

    await contract.deployed();

    console.log("✅ BiotaPassport desplegado exitosamente en:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});