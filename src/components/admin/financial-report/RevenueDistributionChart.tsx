import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface RevenueDistribution {
  name: string;
  value: number;
  color: string;
}

interface RevenueDistributionChartProps {
  data: RevenueDistribution[];
}

export default function RevenueDistributionChart({ data }: RevenueDistributionChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#0047AB] mb-1">Revenue Distribution</h2>
        <p className="text-sm text-gray-600">Platform vs Instructor share</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
