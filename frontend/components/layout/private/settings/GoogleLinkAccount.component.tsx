
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    GoogleLogin,
    GoogleOAuthProvider,
} from "@react-oauth/google";
import {
    CheckCircle2,
    LoaderCircle,
    Link2,
} from "lucide-react";
import { toast } from "sonner";

import {
    linkGoogleAccountAction,
} from "@/app/dashboard/settings/account/google-actions";

type GoogleLinkAccountProps = {
    isLinked?: boolean;
};

export default function GoogleLinkAccount({
    isLinked = false,
}: GoogleLinkAccountProps) {
    const router = useRouter();

    const [linked, setLinked] = useState(isLinked);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const clientId =
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const handleGoogleSuccess = async (
        credential?: string
    ) => {
        if (pending) return;

        if (!credential) {
            setError("Google credential was not returned.");
            return;
        }

        setPending(true);
        setError("");

        try {
            const result = await linkGoogleAccountAction(
                credential
            );

            if (!result.success) {
                setError(result.message);
                return;
            }

            setLinked(true);

            toast.success(
                result.message ||
                "Google account linked successfully."
            );

            router.refresh();
        } catch {
            setError(
                "Unable to link your Google account. Please try again."
            );
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="mt-8 border-t border-border pt-8">
            {/* Header */}
            <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-t2m-bg-primary">
                    <Link2
                        size={20}
                        className="text-t2m-primary"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-t2m-text-primary">
                        Connected Accounts
                    </h3>

                    <p className="mt-1 text-sm text-t2m-text-secondary">
                        Link your Google account to sign in
                        without entering your password.
                    </p>
                </div>
            </div>

            {/* Google Account Section */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-white">
                        <svg
                            viewBox="0 0 48 48"
                            width="24"
                            height="24"
                            aria-hidden="true"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.8 7.18l7.73 6C44.37 38.03 46.98 31.88 46.98 24.55z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.6.28-3.15.77-4.59l-7.98-6.2A23.9 23.9 0 0 0 0 24c0 3.87.93 7.51 2.56 10.78l7.97-6.19z"
                            />
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                        </svg>
                    </div>

                    <div>
                        <p className="font-medium text-foreground">
                            Google
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {linked
                                ? "Your Google account is connected"
                                : "Not connected"}
                        </p>
                    </div>
                </div>

                {/* Account Status / Linking */}
                {linked ? (
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                        <CheckCircle2 size={18} />
                        Connected
                    </div>
                ) : pending ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <LoaderCircle
                            size={18}
                            className="animate-spin"
                        />
                        Connecting...
                    </div>
                ) : clientId ? (
                    <GoogleOAuthProvider
                        clientId={clientId}
                    >
                        <GoogleLogin
                            onSuccess={(response) => {
                                void handleGoogleSuccess(
                                    response.credential
                                );
                            }}
                            onError={() => {
                                setError(
                                    "Google authentication failed."
                                );
                            }}
                            theme="outline"
                            size="large"
                            shape="rectangular"
                            text="continue_with"
                        />
                    </GoogleOAuthProvider>
                ) : (
                    <p className="text-sm text-red-500 dark:text-red-400">
                        Google authentication is not configured.
                    </p>
                )}
            </div>

            {/* Error */}
            {error && (
                <p
                    role="alert"
                    className="mt-3 text-sm text-red-500 dark:text-red-400"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
