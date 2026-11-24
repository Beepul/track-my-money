
import DahsboardTrasaction from '@/components/layout/private/dashboard/DashboardTransaction.component';
import { ArrowDown, ArrowUp, CreditCard } from 'lucide-react';
import { GetAllTransactionApi } from './transaction/api';
import { GetDashboardChartsApi, GetDashboardDataApi, GetUserPreferenceApi } from './api';
import IncomeExpenseChart from '@/components/layout/private/dashboard/IncomeExpenseChart.component';
import ExpenseCatChart from '@/components/layout/private/dashboard/ExpenseCatChart.component';
import { formatCurrency } from '@/lib/formatCurrency';

type DashboardPageProps = {
    searchParams: Promise<{ period?: string }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
    const params = await searchParams;

    const preferenceResponse = await GetUserPreferenceApi();

    if (!preferenceResponse.success || !preferenceResponse.data) {
        return <p>Failed to load preferences</p>;
    }

    const preferences = preferenceResponse.data;

    const periodMap = {
        WEEKLY: "w",
        MONTHLY: "m",
        YEARLY: "y"
    } as const;

    const period =
        params.period === "w" ||
        params.period === "m" ||
        params.period === "y"
            ? params.period
            : periodMap[preferences.defaultPeriod];

    const [transactions, dashboardData, dashboardCharts] = await Promise.all([
        GetAllTransactionApi({
            page: 1,
            limit: preferences.recentTransactionCount
        }),
        GetDashboardDataApi({ period }),
        GetDashboardChartsApi({ period })
    ]);

    const cardClass = "bg-card text-card-foreground border border-border rounded-lg shadow-sm";

    return (
        <div>
            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                {/* Total Income */}
                <div className={`${cardClass} lg:p-6 p-4 flex items-center justify-between`}>
                    <div>
                        <p className="mb-2 text-sm text-muted-foreground">
                            Total Income
                        </p>
                        <h2 className="text-t2m-secondary font-bold text-xl">
                            {formatCurrency(dashboardData.data?.totalIncome ?? 0, preferences)}
                        </h2>
                    </div>

                    <span className="bg-t2m-bg-secondary h-12 w-12 shrink-0 flex items-center justify-center rounded-full">
                        <ArrowUp className="text-t2m-secondary" />
                    </span>
                </div>

                {/* Total Expenses */}
                <div className={`${cardClass} lg:p-6 p-4 flex items-center justify-between`}>
                    <div>
                        <p className="mb-2 text-sm text-muted-foreground">
                            Total Expenses
                        </p>
                        <h2 className="text-red-500 dark:text-red-400 font-bold text-xl">
                            {formatCurrency(dashboardData.data?.totalExpense ?? 0, preferences)}
                        </h2>
                    </div>

                    <span className="bg-red-100 dark:bg-red-950/50 h-12 w-12 shrink-0 flex items-center justify-center rounded-full">
                        <ArrowDown className="text-red-500 dark:text-red-400" />
                    </span>
                </div>

                {/* Balance */}
                <div className={`${cardClass} lg:p-6 p-4 flex items-center justify-between`}>
                    <div>
                        <p className="mb-2 text-sm text-muted-foreground">
                            Balance
                        </p>
                        <h2 className="text-t2m-primary font-bold text-xl">
                            {formatCurrency(dashboardData.data?.balance ?? 0, preferences)}
                        </h2>
                    </div>

                    <span className="bg-t2m-bg-primary h-12 w-12 shrink-0 flex items-center justify-center rounded-full">
                        <CreditCard className="text-t2m-primary" />
                    </span>
                </div>
            </div>

            {/* Dashboard Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

                {/* Income vs Expenses */}
                <div className={`${cardClass} lg:p-6 p-4 min-w-0`}>
                    <h4 className="font-semibold text-xl text-card-foreground mb-4">
                        Income vs Expenses
                    </h4>

                    <IncomeExpenseChart
                        incomeExpenseData={
                            dashboardCharts.data?.incomeExpenseChart || []
                        }
                    />
                </div>

                {/* Expense Category */}
                <div className={`${cardClass} lg:p-6 p-4 min-w-0`}>
                    <h4 className="font-semibold text-xl text-card-foreground mb-4">
                        Expense Category
                    </h4>

                    <ExpenseCatChart
                        data={
                            dashboardCharts.data?.expenseByCategory || []
                        }
                    />
                </div>
            </div>

            {/* Recent Transactions */}
            <DahsboardTrasaction
                transactionList={transactions.data}
            />
        </div>
    );
}
