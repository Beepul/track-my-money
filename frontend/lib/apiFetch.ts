
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const cookieStore = await cookies();

    const accessToken =
        cookieStore.get("T2M_LOGIN")?.value;

    if (!accessToken) {
        redirect("/logout");
    }

    const isFormData = options.body instanceof FormData;

    const headers = new Headers(options.headers);

    headers.set(
        "Authorization",
        `Bearer ${accessToken}`
    );

    if (!isFormData && options.body) {
        if (!headers.has("Content-Type")) {
            headers.set(
                "Content-Type",
                "application/json"
            );
        }
    }

    const res = await fetch(url, {
        ...options,
        headers,
        cache: options.cache ?? "no-store",
    });

    if (res.status === 401) {
        redirect("/logout");
    }

    return res;
}
