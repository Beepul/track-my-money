
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import GoogleIcon from "@/public/google-icon.svg";
import { registerUser, type RegisterFormState } from "./actions";
import GoogleAuthButton from "@/components/layout/public/GoogleAuthButton";

const initialState: RegisterFormState = {
    errors: {},
    success: false,
    data: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
    message: "",
};

export default function RegisterPage() {
    const [state, formAction, pending] = useActionState(
        registerUser,
        initialState
    );

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    // Success toast and navigation
    useEffect(() => {
        if (!state.success) return;

        toast.success(
            state.message || "Account created successfully."
        );

        router.replace("/signin");
    }, [state, router]);

    const inputClass =
        "h-12 border-border bg-background text-foreground placeholder:text-muted-foreground";

    const labelClass =
        "text-sm font-medium text-t2m-text-secondary";

    const errorClass =
        "text-xs text-red-500 dark:text-red-400";

    const toggleClass =
        "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground";

    return (
        <div className="w-full max-w-[480px] rounded-2xl border border-border bg-card p-6 text-center text-sm text-card-foreground shadow-lg sm:p-8">

            {/* Header */}
            <h1 className="mb-2 text-3xl font-bold text-t2m-text-primary">
                Welcome to T2M
            </h1>

            <p className="mb-8 text-sm text-t2m-text-secondary">
                Create an account and take control of your finances.
            </p>

            {/* Register Form */}
            <form
                action={formAction}
                className="relative space-y-5 border-b border-border pb-8 text-left"
            >
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* First Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="first_name"
                            className={labelClass}
                        >
                            First Name
                        </label>

                        <Input
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="First name"
                            autoComplete="given-name"
                            defaultValue={
                                state.data?.first_name ?? ""
                            }
                            required
                            className={inputClass}
                        />

                        {state.errors?.first_name && (
                            <p className={errorClass}>
                                {state.errors.first_name[0]}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="last_name"
                            className={labelClass}
                        >
                            Last Name
                        </label>

                        <Input
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Last name"
                            autoComplete="family-name"
                            defaultValue={
                                state.data?.last_name ?? ""
                            }
                            required
                            className={inputClass}
                        />

                        {state.errors?.last_name && (
                            <p className={errorClass}>
                                {state.errors.last_name[0]}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className={labelClass}
                    >
                        Email Address
                    </label>

                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        defaultValue={state.data?.email ?? ""}
                        required
                        className={inputClass}
                    />

                    {state.errors?.email && (
                        <p className={errorClass}>
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className={labelClass}
                    >
                        Password
                    </label>

                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={15}
                            required
                            className={`${inputClass} pr-12`}
                        />

                        <button
                            type="button"
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            aria-pressed={showPassword}
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className={toggleClass}
                        >
                            {showPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        8–15 characters, including uppercase,
                        lowercase, a number and a special character.
                        No spaces.
                    </p>

                    {state.errors?.password && (
                        <p className={errorClass}>
                            {state.errors.password[0]}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="confirmPassword"
                        className={labelClass}
                    >
                        Confirm Password
                    </label>

                    <div className="relative">
                        <Input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={15}
                            required
                            className={`${inputClass} pr-12`}
                        />

                        <button
                            type="button"
                            aria-label={
                                showConfirmPassword
                                    ? "Hide confirmation password"
                                    : "Show confirmation password"
                            }
                            aria-pressed={showConfirmPassword}
                            onClick={() =>
                                setShowConfirmPassword(
                                    (prev) => !prev
                                )
                            }
                            className={toggleClass}
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>
                    </div>

                    {state.errors?.confirmPassword && (
                        <p className={errorClass}>
                            {state.errors.confirmPassword[0]}
                        </p>
                    )}
                </div>

                {/* General API Error */}
                {!state.success && state.message && (
                    <div
                        className="rounded-md border border-red-200 bg-red-50 p-3 text-center dark:border-red-900 dark:bg-red-950/30"
                        role="alert"
                    >
                        <p className="text-xs text-red-600 dark:text-red-400">
                            {state.message}
                        </p>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={pending}
                    className="h-12 w-full cursor-pointer bg-t2m-primary font-medium text-white transition-colors hover:bg-t2m-secondary disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-900"
                >
                    {pending ? (
                        <>
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                            Creating Account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>

                {/* Divider */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap bg-card px-3 text-xs text-muted-foreground">
                    Or continue with
                </span>
            </form>

            {/* Google Sign In */}
            <div className="mt-8 mb-6">
                <GoogleAuthButton mode="signin" />
            </div>

            {/* Sign In Link */}
            <p className="text-sm text-t2m-text-secondary">
                Already have an account?{" "}
                <Link
                    href="/signin"
                    className="font-medium text-t2m-primary hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </div>
    );
}
