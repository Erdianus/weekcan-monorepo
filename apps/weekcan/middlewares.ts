import { NextResponse } from 'next/server';

import { auth } from '@repo/auth';

// Or like this if you need to do something here.
// @ts-ignore gapapa
export default auth((req) => {
  if (req.nextUrl.pathname === '/') return;

  if (!req.auth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)', '/dashboard'],
};
