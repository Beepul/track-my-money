import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    console.log("======================== Middleware running ========================")
    const token = req.cookies.get("T2M_LOGIN")?.value

    const isLandingPage = req.nextUrl.pathname === "/";
    const isLoginPage = req.nextUrl.pathname === "/signin";
    const isRegisterPage = req.nextUrl.pathname === "/register";

    if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (token && isLandingPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (token && isRegisterPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/dashboard/:path*", "/signin", "/register", "/"],
};