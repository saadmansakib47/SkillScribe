"use client";

import { useState } from "react";
import AdminLayout from "@/app/admin/adminLayout";
import {
  monthlyRevenueData,
  courseRevenueData,
  timeFilters,
  categoryFilters,
  instructorFilters,
  revenueTypeFilters,
  getTotalRevenue,
  getTotalInstructorPayments,
  getTotalPlatformRevenue,
  getNetProfit,
} from "@/lib/admin/financialData";
import FilterDropdown from "@/components/admin/financial-report/FilterDropdown";
import FinancialCard from "@/components/admin/financial-report/FinancialCard";
import RevenueTrendChart from "@/components/admin/financial-report/RevenueTrendChart";
import RevenueDistributionChart from "@/components/admin/financial-report/RevenueDistributionChart";
import TopCoursesTable from "@/components/admin/financial-report/TopCoursesTable";
import CourseRevenueTable from "@/components/admin/financial-report/CourseRevenueTable";
import CategoryRevenueChart from "@/components/admin/financial-report/CategoryRevenueChart";

export default function FinancialReportPage() {
  const [timePeriod, setTimePeriod] = useState("this-month");
  const [category, setCategory] = useState("all");
  const [instructor, setInstructor] = useState("all");
  const [revenueType, setRevenueType] = useState("all");

  const totalRevenue = getTotalRevenue();
  const instructorPayments = getTotalInstructorPayments();
  const platformRevenue = getTotalPlatformRevenue();
  const netProfit = getNetProfit();

  // Pie chart data for revenue distribution
  const revenueDistributionData = [
    { name: "Platform Share (40%)", value: 40, color: "#0047AB" },
    { name: "Instructor Share (60%)", value: 60, color: "#FF9F59" },
  ];

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-[#FAF7F3]">
        <main className="flex-1 p-8">

          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900">Filter Reports</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FilterDropdown
                label="Time Period"
                options={timeFilters}
                value={timePeriod}
                onChange={setTimePeriod}
              />
              <FilterDropdown
                label="Course Category"
                options={categoryFilters}
                value={category}
                onChange={setCategory}
              />
              <FilterDropdown
                label="Instructor"
                options={instructorFilters}
                value={instructor}
                onChange={setInstructor}
              />
              <FilterDropdown
                label="Revenue"
                options={revenueTypeFilters}
                value={revenueType}
                onChange={setRevenueType}
              />
            </div>
          </div>

          {/* Key Financial Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <FinancialCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Total Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              color="text-green-600"
              bgColor="bg-green-50"
            />
            <FinancialCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Instructor Payments"
              value={`$${instructorPayments.toLocaleString()}`}
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
            <FinancialCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              label="Platform Revenue"
              value={`$${platformRevenue.toLocaleString()}`}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <FinancialCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              label="Net Profit"
              value={`$${netProfit.toLocaleString()}`}
              color="text-purple-600"
              bgColor="bg-purple-50"
            />
          </div>

          {/* Revenue Trend Chart */}
          <RevenueTrendChart data={monthlyRevenueData} />

          {/* Revenue Distribution and Course Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <RevenueDistributionChart data={revenueDistributionData} />
            <TopCoursesTable courses={courseRevenueData} />
          </div>

          {/* Complete Course Revenue Breakdown Table */}
          <CourseRevenueTable courses={courseRevenueData} />

          {/* Revenue by Category Chart */}
          <CategoryRevenueChart />
        </main>
      </div>
    </AdminLayout>
  );
}
