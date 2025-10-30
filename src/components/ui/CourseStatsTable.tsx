import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const options = [
  { label: "All", value: "all" },
  { label: "Computer Science", value: "cs" },
  { label: "Design", value: "design" },
  { label: "Business", value: "business" },
];

export default function CourseStatsTable() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

const courses = [
  { title: "Artificial Intelligence", category: "Computer Science", rating: 4.7, visit: "25,300", sale: 6, earnings: "$170.00", img: "/Asset/ai.jpg" },
  { title: "Robotics", category: "Computer Science", rating: 4.3, visit: "25,300", sale: 6, earnings: "$170.00", img: "/Asset/robo.jpg" },
  { title: "Cyber Security", category: "Computer Science", rating: 3.5, visit: "25,300", sale: 6, earnings: "$170.00", img: "/Asset/cyber.jpg" },
  { title: "Laravel", category: "Computer Science", rating: 4.9, visit: "25,300", sale: 6, earnings: "$170.00", img: "/Asset/laravel.jpg" },
];


  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter(
          (c) => c.category === options.find((o) => o.value === selectedCategory)?.label
        );

  const handleSelectCategory = (value: string) => {
    setSelectedCategory(value);
    setOpen(false);
  };

  // Renders fractional stars using two layered SVGs
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const fill = Math.min(Math.max(rating - i, 0), 1) * 100; // % of the star to fill
      return (
        <div key={i} className="relative w-4 h-4 inline-block">
          {/* Gray star background */}
          <svg viewBox="0 0 20 20" className="absolute top-0 left-0 w-full h-full text-gray-300">
            <path d="M10 1.5l2.95 6 6.55.95-4.75 4.63 1.12 6.53L10 16.27l-5.87 3.08L5.25 13.1 0.5 8.47l6.55-.95L10 1.5z" fill="currentColor"/>
          </svg>
          {/* Yellow filled part */}
          <svg
            viewBox="0 0 20 20"
            className="absolute top-0 left-0 h-full"
            style={{ width: `${fill}%`, overflow: "hidden" }}
          >
            <path d="M10 1.5l2.95 6 6.55.95-4.75 4.63 1.12 6.53L10 16.27l-5.87 3.08L5.25 13.1 0.5 8.47l6.55-.95L10 1.5z" fill="#facc15" />
          </svg>
        </div>
      );
    });
  };

  return (
    <div className="col-span-2 bg-white rounded-lg shadow-sm p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Course Stats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-200 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">
                <div className="relative inline-block">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1 text-gray-600 text-sm border border-gray-300 rounded-[8px] px-2 py-1 hover:text-blue-600 hover:border-blue-500 transition-all"
                  >
                    {options.find(opt => opt.value === selectedCategory)?.label}
                    <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-36 z-50"
                      >
                        {options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSelectCategory(opt.value)}
                            className={`block w-full text-left text-sm px-3 py-2 hover:bg-blue-50 hover:text-blue-600 ${
                              selectedCategory === opt.value ? "text-blue-600 font-medium" : "text-gray-700"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Visit</th>
              <th className="px-4 py-2">Sale</th>
              <th className="px-4 py-2">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <tr key={course.title} className="border-t">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img src={course.img} alt={course.title} className="w-8 h-8 rounded" />
                    {course.title}
                  </td>
                  <td className="px-4 py-2">{course.category}</td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    {renderStars(course.rating)}
                    <span className="ml-1">{course.rating.toFixed(1)}</span>
                  </td>
                  <td className="px-4 py-2">{course.visit}</td>
                  <td className="px-4 py-2">{course.sale}</td>
                  <td className="px-4 py-2">{course.earnings}</td>
                </tr>
              ))
            ) : (
              <tr className="border-t">
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500 italic">
                  No courses found for "{options.find(opt => opt.value === selectedCategory)?.label}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
