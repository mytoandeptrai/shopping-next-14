import { ROUTES } from '@/constants/routes';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasToken = request.cookies.has(process.env.NEXT_PUBLIC_COOKIE_NAME_TOKEN ?? 'TPMT-token');

  if (hasToken && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  if (pathname.startsWith(ROUTES.ADMIN) && pathname === ROUTES.ADMIN) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN_PRODUCT_LIST, request.url));
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
