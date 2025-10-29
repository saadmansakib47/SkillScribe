"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function InstructorChart({ selectedMetric }: { selectedMetric: string }) {
  // Demo datasets for all metrics
  const chartData = {
    Followers: [
      { date: "10 May", value: 10000 },
      { date: "11 May", value: 18000 },
      { date: "12 May", value: 9000 },
      { date: "13 May", value: 14000 },
      { date: "14 May", value: 20000 },
      { date: "15 May", value: 11000 },
      { date: "16 May", value: 19000 },
    ],
    Likes: [
      { date: "10 May", value: 6000 },
      { date: "11 May", value: 9000 },
      { date: "12 May", value: 8000 },
      { date: "13 May", value: 12000 },
      { date: "14 May", value: 15000 },
      { date: "15 May", value: 11000 },
      { date: "16 May", value: 17000 },
    ],
    Views: [
      { date: "10 May", value: 12000 },
      { date: "11 May", value: 20000 },
      { date: "12 May", value: 18000 },
      { date: "13 May", value: 24000 },
      { date: "14 May", value: 26000 },
      { date: "15 May", value: 30000 },
      { date: "16 May", value: 35000 },
    ],
    "Watch Time": [
      { date: "10 May", value: 20 },
      { date: "11 May", value: 30 },
      { date: "12 May", value: 25 },
      { date: "13 May", value: 40 },
      { date: "14 May", value: 35 },
      { date: "15 May", value: 45 },
      { date: "16 May", value: 50 },
    ],
  };

  const earningData = [
    { name: "Courses", value: 240 },
    { name: "Bytes", value: 100 },
    { name: "Read", value: 42 },
  ];

  const COLORS = ["#4C6FFF", "#E2B8FF", "#E5E483"];

  const currentData = chartData[selectedMetric] || chartData["Followers"];

  return (
    <>
      {/* Line Chart (Dynamic) */}
      <div className="bg-white p-6 rounded-2xl border mb-6 transition-all duration-500">
        <h2 className="text-gray-700 font-medium mb-4">{selectedMetric}</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4C6FFF"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Earning Pie Chart */}
      <div className="bg-white p-6 rounded-2xl border col-span-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">Earning</h2>
          <button className="text-gray-500 text-sm">This Week</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={earningData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {earningData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center">
            <span className="text-gray-500">Total Earning</span>
            <br />
            <span className="text-2xl font-semibold">$382</span>
          </p>
        </div>
      </div>
    </>
  );
}
