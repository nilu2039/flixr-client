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

  const authStatus: {
    authenticated: boolean;
    role: "editor" | "admin" | null;
    verified: boolean;
  } = {
    authenticated: false,
    role: null,
    verified: false,
  };

  if (authCookie) {
    const session = await verifySession(authCookie);
    const isAuthenticated = session.authenticated;
    authStatus.authenticated = isAuthenticated;
    authStatus.role = session.role;
    authStatus.verified = session.verified;
  }

  if (path === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (authStatus.authenticated && path === loginRoute) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (
    authStatus.authenticated &&
    authStatus.verified &&
    path === "/reset-password"
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute && !authStatus.authenticated) {
    return redirectToLogin(url);
  }

  if (
    isProtectedRoute &&
    authStatus.authenticated &&
    authStatus.role === "editor" &&
    !authStatus.verified
  ) {
    return redirectToResetPassword(url);
  }

  return NextResponse.next();
}

function redirectToLogin(url: NextURL) {
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

function redirectToResetPassword(url: NextURL) {
  url.pathname = "/reset-password";
  return NextResponse.redirect(url);
}

async function verifySession(authCookie: RequestCookie): Promise<{
  authenticated: boolean;
  role: "editor" | "admin" | null;
  verified: boolean;
}> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      headers: {
        cookie: `qid=${authCookie.value}`,
      },
      credentials: "include",
      redirect: "follow",
      cache: "no-cache",
    });
    if (response.ok) {
      const data = await response.json();
      return {
        authenticated: data.success,
        role: data?.data?.user?.role,
        verified: data?.data?.user?.verified,
      };
    }
    return {
      authenticated: false,
      role: null,
      verified: false,
    };
  } catch (error) {
    console.error("error", error);
    return {
      authenticated: false,
      role: null,
      verified: false,
    };
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
