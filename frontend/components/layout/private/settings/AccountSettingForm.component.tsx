
"use client";

import { User } from "@/app/dashboard/api";
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
import { Camera } from "lucide-react";
import Image from "next/image";
import profile from "@/public/images/profile-1.jpg";
import { useActionState, useEffect } from "react";
import {
    UpdateAccountActions,
    UpdateAccountState,
} from "@/app/dashboard/settings/actions";
import { toast } from "sonner";

const initialState: UpdateAccountState = {
    success: false,
    message: "",
    formData: {
        first_name: "",
        last_name: "",
    },
    errors: {},
};

export default function AccountSettingForm({ user }: { user: User }) {
    const [state, action, isPending] = useActionState(
        UpdateAccountActions,
        initialState
    );

    useEffect(() => {
        if (!state.success || !state.message) return;

        toast.success(state.message);
    }, [state]);

    const getProfilePlaceholder = () => {
        const firstCharacter = user.first_name?.charAt(0) || "";
        const secondCharacter = user.last_name?.charAt(0) || "";

        return `${firstCharacter}${secondCharacter}`;
    };

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 lg:p-12 rounded-lg max-w-[850px] mx-auto shadow-sm">
            <form action={action}>
                <FieldGroup>
                    <FieldSet>
                        {/* Header */}
                        <FieldLegend className="!text-xl !font-semibold text-t2m-text-primary">
                            Account Information
                        </FieldLegend>

                        <FieldDescription className="mb-8 text-t2m-text-secondary">
                            Update your personal information and profile
                        </FieldDescription>

                        <FieldGroup className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
                            {/* Profile Picture */}
                            <div className="mb-6 flex flex-col items-center gap-4 lg:mb-0">
                                {user.image ? (
                                    <Image
                                        src={profile}
                                        alt="Profile"
                                        className="rounded-full object-cover h-[100px] w-[100px] border border-border"
                                    />
                                ) : (
                                    <span className="uppercase flex items-center justify-center text-3xl font-semibold rounded-full bg-amber-800 text-white h-[100px] w-[100px]">
                                        {getProfilePlaceholder()}
                                    </span>
                                )}

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="cursor-pointer bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Camera size={16} />
                                    Change Photo
                                </Button>

                                <Input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                />
                            </div>

                            {/* Account Information */}
                            <div className="flex-1 w-full">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* First Name */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor="firstName"
                                            className="text-t2m-text-secondary"
                                        >
                                            First Name
                                        </FieldLabel>

                                        <Input
                                            id="firstName"
                                            name="first_name"
                                            placeholder="Enter your name"
                                            defaultValue={
                                                state.formData.first_name ||
                                                user.first_name
                                            }
                                            required
                                            className="h-10 bg-background border-border text-foreground"
                                        />

                                        {state.errors?.first_name && (
                                            <p className="text-xs text-red-500 dark:text-red-400">
                                                {state.errors.first_name[0]}
                                            </p>
                                        )}
                                    </Field>

                                    {/* Last Name */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor="lastName"
                                            className="text-t2m-text-secondary"
                                        >
                                            Last Name
                                        </FieldLabel>

                                        <Input
                                            id="lastName"
                                            name="last_name"
                                            placeholder="Enter your last name"
                                            defaultValue={
                                                state.formData.last_name ||
                                                user.last_name
                                            }
                                            required
                                            className="h-10 bg-background border-border text-foreground"
                                        />

                                        {state.errors?.last_name && (
                                            <p className="text-xs text-red-500 dark:text-red-400">
                                                {state.errors.last_name[0]}
                                            </p>
                                        )}
                                    </Field>

                                    {/* Email */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor="email"
                                            className="text-t2m-text-secondary"
                                        >
                                            Email
                                        </FieldLabel>

                                        <Input
                                            id="email"
                                            type="email"
                                            value={user.email}
                                            readOnly
                                            className="h-10 bg-muted/30 border-border text-muted-foreground cursor-not-allowed focus-visible:ring-0"
                                        />
                                    </Field>

                                    {/* Member Since */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor="joinedAt"
                                            className="text-t2m-text-secondary"
                                        >
                                            Member Since
                                        </FieldLabel>

                                        <Input
                                            id="joinedAt"
                                            value={formatDate(user.createdAt)}
                                            readOnly
                                            className="h-10 bg-muted/30 border-border text-muted-foreground cursor-not-allowed focus-visible:ring-0"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </FieldGroup>
                    </FieldSet>

                    {/* Server Action Message */}
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
                            {isPending ? "Updating..." : "Save Changes"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
