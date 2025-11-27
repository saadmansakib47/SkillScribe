import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { MonthlyRevenue } from "@/lib/admin/financialData";

interface RevenueTrendChartProps {
  data: MonthlyRevenue[];
}

export default function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#0047AB] mb-1">Revenue Trend</h2>
        <p className="text-sm text-gray-600">Monthly revenue breakdown for the year</p>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4ADE80]"></div>
          <span className="text-sm text-gray-700">Total Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF9F59]"></div>
          <span className="text-sm text-gray-700">Instructor Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0047AB]"></div>
          <span className="text-sm text-gray-700">Total Platform Revenue</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorInstructor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9F59" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FF9F59" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0047AB" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0047AB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `$${value/1000}K`} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Area 
            type="monotone" 
            dataKey="totalRevenue" 
            stroke="#4ADE80" 
            strokeWidth={3}
            fill="url(#colorTotal)" 
            name="Total Revenue"
          />
          <Area 
            type="monotone" 
            dataKey="instructorPayment" 
            stroke="#FF9F59" 
            strokeWidth={3}
            fill="url(#colorInstructor)" 
            name="Instructor Payment"
          />
          <Area 
            type="monotone" 
            dataKey="platformRevenue" 
            stroke="#0047AB" 
            strokeWidth={3}
            fill="url(#colorPlatform)" 
            name="Platform Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
