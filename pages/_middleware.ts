import { url } from 'inspector';
import { NextRequest, NextResponse } from 'next/server';

const middleware = (req:NextRequest) => {

  if(req.nextUrl.pathname.includes(".com")){

    if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
      return NextResponse.next();

    return NextResponse.redirect(new URL(req.nextUrl.pathname.toLowerCase()));
  }
};

export default middleware;