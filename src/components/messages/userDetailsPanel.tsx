"use client";

interface Props {
  name: string;
  avatar: string;
  role: string;
}

export default function UserDetailsPanel({ name, avatar, role }: Props) {
  return (
    <div className="w-72 border-l bg-white p-4">
      <div className="flex flex-col items-center">
        <img src={avatar} className="w-20 h-20 rounded-full mb-3" />
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>

        <div className="flex flex-col gap-2 mt-4 w-full">
          <button className="py-2 rounded-lg bg-blue-50 text-blue-600">View Profile</button>
          <button className="py-2 rounded-lg bg-red-50 text-red-600">Block</button>
          <button className="py-2 rounded-lg bg-gray-100">Report</button>
        </div>

        <div className="mt-6 w-full">
          <p className="text-sm font-semibold mb-2">Shared files</p>
          <div className="text-sm text-gray-500">No files shared yet.</div>
        </div>
      </div>
    </div>
  );
}
