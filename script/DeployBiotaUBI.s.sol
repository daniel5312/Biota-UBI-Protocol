// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../contracts/BiotaUBI.sol";

contract DeployBiotaUBI is Script {
    function run() external {
        // Obtenemos la llave privada del .env
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        console.log("Iniciando despliegue de BiotaUBI (Superfluid Version)...");
        console.log("Deployer:", deployerAddress);

        // DIRECCIONES DE CONTRATOS EN CELO MAINNET
        // Puedes sobreescribirlas en tu .env o usar los valores hardcodeados por defecto.

        // 1. La dirección del BiotaPassport que acabamos de desplegar
        address passportAddress = vm.envOr("PASSPORT_ADDRESS", address(0x0000000000000000000000000000000000000001)); 
        
        // 2. Identity de GoodDollar en Celo (Mainnet)
        address gdIdentityAddress = vm.envOr("GD_IDENTITY_ADDRESS", address(0xC361A6E67822a0EDc17D899227dd9FC50BD62F42));
        
        // 3. Token GoodDollar en Celo (Mainnet - SuperToken)
        address goodDollarAddress = vm.envOr("GOODDOLLAR_ADDRESS", address(0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A));

        // Iniciamos la transacción en la blockchain
        vm.startBroadcast(deployerPrivateKey);

        // Desplegamos el contrato de Tesorería BiotaUBI
        BiotaUBI biotaUBI = new BiotaUBI(
            deployerAddress,
            passportAddress,
            gdIdentityAddress,
            goodDollarAddress
        );

        // Detenemos la grabación
        vm.stopBroadcast();

        console.log("BiotaUBI desplegado con exito en:", address(biotaUBI));
        console.log("La Boveda de Recompensas de Impacto Ecologico esta lista.");
    }
}
