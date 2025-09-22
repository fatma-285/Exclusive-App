import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  const authRoutes = ["/login", "/register"];
  const protectedRoutes = [
    "/cart",
    "/checkout",
    "/profile",
    "/allorders",
    "/wishlist",
  ];

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  // console.log("TOKEN IN MIDDLEWARE", token);

  return NextResponse.next(); // mean that if the user is authenticated it will go to the next page
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/checkout",
    "/profile",
    "/allorders",
    "/wishlist",
  ],
};
