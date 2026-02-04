// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BiotaPassport
 * @dev Contrato para la gestión de pasaportes biológicos dinámicos en el ecosistema ReFi de Envigado.
 */
contract BiotaPassport is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct LoteData {
        uint256 fechaRegistro;
        uint256 ultimaActualizacion; // Para medir el tiempo entre evidencias
        string ubicacionGeografica;
        uint256 areaM2;
        uint256 cmSueloRecuperado;
        string estadoBiologico;
        string hashAnalisisLab;
        string ingredientesHash;
        string metodosAgricolas;
        address verificador;
        bool esVerificado; // Indica si un técnico de Biota validó la información
    }

    mapping(uint256 => LoteData) public lotePasaporte;
    mapping(address => bool) public isVerificador;

    // EVENTOS: Fundamentales para que el Dashboard se actualice en tiempo real
    event PassportMinted(
        uint256 indexed tokenId,
        address indexed producer,
        string ubicacion
    );
    event EvidenciaActualizada(
        uint256 indexed tokenId,
        uint256 nuevoCmSuelo,
        string nuevoEstado
    );
    event ImpactoVerificado(
        uint256 indexed tokenId,
        address indexed verificador
    );

    constructor(
        address initialOwner
    ) ERC721("BiotaPassport", "BIO") Ownable(initialOwner) {
        // El dueño inicial también es verificador por defecto
        isVerificador[initialOwner] = true;
    }

    // --- MODIFICADORES ---
    modifier soloProductor(uint256 tokenId) {
        require(
            ownerOf(tokenId) == msg.sender,
            "No eres el propietario de este pasaporte"
        );
        _;
    }

    modifier soloVerificador() {
        require(isVerificador[msg.sender], "No tienes permisos de verificador");
        _;
    }

    // --- FUNCIONES PRINCIPALES ---

    /**
     * @dev Mintea un nuevo pasaporte. Abierto al público para fomentar la autogestión.
     */
    function mintPasaporte(
        address recipient,
        string calldata tokenURI,
        string calldata _ubicacionGeografica,
        uint256 _areaM2,
        uint256 _cmSueloRecuperado,
        string calldata _estadoBiologico,
        string calldata _hashAnalisisLab,
        string calldata _ingredientesHash,
        string calldata _metodosAgricolas
    ) public returns (uint256) {
        uint256 newId = _nextTokenId;

        lotePasaporte[newId] = LoteData({
            fechaRegistro: block.timestamp,
            ultimaActualizacion: block.timestamp,
            ubicacionGeografica: _ubicacionGeografica,
            areaM2: _areaM2,
            cmSueloRecuperado: _cmSueloRecuperado,
            estadoBiologico: _estadoBiologico,
            hashAnalisisLab: _hashAnalisisLab,
            ingredientesHash: _ingredientesHash,
            metodosAgricolas: _metodosAgricolas,
            verificador: address(0), // Aún no verificado por técnico
            esVerificado: false
        });

        _safeMint(recipient, newId);
        _setTokenURI(newId, tokenURI);

        emit PassportMinted(newId, recipient, _ubicacionGeografica);
        _nextTokenId++;
        return newId;
    }

    /**
     * @dev Permite al productor actualizar sus avances de regeneración.
     */
    function actualizarEvidencia(
        uint256 tokenId,
        uint256 _nuevoCmSuelo,
        string calldata _nuevoEstado,
        string calldata _nuevoHashLab,
        string calldata _nuevosMetodos
    ) public soloProductor(tokenId) {
        LoteData storage lote = lotePasaporte[tokenId];

        lote.cmSueloRecuperado = _nuevoCmSuelo;
        lote.estadoBiologico = _nuevoEstado;
        lote.hashAnalisisLab = _nuevoHashLab;
        lote.metodosAgricolas = _nuevosMetodos;
        lote.ultimaActualizacion = block.timestamp;
        lote.esVerificado = false; // Se marca como no verificado al cambiar datos

        emit EvidenciaActualizada(tokenId, _nuevoCmSuelo, _nuevoEstado);
    }

    /**
     * @dev Un técnico verificado da fe de que los datos del lote son reales.
     */
    function validarImpacto(uint256 tokenId) public soloVerificador {
        lotePasaporte[tokenId].esVerificado = true;
        lotePasaporte[tokenId].verificador = msg.sender;

        emit ImpactoVerificado(tokenId, msg.sender);
    }

    // --- GESTIÓN DE ROLES (Admin) ---

    function gestionarVerificador(
        address cuenta,
        bool estado
    ) public onlyOwner {
        isVerificador[cuenta] = estado;
    }
}
