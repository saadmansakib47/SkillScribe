export default function CourseInfoForm() {
  return (
    <div>
      <h3 className="font-semibold mb-1 text-gray-800">Course Info</h3>
      <p className="text-sm text-gray-500 mb-4">
        Add class details to help students discover your course and better understand what they’ll learn.
      </p>

      <div className="space-y-3">
        <input
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="Course Name"
        />
        <textarea
          className="w-full border rounded-md px-3 py-2 text-sm"
          rows={4}
          placeholder="Course Description"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Category"
          />
          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Sub-Category"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>Difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Duration (hrs)"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Tags"
          />
          <input
            className="border rounded-md px-3 py-2 text-sm"
            placeholder="Price (USD)"
          />
        </div>
      </div>
    </div>
  );
}
