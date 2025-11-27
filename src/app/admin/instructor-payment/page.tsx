"use client";

import React, { useState } from "react";
import { StatCard } from "@/components/admin/instructor-payment/statCard";
import { SortDropdown } from "@/components/admin/instructor-payment/sortDropDown";
import { InstructorTable } from "@/components/admin/instructor-payment/instructorTable";
import { SearchBar } from "@/components/ui/searchBar";
import AdminLayout from "../adminLayout";
import { PaymentDropdown } from "@/components/admin/instructor-payment/paymentDropDown";

import { INSTRUCTORS, Instructor } from "@/lib/instructors";

export default function InstructorDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedInstructors, setSortedInstructors] = useState<Instructor[]>(INSTRUCTORS);

  // Filter instructors based on search term
  const filteredInstructors = sortedInstructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name or email..."
          />

          <div className="flex gap-4 items-center">
            <PaymentDropdown />
            <SortDropdown instructors={INSTRUCTORS} onSorted={setSortedInstructors} />
          </div>
        </div>

        {/* Table */}
        <InstructorTable instructors={filteredInstructors} />
      </div>
    </AdminLayout>
  );
}
