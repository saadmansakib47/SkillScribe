interface CourseCardProps {
  title: string;
  date: string;
  status: "Published" | "Draft" | "Pending";
}

export default function CourseCard({ title, date, status }: CourseCardProps) {
  return (
    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <span className="px-3 py-1 text-xs rounded-full bg-[#EAF0FF] text-[#4C6FFF] font-medium">
        {status}
      </span>
    </div>
  );
}
