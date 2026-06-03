"use client"
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
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

        const res = await deleteCategoryAction(id);

        alert(res.message);

        setDeleteLoadingId(null);
    };
    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold">Icon</TableHead>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Created At</TableHead>
                        <TableHead className="w-[160px] text-right font-semibold">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                        {data.map((cat, index) => (
                            <TableRow key={cat.id}>
                                <TableCell>
                                    <div className="h-9 w-9 rounded-md border bg-gray-50 flex items-center justify-center">
                                        <img
                                            src={`http://localhost:5000/api/v1/uploads/catIcons/${cat.icon}`}
                                            alt="Food"
                                            className="h-5 w-5"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium capitalize">{cat.name}</TableCell>
                                <TableCell className="font-medium">{formatDate(cat.createdAt)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="outline" size="sm" className="cursor-pointer">
                                            <Link href={`/dashboard/category/edit/${cat.id}`} className="flex items-center gap-2">
                                                <Pencil size={14} />
                                                Edit
                                            </Link>
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="disabled:bg-red-400 cursor-pointer hover:bg-red-500"
                                            disabled={deleteLoadingId === cat.id}
                                            onClick={() => deleteCat(cat.id)}
                                            >
                                            <Trash2 size={14} />
                                            {deleteLoadingId === cat.id ? "Deleting..." : "Delete"}
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}