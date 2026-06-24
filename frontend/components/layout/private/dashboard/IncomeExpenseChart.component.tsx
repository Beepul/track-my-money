"use client"
import { BarChart3 } from "lucide-react"
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
type IEChartProps = {
    incomeExpenseData: {
        label: string,
        income: number,
        expense: number 
    }[]
}
export default function IncomeExpenseChart ({incomeExpenseData}: IEChartProps) {
    console.log(incomeExpenseData)
    if(incomeExpenseData.length <= 0){
        return (
            <div className="h-[300px] w-full flex items-center justify-center rounded-lg border border-dashed bg-gray-50">
                <div className="text-center px-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white border">
                        <BarChart3 className="h-6 w-6 text-gray-400" />
                    </div>

                    <h5 className="text-sm font-medium text-t2m-text-primary">
                    No chart data available
                    </h5>

                    <p className="mt-1 text-sm text-t2m-text-secondary">
                    Add income or expense transactions to see your chart.
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeExpenseData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="label" />
                    <YAxis />

                    <Tooltip />
                    <Legend />

                    <Bar dataKey="income" name="Income" fill="#0891b2" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="expense" name="Expense" fill="#f87171" radius={[0, 0, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}