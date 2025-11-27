"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/admin/instructor-payment/statCard";
import { SortDropdown } from "@/components/admin/instructor-payment/sortDropDown";
import { InstructorTable } from "@/components/admin/instructor-payment/instructorTable";
import AdminLayout from "../adminLayout";
import { PaymentDropdown } from "@/components/admin/instructor-payment/paymentDropDown";

// Import real data
import { INSTRUCTORS } from "@/lib/instructors";

export default function InstructorDashboardPage() {
  return (
    <AdminLayout>
      <div className="w-full p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Instructor" value={INSTRUCTORS.length.toString()} />
          <StatCard label="Total Earning" value="$248,450" />
          <StatCard label="Pending Payments" value="45" />
          <StatCard label="Paid this month" value="$205,000" />
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-center">
          <Input
            placeholder="Search by name or email..."
            className="w-full lg:w-1/3 rounded-xl border border-black/20"
          />

          <div className="flex gap-4 items-center">
            <PaymentDropdown />
            <SortDropdown />
          </div>
        </div>

        {/* Table */}
        <InstructorTable instructors={INSTRUCTORS} />
      </div>
    </AdminLayout>
  );
}
