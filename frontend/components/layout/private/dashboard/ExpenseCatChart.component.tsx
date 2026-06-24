"use client"
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
    if(data.length <= 0){
        return (
            <div className="h-[300px] w-full flex items-center justify-center rounded-lg border border-dashed bg-gray-50">
                <div className="text-center px-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white border">
                        <PieChartIcon className="h-6 w-6 text-gray-400" />
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
                    />
                        {/* {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                        ))} */}
                    {/* </Pie> */}

                    <Tooltip
                        formatter={(value) => [`$${value}`, "Amount"]}
                    />

                    <Legend content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}