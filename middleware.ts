import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Bloqueo de exploits RCE y SSRF detectados en 2025/2026
    if (request.headers.get('x-middleware-invoke') || request.headers.get('x-invoke-path')) {
        return new NextResponse('Security Block', { status: 403 });
    }

    // Cabeceras de seguridad para producción en Vercel
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};