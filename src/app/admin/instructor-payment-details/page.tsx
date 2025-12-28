"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserHeader } from "@/components/admin/instructor-payment-details/userHeader";
import { SummaryItem } from "@/components/admin/instructor-payment-details/summaryItem";
import { CourseCard } from "@/components/admin/instructor-payment-details/courseCard";
import { HistoryRow } from "@/components/admin/instructor-payment-details/historyRow";
import AdminLayout from "../adminLayout";
import { getInstructorById } from "@/lib/instructors";

function PaymentDetailsContent() {
    const searchParams = useSearchParams();
    const insId = searchParams.get("insId");
    const instructor = insId ? getInstructorById(Number(insId)) : undefined;

    if (!instructor && insId) {
        return <div className="p-6">Instructor not found</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
            <UserHeader instructor={instructor} />

            <Card className="rounded-xl border border-gray-300 shadow-sm">
                <CardContent className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Summary</h2>
                    <SummaryItem label="Total Earned" value={instructor?.totalPaid || "$0.00"} note="3 Courses" />
                    <SummaryItem label="Total Paid" value={instructor?.totalPaid || "$0.00"} note="6 payments" />
                    <SummaryItem label="Pending" value={instructor?.totalDue || "$0.00"} />
                    <SummaryItem label="Next Payment" value="15 Dec, 2025" note="In 28 days" />
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Course-wise Earnings</h2>
                <CourseCard
                    title="Web Development Bootcamp"
                    students={120}
                    rating={4.8}
                    earned="$3,850.00"
                    paid="$2,800.00"
                    due="$1,050.00"
                />
                <CourseCard
                    title="Advanced Python Programming"
                    students={120}
                    rating={4.8}
                    earned="$3,850.00"
                    paid="$2,800.00"
                    due="$1,050.00"
                />
                <CourseCard
                    title="Data Structures & Algorithms"
                    students={120}
                    rating={4.8}
                    earned="$3,850.00"
                    paid="$2,800.00"
                    due="$1,050.00"
                />
            </div>

            <Card className="rounded-xl border border-gray-300 shadow-sm">
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment History</h2>

                    <HistoryRow
                        title="Payment Completed"
                        date="Nov 17, 2025 · TXN-2314-0063"
                        amount="$1,200.00"
                        status="Completed"
                    />
                    <HistoryRow
                        title="Payment Completed"
                        date="Oct 13, 2025 · TXN-2314-0058"
                        amount="$2,800.00"
                        status="Completed"
                    />
                    <HistoryRow
                        title="Payment Completed"
                        date="Aug 09, 2025 · TXN-2314-0052"
                        amount="$1,600.00"
                        status="Completed"
                    />
                    <HistoryRow
                        title="Payment Pending"
                        date="Dec 15, 2025 · TXN-2314-0091"
                        amount="$3,240.00"
                        status="Pending"
                    />
                </CardContent>
            </Card>

            <div className="flex justify-center gap-16 pt-4">
                <Button className="px-6 py-2 rounded-xl text-sm bg-white text-black border border-black">
                    Process Payment
                </Button>
                <Button className="px-6 py-2 rounded-xl text-sm bg-white text-black border border-black">
                    Download Invoice
                </Button>
            </div>
        </div>
    );
}

export default function PaymentsPage() {
    return (
        <AdminLayout>
            <Suspense fallback={<div className="p-6">Loading instructor details...</div>}>
                <PaymentDetailsContent />
            </Suspense>
        </AdminLayout>
    );
}
