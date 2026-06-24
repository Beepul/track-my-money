"use client"
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, CreditCard } from "lucide-react";
import Image from "next/image";
import ReportTable from "./ReportTable.component";
import printIcon from "@/public/images/print.png";
import csv from "@/public/images/csv.png";
import excel from "@/public/images/excel.png";
import { Transaction } from "@/app/dashboard/transaction/actions";
import { DownloadableReport, GetDownloadableReportDataApi } from "@/app/dashboard/reports/api";
// import { GetDownloadableReportDataApi } from "@/app/dashboard/reports/api";
import * as XLSX from "xlsx"; 
import { useState } from "react";

type ReportSuccessProps = {
    totalIncome: number,
    totalExpense: number,
    netAmount: number,
    totalTransactions: number,
    transactions: Transaction[],
    fromDate: string,
    toDate: string,
    category: string,
    type: string,
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    downloadableReport: DownloadableReport
}

export default function ReportSuccess({ totalIncome, totalExpense, netAmount, totalTransactions, transactions, fromDate, toDate, category, type, meta, downloadableReport }: ReportSuccessProps) {
    const [printData, setPrintData] = useState<any>(null);
    const downloadCSV = () => {
        if(!downloadableReport || !downloadableReport.success || !downloadableReport.data){
            return "Cannot download"
        }
        const summaryRows = [
            ["Summary"],
            [`Detailed income and expense report from ${fromDate} to ${toDate}`],
            ["Selected Category", category === "all" ? category.toUpperCase() : downloadableReport.data.transactions[0].category?.name.toUpperCase()],
            ["Selected Transaction Type", type.toUpperCase()],
            ["Total Income", downloadableReport.data?.summary.totalIncome],
            ["Total Expense", downloadableReport.data?.summary.totalExpense],
            ["Net Amount", downloadableReport.data?.summary.netAmount],
            ["Total Transactions", downloadableReport.data?.summary.totalTransactions],
            [],
        ];
        const transactionRows = [
            ["Transactions"],
            ["Date", "Title", "Category", "Type", "Amount", "Note"],
            ...downloadableReport.data.transactions.map((t: Transaction) => [
            t.date,
            t.title,
            t.category?.name || "Uncategorized",
            t.type,
            t.amount,
            t.note || "",
            ]),
        ];
        const csv = [...summaryRows, ...transactionRows]
            .map((row) => row.map(String).join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `transaction-report-${fromDate}-to-${toDate}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    };
    const downloadExcel = () => {
        if(!downloadableReport || !downloadableReport.success || !downloadableReport.data){
            return "Cannot download"
        }
        const summaryRows = [
            ["Summary"],
            [`Detailed income and expense report from ${fromDate} to ${toDate}`],
            ["Selected Category", category === "all" ? category.toUpperCase() : downloadableReport.data.transactions[0].category?.name.toUpperCase()],
            ["Selected Transaction Type", type.toUpperCase()],
            ["Total Income", downloadableReport.data?.summary.totalIncome],
            ["Total Expense", downloadableReport.data?.summary.totalExpense],
            ["Net Amount", downloadableReport.data?.summary.netAmount],
            ["Total Transactions", downloadableReport.data?.summary.totalTransactions],
            [],
        ];
        const transactionRows = [
            ["Transactions"],
            ["Date", "Title", "Category", "Type", "Amount", "Note"],
            ...downloadableReport.data.transactions.map((t: any) => [
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
        if(!downloadableReport || !downloadableReport.success || !downloadableReport.data){
            return "Cannot download"
        }
        setPrintData(downloadableReport.data);

        setTimeout(() => {
            window.print();
        }, 100);
    };
    return (
        <>
            <div className="mb-6">
                <p className="mb-2 text-sm font-semibold">Quick Downloads</p>
                <div className="flex gap-6">
                    <Button 
                        variant={'outline'} 
                        size={"lg"} 
                        className="cursor-pointer"
                        onClick={downloadExcel}
                        ><Image height={20} width={20} src={excel} alt="excel" /> Export Excel</Button>
                    <Button 
                        variant={'outline'} 
                        size={"lg"} 
                        className="cursor-pointer"
                        onClick={downloadCSV}
                        ><Image height={20} width={20} src={csv} alt="csv" />Export CSV</Button>
                    <Button 
                        variant={'outline'} 
                        size={"lg"} 
                        className="cursor-pointer"
                        onClick={printReport}
                        ><Image height={20} width={20} src={printIcon} alt="print" /> Print / PDF</Button>
                </div>
            </div>
            <div className="mb-6">
                <div className='flex gap-6 mb-6'>
                    <div className="bg-white lg:p-6 p-3 flex gap-4 items-center rounded-lg flex-1 shadow-sm">
                        <span className='bg-t2m-bg-secondary h-12 w-12 flex items-center justify-center rounded-full'>
                            <ArrowUp className='text-t2m-secondary' />
                        </span>
                        <div>
                            <p className='mb-2'>Total Income</p>
                            <h2 className="font-bold text-2xl">${totalIncome}</h2>
                        </div>
                    </div>
                    <div className="bg-white lg:p-6 p-3 flex gap-4 items-center rounded-lg flex-1 shadow-sm">
                        <span className='bg-red-100 h-12 w-12 flex items-center justify-center rounded-full'>
                            <ArrowDown className='text-red-400' />
                        </span>
                        <div>
                            <p className='mb-2'>Total Expenses</p>
                            <h2 className="font-bold text-2xl">${totalExpense}</h2>
                        </div>
                    </div>
                    <div className="bg-white lg:p-6 p-3 flex gap-4 items-center rounded-lg flex-1 shadow-sm">
                        <span className='bg-t2m-bg-primary h-12 w-12 flex items-center justify-center rounded-full'>
                            <CreditCard className='text-t2m-primary' />
                        </span>
                        <div>
                            <p className='mb-2'>Net Savings</p>
                            <h2 className="font-bold text-2xl">${netAmount}</h2>
                        </div>
                    </div>
                    <div className="bg-white lg:p-6 p-3 flex gap-4 items-center rounded-lg flex-1 shadow-sm">
                        <span className='bg-purple-100 h-12 w-12 flex items-center justify-center rounded-full'>
                            <ArrowUpDown className='text-purple-500' />
                        </span>
                        <div>
                            <p className='mb-2'>Transactions</p>
                            <h2 className="font-bold text-2xl">{totalTransactions}</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <ReportTable transactions={transactions} fromDate={fromDate} toDate={toDate} meta={meta} category={category} type={type} />
                </div>
                <div id="report-print-area" className="hidden print:block">
                    {printData && (
                        <div>
                            <h1>Transaction Report</h1>
                            <p>
                                {fromDate} to {toDate}
                            </p>

                            <div>
                                <p>Total Income: ${printData.summary.totalIncome}</p>
                                <p>Total Expense: ${printData.summary.totalExpense}</p>
                                <p>Net Amount: ${printData.summary.netAmount}</p>
                                <p>Total Transactions: {printData.summary.totalTransactions}</p>
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
                                {printData.transactions.map((t: any) => (
                                    <tr key={t.id}>
                                    <td>{new Date(t.date).toLocaleDateString("en-AU")}</td>
                                    <td>{t.title}</td>
                                    <td>{t.category?.name || "Uncategorized"}</td>
                                    <td>{t.type}</td>
                                    <td>${t.amount}</td>
                                    <td>{t.note || "-"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    </div>
            </div>
        </>
    )
} 