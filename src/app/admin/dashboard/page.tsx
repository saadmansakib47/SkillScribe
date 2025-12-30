"use client";

import { useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Search,
} from "lucide-react";

import AdminLayout from "@/app/admin/adminLayout";
import AdminLineChart from "@/components/chart/adminChart/adminLineChart";
import AdminPieChart from "@/components/chart/adminChart/adminPiChart";

import RangeSelector from "@/components/chart/instructorChart/rangeSelector";
import UserStatsTable from "@/components/admin/user-management/userStatsTable";

// ---------- TYPES ----------
type UserMetric = "New Users" | "Active Users" | "Suspended Users";
type InstructorMetric = "New Applications" | "Approved" | "Rejected";

export default function AdminDashboard() {
  const [selectedRange, setSelectedRange] = useState<"7d" | "14d" | "30d" | "90d">("7d");

  const [selectedMetric, setSelectedMetric] = useState<
    UserMetric | InstructorMetric
  >("New Users");

  // ---------------------------------------
  // MAP ADMIN METRICS → PIE CHART VARIANTS
  // ---------------------------------------
  const pieMetric =
    selectedMetric === "New Users" ||
      selectedMetric === "Active Users" ||
      selectedMetric === "Suspended Users"
      ? "users"
      : selectedMetric === "New Applications" ||
        selectedMetric === "Approved" ||
        selectedMetric === "Rejected"
        ? "instructors"
        : "categories"; // fallback



  return (
    <AdminLayout>
      {/* ---------------------------------- */}
      {/*          TOP SEARCH BAR            */}
      {/* ---------------------------------- */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            placeholder="Search users, instructors, reports..."
            className="w-full px-10 py-2 border rounded-full focus:outline-none"
          />
        </div>
      </div>

      {/* ---------------------------------- */}
      {/*          RANGE SELECTOR            */}
      {/* ---------------------------------- */}
      <RangeSelector
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />

      {/* ---------------------------------- */}
      {/*      USER MANAGEMENT STAT CARDS    */}
      {/* ---------------------------------- */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3">User Overview</h2>

        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value="1000"
            icon={<Users className="w-6 h-6" />}
            href="/admin/user-management"
            onClick={() => setSelectedMetric("New Users")}
          />
          <StatCard
            title="Active Users"
            value="887"
            icon={<UserCheck className="w-6 h-6" />}
            href="/admin/user-management"
            onClick={() => setSelectedMetric("Active Users")}
          />
          <StatCard
            title="Suspended"
            value="12"
            icon={<UserX className="w-6 h-6" />}
            href="/admin/user-management"
            onClick={() => setSelectedMetric("Suspended Users")}
          />
          <StatCard
            title="Pending Accounts"
            value="12"
            icon={<UserPlus className="w-6 h-6" />}
            href="/admin/user-management"
          />
        </div>
      </section>

      {/* ---------------------------------- */}
      {/*   INSTRUCTOR APPLICATION STAT CARDS  */}
      {/* ---------------------------------- */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Instructor Applications</h2>

        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Total Applications"
            value="202"
            icon={<Shield className="w-6 h-6" />}
            href="/admin/instructor-verification"
            onClick={() => setSelectedMetric("New Applications")}
          />
          <StatCard
            title="Pending"
            value="49"
            icon={<Clock className="w-6 h-6" />}
            href="/admin/instructor-verification"
          />
          <StatCard
            title="Approved"
            value="150"
            icon={<CheckCircle className="w-6 h-6" />}
            href="/admin/instructor-verification"
            onClick={() => setSelectedMetric("Approved")}
          />
          <StatCard
            title="Rejected"
            value="3"
            icon={<XCircle className="w-6 h-6" />}
            href="/admin/instructor-verification"
            onClick={() => setSelectedMetric("Rejected")}
          />
        </div>
      </section>

      {/* ---------------------------------- */}
      {/*             LINE CHART             */}
      {/* ---------------------------------- */}
      <div className="mt-10">
        <AdminLineChart
          selectedMetric={selectedMetric}
          selectedRange={selectedRange}
        />
      </div>

      {/* ---------------------------------- */}
      {/*        BOTTOM GRID (PIE CHARTS)    */}
      {/* ---------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <AdminPieChart type="userRatio" />
        <AdminPieChart type="regional" />
      </div>

      {/* ---------------------------------- */}
      {/*      USER STATS TABLE (LATEST)     */}
      {/* ---------------------------------- */}
      <div className="col-span-2 bg-white rounded-lg shadow-sm p-4 mt-6">
        <UserStatsTable />
      </div>
    </AdminLayout>
  );
}

// ------------------------------------------
//         SMALL REUSABLE STAT CARD
// ------------------------------------------
function StatCard({ title, value, icon, href, onClick }: any) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="p-4 bg-white rounded-[8px] shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-4 border border-gray-100"
    >
      <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </a>
  );
}
