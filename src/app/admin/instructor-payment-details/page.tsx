import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Avatar section
function UserHeader() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <img
        src="/avatar.png"
        alt="User Avatar"
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Karim Kabir</h2>
        <p className="text-sm text-gray-500">ID: 125-101</p>
      </div>
      <div className="ml-auto text-sm text-gray-600">
        <p>karimkabir@skillscribe.com</p>
        <p>+01725698799</p>
      </div>
    </div>
  );
}

// Summary box row item
function SummaryItem({ label, value, note }: any) {
  return (
    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
      <span className="text-gray-600 text-sm font-medium">{label}</span>
      <div className="text-right">
        <p className="font-semibold text-gray-800">{value}</p>
        {note && <p className="text-xs text-gray-500">{note}</p>}
      </div>
    </div>
  );
}

// Course Card
function CourseCard({ title, students, rating, earned, paid, due }: any) {
  return (
    <Card className="border border-gray-300 rounded-xl shadow-sm bg-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-md" />
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500">
              Students: {students} · Rating: {rating} · Started in Jan 24, 2024
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-xs text-gray-500">Total Earned</p>
            <p className="font-semibold text-gray-700">{earned}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-xs text-gray-500">Total Paid</p>
            <p className="font-semibold text-gray-700">{paid}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-xs text-gray-500">Amount Due</p>
            <p className="font-semibold text-gray-700">{due}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Payment History Item
function HistoryRow({ title, date, amount, status }: any) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
      <div>
        <p className="font-medium text-gray-700">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <p className="font-semibold text-gray-700">{amount}</p>
      <p className={`text-xs ${status === "Pending" ? "text-red-500" : "text-green-600"}`}>
        {status}
      </p>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <UserHeader />

      {/* Payment Summary */}
      <Card className="rounded-xl border border-gray-300 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Summary</h2>
          <SummaryItem label="Total Earned" value="$12,450.00" note="3 Courses" />
          <SummaryItem label="Total Paid" value="$9,200.00" note="6 payments" />
          <SummaryItem label="Pending" value="$3,240.00" />
          <SummaryItem label="Next Payment" value="15 Dec, 2025" note="In 28 days" />
        </CardContent>
      </Card>

      {/* Course Earnings */}
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

      {/* Payment History */}
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

      <div className="flex justify-center gap-4 pt-4">
        <Button className="px-6 py-2 rounded-xl text-sm bg-slate-800 text-white">
          Process Payment
        </Button>
        <Button className="px-6 py-2 rounded-xl text-sm bg-gray-200 text-gray-700 border border-gray-300">
          Download Invoice
        </Button>
      </div>
    </div>
  );
}
