
import { NextResponse, type NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
 
  const pathname = req.nextUrl.pathname;
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
