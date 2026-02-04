import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 🛡️ BLOQUEO DE SEGURIDAD (Tu lógica original)
    const hasSecurityHeader = request.headers.get('x-middleware-invoke') || request.headers.get('x-invoke-path');
    if (hasSecurityHeader && !pathname.startsWith('/_next')) {
        return new NextResponse('Security Block', { status: 403 });
    }

    const response = NextResponse.next();

    // Cabeceras generales
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // ✅ CSP COMPLETO Y CORREGIDO
    // 1. frame-ancestors: Permite que Human y WalletConnect carguen en iframes.
    // 2. script-src: Permite 'unsafe-eval' e 'unsafe-inline' que son OBLIGATORIOS para Wagmi/WalletConnect.
    // 3. connect-src: Permite conexiones a los nodos de Blockchain y APIs de Human.

    const cspHeader = `
        frame-ancestors 'self' https://*.waap.xyz https://*.walletconnect.com;
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.waap.xyz https://*.walletconnect.com https://*.google.com;
        connect-src 'self' https://*.waap.xyz https://*.walletconnect.com https://*.walletconnect.org wss://*.walletconnect.org https://rpc.walletconnect.com https://forno.celo-sepolia.celo-testnet.org;
        img-src 'self' data: https://*.walletconnect.com blob:;
    `;

    // Limpiamos los saltos de línea para que sea un header válido
    response.headers.set(
        'Content-Security-Policy',
        cspHeader.replace(/\s{2,}/g, ' ').trim()
    );

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};