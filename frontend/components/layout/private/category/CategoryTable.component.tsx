
"use client";

import { deleteCategoryAction } from "@/app/dashboard/category/actions";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import DeleteCategoryDialog from "./DeleteCategoryDialog.component";

type Category = {
    id: string;
    name: string;
    icon: string;
    createdAt: string;
};

type CategoryTableProps = {
    data: Category[];
};

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function CategoryTable({ data }: CategoryTableProps) {
    const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

    const deleteCat = async (id: string) => {
        setDeleteLoadingId(id);

        try {
            const res = await deleteCategoryAction(id);

            if (!res.success) {
                toast.error(res.message || "Failed to delete category");
                throw new Error(res.message || "Failed to delete category");
            }

            toast.success(res.message || "Category deleted successfully");
        } catch (error) {
            if (!(error instanceof Error)) {
                toast.error("Failed to delete category");
            }

            throw error;
        } finally {
            setDeleteLoadingId(null);
        }
    };

    return (
        <div className="rounded-md border border-border bg-card text-card-foreground overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold text-foreground">
                            Icon
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">
                            Name
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">
                            Created At
                        </TableHead>
                        <TableHead className="w-[160px] text-right font-semibold text-foreground">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                colSpan={4}
                                className="py-12 text-center"
                            >
                                <p className="font-medium text-foreground">
                                    No categories found
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Add a category to start organising your transactions.
                                </p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((cat) => (
                            <TableRow
                                key={cat.id}
                                className="border-border hover:bg-accent/40 transition-colors"
                            >
                                <TableCell>
                                    <div className="h-9 w-9 rounded-md border border-border bg-muted/30 flex items-center justify-center">
                                        <img
                                            src={`http://localhost:5000/api/v1/uploads/catIcons/${cat.icon}`}
                                            alt={cat.name}
                                            className="h-5 w-5 object-contain"
                                        />
                                    </div>
                                </TableCell>

                                <TableCell className="font-medium capitalize text-foreground">
                                    {cat.name}
                                </TableCell>

                                <TableCell className="text-t2m-text-secondary">
                                    {formatDate(cat.createdAt)}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <Link
                                                href={`/dashboard/category/edit/${cat.id}`}
                                            >
                                                <Pencil size={14} />
                                                Edit
                                            </Link>
                                        </Button>

                                        <DeleteCategoryDialog
                                            title={cat.name}
                                            pending={deleteLoadingId === cat.id}
                                            onDelete={() => deleteCat(cat.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
