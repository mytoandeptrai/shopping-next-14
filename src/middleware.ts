import { env } from '@/config';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasToken = request.cookies.has(env.COOKIE_NAME_TOKEN);
  if (hasToken && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
