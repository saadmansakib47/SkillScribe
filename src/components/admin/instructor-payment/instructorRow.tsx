import Link from "next/link";

export type Instructor = {
  id: string;
  name: string;
  email: string;
  image: string;
  courses: number;
  totalPaid: string;
  totalDue: string;
};

export function InstructorRow({ ins }: { ins: Instructor }) {
  return (
    <tr className="border-b border-black/10 hover:bg-gray-50">
      <td className="p-3 flex items-center gap-3">
        <img src={ins.image} className="w-10 h-10 rounded-full object-cover" />

        <div>
          <div className="font-medium">{ins.name}</div>
          <div className="text-xs text-gray-500">ID: {ins.id}</div>
        </div>
      </td>

      <td className="p-3 text-gray-700">{ins.email}</td>
      <td className="p-3">{ins.courses}</td>

      <td className="p-3 text-green-600 font-medium">{ins.totalPaid}</td>
      <td className="p-3 text-red-500 font-medium">{ins.totalDue}</td>

      <td className="p-3">
        <Link
          href={`/admin/instructor-payment-details?insId=${ins.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Details
        </Link>
      </td>
    </tr>
  );
}
