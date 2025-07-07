import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";


export const middleware = async (req: NextRequest) => {
 const token = await getToken({ req });

  if(!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/my-booking',
    '/my-booking/:path*',
    '/checkout/:path*'
  ],
};