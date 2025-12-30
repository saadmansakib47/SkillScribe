"use client";

import { useState, useEffect } from "react";
import { User, Mail } from "lucide-react";

interface UserRow {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "pending";
  role: "student" | "instructor" | "admin";
  createdAt: string;
}

export default function UserStatsTable() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [sortBy, setSortBy] = useState<keyof UserRow>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    // TODO: Fetch real backend data
    setUsers([
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        status: "active",
        role: "student",
        createdAt: "2025-01-11",
      },
      {
        id: "2",
        name: "Marcus Lee",
        email: "marcus@example.com",
        status: "pending",
        role: "instructor",
        createdAt: "2025-01-13",
      },
      {
        id: "3",
        name: "Sarah Ahmed",
        email: "sarah@example.com",
        status: "suspended",
        role: "student",
        createdAt: "2025-01-10",
      },
    ]);
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">Latest User Activity</h2>

      <table className="min-w-full border rounded-lg bg-white">
        <thead className="bg-[#F1F5F9] text-black text-sm">
          <tr>
            <th className="p-3 text-left font-semibold">Name</th>
            <th className="p-3 text-left font-semibold">Email</th>
            <th className="p-3 text-left font-semibold">Status</th>
            <th className="p-3 text-left font-semibold">Role</th>
            <th className="p-3 text-left font-semibold">Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  {user.name}
                </div>
              </td>
              <td className="p-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {user.email}
                </div>
              </td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : user.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3 text-gray-500">{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}