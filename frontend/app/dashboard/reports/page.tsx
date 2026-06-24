import ReportsFormComponent from "@/components/layout/private/reports/ReportsForm.component";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowDown, ArrowRightLeft, ArrowUp, ArrowUpDown, CreditCard } from "lucide-react";
import { getAllCategoryApi } from "../category/api";
import TransactionTable from "@/components/layout/private/transaction/TransactionTable.component";
import ReportTable from "@/components/layout/private/reports/ReportTable.component";
import ReportSuccess from "@/components/layout/private/reports/ReportSuccess.component";
// import GetReportDataApi from "./api";
import { GetDownloadableReportDataApi, GetReportDataApi } from "./api";

type ReportsPageProps = {
    searchParams: Promise<{
        fd?: string;
        td?: string;
        c?: string;
        t?: string;
        page?: string,
        limit?: string,
    }>;
}

export default async function ReportsPage ({searchParams}: ReportsPageProps) {
    const params = await searchParams

    const hasReportParams = params.fd && params.td

    const fromDate = params.fd || "";
    const toDate = params.td || "";
    const category = params.c || "all";
    const type = params.t || "ALL";
    const page = Number(params.page || 1);
    const limit = Number(params.limit || 5);
    
    const categoryList = await getAllCategoryApi()
    
    const reportData = await GetReportDataApi({fromDate, toDate, category, type, page, limit})
    const downloadableReportData = await GetDownloadableReportDataApi({fromDate, toDate, category, type})

    console.log("REPORT", reportData)
    console.log("DOWNLOADABLE::", downloadableReportData)
    return (
         <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="border-b pb-5 mb-5">
                <h2 className="text-2xl font-semibold text-t2m-text-primary">
                    Reports
                </h2>
                <p className="text-sm text-t2m-text-secondary mt-1">
                    Generate and download your transaction statements
                </p>
            </div>
            <div>
                <div className="mb-6">
                    <ReportsFormComponent categoryList={categoryList.data} fromDate={fromDate} toDate={toDate} category={category} type={type}/>
                </div>
                {
                    !hasReportParams ? (
                    <div className="rounded-lg border border-dashed bg-gray-50 p-10 text-center">
                        <p className="font-medium text-t2m-text-primary">
                        Generate a report
                        </p>
                        <p className="text-sm text-t2m-text-secondary mt-1">
                        Select a date range and click Generate Report.
                        </p>
                    </div>
                    ) :
                    (reportData.success && reportData.data) && reportData.data.transactions.length > 0 ? (
                        <ReportSuccess 
                            totalIncome={reportData.data.summary.totalIncome}
                            totalExpense={reportData.data.summary.totalExpense}
                            totalTransactions={reportData.data.summary.totalTransactions}
                            transactions={reportData.data.transactions}
                            netAmount={reportData.data.summary.netAmount}
                            category={category}
                            type={type}
                            fromDate={fromDate}
                            toDate={toDate}
                            meta={reportData.data.meta}
                            downloadableReport={downloadableReportData}
                            />
                    ) : (
                        <div className="rounded-lg border border-dashed bg-gray-50 p-10 text-center">
                            <p className="font-medium text-t2m-text-primary">
                                No transactions found
                            </p>
                            <p className="text-sm text-t2m-text-secondary mt-1">
                                Select a date range and generate a report.
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}