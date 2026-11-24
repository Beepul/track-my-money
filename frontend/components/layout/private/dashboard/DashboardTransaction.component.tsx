
"use client"

import { useApp } from "@/app/context/AppProvider";
import { Transaction } from "@/app/dashboard/transaction/actions";
import { formatCurrency } from "@/lib/formatCurrency";
import { ArrowDown, Plus } from "lucide-react";
import Link from "next/link";

type DashboardTransaction = {
    transactionList: Transaction[]
}

function formatDate(date: string) {
    const inputDate = new Date(date);

    if (inputDate.toDateString() === new Date().toDateString()) {
        return "Today";
    }

    return inputDate.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function DahsboardTrasaction({ transactionList }: DashboardTransaction) {
    const { preferences } = useApp();

    return (
        <section>
            <div className="bg-card text-card-foreground border border-border rounded-lg lg:p-6 p-3 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h4 className="font-semibold text-xl text-t2m-text-primary">
                        Recent Transactions
                    </h4>

                    <Link
                        href="/dashboard/transaction"
                        className="text-t2m-primary hover:underline transition-colors"
                    >
                        View All
                    </Link>
                </div>

                <div>
                    <ul>
                        {transactionList.map((transaction, i) => (
                            <li key={transaction.id}>
                                <Link
                                    href={`/dashboard/transaction/${transaction.id}`}
                                    className={`flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-accent ${
                                        i === transactionList.length - 1
                                            ? ""
                                            : "border-b border-border"
                                    }`}
                                >
                                    <div className="flex items-center min-w-0">
                                        <span
                                            className={`${
                                                transaction.type === "EXPENSE"
                                                    ? "bg-red-100 dark:bg-red-950/50"
                                                    : "bg-t2m-bg-secondary"
                                            } h-12 w-12 shrink-0 flex items-center justify-center rounded-full mr-4`}
                                        >
                                            {transaction.type === "EXPENSE" ? (
                                                <ArrowDown className="text-red-500 dark:text-red-400" />
                                            ) : (
                                                <Plus className="text-t2m-secondary" />
                                            )}
                                        </span>

                                        <div className="min-w-0">
                                            <h6 className="text-t2m-text-primary capitalize font-medium truncate">
                                                {transaction.title}
                                            </h6>

                                            <p className="text-sm text-t2m-text-secondary">
                                                <span className="capitalize">
                                                    {transaction.type.toLowerCase()}
                                                </span>
                                                {" • "}
                                                <span>{formatDate(transaction.date)}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <p
                                        className={`text-lg font-medium shrink-0 ${
                                            transaction.type === "EXPENSE"
                                                ? "text-red-500 dark:text-red-400"
                                                : "text-t2m-secondary"
                                        }`}
                                    >
                                        {transaction.type === "EXPENSE" ? "-" : "+"}
                                        {formatCurrency(Math.abs(transaction.amount), preferences)}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
