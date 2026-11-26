
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import GoogleIcon from "@/public/google-icon.svg";
import { signIn, type SignInFormState } from "./actions";
import GoogleAuthButton from "@/components/layout/public/GoogleAuthButton";

const initialState: SignInFormState = {
    success: false,
    message: "",
    data: {
        email: "",
        password: "",
    },
    errors: {},
};

export default function SignInPage() {
    const [state, action, pending] = useActionState(
        signIn,
        initialState
    );

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-[480px] rounded-2xl border border-border bg-card p-6 text-center text-sm text-card-foreground shadow-lg sm:p-8">

            {/* Header */}
            <h1 className="mb-2 text-3xl font-bold text-t2m-text-primary">
                Welcome Back
            </h1>

            <p className="mb-8 text-sm text-t2m-text-secondary">
                Sign in to your account to continue
            </p>

            {/* Sign In Form */}
            <form
                action={action}
                className="relative space-y-5 border-b border-border pb-8 text-left"
            >
                {/* Email */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-t2m-text-secondary"
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
                        className="h-12 border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />

                    {state.errors?.email && (
                        <p className="text-xs text-red-500 dark:text-red-400">
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-t2m-text-secondary"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="h-12 border-border bg-background pr-12 text-foreground placeholder:text-muted-foreground"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            aria-pressed={showPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {showPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>
                    </div>

                    {state.errors?.password && (
                        <p className="text-xs text-red-500 dark:text-red-400">
                            {state.errors.password[0]}
                        </p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end text-sm">
                    <Link
                        href="/forgot-password"
                        className="font-medium text-t2m-primary transition-colors hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* General Login Error */}
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

                {/* Sign In Button */}
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
                            Signing In...
                        </>
                    ) : (
                        "Sign In"
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

            {/* Register */}
            <p className="text-sm text-t2m-text-secondary">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-t2m-primary hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}
