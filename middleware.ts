import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();

    // 🛡️ BLOQUEO INTELIGENTE:
    // Solo bloqueamos si el header existe Y no es una ruta interna de Next.js (_next).
    // Esto permite que Vercel funcione pero bloquea ataques externos directos.
    const hasSecurityHeader = request.headers.get('x-middleware-invoke') || request.headers.get('x-invoke-path');

    if (hasSecurityHeader && !pathname.startsWith('/_next')) {
        return new NextResponse('Security Block', { status: 403 });
    }

    // Cabeceras de seguridad para producción
    // Allow iframe embedding for preview environments (Vercel, v0, etc.)
    // X-Frame-Options is intentionally omitted to support iframe-based previews
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // IMPORTANTE PARA PRIVY: 
    // Permitir iframes de autenticación y entornos de preview
    response.headers.set(
        'Content-Security-Policy',
        "frame-ancestors 'self' https://auth.privy.io https://*.vusercontent.net https://*.vercel.app;"
    );

    return response;
}

export const config = {
    // Excluimos explícitamente la API y archivos estáticos
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
