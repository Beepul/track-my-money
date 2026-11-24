
"use client";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { UpdatePasswordAction } from "../actions";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function SettingSecurity() {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        UpdatePasswordAction,
        {
            success: false,
            message: "",
        }
    );

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    useEffect(() => {
        if (!state.success) return;

        toast.success(
            state.message || "Password updated successfully."
        );

        // Clear password fields after successful update
        formRef.current?.reset();

        // Hide passwords again
        setShowPassword({
            currentPassword: false,
            newPassword: false,
            confirmPassword: false,
        });
    }, [state]);

    const passwordWrapperClass =
        "flex items-center rounded-lg border border-border bg-background transition-all focus-within:border-t2m-primary focus-within:ring-2 focus-within:ring-t2m-primary/20";

    const passwordInputClass =
        "h-10 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0";

    const toggleButtonClass =
        "shrink-0 bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer";

    return (
        <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 lg:p-12 rounded-lg max-w-[850px] mx-auto shadow-sm">
            <form ref={formRef} action={formAction}>
                <FieldGroup>
                    <FieldSet>
                        {/* Header */}
                        <FieldLegend className="!text-xl !font-semibold text-t2m-text-primary">
                            Security
                        </FieldLegend>

                        <FieldDescription className="mb-4 text-t2m-text-secondary">
                            Change your password and keep your account secure.
                        </FieldDescription>

                        <FieldGroup>
                            {/* Current Password */}
                            <Field>
                                <FieldLabel htmlFor="currentPassword">
                                    Current Password
                                </FieldLabel>

                                <div className={passwordWrapperClass}>
                                    <Input
                                        name="currentPassword"
                                        type={
                                            showPassword.currentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="currentPassword"
                                        placeholder="Enter your current password"
                                        autoComplete="current-password"
                                        required
                                        className={passwordInputClass}
                                    />

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={toggleButtonClass}
                                        type="button"
                                        aria-label={
                                            showPassword.currentPassword
                                                ? "Hide current password"
                                                : "Show current password"
                                        }
                                        onClick={() => {
                                            setShowPassword((prev) => ({
                                                ...prev,
                                                currentPassword: !prev.currentPassword,
                                            }));
                                        }}
                                    >
                                        {showPassword.currentPassword ? (
                                            <Eye size={18} />
                                        ) : (
                                            <EyeClosed size={18} />
                                        )}
                                    </Button>
                                </div>

                                {state.errors?.currentPassword && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {state.errors.currentPassword[0]}
                                    </p>
                                )}
                            </Field>

                            {/* New Password */}
                            <Field>
                                <FieldLabel htmlFor="newPassword">
                                    New Password
                                </FieldLabel>

                                <div className={passwordWrapperClass}>
                                    <Input
                                        name="newPassword"
                                        type={
                                            showPassword.newPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="newPassword"
                                        placeholder="Enter your new password"
                                        autoComplete="new-password"
                                        required
                                        className={passwordInputClass}
                                    />

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={toggleButtonClass}
                                        type="button"
                                        aria-label={
                                            showPassword.newPassword
                                                ? "Hide new password"
                                                : "Show new password"
                                        }
                                        onClick={() => {
                                            setShowPassword((prev) => ({
                                                ...prev,
                                                newPassword: !prev.newPassword,
                                            }));
                                        }}
                                    >
                                        {showPassword.newPassword ? (
                                            <Eye size={18} />
                                        ) : (
                                            <EyeClosed size={18} />
                                        )}
                                    </Button>
                                </div>

                                {state.errors?.newPassword && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {state.errors.newPassword[0]}
                                    </p>
                                )}
                            </Field>

                            {/* Confirm New Password */}
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">
                                    Confirm New Password
                                </FieldLabel>

                                <div className={passwordWrapperClass}>
                                    <Input
                                        name="confirmPassword"
                                        type={
                                            showPassword.confirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="confirmPassword"
                                        placeholder="Confirm your new password"
                                        autoComplete="new-password"
                                        required
                                        className={passwordInputClass}
                                    />

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={toggleButtonClass}
                                        type="button"
                                        aria-label={
                                            showPassword.confirmPassword
                                                ? "Hide confirmation password"
                                                : "Show confirmation password"
                                        }
                                        onClick={() => {
                                            setShowPassword((prev) => ({
                                                ...prev,
                                                confirmPassword: !prev.confirmPassword,
                                            }));
                                        }}
                                    >
                                        {showPassword.confirmPassword ? (
                                            <Eye size={18} />
                                        ) : (
                                            <EyeClosed size={18} />
                                        )}
                                    </Button>
                                </div>

                                {state.errors?.confirmPassword && (
                                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                        {state.errors.confirmPassword[0]}
                                    </p>
                                )}
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    {/* Inline Error Message */}
                    {!state.success && state.message && (
                        <p
                            className="text-sm text-red-500 dark:text-red-400"
                            role="alert"
                        >
                            {state.message}
                        </p>
                    )}

                    {/* Submit Button */}
                    <Field
                        orientation="horizontal"
                        className="justify-end"
                    >
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isPending}
                            className="bg-t2m-primary text-white dark:text-slate-900 cursor-pointer hover:bg-t2m-secondary disabled:opacity-50"
                        >
                            {isPending
                                ? "Updating..."
                                : "Update Password"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
