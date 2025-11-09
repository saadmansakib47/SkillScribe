import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ReviewFilters() {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Select Course</label>
        <Select>
          <SelectTrigger className="mt-1 border-gray-300">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="react">React Fundamentals</SelectItem>
            <SelectItem value="uiux">UI/UX Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Filter by Rating</label>
        <Select>
          <SelectTrigger className="mt-1 border-gray-300">
            <SelectValue placeholder="All Ratings" />
          </SelectTrigger>
          <SelectContent>
            {[5, 4, 3, 2, 1].map((r) => (
              <SelectItem key={r} value={r.toString()}>
                {r} Stars
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Search</label>
        <Input className="mt-1 border-gray-300" placeholder="Search Reviews" />
      </div>
    </div>
  );
}
