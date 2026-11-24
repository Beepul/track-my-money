"use client"
import { useApp } from "@/app/context/AppProvider"
import { formatCurrency } from "@/lib/formatCurrency"
import { PieChart as PieChartIcon } from "lucide-react"
import { Pie, ResponsiveContainer, PieChart, Cell, Tooltip, Legend, PieSectorShapeProps, Sector} from "recharts"

type ExpenseCatChartProps = {
    data: {
        category: string, 
        amount: number,
        icon: string 
    }[]
}
const COLORS = [
  "#14b8a6",
  "#f87171",
  "#60a5fa",
  "#fbbf24",
  "#a78bfa",
  "#fb923c",
  "#34d399",
];

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};



export default function ExpenseCatChart ({data}: ExpenseCatChartProps) {
    const { preferences } = useApp()
    const renderLegend = () => {
        return (
            <ul className="flex flex-wrap justify-center gap-4 text-sm mt-2">
            {data.map((item, index) => (
                <li key={item.category} className="flex items-center gap-2 capitalize">
                <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-t2m-text-secondary">{item.category}</span>
                </li>
            ))}
            </ul>
        );
    };
   if (data.length <= 0) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
                <div className="text-center px-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border">
                        <PieChartIcon className="h-6 w-6 text-muted-foreground" />
                    </div>

                    <h5 className="text-sm font-medium text-foreground">
                        No expense data available
                    </h5>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Add expense transactions to see your spending breakdown by category.
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        innerRadius={55}
                        paddingAngle={3}
                        shape={MyCustomPie}
                        stroke={preferences.theme === "DARK" ? "#1F2937" : "#FFFFFF"}
                        strokeWidth={2}
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
                                borderRadius: "8px"
                            }}
                            itemStyle={{
                                color: preferences.theme === "DARK" ? "#F9FAFB" : "#111827"
                            }}
                            formatter={(value) => [
                                formatCurrency(Number(value ?? 0), preferences),
                                "Amount"
                            ]}
                        />

                    <Legend content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}