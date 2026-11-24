
"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/app/dashboard/transaction/actions";
import { useApp } from "@/app/context/AppProvider";
import { formatCurrency } from "@/lib/formatCurrency";

type ReportTableProps = {
    transactions: Transaction[];
    fromDate: string;
    toDate: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    category: string;
    type: string;
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function ReportTable({
    transactions,
    fromDate,
    toDate,
    meta,
    category,
    type,
}: ReportTableProps) {
    const router = useRouter();
    const { preferences } = useApp();

    const buildUrl = (page: number, limit: number) => {
        const params = new URLSearchParams({
            fd: fromDate,
            td: toDate,
            c: category,
            t: type,
            page: String(page),
            limit: String(limit),
        });

        return `/dashboard/reports?${params.toString()}`;
    };

    const changeLimit = (value: string) => {
        router.push(buildUrl(1, Number(value)));
    };

    if (!transactions.length) {
        return (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center">
                <p className="font-medium text-foreground">
                    No report data found
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                    No transactions match your selected filters.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden">

            {/* Table Header */}
            <div className="p-5 border-b border-border">
                <h3 className="text-lg font-semibold text-t2m-text-primary">
                    Transaction Statement
                </h3>

                <p className="text-sm text-t2m-text-secondary mt-1">
                    Detailed income and expense report from{" "}
                    <span className="font-semibold">{fromDate}</span>
                    {" "}to{" "}
                    <span className="font-semibold">{toDate}</span>
                </p>
            </div>

            {/* Transactions */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold text-foreground">
                                Date
                            </TableHead>
                            <TableHead className="font-semibold text-foreground">
                                Description
                            </TableHead>
                            <TableHead className="font-semibold text-foreground">
                                Category
                            </TableHead>
                            <TableHead className="font-semibold text-foreground">
                                Type
                            </TableHead>
                            <TableHead className="text-right font-semibold text-foreground">
                                Amount
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {transactions.map((transaction) => {
                            const isIncome = transaction.type === "INCOME";

                            return (
                                <TableRow
                                    key={transaction.id}
                                    className="border-border hover:bg-accent/40 transition-colors"
                                >
                                    <TableCell className="text-t2m-text-secondary whitespace-nowrap">
                                        {formatDate(transaction.date)}
                                    </TableCell>

                                    <TableCell className="font-medium capitalize text-foreground">
                                        {transaction.title}
                                    </TableCell>

                                    <TableCell className="capitalize text-t2m-text-secondary">
                                        {transaction.category?.name || "Uncategorized"}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                isIncome
                                                    ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900"
                                                    : "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900"
                                            }
                                        >
                                            {transaction.type}
                                        </Badge>
                                    </TableCell>

                                    <TableCell
                                        className={`text-right font-semibold whitespace-nowrap ${
                                            isIncome
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                        }`}
                                    >
                                        {isIncome ? "+" : "-"}
                                        {formatCurrency(
                                            Math.abs(transaction.amount),
                                            preferences
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3">

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
                    {/* Previous */}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={meta.page <= 1}
                        className="cursor-pointer disabled:cursor-not-allowed"
                        onClick={() => router.push(buildUrl(meta.page - 1, meta.limit))}
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                        {Array.from({ length: meta.totalPages }).map((_, index) => {
                            const page = index + 1;
                            const isActive = page === meta.page;

                            return (
                                <Button
                                    key={page}
                                    variant={isActive ? "default" : "outline"}
                                    size="sm"
                                    disabled={isActive}
                                    className={
                                        isActive
                                            ? "bg-t2m-primary text-white dark:text-slate-900 disabled:opacity-100 cursor-default"
                                            : "cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                    }
                                    onClick={() => router.push(buildUrl(page, meta.limit))}
                                >
                                    {page}
                                </Button>
                            );
                        })}
                    </div>

                    {/* Next */}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={meta.page >= meta.totalPages}
                        className="cursor-pointer disabled:cursor-not-allowed"
                        onClick={() => router.push(buildUrl(meta.page + 1, meta.limit))}
                    >
                        Next
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
