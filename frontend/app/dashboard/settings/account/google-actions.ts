
"use server";

import { apiFetch } from "@/lib/apiFetch";

export type LinkGoogleResult = {
    success: boolean;
    message: string;
};

export async function linkGoogleAccountAction(
    credential: string
): Promise<LinkGoogleResult> {
    if (!credential) {
        return {
            success: false,
            message: "Google credential is required.",
        };
    }

    try {
        const res = await apiFetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/link-google`,
            {
                method: "POST",
                body: JSON.stringify({
                    credential,
                }),
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    data.message ||
                    "Failed to link Google account.",
            };
        }

        return {
            success: true,
            message:
                data.message ||
                "Google account linked successfully.",
        };
    } catch (error) {
        // Preserve Next.js redirects, including auth redirects
        // triggered by apiFetch on a 401 response.
        if (
            error &&
            typeof error === "object" &&
            "digest" in error &&
            typeof error.digest === "string" &&
            error.digest.startsWith("NEXT_REDIRECT")
        ) {
            throw error;
        }

        return {
            success: false,
            message:
                "Something went wrong. Please try again.",
        };
    }
}
