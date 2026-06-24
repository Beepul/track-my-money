import DahsboardTrasaction from '@/components/layout/private/dashboard/DashboardTransaction.component';
import { ArrowDown, ArrowUp, CreditCard, Plus } from 'lucide-react';
import Link from 'next/link';
import { GetAllTransactionApi } from './transaction/api';
import { GetDashboardChartsApi, GetDashboardDataApi } from './api';
import IncomeExpenseChart from '@/components/layout/private/dashboard/IncomeExpenseChart.component';
import ExpenseCatChart from '@/components/layout/private/dashboard/ExpenseCatChart.component';

type DashboardPageProps = {
    searchParams: Promise<{period?: string}>
}

export default async function DashboardPage ({searchParams}: DashboardPageProps) {
    const params = await searchParams
    const period = params.period || 'm'

    const transactions = await GetAllTransactionApi({
        page: 1,
        limit: 5
    })

    const dashboardData = await GetDashboardDataApi({period})
    const dashboardCharts = await GetDashboardChartsApi({period})

    return (
        <div>
            <div className='flex gap-6 mb-6'>
                <div className="bg-white lg:p-6 p-3 flex items-center justify-between rounded-lg flex-1 shadow-sm">
                    <div>
                        <p className='mb-2'>Total Income</p>
                        <h2 className="text-t2m-secondary font-bold text-xl">${dashboardData.data?.totalIncome || 0}</h2>
                    </div>
                    <span className='bg-t2m-bg-secondary h-12 w-12 flex items-center justify-center rounded-full'>
                        <ArrowUp className='text-t2m-secondary'/>
                    </span>
                </div>
                <div className="bg-white lg:p-6 p-3 flex items-center justify-between rounded-lg flex-1 shadow-sm">
                    <div>
                        <p className='mb-2'>Total Expenses</p>
                        <h2 className="text-red-400 font-bold text-xl">${dashboardData.data?.totalExpense || 0}</h2>
                    </div>
                    <span className='bg-red-100 h-12 w-12 flex items-center justify-center rounded-full'>
                        <ArrowDown className='text-red-400'/>
                    </span>
                </div>
                <div className="bg-white lg:p-6 p-3 flex items-center justify-between rounded-lg flex-1 shadow-sm">
                    <div>
                        <p className='mb-2'>Balance</p>
                        <h2 className="text-t2m-primary font-bold text-xl">${dashboardData.data?.balance || 0}</h2>
                    </div>
                    <span className='bg-t2m-bg-primary h-12 w-12 flex items-center justify-center rounded-full'>
                        <CreditCard className='text-t2m-primary'/>
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <div className='bg-white flex-1 lg:p-6 p-3 rounded-lg mb-6 shadow-sm'>
                    <h4 className='font-semibold text-xl text-t2m-text-primary mb-4'>Income vs Expenses</h4>
                    <IncomeExpenseChart incomeExpenseData={dashboardCharts.data?.incomeExpenseChart || []}/>
                </div>
                <div className='bg-white flex-1 lg:p-6 p-3 rounded-lg mb-6 shadow-sm'>
                    <h4 className='font-semibold text-xl text-t2m-text-primary mb-4'>Expense Category</h4>
                    <ExpenseCatChart data={dashboardCharts.data?.expenseByCategory || []}/>
                </div>
            </div>
            <DahsboardTrasaction transactionList={transactions.data}/>
        </div>
    )
}