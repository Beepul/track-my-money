"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiFetch(url:string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("T2M_LOGIN")?.value;

    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
    };

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    console.log("REQ::", url)

    const res = await fetch(url, {
        ...options,
        headers,
    });
    

    if (res.status === 401) {
        redirect("/logout");
    }

    return res;
}