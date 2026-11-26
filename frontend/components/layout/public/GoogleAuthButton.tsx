
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    GoogleLogin,
    GoogleOAuthProvider,
} from "@react-oauth/google";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { googleSignInAction } from "@/app/(auth)/google-actions";

type GoogleAuthButtonProps = {
    mode?: "signin" | "signup";
};

export default function GoogleAuthButton({
    mode = "signin",
}: GoogleAuthButtonProps) {
    const router = useRouter();
    const [pending, setPending] = useState(false);

    const clientId =
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
        return (
            <p className="text-sm text-red-500">
                Google authentication is not configured.
            </p>
        );
    }

    const handleGoogleSuccess = async (
        credential?: string
    ) => {
        if (!credential || pending) return;

        setPending(true);

        try {
            const result = await googleSignInAction(
                credential
            );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            router.replace("/dashboard");
            router.refresh();
        } catch {
            toast.error("Google authentication failed.");
        } finally {
            setPending(false);
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="flex w-full flex-col items-center gap-3">
                {pending ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <LoaderCircle
                            size={18}
                            className="animate-spin"
                        />
                        Signing in with Google...
                    </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(response) => {
                            void handleGoogleSuccess(
                                response.credential
                            );
                        }}
                        onError={() => {
                            toast.error(
                                "Google sign in failed."
                            );
                        }}
                        text={
                            mode === "signup"
                                ? "signup_with"
                                : "signin_with"
                        }
                        theme="outline"
                        size="large"
                        shape="rectangular"
                        width="350"
                    />
                )}
            </div>
        </GoogleOAuthProvider>
    );
}
