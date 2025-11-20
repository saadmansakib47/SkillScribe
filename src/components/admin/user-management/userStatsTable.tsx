"use client";

import { useState, useEffect } from "react";
import { ArrowUpDown, User, Mail, ShieldAlert } from "lucide-react";

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

  function sortTable(column: keyof UserRow) {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">Latest User Activity</h2>

      <table className="min-w-full border rounded-lg bg-white">
        <thead className="bg-gray-100 text-gray-600 text-sm">
          <tr>
            <Th label="Name" column="name" sortBy={sortBy} sortOrder={sortOrder} onSort={sortTable} />
            <Th label="Email" column="email" sortBy={sortBy} sortOrder={sortOrder} onSort={sortTable} />
            <Th label="Status" column="status" sortBy={sortBy} sortOrder={sortOrder} onSort={sortTable} />
            <Th label="Role" column="role" sortBy={sortBy} sortOrder={sortOrder} onSort={sortTable} />
            <Th label="Joined" column="createdAt" sortBy={sortBy} sortOrder={sortOrder} onSort={sortTable} />
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                {user.name}
              </td>
              <td className="p-3 text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {user.email}
              </td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === "active"
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

// ----------- REUSABLE TH COMPONENT -----------
function Th({
  label,
  column,
  sortBy,
  sortOrder,
  onSort,
}: {
  label: string;
  column: keyof UserRow;
  sortBy: keyof UserRow;
  sortOrder: "asc" | "desc";
  onSort: (col: keyof UserRow) => void;
}) {
  return (
    <th
      onClick={() => onSort(column)}
      className="p-3 text-left font-medium cursor-pointer select-none"
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown
          className={`w-4 h-4 transition ${sortBy === column ? "text-blue-600" : "text-gray-400"}`}
        />
      </div>
    </th>
  );
}