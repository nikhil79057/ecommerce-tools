import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

const publicPaths = [
  '/',
  '/auth',
  '/api/auth',
  '/api/webhook',
  '/_next',
  '/favicon.ico',
];

const adminPaths = [
  '/admin',
];

const sellerPaths = [
  '/dashboard',
  '/tools',
  '/billing',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Role-based access control
  if (adminPaths.some(path => pathname.startsWith(path)) && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (sellerPaths.some(path => pathname.startsWith(path)) && payload.role !== 'seller') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};