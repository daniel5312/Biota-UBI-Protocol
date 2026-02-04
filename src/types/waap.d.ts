export { };

// Definición de argumentos de solicitud basada en EIP-1193
interface WaapRequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
}

declare global {
    interface Window {
        waap: {
            /** Inicia el modal de login social de Human.Tech */
            login: () => Promise<'human' | 'walletconnect' | 'injected' | null>;

            /** Cierra la sesión activa de WaaP */
            logout: () => Promise<void>;

            /** * Método genérico para interactuar con la blockchain.
             * Retorna unknown para obligarte a validar el tipo al recibirlo (TS Estricto).
             */
            request: (args: WaapRequestArguments) => Promise<unknown>;

            /** Escucha eventos de la billetera como 'accountsChanged' o 'chainChanged' */
            on: (
                event: 'accountsChanged' | 'chainChanged' | string,
                callback: (data: unknown) => void
            ) => void;
        };
    }
}