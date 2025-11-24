import { COURSES, Course } from '../courses';

export type CourseStatus = 'Published' | 'Pending' | 'Suspended';

export interface AdminCourse extends Course {
  status: CourseStatus;
  studentCount: number;
  revenue: number;
}

// Transform existing courses into admin courses with additional fields
// Using deterministic data based on course ID to avoid hydration mismatch
export const ADMIN_COURSES: AdminCourse[] = COURSES.map((course, index) => {
  const status: CourseStatus = index % 4 === 0 ? 'Pending' : index % 7 === 0 ? 'Suspended' : 'Published';
  const isPending = status === 'Pending';
  
  // Generate deterministic student count based on course ID to avoid hydration errors
  // Reduced range to keep revenue within 4 digits (max $9,999)
  const seed = course.id * 1234; // Deterministic seed
  const studentCount = isPending ? 0 : ((seed * 137) % 190) + 10; // Range: 10-199 students
  
  // Revenue is calculated as: course price × student count
  // For pending courses, revenue is 0
  const revenue = isPending ? 0 : course.price * studentCount;
  
  return {
    ...course,
    status,
    studentCount,
    revenue
  };
});

// Get unique categories from courses
export const getCourseCategories = (): string[] => {
  const categories = new Set(ADMIN_COURSES.map(course => course.category).filter(Boolean));
  return Array.from(categories) as string[];
};

// Get status badge color
export const getStatusColor = (status: CourseStatus): string => {
  switch (status) {
    case 'Published':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Suspended':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Sort courses
export const sortCourses = (courses: AdminCourse[], sortBy: 'latest' | 'a-z'): AdminCourse[] => {
  if (sortBy === 'a-z') {
    return [...courses].sort((a, b) => a.title.localeCompare(b.title));
  }
  // For 'latest', assume higher ID = newer
  return [...courses].sort((a, b) => b.id - a.id);
};
