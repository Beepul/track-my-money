
"use server";

import { z } from "zod";

const ResetPasswordSchema = z
    .object({
        token: z.string().min(1, "Reset token is required."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .max(15, "Password must not exceed 15 characters.")
            .regex(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                "Password must contain uppercase, lowercase, number and special character, with no spaces."
            ),

        confirmPassword: z.string().min(
            1,
            "Please confirm your password."
        ),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );

export type ResetPasswordState = {
    success: boolean;
    message: string;
    errors: {
        token?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
};

export async function resetPasswordAction(
    prevState: ResetPasswordState,
    formData: FormData
): Promise<ResetPasswordState> {
    const rawData = {
        token: String(formData.get("token") ?? ""),
        password: String(formData.get("password") ?? ""),
        confirmPassword: String(
            formData.get("confirmPassword") ?? ""
        ),
    };

    const validatedFields = ResetPasswordSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please fix the errors in the form.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { token, password, confirmPassword } =
        validatedFields.data;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/reset-password/${encodeURIComponent(token)}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    confirmPassword,
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
                    "Failed to reset password. The link may have expired.",
                errors: {},
            };
        }

        return {
            success: true,
            message:
                data.message ||
                "Password reset successfully.",
            errors: {},
        };
    } catch {
        return {
            success: false,
            message:
                "Something went wrong. Please try again later.",
            errors: {},
        };
    }
}
