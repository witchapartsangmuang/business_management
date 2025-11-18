import { ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, CartesianGrid, Legend, Bar, Rectangle, LabelList, LabelProps } from "recharts";
export default function Barchart() {
    const orgProjectCount = [
        { name: "Sale", inspiration: 20, idea: 14, project: 30 },
        { name: "Production", inspiration: 14, idea: 14, project: 35 },
        { name: "Purchase", inspiration: 5, idea: 7, project: 25 },
    ];
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
                data={orgProjectCount}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inspiration" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />}>
                    <LabelList dataKey="inspiration" content={renderCustomizedLabel} />
                </Bar>
                <Bar dataKey="idea" fill="#82ca9d" activeBar={<Rectangle fill="orange" stroke="purple" />}>
                    <LabelList dataKey="idea" content={renderCustomizedLabel} />
                </Bar>
                <Bar dataKey="project" fill="#62ca9d" activeBar={<Rectangle fill="gold" stroke="orange" />}>
                    <LabelList dataKey="project" content={renderCustomizedLabel} />
                </Bar>
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
            </BarChart>
        </ResponsiveContainer>
    )
}