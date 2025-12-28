"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
    const [processing, setProcessing] = useState(false);

    if (!instructor && insId) {
        return <div className="p-6">Instructor not found</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
            <UserHeader instructor={instructor} />

            <h2 className="text-[18px] font-bold text-[#094CA4] underline underline-offset-4 mb-3">Payment Summary</h2>
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-0">
                    <SummaryItem label="Total Earned" value={instructor?.totalPaid || "$0.00"} note="3 Courses" />
                    <SummaryItem label="Total Paid" value={instructor?.totalPaid || "$0.00"} note="6 payments" />
                    <SummaryItem label="Amount Due" value={instructor?.totalDue || "$0.00"} note="Pending" />
                    <SummaryItem label="Next Payment" value="15 Dec, 2025" note="In 20 days" />
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-[18px] font-bold text-[#094CA4] underline underline-offset-4 mb-3">Course-wise Earnings</h2>
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

            <h2 className="text-[18px] font-bold text-[#094CA4] underline underline-offset-4 mb-3">Payment History</h2>
            <Card className="rounded-xl border border-gray-300 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-0">

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
                <Button className="px-6 py-2 rounded-xl text-sm bg-white text-black border border-black" onClick={() => {
                    setProcessing(true);
                    setTimeout(() => setProcessing(false), 3000);
                }}>
                    Process Payment
                </Button>
                <Button className="px-6 py-2 rounded-xl text-sm bg-white text-black border border-black" onClick={() => {
                    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Count 1 /Kids [3 0 R] >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT /F1 24 Tf 100 700 Td (Dummy Invoice) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000210 00000 n 
trailer
<< /Root 1 0 R /Size 5 >>
startxref
277
%%EOF`;
                    const blob = new Blob([pdfContent], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "invoice.pdf";
                    a.click();
                    URL.revokeObjectURL(url);
                }}>
                    Download Invoice
                </Button>
            </div>
            {processing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded-lg flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        <span>Processing...</span>
                    </div>
                </div>
            )}
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
