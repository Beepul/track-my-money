
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag, FileImage, StickyNote } from "lucide-react";
import Link from "next/link";
import { GetTransactionByIdApi } from "../api";
import Image from "next/image";

export default async function TransactionDetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const { data: transaction, success } = await GetTransactionByIdApi(id);

    if (!success || !transaction) {
        return (
            <div className="bg-card text-card-foreground rounded-lg border border-border p-6 text-center">
                Failed to load transaction details.
            </div>
        );
    }

    const isIncome = transaction.type === "INCOME";

    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6 max-w-3xl mx-auto">

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-border pb-5 mb-6">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/dashboard/transaction">
                        <ArrowLeft size={18} />
                    </Link>
                </Button>

                <div>
                    <h2 className="text-2xl font-semibold text-t2m-text-primary">
                        Transaction Details
                    </h2>

                    <p className="text-sm text-t2m-text-secondary">
                        View full information about this transaction
                    </p>
                </div>
            </div>

            {/* Transaction title and amount */}
            <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-xl font-semibold capitalize text-foreground">
                        {transaction.title}
                    </h3>

                    <Badge
                        variant="outline"
                        className={
                            isIncome
                                ? "mt-2 text-green-600 border-green-200 bg-green-50 dark:text-green-400 dark:border-green-900 dark:bg-green-950/40"
                                : "mt-2 text-red-600 border-red-200 bg-red-50 dark:text-red-400 dark:border-red-900 dark:bg-red-950/40"
                        }
                    >
                        {transaction.type}
                    </Badge>
                </div>

                <div
                    className={`rounded-lg px-4 py-3 border ${
                        isIncome
                            ? "bg-green-50 border-green-200 dark:bg-green-950/40 dark:border-green-900"
                            : "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-900"
                    }`}
                >
                    <p className="text-xs uppercase text-muted-foreground mb-1">
                        Amount
                    </p>

                    <p
                        className={`text-3xl font-bold ${
                            isIncome
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        }`}
                    >
                        {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Date and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-4 bg-muted/30">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar size={16} />
                        Date
                    </div>

                    <p className="font-medium text-foreground">
                        {new Date(transaction.date).toLocaleDateString("en-AU", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <div className="rounded-lg border border-border p-4 bg-muted/30">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Tag size={16} />
                        Category
                    </div>

                    <div className="flex items-center gap-2">
                        {transaction.category?.icon && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-white border border-1 dark:border-gray-300">
                                <Image
                                    src={`http://localhost:5000/api/v1/uploads/catIcons/${transaction.category.icon}`}
                                    alt={transaction.category.name}
                                    width={24}
                                    height={24}
                                    unoptimized
                                    className="h-6 w-6 object-contain"
                                />
                            </div>
                        )}

                        <p className="font-medium capitalize text-foreground">
                            {transaction.category?.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Note */}
            <div className="rounded-lg border border-border p-4 bg-muted/30 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <StickyNote size={16} />
                    Note
                </div>

                <p className="text-sm text-foreground">
                    {transaction.note || "No note added."}
                </p>
            </div>

            {/* Receipt Image */}
            <div className="rounded-lg border border-border p-4 bg-muted/30 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <FileImage size={16} />
                    Receipt Image
                </div>

                {transaction.image ? (
                    <Image
                        src={`http://localhost:5000/api/v1/uploads/transaction/${transaction.image}`}
                        alt="Transaction receipt"
                        width={800}
                        height={600}
                        className="max-h-[350px] w-auto rounded-md border border-border object-contain"
                    />
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No image uploaded.
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" asChild>
                    <Link href="/dashboard/transaction">
                        Back
                    </Link>
                </Button>

                <Button
                    asChild
                    className="bg-t2m-primary text-white dark:text-slate-900 hover:bg-t2m-secondary"
                >
                    <Link href={`/dashboard/transaction/edit/${id}`}>
                        Edit Transaction
                    </Link>
                </Button>
            </div>
        </div>
    );
}
