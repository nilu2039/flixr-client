import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;

  const authCookie = request.cookies.get("qid");

  const protectedRoutes = ["/dashboard"];
  const loginRoute = "/login";

  const isProtectedRoute = protectedRoutes.some(
    (route) => path.startsWith(route) || path === route
  );

  const isAuthenticated = authCookie ? verifySession(authCookie) : false;

  if (isAuthenticated && path === loginRoute) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute && !isAuthenticated) {
    return redirectToLogin(url);
  }

  return NextResponse.next();
}

function redirectToLogin(url: NextURL) {
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

async function verifySession(authCookie: RequestCookie) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      headers: {
        cookie: `qid=${authCookie}`,
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data.success;
    }
    return false;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
