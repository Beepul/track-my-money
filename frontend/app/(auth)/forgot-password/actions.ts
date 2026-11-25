
"use server";

import { z } from "zod";

const ForgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address."),
});

export type ForgotPasswordState = {
    success: boolean;
    message: string;
    errors: {
        email?: string[];
    };
};

export async function forgotPasswordAction(
    prevState: ForgotPasswordState,
    formData: FormData
): Promise<ForgotPasswordState> {
    const rawData = {
        email: String(formData.get("email") ?? "").trim(),
    };

    const validatedFields = ForgotPasswordSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please fix the errors in the form.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/forget-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validatedFields.data),
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to send reset email.",
                errors: {},
            };
        }

        return {
            success: true,
            message:
                data.message ||
                "If an account exists for this email, a reset link has been sent.",
            errors: {},
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
            errors: {},
        };
    }
}
