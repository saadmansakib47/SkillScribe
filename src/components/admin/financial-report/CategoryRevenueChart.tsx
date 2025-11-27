import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface CategoryData {
  category: string;
  revenue: number;
}

interface CategoryRevenueChartProps {
  data?: CategoryData[];
}

// Calculate total revenue by category and sort from high to low
const getCategoryTotals = (): CategoryData[] => {
  return [
    { category: "Programming", revenue: 35000 },
    { category: "Data Science", revenue: 32000 },
    { category: "Web Dev", revenue: 27000 },
    { category: "Design", revenue: 23000 },
    { category: "Advanced English", revenue: 21000 },
    { category: "Photography", revenue: 20000 },
  ].sort((a, b) => b.revenue - a.revenue);
};

// Define colors for each bar
const COLORS = ["#10B981", "#F97316", "#3B82F6", "#F472B6", "#A855F7", "#06B6D4"];

export default function CategoryRevenueChart({ data }: CategoryRevenueChartProps) {
  const categoryData = data || getCategoryTotals();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#0047AB] mb-1">Revenue By Category</h2>
        <p className="text-sm text-gray-600">Course category performance</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={categoryData} barSize={60}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis 
            dataKey="category" 
            stroke="#6B7280" 
            style={{ fontSize: '12px' }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280" 
            style={{ fontSize: '12px' }} 
            tickFormatter={(value) => `$${value/1000}K`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar 
            dataKey="revenue" 
            radius={[8, 8, 0, 0]}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
