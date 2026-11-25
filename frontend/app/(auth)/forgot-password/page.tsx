
"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    forgotPasswordAction,
    type ForgotPasswordState,
} from "./actions";

const initialForgotPasswordState: ForgotPasswordState = {
    success: false,
    message: "",
    errors: {},
};

export default function ForgotPasswordPage() {
    const [state, action, pending] = useActionState(
        forgotPasswordAction,
        initialForgotPasswordState
    );

    useEffect(() => {
        if (!state.success) return;

        toast.success(
            state.message || "Password reset email sent."
        );
    }, [state]);

    return (
        <main className="flex min-h-[80vh] items-center justify-center px-4 py-8">
            <div className="w-full max-w-[450px] rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg text-card-foreground">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-t2m-bg-primary">
                    <Mail
                        size={30}
                        className="text-t2m-primary"
                    />
                </div>

                {/* Header */}
                <h1 className="mb-2 text-center text-2xl font-semibold text-t2m-text-primary">
                    Forgot Password?
                </h1>

                <p className="mb-8 text-center text-sm text-t2m-text-secondary">
                    Enter your registered email address and
                    we'll send you a link to reset your password.
                </p>

                {state.success ? (
                    <div className="space-y-6">

                        {/* Success Message */}
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-900 dark:bg-green-950/30">
                            <p className="text-sm text-green-700 dark:text-green-400">
                                {state.message}
                            </p>
                        </div>

                        <p className="text-center text-sm text-muted-foreground">
                            Check your inbox and spam folder
                            for the password reset email.
                        </p>

                        <Button
                            asChild
                            className="w-full bg-t2m-primary text-white dark:text-slate-900 hover:bg-t2m-secondary"
                        >
                            <Link href="/signin">
                                Back to Sign In
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <form action={action} className="space-y-5">

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
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                autoComplete="email"
                                required
                                className="h-12 border-border bg-background text-foreground placeholder:text-muted-foreground"
                            />

                            {state.errors?.email && (
                                <p className="text-xs text-red-500 dark:text-red-400">
                                    {state.errors.email[0]}
                                </p>
                            )}
                        </div>

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
                            <Send size={16} />
                            {pending
                                ? "Sending..."
                                : "Send Reset Link"}
                        </Button>

                        {/* Back */}
                        <Link
                            href="/signin"
                            className="flex items-center justify-center gap-2 text-sm text-t2m-primary hover:underline"
                        >
                            <ArrowLeft size={16} />
                            Back to Sign In
                        </Link>
                    </form>
                )}
            </div>
        </main>
    );
}
