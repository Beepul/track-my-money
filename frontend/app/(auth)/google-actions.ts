
"use server";

import { cookies } from "next/headers";

type GoogleAuthResult = {
    success: boolean;
    message: string;
};

type GoogleAuthApiResponse = {
    message?: string;
    result?: {
        accessToken: string;
        refreshToken: string;
    };
};

export async function googleSignInAction(
    credential: string
): Promise<GoogleAuthResult> {
    if (!credential) {
        return {
            success: false,
            message: "Google credential is missing.",
        };
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/google-auth`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ credential }),
                cache: "no-store",
            }
        );

        const data: GoogleAuthApiResponse =
            await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    data.message ||
                    "Google authentication failed.",
            };
        }

        const accessToken = data.result?.accessToken;
        const refreshToken = data.result?.refreshToken;

        if (!accessToken || !refreshToken) {
            return {
                success: false,
                message: "Authentication tokens are missing.",
            };
        }

        const cookieStore = await cookies();

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            path: "/",
        };

        cookieStore.set("T2M_LOGIN", accessToken, {
            ...cookieOptions,
            maxAge: 60,
        });

        cookieStore.set("T2M_REFRESH", refreshToken, {
            ...cookieOptions,
            maxAge: 5 * 60,
        });

        return {
            success: true,
            message: "Signed in with Google successfully.",
        };
    } catch {
        return {
            success: false,
            message: "Unable to sign in with Google.",
        };
    }
}
