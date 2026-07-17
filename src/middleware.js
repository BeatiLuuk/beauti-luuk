import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    
    // Verify session cryptographic validity
    const session = await verifySession(sessionCookie);
    
    if (!session) {
      // Redirect to login page if unauthorized
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config to specify matching route paths
export const config = {
  matcher: ['/admin/dashboard/:path*']
};
