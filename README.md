README.md:

Markdown

# Biota Protocol 🌱 | UBI Regenerativo en Celo

![License](https://img.shields.io/badge/license-MIT-green)
![Network](https://img.shields.io/badge/network-Celo%20Sepolia-yellow)
![Status](https://img.shields.io/badge/status-Beta%20MVP-blue)
![Stack](https://img.shields.io/badge/stack-Next.js%2016%20%7C%20Privy%20%7C%20Thirdweb-black)

> **"Convirtiendo el impacto ambiental en liquidez inmediata para el campesino."**

Biota es un protocolo de Finanzas Regenerativas (ReFi) que implementa un sistema de **Ingreso Básico Universal (UBI)** condicionado a resultados ambientales. Utiliza la blockchain de **Celo** para crear una trazabilidad inmutable que permite a las empresas invertir en regeneración de suelos y obtener beneficios tributarios certificados (DIAN/ANLA).

---

## 📖 Tabla de Contenidos

- [Problema y Solución](#-problema-y-solución)
- [Arquitectura Técnica](#-arquitectura-técnica)
- [Stack Tecnológico](#-stack-tecnológico)
- [Modelo de Negocio y Legal](#-modelo-de-negocio-y-legal)
- [Instalación y Despliegue](#-instalación-y-despliegue)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## 🌍 Problema y Solución

### El Problema: El "Valle de la Muerte"

Los campesinos enfrentan una pérdida temporal de productividad (1-2 años) cuando transicionan de agricultura química a regenerativa. Sin soporte financiero, la regeneración es imposible.

### La Solución Biota

Un **Escrow Programable** que conecta patrocinadores corporativos con productores locales.

1.  **UBI Regenerativo:** Pagos mensuales en stablecoins ($cUSD/G$) liberados automáticamente tras verificar hitos ecológicos.
2.  **BioBond (NFT):** Tokenización de la inversión que actúa como certificado de donación.
3.  **Piloto:** "Génesis Envigado" - Recuperación de suelos y biodiversidad en Antioquia.

---

## 🏗 Arquitectura Técnica

El sistema funciona como una "Tubería de Valor" automatizada mediante tres componentes on-chain:

1.  **BiotaVault (Smart Contract):**
    - Custodia los fondos del patrocinador.
    - Solo libera pagos cuando el Oráculo confirma un hito cumplido.
    - Seguridad: `AccessControl` y `ReentrancyGuard`.

2.  **Pasaporte de Impacto (ERC-721 Soulbound):**
    - Identidad digital del predio (DID).
    - Almacena metadatos inmutables: Coordenadas GPS, Historial NDVI, Fotos.
    - No transferible: Atado a la reputación del productor.

3.  **Oráculo de Verificación (MRV):**
    - Valida la evidencia (fotos georeferenciadas + datos satelitales).
    - Actúa como el gatillo (`trigger`) para la función `releasePayment`.

### Flujo de Datos

`Productor (App)` -> `IPFS (Evidencia)` -> `Oráculo (Validación)` -> `Smart Contract` -> `Pago (cUSD)`

---

## ⚡ Stack Tecnológico

Este repositorio contiene el Frontend y la lógica de integración Web3, optimizado para ser una **MiniApp** (Móvil/Telegram friendly).

- **Core:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Lenguaje:** TypeScript
- **Autenticación:** [Privy](https://www.privy.io/) (Login Social + Embedded Wallets)
- **Blockchain SDK:** [Thirdweb v5](https://thirdweb.com/)
- **Estilos:** Tailwind CSS + ShadcnUI
- **Seguridad:** Middleware personalizado contra ataques RCE y Clickjacking.

---

## ⚖️ Modelo de Negocio y Legal

Biota no es solo caridad, es un instrumento financiero estructurado bajo el **Estatuto Tributario Colombiano**.

### Beneficios para el Sponsor (Inversionista)

- **Art. 255 Estatuto Tributario:** Descuento del **25% en el impuesto de renta** por inversiones en control y mejoramiento ambiental.
- **Compensación de Huella:** Posibilidad de evitar el Impuesto al Carbono demostrando neutralidad.
- **Certificado Digital (Impact-NFT):** Un PDF generado automáticamente y firmado digitalmente con hash en blockchain, válido como soporte ante la DIAN y la ANLA.

### Sostenibilidad del Protocolo

1.  **Sponsorship Fee:** % sobre el capital gestionado (cubrimiento legal y setup).
2.  **MRV as a Service:** Comisión por el monitoreo satelital continuo.
3.  **Success Fee:** % sobre la venta futura de bonos de carbono generados.

---

## 🚀 Instalación y Despliegue

### Prerrequisitos

- Node.js 20.x (Recomendado para Web3)
- Git

### 1. Clonar el repositorio

```bash
git clone [https://github.com/TU_USUARIO/biota-protocol.git](https://github.com/TU_USUARIO/biota-protocol.git)
cd biota-protocol
2. Instalar dependencias
Bash
npm install
3. Configurar Variables de Entorno
Crea un archivo .env.local en la raíz. Importante: Nunca subas claves privadas.

Bash
# Privy App ID (Dashboard -> Settings)
NEXT_PUBLIC_PRIVY_APP_ID="tu_id_de_privy"

# Thirdweb Client ID (Dashboard -> API Keys)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID="tu_client_id"

# Chain ID (Celo Sepolia: 11142220, Celo Mainnet: 42220)
NEXT_PUBLIC_CHAIN_ID=11142220

# Entorno
NEXT_PUBLIC_VERCEL_ENV=development
4. Ejecutar en Desarrollo
Bash
npm run dev
Abre http://localhost:3000.

5. Build para Producción (Vercel)
El proyecto incluye un script de construcción optimizado para evitar errores de memoria en planes gratuitos:

Bash
npm run build
# Ejecuta: node --max-old-space-size=3072 ./node_modules/.bin/next build
📂 Estructura del Proyecto
biota-protocol/
├── src/
│   ├── app/              # Rutas (Next.js App Router)
│   ├── components/       # UI Reutilizable (Navbar, Cards)
│   ├── constants/        # ABIs y Direcciones de Contratos
│   ├── lib/              # Utilidades y configuración de clientes
│   └── styles/           # Tailwind globals
├── contracts/            # Archivos Solidity (.sol) y Scripts (Hardhat/Foundry)
├── public/               # Assets estáticos
└── middleware.ts         # Seguridad de rutas y headers
🤝 Contribución y Roadmap
Actualmente estamos en la Fase 1: Piloto Envigado.

[x] Arquitectura de Contratos Definida.

[x] Frontend Base con Auth (Privy).

[ ] Integración completa con Oráculos Satelitales.

[ ] Auditoría de Seguridad.

Las Pull Requests son bienvenidas. Por favor abre un Issue primero para discutir cambios mayores.

Construido con 💚 en Colombia.
```
