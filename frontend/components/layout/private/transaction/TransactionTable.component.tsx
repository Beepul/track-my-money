"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Pencil, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import DatePickerInput from "../../public/DatePickerInput.component";
import TransactionTblFilter from "./TransactionTblFilter.component";
import { deleteTransactionAction, Transaction } from "@/app/dashboard/transaction/actions";
import DeleteTransactionDialog from "./DeleteTransactionDialog.component";
import { DeleteTransactionApi } from "@/app/dashboard/transaction/api";



type TransactionTableProps = {
    transactionData: Transaction[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    searchPrams: string;
    categoryList: {
        id: string,
        name: string,
        icon: string,
    }[]
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function TransactionTable({ transactionData, meta, searchPrams }: TransactionTableProps) {
    const [isSearching, startSearchTransition] = useTransition();
    const [search, setSearch] = useState(searchPrams);
    const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
    const router = useRouter();
    const changeLimit = (value: string) => {
        router.push(`/dashboard/transaction?page=1&limit=${value}&search=${search}`);
    };
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        startSearchTransition(() => {
            router.push(
                `/dashboard/transaction?page=1&limit=${meta.limit}&search=${search}`
            );
        });
    }
    const handleDeleteTransaction = async (id: string) => {
        setDeleteLoadingId(id);

        const res = await deleteTransactionAction(id);

        alert(res.message);

        setDeleteLoadingId(null);
    }
    return (
        <div className="rounded-md border overflow-hidden">
            <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center justify-between gap-4 p-4 border-b bg-white">
                    <div className="flex items-center">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search transactions..."
                                className="pl-9"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSearching}
                            className="bg-t2m-primary hover:bg-t2m-secondary cursor-pointer disabled:bg-teal-600"
                            >
                                <Search size={16} />
                                {isSearching ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </div>
            </form>
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold">Title</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Amount</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Note</TableHead>
                        <TableHead className="w-[180px] text-center font-semibold">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {transactionData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="py-12 text-center">
                                <p className="font-medium text-gray-600">
                                    No transactions found
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    Try changing your search or filters.
                                </p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        transactionData.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium capitalize">
                                    {transaction.title}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={
                                            transaction.type === "INCOME"
                                                ? "text-green-600 border-green-200 bg-green-50"
                                                : "text-red-600 border-red-200 bg-red-50"
                                        }
                                    >
                                        {transaction.type}
                                    </Badge>
                                </TableCell>

                                <TableCell
                                    className={
                                        transaction.type === "INCOME"
                                            ? "font-medium text-green-600"
                                            : "font-medium text-red-600"
                                    }
                                >
                                    {transaction.type === "INCOME" ? "+" : "-"}$
                                    {transaction.amount.toFixed(2)}
                                </TableCell>

                                <TableCell>
                                    <Badge variant="secondary" className="capitalize">
                                        {transaction.category?.name}
                                    </Badge>
                                </TableCell>
                                <TableCell>{formatDate(transaction.date)}</TableCell>

                                <TableCell className="max-w-[180px] truncate text-gray-600">
                                    {transaction.note || "-"}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`transaction/${transaction.id}`}>
                                                <Eye size={14} />
                                            </Link>
                                        </Button>

                                        <Button variant="outline" size="sm">
                                            <Pencil size={14} />
                                            Edit
                                        </Button>

                                        {/* <Button variant="destructive" size="sm" onClick={()=>handleDeleteTransaction(transaction.id)}>
                                            <Trash2 size={14} />
                                            Delete
                                        </Button> */}
                                        <DeleteTransactionDialog
                                            title={transaction.title}
                                            pending={deleteLoadingId === transaction.id}
                                            onDelete={() => handleDeleteTransaction(transaction.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between border-t px-4 py-3">
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">
                        Page {meta.page} of {meta.totalPages}
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Rows per page</span>

                        <Select value={String(meta.limit)} onValueChange={changeLimit}>
                            <SelectTrigger className="w-[90px]">
                                <SelectValue placeholder="Limit" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className="text-sm text-gray-500 whitespace-nowrap">
                        Total: {meta.total}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {meta.page <= 1 ? <>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={meta.page <= 1}
                            className={meta.page <= 1 ? "cursor-not-allowed" : "cursor-pointer"}
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </Button>
                    </> : <>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            disabled={meta.page <= 1}
                            className={meta.page <= 1 ? "cursor-not-allowed" : "cursor-pointer"}
                        >
                            <Link href={`/dashboard/transaction?page=${meta.page - 1}&limit=${meta.limit}&search=${search}`}>
                                <ChevronLeft size={16} />
                                Previous
                            </Link>
                        </Button>
                    </>}

                    <div className="flex items-center gap-1">
                        {Array.from({ length: meta.totalPages }).map((_, index) => {
                            const page = index + 1;

                            return (
                                <Button
                                    key={page}
                                    variant={page === meta.page ? "default" : "outline"}
                                    size="sm"
                                    asChild
                                    className={
                                        page === meta.page
                                            ? "bg-t2m-primary hover:bg-t2m-primary cursor-default"
                                            : "cursor-pointer hover:bg-gray-50"
                                    }
                                >
                                    <Link href={`/dashboard/transaction?page=${page}&limit=${meta.limit}&search=${search}`}>
                                        {page}
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>

                    {
                        meta.page >= meta.totalPages ? <>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={meta.page >= meta.totalPages}
                                className={
                                    meta.page >= meta.totalPages ? "cursor-not-allowed" : "cursor-pointer"
                                }
                            >
                                Next
                                <ChevronRight size={16} />
                            </Button>
                        </> : <>
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                disabled={meta.page >= meta.totalPages}
                                className={
                                    meta.page >= meta.totalPages ? "cursor-not-allowed" : "cursor-pointer"
                                }
                            >
                                <Link href={`/dashboard/transaction?page=${meta.page + 1}&limit=${meta.limit}&search=${search}`}>
                                    Next
                                    <ChevronRight size={16} />
                                </Link>
                            </Button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}