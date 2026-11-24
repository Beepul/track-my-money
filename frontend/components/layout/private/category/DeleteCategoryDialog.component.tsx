
"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type DeleteCategoryDialogProps = {
    title: string;
    pending?: boolean;
    onDelete: () => Promise<void>;
};

export default function DeleteCategoryDialog({
    title,
    pending = false,
    onDelete,
}: DeleteCategoryDialogProps) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            await onDelete();
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete category:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const loading = pending || isDeleting;

    return (
        <AlertDialog
            open={open}
            onOpenChange={(value) => {
                if (!loading) setOpen(value);
            }}
        >
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="sm"
                    disabled={loading}
                    className="cursor-pointer bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500"
                >
                    <Trash2 size={14} />
                    Delete
                </Button>
            </AlertDialogTrigger>

                        
            <AlertDialogContent className="bg-card text-card-foreground border border-border sm:max-w-[450px]">
                <AlertDialogHeader className="!flex !flex-col !items-center !text-center">

                    {/* Warning Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40 mb-3 mx-auto">
                        <TriangleAlert
                            size={28}
                            className="text-red-600 dark:text-red-400"
                        />
                    </div>

                    {/* Title */}
                    <AlertDialogTitle className="!text-center text-xl font-semibold text-foreground w-full">
                        Delete Category?
                    </AlertDialogTitle>

                    {/* Description */}
                    <AlertDialogDescription className="!text-center text-muted-foreground w-full">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-foreground capitalize">
                            &quot;{title}&quot;
                        </span>
                        ?

                        <span className="block mt-2 text-red-600 dark:text-red-400">
                            This action cannot be undone.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Buttons */}
                <AlertDialogFooter className="!flex !flex-row !justify-center gap-3 mt-4">
                    <AlertDialogCancel
                        disabled={loading}
                        className="cursor-pointer bg-background border-border text-foreground hover:bg-accent"
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            void handleDelete();
                        }}
                        className="cursor-pointer bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 disabled:opacity-50"
                    >
                        <Trash2 size={16} />
                        {loading ? "Deleting..." : "Delete Category"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    );
}
