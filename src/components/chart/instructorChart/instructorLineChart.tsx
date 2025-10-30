"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { chartData } from "@/lib/chartData";

export default function InstructorLineChart({
    selectedMetric,
}: {
    selectedMetric: "Followers" | "Likes" | "Views" | "Watch Time";
}) {
    const currentData = chartData[selectedMetric] || chartData["Followers"];

    return (
        <div className="bg-white p-6 rounded-2xl border mb-6 transition-all duration-500">
            <h2 className="text-gray-700 font-medium mb-4">{selectedMetric}</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData}>
                        {/* --- SVG Filter for Shadow --- */}
                        <defs>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
                                {/* Offset the shadow downward */}
                                <feOffset dx="0" dy="4" result="offset" />
                                {/* Blur it softly */}
                                <feGaussianBlur in="offset" stdDeviation="4" result="blur" />
                                {/* Apply color and opacity */}
                                <feFlood floodColor="#094CA4" floodOpacity="1" result="color" />
                                {/* Combine the color and blur */}
                                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                                {/* Merge the original line and shadow (shadow beneath) */}
                                <feMerge>
                                    <feMergeNode in="shadow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>


                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                            }}
                        />

                        {/* --- Main Line with Soft Shadow --- */}
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#4C6FFF"
                            strokeWidth={1}
                            dot={false}
                            filter="url(#shadow)"
                            activeDot={{
                                r: 5,
                                strokeWidth: 5,
                                stroke: "#17e2d1ff",
                                fill: "#4C6FFF",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
