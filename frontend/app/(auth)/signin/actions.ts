"use server"

import { cookies } from "next/headers";
import { SignInSchema } from "@/lib/zod.definitions";
import { signInUserApi } from "../api";
import { redirect } from "next/navigation";

export type SignInFormState = {
    success?: boolean;
    message?: string;
    data?:{
        email?: string;
        password?: string;
    };
    errors?: {
        email?: string[];
        password?: string[];
    };
}
export async function signIn(
    _prevState: SignInFormState,
    form: FormData
): Promise<SignInFormState> {
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const validatedFields = SignInSchema.safeParse({
        email,
        password,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please fix the errors in the form.",
            data: { email },
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const userData = await signInUserApi(validatedFields.data);

    if (!userData.success) {
        return {
            success: false,
            message: userData.message || "Invalid email or password.",
            data: { email },
            errors: {},
        };
    }

    if (
        !userData.data?.accessToken ||
        !userData.data?.refreshToken
    ) {
        return {
            success: false,
            message: "Authentication tokens were not returned.",
            data: { email },
            errors: {},
        };
    }

    const cookieStore = await cookies();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
    };

    // Access token
    cookieStore.set("T2M_LOGIN", userData.data.accessToken, {
        ...cookieOptions,
        maxAge: 60, // 15 minutes
    });

    // Refresh token
    cookieStore.set("T2M_REFRESH", userData.data.refreshToken, {
        ...cookieOptions,
        maxAge: 5 * 60, // 7 days
    });

    redirect("/dashboard");
}