
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import ResetPasswordForm from "@/components/layout/public/ResetPasswordForm"


type ResetPasswordPageProps = {
    searchParams: Promise<{
        t?: string;
    }>;
};

export default async function ResetPasswordPage({
    searchParams,
}: ResetPasswordPageProps) {
    const params = await searchParams;
    const token = params.t || "";

    return (
        <main className="flex min-h-[80vh] items-center justify-center px-4 py-8">
            <div className="w-full max-w-[450px] rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg text-card-foreground">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-t2m-bg-primary">
                    <LockKeyhole
                        size={30}
                        className="text-t2m-primary"
                    />
                </div>

                {/* Header */}
                <h1 className="mb-2 text-center text-2xl font-semibold text-t2m-text-primary">
                    Reset Password
                </h1>

                <p className="mb-8 text-center text-sm text-t2m-text-secondary">
                    Enter your new password below to
                    secure your account.
                </p>

                {token ? (
                    <ResetPasswordForm token={token} />
                ) : (
                    <div className="space-y-5">
                        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                            Invalid password reset link.
                            Please request a new one.
                        </p>

                        <Link
                            href="/forgot-password"
                            className="block text-center text-sm text-t2m-primary hover:underline"
                        >
                            Request New Reset Link
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
