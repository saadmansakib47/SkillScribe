import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import AdminLayout from "../adminLayout";

// Mock data
const instructors = Array.from({ length: 10 }).map((_, i) => ({
    id: 100 + i,
    name: "Karim Kabir",
    email: "karikabir@skillscribe.com",
    courses: 5,
    totalPaid: "$9,200",
    totalDue: "$3,420",
    avatar: "/avatar.png",
}));

export default function InstructorDashboardPage() {
    return (
        <AdminLayout>
            <div className="w-full p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
                {/* Top Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total Instructor", value: "120" },
                        { label: "Total Earning", value: "$248,450" },
                        { label: "Pending Payments", value: "45" },
                        { label: "Paid this month", value: "$205,000" },
                    ].map((stat, i) => (
                        <Card
                            key={i}
                            className="shadow-sm rounded-xl border border-black/10 bg-white"
                        >
                            <CardContent className="p-4 flex flex-col gap-1">
                                <span className="text-sm text-gray-600">{stat.label}</span>
                                <span className="text-2xl font-semibold">{stat.value}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 items-center">
                    <Input
                        placeholder="Search by name or email..."
                        className="w-full lg:w-1/3 rounded-xl border border-black/20"
                    />

                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                            {['All', 'Has Due', 'Fully Paid', 'Partial Paid'].map((t) => (
                                <Button
                                    key={t}
                                    variant="outline"
                                    className="rounded-xl border border-black/20 text-sm"
                                >
                                    {t}
                                </Button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm">Sort By:</span>
                            <Button
                                variant="outline"
                                className="rounded-xl border border-black/20 flex items-center gap-1 text-sm"
                            >
                                Highest Due <ChevronDown size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-black/10 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-black/10 text-lg font-semibold">
                        Instructor List
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-[#F1F5F9] text-gray-700">
                                <th className="p-3">Instructor Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Courses</th>
                                <th className="p-3">Total Paid</th>
                                <th className="p-3">Total Due</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructors.map((ins, i) => (
                                <tr key={i} className="border-b border-black/10 hover:bg-gray-50">
                                    <td className="p-3 flex items-center gap-3">
                                        <img
                                            src={ins.avatar}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="font-medium">{ins.name}</div>
                                            <div className="text-xs text-gray-500">ID: {ins.id}</div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-gray-700">{ins.email}</td>
                                    <td className="p-3">{ins.courses}</td>
                                    <td className="p-3 text-green-600 font-medium">{ins.totalPaid}</td>
                                    <td className="p-3 text-red-500 font-medium">{ins.totalDue}</td>
                                    <td className="p-3">
                                        <button className="text-blue-600 hover:underline text-sm">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}