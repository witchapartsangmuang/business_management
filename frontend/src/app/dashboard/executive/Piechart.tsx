"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
export default function Piechart() {
    const mdPolicyCount = [
        { name: "Sales Revenue", value: 20 },
        { name: "Production Volume", value: 20 },
        { name: "Cost Reduction", value: 20 }
    ]
    const RADIAN = Math.PI / 180;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const renderCustomizedLabel = (object: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } = object
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${payload.name} ${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };
    const style = {
        bottom: '0%',
        right: '0%',
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };
    return (
        <ResponsiveContainer width="100%" height="100%" className="bg-[#ffffff] rounded-lg">
            <PieChart>
                <Pie
                    data={mdPolicyCount}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {mdPolicyCount.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
            </PieChart>
        </ResponsiveContainer>
    )
}