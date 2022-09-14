import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(new URL(req.nextUrl.origin + req.nextUrl.pathname.toLowerCase()));
};

export const config = {
  matcher: '/*',
}

