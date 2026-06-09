import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag, FileImage, StickyNote } from "lucide-react";
import Link from "next/link";
import { GetTransactionByIdApi } from "../api";
import Image from "next/image";

export default async function TransactionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: transaction, success } = await GetTransactionByIdApi(id)


    if (!success || !transaction) {
        return (
            <div>Failed to load</div>
        )
    }

    const isIncome = transaction?.type === "INCOME";

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 border-b pb-5 mb-6">
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

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-xl font-semibold capitalize">
                        {transaction?.title}
                    </h3>

                    <Badge
                        variant="outline"
                        className={
                            isIncome
                                ? "mt-2 text-green-600 border-green-200 bg-green-50"
                                : "mt-2 text-red-600 border-red-200 bg-red-50"
                        }
                    >
                        {transaction?.type}
                    </Badge>
                </div>

                <div
                    className={`rounded-lg px-4 py-3 ${isIncome
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                >
                    <p className="text-xs uppercase text-gray-500 mb-1">
                        Amount
                    </p>

                    <p
                        className={`text-3xl font-bold ${isIncome ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 bg-gray-50">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar size={16} />
                        Date
                    </div>
                    <p className="font-medium">
                        {new Date(transaction?.date || "").toLocaleDateString("en-AU", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <div className="rounded-lg border p-4 bg-gray-50">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Tag size={16} />
                        Category
                    </div>

                    <div className="flex items-center gap-2">
                        {transaction?.category?.icon && (
                            <img
                                src={`http://localhost:5000/api/v1/uploads/catIcons/${transaction.category.icon}`}
                                alt={transaction.category.name}
                                className="h-5 w-5"
                            />
                        )}
                        <p className="font-medium capitalize">
                            {transaction?.category?.name}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border p-4 bg-gray-50 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <StickyNote size={16} />
                    Note
                </div>
                <p className="text-sm text-gray-700">
                    {transaction?.note || "No note added."}
                </p>
            </div>

            <div className="rounded-lg border p-4 bg-gray-50 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <FileImage size={16} />
                    Receipt Image
                </div>

                {transaction?.image ? (
                    <Image
                        src={`http://localhost:5000/api/v1/uploads/transaction/${transaction.image}`}
                        alt="Transaction receipt"
                        width={800}
                        height={600}
                        className="max-h-[350px] w-auto rounded-md border object-contain"
                    />
                ) : (
                    <p className="text-sm text-gray-500">No image uploaded.</p>
                )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" asChild>
                    <Link href="/dashboard/transaction">Back</Link>
                </Button>

                <Button className="bg-t2m-primary hover:bg-t2m-secondary">
                    <Link href={`/dashboard/transaction/edit/${id}`}>
                        Edit Transaction
                    </Link>
                </Button>
            </div>
        </div>
    );
}