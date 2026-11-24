
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "T2M_LOGIN";
const REFRESH_COOKIE = "T2M_REFRESH";

const ACCESS_TOKEN_MAX_AGE = 60;
const EXPIRY_BUFFER_SECONDS = 1;

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};

// Read the JWT expiration without verifying its signature.
// Express remains responsible for actual token verification.
function isAccessTokenExpired(token: string): boolean {
    try {
        const payloadPart = token.split(".")[1];

        if (!payloadPart) return true;

        const base64 = payloadPart
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const payload = JSON.parse(atob(base64));

        if (
            typeof payload.exp !== "number" ||
            !Number.isFinite(payload.exp)
        ) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);

        return (
            payload.exp <=
            currentTime + EXPIRY_BUFFER_SECONDS
        );
    } catch {
        return true;
    }
}

function redirectToSignIn(req: NextRequest) {
    const response = NextResponse.redirect(
        new URL("/signin", req.url)
    );

    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);

    return response;
}

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const accessToken =
        req.cookies.get(ACCESS_COOKIE)?.value;

    const refreshToken =
        req.cookies.get(REFRESH_COOKIE)?.value;

    console.log("[Auth] Path:", req.nextUrl.pathname);

console.log(
    "[Auth] Access token exists:",
    !!accessToken
);

console.log(
    "[Auth] Refresh token exists:",
    !!refreshToken
);

if (accessToken) {
    console.log(
        "[Auth] Access token expired:",
        isAccessTokenExpired(accessToken)
    );
}

    const isDashboard = pathname.startsWith("/dashboard");

    const isPublicAuthPage = [
        "/",
        "/signin",
        "/register",
    ].includes(pathname);

    if (isDashboard) {
        // Valid-looking, unexpired access token:
        // proceed to the dashboard.
        if (
            accessToken &&
            !isAccessTokenExpired(accessToken)
        ) {
            return NextResponse.next();
        }

        // Refresh token unavailable
        if (!refreshToken) {
            return redirectToSignIn(req);
        }

        // Only refresh through GET navigation.
        if (req.method !== "GET") {
            return redirectToSignIn(req);
        }

        try {
            const apiBaseUrl =
                process.env.NEXT_PUBLIC_API_BASE_URL;

            if (!apiBaseUrl) {
                throw new Error(
                    "NEXT_PUBLIC_API_BASE_URL is not configured"
                );
            }

            console.log("[Auth] Refreshing access token");

            const res = await fetch(
                `${apiBaseUrl}/user/refresh-token`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                    cache: "no-store",
                }
            );

            console.log(
                "[Auth] Refresh API status:",
                res.status
            );

            if (!res.ok) {
                return redirectToSignIn(req);
            }

            const data = await res.json();

            const newAccessToken =
                data?.result?.accessToken;

            if (
                typeof newAccessToken !== "string" ||
                !newAccessToken
            ) {
                return redirectToSignIn(req);
            }

            // Redirect to the same page so the next
            // request contains the refreshed cookie.
            const response = NextResponse.redirect(
                req.nextUrl.clone()
            );

            response.cookies.set(
                ACCESS_COOKIE,
                newAccessToken,
                {
                    ...cookieOptions,
                    maxAge: ACCESS_TOKEN_MAX_AGE,
                }
            );

            return response;
        } catch (error) {
            console.error(
                "[Auth] Access token refresh failed:",
                error
            );

            return redirectToSignIn(req);
        }
    }

    // Redirect authenticated users away from login pages
    if (isPublicAuthPage) {
        if (accessToken || refreshToken) {
            return NextResponse.redirect(
                new URL("/dashboard", req.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/signin",
        "/register",
        "/",
    ],
};
