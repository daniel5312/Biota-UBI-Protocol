// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../contracts/BiotaPassport.sol";

contract DeployBiotaPassport is Script {
    function run() external {
        // Obtenemos la llave privada del .env (Foundry automáticamente carga el .env)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Obtenemos la dirección asociada a la llave privada
        address deployerAddress = vm.addr(deployerPrivateKey);

        console.log("Iniciando despliegue ReFi Biota...");
        console.log("Deployer:", deployerAddress);

        // Iniciamos la grabación de las transacciones (Broadcast)
        vm.startBroadcast(deployerPrivateKey);

        // Desplegamos el contrato, pasando la dirección del deployer como owner inicial
        BiotaPassport biotaPassport = new BiotaPassport(deployerAddress);

        // Detenemos la grabación
        vm.stopBroadcast();

        console.log("BiotaPassport desplegado en:", address(biotaPassport));
        console.log("Red lista para la transicion ecologica.");
    }
}
