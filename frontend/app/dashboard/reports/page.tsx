
import { Suspense } from "react";
import ReportsFormComponent from "@/components/layout/private/reports/ReportsForm.component";
import ReportSuccess from "@/components/layout/private/reports/ReportSuccess.component";
import { getAllCategoryApi } from "../category/api";
import {
    GetDownloadableReportDataApi,
    GetReportDataApi,
} from "./api";

type ReportsPageProps = {
    searchParams: Promise<{
        fd?: string;
        td?: string;
        c?: string;
        t?: string;
        page?: string;
        limit?: string;
    }>;
};

type ReportResultsProps = {
    fromDate: string;
    toDate: string;
    category: string;
    type: string;
    page: number;
    limit: number;
};

async function ReportResults({
    fromDate,
    toDate,
    category,
    type,
    page,
    limit,
}: ReportResultsProps) {
    const [reportData, downloadableReportData] =
        await Promise.all([
            GetReportDataApi({
                fromDate,
                toDate,
                category,
                type,
                page,
                limit,
            }),
            GetDownloadableReportDataApi({
                fromDate,
                toDate,
                category,
                type,
            }),
        ]);

    if (!reportData.success || !reportData.data) {
        return (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center">
                <p className="font-medium text-foreground">
                    Unable to generate report
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                    Please try again.
                </p>
            </div>
        );
    }

    if (reportData.data.transactions.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center">
                <p className="font-medium text-foreground">
                    No transactions found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                    No transactions match your selected date range and filters.
                </p>
            </div>
        );
    }

    return (
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
    );
}

function ReportResultsSkeleton() {
    const skeleton = "animate-pulse rounded bg-muted-foreground/15";

    return (
        <div className="space-y-5">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-lg border border-border bg-muted/30 p-5"
                    >
                        <div className={`mb-4 h-4 w-24 ${skeleton}`} />
                        <div className={`h-8 w-32 ${skeleton}`} />
                    </div>
                ))}
            </div>

            {/* Report Table */}
            <div className="overflow-hidden rounded-lg border border-border">
                <div className="border-b border-border bg-muted/50 p-4">
                    <div className={`h-5 w-48 ${skeleton}`} />
                </div>

                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 border-b border-border p-4 last:border-0"
                    >
                        <div className={`h-4 flex-1 ${skeleton}`} />
                        <div className={`h-4 flex-1 ${skeleton}`} />
                        <div className={`h-4 flex-1 ${skeleton}`} />
                        <div className={`h-4 w-20 ${skeleton}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default async function ReportsPage({
    searchParams,
}: ReportsPageProps) {
    const params = await searchParams;

    const fromDate = params.fd || "";
    const toDate = params.td || "";
    const category = params.c || "all";
    const type = params.t || "ALL";
    const page = Number(params.page || 1);
    const limit = Number(params.limit || 5);

    const hasReportParams = Boolean(fromDate && toDate);

    const categoryList = await getAllCategoryApi();

    const reportKey = [
        fromDate,
        toDate,
        category,
        type,
        page,
        limit,
    ].join("-");

    return (
        <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
            {/* Header */}
            <div className="mb-5 border-b border-border pb-5">
                <h2 className="text-2xl font-semibold text-t2m-text-primary">
                    Reports
                </h2>

                <p className="mt-1 text-sm text-t2m-text-secondary">
                    Generate and download your transaction statements
                </p>
            </div>

            {/* Filter Form */}
            <div className="mb-6">
                <ReportsFormComponent
                    categoryList={
                        categoryList.success
                            ? categoryList.data
                            : []
                    }
                    fromDate={fromDate}
                    toDate={toDate}
                    category={category}
                    type={type}
                />
            </div>

            {/* Results */}
            {!hasReportParams ? (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center">
                    <p className="font-medium text-foreground">
                        Generate a report
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Select a date range and click Generate Report.
                    </p>
                </div>
            ) : (
                <Suspense
                    key={reportKey}
                    fallback={<ReportResultsSkeleton />}
                >
                    <ReportResults
                        fromDate={fromDate}
                        toDate={toDate}
                        category={category}
                        type={type}
                        page={page}
                        limit={limit}
                    />
                </Suspense>
            )}
        </div>
    );
}
