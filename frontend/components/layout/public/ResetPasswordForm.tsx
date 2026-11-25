
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    resetPasswordAction,
    type ResetPasswordState,
} from "@/app/(auth)/reset-password/actions";

const initialResetPasswordState: ResetPasswordState = {
    success: false,
    message: "",
    errors: {},
};

type ResetPasswordFormProps = {
    token: string;
};

export default function ResetPasswordForm({
    token,
}: ResetPasswordFormProps) {
    const router = useRouter();

    const [state, action, pending] = useActionState(
        resetPasswordAction,
        initialResetPasswordState
    );

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    useEffect(() => {
        if (!state.success) return;

        toast.success(
            state.message || "Password reset successfully."
        );

        router.replace("/signin");
    }, [state, router]);

    return (
        <form action={action} className="space-y-5">
            <input
                type="hidden"
                name="token"
                value={token}
                readOnly
            />

            <p className="text-xs text-muted-foreground">
                8–15 characters, including uppercase, lowercase,
                a number and a special character. No spaces.
            </p>
            {/* New Password */}
            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="text-sm font-medium text-t2m-text-secondary"
                >
                    New Password
                </label>

                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        minLength={8}
                        maxLength={15}
                        required
                        className="h-12 border-border bg-background pr-12 text-foreground placeholder:text-muted-foreground"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                {state.errors?.password && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                        {state.errors.password[0]}
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-t2m-text-secondary"
                >
                    Confirm New Password
                </label>

                <div className="relative">
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                        minLength={8}
                        maxLength={15}
                        required
                        className="h-12 border-border bg-background pr-12 text-foreground placeholder:text-muted-foreground"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                        aria-label={
                            showConfirmPassword
                                ? "Hide confirmation password"
                                : "Show confirmation password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                {state.errors?.confirmPassword && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                        {state.errors.confirmPassword[0]}
                    </p>
                )}
            </div>

            {/* Token Validation Error */}
            {state.errors?.token && (
                <p
                    className="text-sm text-red-500 dark:text-red-400"
                    role="alert"
                >
                    {state.errors.token[0]}
                </p>
            )}

            {/* General Error */}
            {!state.success && state.message && (
                <p
                    className="text-sm text-red-500 dark:text-red-400"
                    role="alert"
                >
                    {state.message}
                </p>
            )}

            {/* Submit */}
            <Button
                type="submit"
                disabled={pending}
                className="h-12 w-full cursor-pointer bg-t2m-primary text-white dark:text-slate-900 hover:bg-t2m-secondary disabled:opacity-50"
            >
                <LockKeyhole size={16} />
                {pending
                    ? "Resetting..."
                    : "Reset Password"}
            </Button>

            {/* Back to Sign In */}
            <Link
                href="/signin"
                className="flex items-center justify-center gap-2 text-sm text-t2m-primary hover:underline"
            >
                <ArrowLeft size={16} />
                Back to Sign In
            </Link>
        </form>
    );
}
