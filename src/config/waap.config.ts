import { http, createConfig, cookieStorage, createStorage } from 'wagmi';
import { celoSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

const projectId = '43a853c3778c34d0e1a91d23107feafd';

export const config = createConfig({
    chains: [celoSepolia],
    connectors: [
        injected(),
        walletConnect({
            projectId: projectId,
            showQrModal: true,
            qrModalOptions: { themeMode: 'dark' },
        }),
    ],
    // 🟢 ESTO ES CRÍTICO PARA NEXT.JS 15/16
    // Usar cookies asegura que la config no se pierda al recargar
    storage: createStorage({
        storage: cookieStorage,
    }),
    transports: {
        [celoSepolia.id]: http('https://forno.celo-sepolia.celo-testnet.org'),
    },
    ssr: true,
});

export const WC_PROJECT_ID = projectId;