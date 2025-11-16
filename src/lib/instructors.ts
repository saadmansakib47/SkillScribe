import { COURSES } from "./courses";

export type Instructor = {
  id: number;
  name: string;
  image: string;        // Image path from /public/Asset/
  courseIds: number[];  // All courses taught by this instructor
};

/**
 * Build instructor list dynamically using COURSES as the single source of truth.
 * --------------------------------------------------------
 * ✔ No duplicate data
 * ✔ Automatically updates when COURSES changes
 * ✔ Never mismatches instructor–course relations
 */
const instructorMap: Record<
  string,
  { name: string; image: string; courseIds: number[] }
> = {};

for (const course of COURSES) {
  const { instructorName: name, instructorImage: image, id: courseId } = course;

  if (!instructorMap[name]) {
    instructorMap[name] = {
      name,
      image,
      courseIds: [],
    };
  }

  instructorMap[name].courseIds.push(courseId);
}

// Convert map → array & assign stable auto IDs
export const INSTRUCTORS: Instructor[] = Object.values(instructorMap).map(
  (inst, index) => ({
    id: index + 1,
    ...inst,
  })
);

// --------------------------------------------------------
// Utility Functions
// --------------------------------------------------------

/** Get instructor by ID */
export function getInstructorById(id: number): Instructor | undefined {
  return INSTRUCTORS.find((i) => i.id === id);
}

/** Get instructor object by name */
export function getInstructorByName(name: string): Instructor | undefined {
  return INSTRUCTORS.find((i) => i.name === name);
}

/** Get all instructors who teach a given course */
export function getInstructorsForCourse(courseId: number): Instructor[] {
  return INSTRUCTORS.filter((i) => i.courseIds.includes(courseId));
}

/** Get all courses taught by a specific instructor */
export function getCoursesForInstructor(instructorId: number) {
  const instructor = getInstructorById(instructorId);
  if (!instructor) return [];
  return COURSES.filter((course) => instructor.courseIds.includes(course.id));
}
