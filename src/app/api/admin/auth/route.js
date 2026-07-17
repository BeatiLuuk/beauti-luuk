import { NextResponse } from 'next/server';
import { signSession } from '@/lib/auth';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'beautiluukadmin2026';
    
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin username or password.' },
        { status: 401 }
      );
    }
    
    // Sign secure session token
    const token = await signSession(username);
    
    const response = NextResponse.json({ success: true, message: 'Login successful.' });
    
    // Set secure HTTP-only cookie
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 Hours
      path: '/'
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
