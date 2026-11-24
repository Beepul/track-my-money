
"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, CreditCard } from "lucide-react";
import Image from "next/image";
import ReportTable from "./ReportTable.component";
import printIcon from "@/public/images/print.png";
import csvIcon from "@/public/images/csv.png";
import excelIcon from "@/public/images/excel.png";
import { Transaction } from "@/app/dashboard/transaction/actions";
import { DownloadableReport } from "@/app/dashboard/reports/api";
import { useApp } from "@/app/context/AppProvider";
import { formatCurrency } from "@/lib/formatCurrency";
import * as XLSX from "xlsx";
import { useState } from "react";

type ReportSuccessProps = {
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    totalTransactions: number;
    transactions: Transaction[];
    fromDate: string;
    toDate: string;
    category: string;
    type: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    downloadableReport: DownloadableReport;
};

export default function ReportSuccess({
    totalIncome,
    totalExpense,
    netAmount,
    totalTransactions,
    transactions,
    fromDate,
    toDate,
    category,
    type,
    meta,
    downloadableReport,
}: ReportSuccessProps) {

    const { preferences } = useApp();
    const [printData, setPrintData] = useState<DownloadableReport["data"] | null>(null);

    const downloadCSV = () => {
        if (!downloadableReport?.success || !downloadableReport.data) {
            return;
        }

        const report = downloadableReport.data;

        const selectedCategory =
            category === "all"
                ? "ALL"
                : report.transactions[0]?.category?.name?.toUpperCase() || category;

        const summaryRows = [
            ["Summary"],
            [`Detailed income and expense report from ${fromDate} to ${toDate}`],
            ["Selected Category", selectedCategory],
            ["Selected Transaction Type", type.toUpperCase()],
            ["Total Income", report.summary.totalIncome],
            ["Total Expense", report.summary.totalExpense],
            ["Net Amount", report.summary.netAmount],
            ["Total Transactions", report.summary.totalTransactions],
            [],
        ];

        const transactionRows = [
            ["Transactions"],
            ["Date", "Title", "Category", "Type", "Amount", "Note"],
            ...report.transactions.map((t: Transaction) => [
                t.date,
                t.title,
                t.category?.name || "Uncategorized",
                t.type,
                t.amount,
                t.note || "",
            ]),
        ];

        const csv = [...summaryRows, ...transactionRows]
            .map((row) =>
                row
                    .map((value) => {
                        const text = String(value ?? "");
                        return `"${text.replace(/"/g, '""')}"`;
                    })
                    .join(",")
            )
            .join("\r\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `transaction-report-${fromDate}-to-${toDate}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    };

    const downloadExcel = () => {
        if (!downloadableReport?.success || !downloadableReport.data) {
            return;
        }

        const report = downloadableReport.data;

        const selectedCategory =
            category === "all"
                ? "ALL"
                : report.transactions[0]?.category?.name?.toUpperCase() || category;

        const summaryRows = [
            ["Summary"],
            [`Detailed income and expense report from ${fromDate} to ${toDate}`],
            ["Selected Category", selectedCategory],
            ["Selected Transaction Type", type.toUpperCase()],
            ["Total Income", report.summary.totalIncome],
            ["Total Expense", report.summary.totalExpense],
            ["Net Amount", report.summary.netAmount],
            ["Total Transactions", report.summary.totalTransactions],
            [],
        ];

        const transactionRows = [
            ["Transactions"],
            ["Date", "Title", "Category", "Type", "Amount", "Note"],
            ...report.transactions.map((t: Transaction) => [
                new Date(t.date).toLocaleDateString("en-AU"),
                t.title,
                t.category?.name || "Uncategorized",
                t.type,
                t.amount,
                t.note || "",
            ]),
        ];

        const worksheet = XLSX.utils.aoa_to_sheet([
            ...summaryRows,
            ...transactionRows,
        ]);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        XLSX.writeFile(
            workbook,
            `transaction-report-${fromDate}-to-${toDate}.xlsx`
        );
    };

    const printReport = () => {
        if (!downloadableReport?.success || !downloadableReport.data) {
            return;
        }

        setPrintData(downloadableReport.data);

        setTimeout(() => {
            window.print();
        }, 100);
    };

    const summaryCards = [
        {
            title: "Total Income",
            value: formatCurrency(totalIncome, preferences),
            icon: ArrowUp,
            bgColor: "bg-t2m-bg-secondary",
            iconColor: "text-t2m-secondary",
        },
        {
            title: "Total Expenses",
            value: formatCurrency(totalExpense, preferences),
            icon: ArrowDown,
            bgColor: "bg-red-100 dark:bg-red-950/40",
            iconColor: "text-red-500 dark:text-red-400",
        },
        {
            title: "Net Savings",
            value: formatCurrency(netAmount, preferences),
            icon: CreditCard,
            bgColor: "bg-t2m-bg-primary",
            iconColor: "text-t2m-primary",
        },
        {
            title: "Transactions",
            value: totalTransactions.toLocaleString(),
            icon: ArrowUpDown,
            bgColor: "bg-purple-100 dark:bg-purple-950/40",
            iconColor: "text-purple-500 dark:text-purple-400",
        },
    ];

    return (
        <>
            {/* Quick Downloads */}
            <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-t2m-text-primary">
                    Quick Downloads
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-6">
                    <Button
                        variant="outline"
                        size="lg"
                        className="cursor-pointer bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={downloadExcel}
                    >
                        <Image
                            height={20}
                            width={20}
                            src={excelIcon}
                            alt="Excel"
                        />
                        Export Excel
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="cursor-pointer bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={downloadCSV}
                    >
                        <Image
                            height={20}
                            width={20}
                            src={csvIcon}
                            alt="CSV"
                        />
                        Export CSV
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="cursor-pointer bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={printReport}
                    >
                        <Image
                            height={20}
                            width={20}
                            src={printIcon}
                            alt="Print"
                        />
                        Print / PDF
                    </Button>
                </div>
            </div>

            {/* Report Summary */}
            <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                    {summaryCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="bg-card text-card-foreground border border-border lg:p-6 p-4 flex gap-4 items-center rounded-lg shadow-sm"
                            >
                                <span
                                    className={`${card.bgColor} h-12 w-12 shrink-0 flex items-center justify-center rounded-full`}
                                >
                                    <Icon className={card.iconColor} size={22} />
                                </span>

                                <div className="min-w-0">
                                    <p className="mb-2 text-sm text-t2m-text-secondary">
                                        {card.title}
                                    </p>

                                    <h2 className="font-bold text-xl lg:text-2xl text-t2m-text-primary break-words">
                                        {card.value}
                                    </h2>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Report Table */}
                <div>
                    <ReportTable
                        transactions={transactions}
                        fromDate={fromDate}
                        toDate={toDate}
                        meta={meta}
                        category={category}
                        type={type}
                    />
                </div>
            </div>

            {/* Print / PDF Content */}
            <div
                id="report-print-area"
                className="hidden print:block print:bg-white print:text-black"
            >
                {printData && (
                    <div className="print:text-black">
                        <h1>Transaction Report</h1>

                        <p>
                            {fromDate} to {toDate}
                        </p>

                        <div>
                            <p>
                                Total Income: {formatCurrency(printData.summary.totalIncome, preferences)}
                            </p>
                            <p>
                                Total Expense: {formatCurrency(printData.summary.totalExpense, preferences)}
                            </p>
                            <p>
                                Net Amount: {formatCurrency(printData.summary.netAmount, preferences)}
                            </p>
                            <p>
                                Total Transactions: {printData.summary.totalTransactions}
                            </p>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Note</th>
                                </tr>
                            </thead>

                            <tbody>
                                {printData.transactions.map((t: Transaction) => (
                                    <tr key={t.id}>
                                        <td>
                                            {new Date(t.date).toLocaleDateString("en-AU")}
                                        </td>
                                        <td>{t.title}</td>
                                        <td>{t.category?.name || "Uncategorized"}</td>
                                        <td>{t.type}</td>
                                        <td>{formatCurrency(t.amount, preferences)}</td>
                                        <td>{t.note || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
