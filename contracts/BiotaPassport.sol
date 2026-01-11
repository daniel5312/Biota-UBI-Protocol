// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BiotaPassport is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Estructura definitiva para ReFi y Certificación de Suelo
    struct LoteData {
        uint256 fechaRegistro; // Fecha en la blockchain
        string ubicacionGeografica; // Coordenadas GPS (Vital para créditos de carbono)
        uint256 areaM2; // Tamaño del terreno regenerado
        uint8 cmSueloRecuperado; // Impacto físico logrado
        string estadoBiologico; // Ej: "Equilibrado", "En Transición"
        string hashAnalisisLab; // Link al PDF/JSON del laboratorio externo
        string ingredientesHash; // Insumos de Biota utilizados
        string metodosAgricolas; // Técnicas regenerativas aplicadas
        address verificador; // Biota (Quien certifica)
    }

    // Base de datos de los lotes
    mapping(uint256 => LoteData) public lotePasaporte;

    // Constructor: Inicializa el NFT y asigna el dueño
    constructor() ERC721("BiotaPassport", "BIO") Ownable(msg.sender) {}

    // Función para crear (Mintear) el Pasaporte Digital
    function mintPasaporte(
        address recipient,
        string memory tokenURI,
        string memory _ubicacionGeografica,
        uint256 _areaM2,
        uint8 _cmSueloRecuperado,
        string memory _estadoBiologico,
        string memory _hashAnalisisLab,
        string memory _ingredientesHash,
        string memory _metodosAgricolas
    ) public onlyOwner returns (uint256) {
        uint256 newId = _nextTokenId;

        // Guardar la data on-chain
        lotePasaporte[newId] = LoteData({
            fechaRegistro: block.timestamp,
            ubicacionGeografica: _ubicacionGeografica,
            areaM2: _areaM2,
            cmSueloRecuperado: _cmSueloRecuperado,
            estadoBiologico: _estadoBiologico,
            hashAnalisisLab: _hashAnalisisLab,
            ingredientesHash: _ingredientesHash,
            metodosAgricolas: _metodosAgricolas,
            verificador: msg.sender
        });

        _safeMint(recipient, newId);
        _setTokenURI(newId, tokenURI);

        _nextTokenId++;

        return newId;
    }
}
