import { ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, CartesianGrid, Legend, Bar, LabelList, LabelProps } from "recharts";
export default function Barchart({ dataKey, barDetailList, data }: { dataKey: string, barDetailList: { dataKey: string, fill: string }[], data: any[] }) {
    const style = {
        bottom: '0%',
        right: '0%',
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };
    const renderCustomizedLabel = (props: LabelProps) => {
        const { x, y, width, value } = props;
        console.log("val", value);

        if (x == null || y == null || width == null) {
            return null;
        }
        const radius = 10;

        return (
            <g>
                {/* <circle cx={Number(x) + Number(width) / 2} cy={Number(y) - radius} r={radius} fill="#8884d8" /> */}
                <text
                    x={Number(x) + Number(width) / 2}
                    y={Number(y) - radius}
                    fill="#000000"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {/* {String(value).split(' ')[1]} */}
                    {value}
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%" className="bg-[#ffffff] rounded-lg">
            <BarChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dataKey} />
                <YAxis />
                <Tooltip />
                {barDetailList.map((bar, index) => (
                    <Bar key={`${index}-${bar.dataKey}`} dataKey={bar.dataKey} fill={bar.fill}>
                        <LabelList dataKey={bar.dataKey} content={renderCustomizedLabel} />
                    </Bar>
                ))}
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
            </BarChart>
        </ResponsiveContainer>
    )
}