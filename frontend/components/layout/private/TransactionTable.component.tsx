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

type Transaction = {
    id: string;
    userId: string;
    title: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    categoryId: string;
    date: string;
    note: string | null;
    image: string | null;
};

type TransactionTableProps = {
    transactionData: Transaction[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function TransactionTable({
    transactionData,
    meta,
}: TransactionTableProps) {
    return (
        <div className="rounded-md border overflow-hidden">
            <div className="flex items-center justify-between gap-4 p-4 border-b bg-white">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search transactions..."
                        className="pl-9"
                    />
                </div>

                <p className="text-sm text-gray-500 whitespace-nowrap">
                    Total: {meta.total}
                </p>
            </div>
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold">Title</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Amount</TableHead>
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
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                No transactions found.
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

                                <TableCell>{formatDate(transaction.date)}</TableCell>

                                <TableCell className="max-w-[180px] truncate text-gray-600">
                                    {transaction.note || "-"}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="outline" size="sm">
                                            <Eye size={14} />
                                        </Button>

                                        <Button variant="outline" size="sm">
                                            <Pencil size={14} />
                                            Edit
                                        </Button>

                                        <Button variant="destructive" size="sm">
                                            <Trash2 size={14} />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between border-t px-4 py-3">
                <p className="text-sm text-gray-500">
                    Page {meta.page} of {meta.totalPages}
                </p>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={meta.page <= 1}
                        className={meta.page <= 1 ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: meta.totalPages }).map((_, index) => {
                            const page = index + 1;

                            return (
                                <Button
                                    key={page}
                                    variant={page === meta.page ? "default" : "outline"}
                                    size="sm"
                                    className={
                                        page === meta.page
                                            ? "bg-t2m-primary hover:bg-t2m-primary cursor-default"
                                            : "cursor-pointer hover:bg-gray-50"
                                    }
                                >
                                    {page}
                                </Button>
                            );
                        })}
                    </div>

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
                </div>
            </div>
        </div>
    );
}