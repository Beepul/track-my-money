
"use client";

import {
    createCategory,
    updateCategoryAction,
} from "@/app/dashboard/category/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tags } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState = {
    success: false,
    message: "",
    data: {
        name: "",
        icon: "",
    },
    errors: {},
};

type CategoryFormProps = {
    categoryIcons: string[];
    mode?: "create" | "edit";
    catDetails?: {
        name: string;
        icon: string;
        id: string;
    };
};

export default function CategoryForm({
    categoryIcons,
    mode,
    catDetails,
}: CategoryFormProps) {
    const selectedAction =
        mode === "edit" && catDetails?.id
            ? updateCategoryAction.bind(null, catDetails.id)
            : createCategory;

    const [state, action, pending] = useActionState(
        selectedAction,
        initialState
    );

    const [selectedIcon, setSelectedIcon] = useState(
        catDetails?.icon ?? ""
    );

    const router = useRouter();

    // Success toast only
    useEffect(() => {
        if (!state.success || !state.message) return;

        toast.success(state.message);
        router.push("/dashboard/category");
    }, [state, router]);

    return (
        <form action={action}>
            <FieldGroup className="w-full mb-6">

                {/* Category Name */}
                <Field>
                    <FieldLabel
                        htmlFor="name"
                        className="!text-[16px] !text-t2m-text-secondary font-normal"
                    >
                        Name
                    </FieldLabel>

                    <Input
                        name="name"
                        id="name"
                        placeholder="Enter category name"
                        required
                        className="py-6 bg-background border-border text-foreground placeholder:text-muted-foreground"
                        defaultValue={
                            state.data?.name ||
                            catDetails?.name ||
                            ""
                        }
                    />

                    {state.errors?.name && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                            {state.errors.name[0]}
                        </p>
                    )}
                </Field>

                {/* Category Icon */}
                <Field>
                    <FieldLabel
                        htmlFor="icon"
                        className="!text-[16px] !text-t2m-text-secondary font-normal"
                    >
                        Icon
                    </FieldLabel>

                    <input
                        type="hidden"
                        name="icon"
                        id="icon"
                        value={selectedIcon}
                    />

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-2">
                        {categoryIcons.map((icon) => {
                            const isSelected = selectedIcon === icon;

                            return (
                                <button
                                    type="button"
                                    key={icon}
                                    onClick={() => setSelectedIcon(icon)}
                                    aria-pressed={isSelected}
                                    className={`
                                        border rounded-md p-3
                                        flex flex-col items-center justify-center gap-1
                                        cursor-pointer transition-colors duration-200
                                        text-foreground
                                        ${
                                            isSelected
                                                ? "border-t2m-primary bg-t2m-bg-primary ring-1 ring-t2m-primary"
                                                : "border-border bg-background hover:bg-accent hover:border-t2m-primary/50"
                                        }
                                    `}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-white mb-2 border border-1 dark:border-gray-300">
                                        <Image
                                            src={`http://localhost:5000/api/v1/uploads/catIcons/${icon}`}
                                            alt={icon.replace(".svg", "")}
                                            width={24}
                                            height={24}
                                            unoptimized
                                            className="h-6 w-6 object-contain"
                                        />
                                    </div>

                                    <span
                                        className={`
                                            text-[11px] text-center break-all
                                            ${
                                                isSelected
                                                    ? "text-t2m-primary font-medium"
                                                    : "text-muted-foreground"
                                            }
                                        `}
                                    >
                                        {icon.replace(".svg", "")}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {state.errors?.icon && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                            {state.errors.icon[0]}
                        </p>
                    )}
                </Field>
            </FieldGroup>

            {/* General Form Errors */}
            {!state.success && state.message && (
                <p
                    className="mb-4 text-sm text-red-500 dark:text-red-400"
                    role="alert"
                >
                    {state.message}
                </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-5 pt-6">
                <Button
                    type="button"
                    variant="outline"
                    className="
                        flex-1 py-5 px-6 cursor-pointer
                        bg-background border-border text-foreground
                        hover:bg-accent hover:text-accent-foreground
                    "
                    onClick={() => router.push("/dashboard/category")}
                >
                    Back
                </Button>

                <Button
                    type="submit"
                    disabled={pending}
                    className="
                        flex-1 py-5 px-6 cursor-pointer
                        bg-t2m-primary text-white
                        dark:text-slate-900
                        hover:bg-t2m-secondary
                        disabled:opacity-50
                    "
                >
                    <Tags size={16} />

                    {pending
                        ? "Saving..."
                        : mode === "create"
                        ? "Create Category"
                        : "Save Category"}
                </Button>
            </div>
        </form>
    );
}
