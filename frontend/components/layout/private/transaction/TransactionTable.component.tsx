
"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye, Pencil, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState, useTransition, type FormEvent } from "react"
import {
    deleteTransactionAction,
    type Transaction
} from "@/app/dashboard/transaction/actions"
import DeleteTransactionDialog from "./DeleteTransactionDialog.component"
import { useApp } from "@/app/context/AppProvider"
import { formatCurrency } from "@/lib/formatCurrency"
import { toast } from "sonner"

type TransactionTableProps = {
    transactionData: Transaction[]
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
    searchPrams?: string
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

export default function TransactionTable({
    transactionData,
    meta,
    searchPrams
}: TransactionTableProps) {

    const { preferences } = useApp()

    const [isSearching, startSearchTransition] = useTransition()
    const [search, setSearch] = useState(searchPrams || "")
    const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null)

    const router = useRouter()

    const buildUrl = (page: number, limit: number) => {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            search: search
        })

        return `/dashboard/transaction?${params.toString()}`
    }

    const changeLimit = (value: string) => {
        router.push(buildUrl(1, Number(value)))
    }

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startSearchTransition(() => {
            router.push(buildUrl(1, meta.limit))
        })
    }

    
    const handleDeleteTransaction = async (id: string) => {
        setDeleteLoadingId(id);

        try {
            const res = await deleteTransactionAction(id);

            if (!res.success) {
                toast.error(res.message || "Failed to delete transaction");
                throw new Error(res.message || "Failed to delete transaction");
            }

            toast.success(
                res.message || "Transaction deleted successfully."
            );

            router.refresh();
        } catch (error) {
            console.error("Failed to delete transaction:", error);
            throw error;
        } finally {
            setDeleteLoadingId(null);
        }
    };


    return (
        <div className="rounded-md border border-border bg-card text-card-foreground overflow-hidden">

            {/* Search */}
            <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center justify-between gap-4 p-4 border-b border-border bg-card">
                    <div className="flex items-center gap-2">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                            <Input
                                placeholder="Search transactions..."
                                value={search}
                                className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSearching}
                            className="bg-t2m-primary text-white dark:text-slate-900 hover:bg-t2m-secondary cursor-pointer disabled:opacity-50"
                        >
                            <Search size={16} />
                            {isSearching ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </div>
            </form>

            {/* Transaction Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold text-foreground">Title</TableHead>
                            <TableHead className="font-semibold text-foreground">Type</TableHead>
                            <TableHead className="font-semibold text-foreground">Amount</TableHead>
                            <TableHead className="font-semibold text-foreground">Category</TableHead>
                            <TableHead className="font-semibold text-foreground">Date</TableHead>
                            <TableHead className="font-semibold text-foreground">Note</TableHead>
                            <TableHead className="w-[180px] text-center font-semibold text-foreground">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {transactionData.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={7} className="py-12 text-center">
                                    <p className="font-medium text-foreground">
                                        No transactions found
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Try changing your search or filters.
                                    </p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactionData.map((transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    className="border-border hover:bg-accent/40 transition-colors"
                                >
                                    <TableCell className="font-medium capitalize text-foreground">
                                        {transaction.title}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                transaction.type === "INCOME"
                                                    ? "text-green-600 border-green-200 bg-green-50 dark:text-green-400 dark:border-green-900 dark:bg-green-950/40"
                                                    : "text-red-600 border-red-200 bg-red-50 dark:text-red-400 dark:border-red-900 dark:bg-red-950/40"
                                            }
                                        >
                                            {transaction.type}
                                        </Badge>
                                    </TableCell>

                                    <TableCell
                                        className={
                                            transaction.type === "INCOME"
                                                ? "font-medium text-green-600 dark:text-green-400"
                                                : "font-medium text-red-600 dark:text-red-400"
                                        }
                                    >
                                        {transaction.type === "INCOME" ? "+" : "-"}
                                        {formatCurrency(
                                            Math.abs(transaction.amount),
                                            preferences
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="capitalize bg-secondary text-secondary-foreground"
                                        >
                                            {transaction.category?.name}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-t2m-text-secondary whitespace-nowrap">
                                        {formatDate(transaction.date)}
                                    </TableCell>

                                    <TableCell className="max-w-[180px] truncate text-t2m-text-secondary">
                                        {transaction.note || "-"}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Link href={`/dashboard/transaction/${transaction.id}`}>
                                                    <Eye size={14} />
                                                </Link>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={`/dashboard/transaction/edit/${transaction.id}`}>
                                                    <Pencil size={14} />
                                                    Edit
                                                </Link>
                                            </Button>

                                            <DeleteTransactionDialog
                                                title={transaction.title}
                                                pending={deleteLoadingId === transaction.id}
                                                onDelete={() =>
                                                    handleDeleteTransaction(transaction.id)
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3 bg-card">

                <div className="flex flex-wrap items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        Page {meta.page} of {meta.totalPages}
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Rows per page
                        </span>

                        <Select
                            value={String(meta.limit)}
                            onValueChange={changeLimit}
                        >
                            <SelectTrigger className="w-[90px] bg-background border-border">
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

                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                        Total: {meta.total}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={meta.page <= 1}
                        className="cursor-pointer disabled:cursor-not-allowed"
                        onClick={() =>
                            router.push(buildUrl(meta.page - 1, meta.limit))
                        }
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: meta.totalPages }).map((_, index) => {
                            const page = index + 1

                            return (
                                <Button
                                    key={page}
                                    variant={page === meta.page ? "default" : "outline"}
                                    size="sm"
                                    className={
                                        page === meta.page
                                            ? "bg-t2m-primary text-white dark:text-slate-900 hover:bg-t2m-primary cursor-default"
                                            : "cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                    }
                                    onClick={() =>
                                        router.push(buildUrl(page, meta.limit))
                                    }
                                    disabled={page === meta.page}
                                >
                                    {page}
                                </Button>
                            )
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={meta.page >= meta.totalPages}
                        className="cursor-pointer disabled:cursor-not-allowed"
                        onClick={() =>
                            router.push(buildUrl(meta.page + 1, meta.limit))
                        }
                    >
                        Next
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
