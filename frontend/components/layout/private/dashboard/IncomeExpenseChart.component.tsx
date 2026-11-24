"use client"
import { useApp } from "@/app/context/AppProvider"
import { formatCurrency } from "@/lib/formatCurrency"
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
    const { preferences } = useApp()
    const formatAxisValue = (value: number) => {
        const abs = Math.abs(value)

        let divisor = 1
        let suffix = ""

        if (abs >= 1_000_000_000) {
            divisor = 1_000_000_000
            suffix = "B"
        } else if (abs >= 1_000_000) {
            divisor = 1_000_000
            suffix = "M"
        } else if (abs >= 1_000) {
            divisor = 1_000
            suffix = "K"
        }

        const compactValue = Number((abs / divisor).toFixed(1))

        return `${value < 0 ? "-" : ""}${formatCurrency(compactValue, preferences)}${suffix}`
    }

    const axisColor = preferences.theme === "DARK"
    ? "#CBD5E1"
    : "#6B7280";
    
   if (incomeExpenseData.length <= 0) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
                <div className="text-center px-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border">
                        <BarChart3 className="h-6 w-6 text-muted-foreground" />
                    </div>

                    <h5 className="text-sm font-medium text-foreground">
                        No chart data available
                    </h5>

                    <p className="mt-1 text-sm text-muted-foreground">
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

                    <XAxis
                        dataKey="label"
                        tick={{ fill: axisColor, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tickFormatter={formatAxisValue}
                        width={85}
                        tick={{ fill: axisColor, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        cursor={{
                            fill: preferences.theme === "DARK"
                                ? "rgba(255, 255, 255, 0.04)"
                                : "rgba(0, 0, 0, 0.03)"
                        }}
                        contentStyle={{
                            backgroundColor: preferences.theme === "DARK" ? "#1F2937" : "#FFFFFF",
                            border: `1px solid ${preferences.theme === "DARK" ? "#374151" : "#E5E7EB"}`,
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
                        }}
                        labelStyle={{
                            color: preferences.theme === "DARK" ? "#F9FAFB" : "#111827"
                        }}
                        itemStyle={{
                            color: preferences.theme === "DARK" ? "#F9FAFB" : "#111827"
                        }}
                        formatter={(value, name) => [
                            formatCurrency(Number(value ?? 0), preferences),
                            String(name)
                        ]}
                    />
                    <Legend />

                    <Bar dataKey="income" name="Income" fill="#0891b2" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="expense" name="Expense" fill="#f87171" radius={[0, 0, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}