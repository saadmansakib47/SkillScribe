import { ADMIN_COURSES } from './courses';

export interface CategoryStats {
  id: string;
  name: string;
  description: string;
  coursesCount: number;
  studentsCount: number;
  revenue: number;
  courseTypes: string[];
  trending: boolean;
}

// Category descriptions and course types
const CATEGORY_INFO: Record<string, { description: string; types: string[] }> = {
  'Web Development': {
    description: 'Master modern web technologies and build dynamic websites and applications',
    types: ['Frontend', 'Backend', 'Full Stack', 'APIs']
  },
  'Data Science': {
    description: 'Learn data analysis, machine learning, and statistical modeling techniques',
    types: ['Machine Learning', 'Analytics', 'Python', 'Visualization']
  },
  'Programming': {
    description: 'Core programming languages and software development fundamentals',
    types: ['Languages', 'Algorithms', 'OOP', 'Systems']
  },
  'Database': {
    description: 'Database design, management, and optimization for modern applications',
    types: ['SQL', 'NoSQL', 'Design', 'Performance']
  },
  'Software Testing': {
    description: 'Quality assurance, automated testing, and software reliability practices',
    types: ['Manual Testing', 'Automation', 'QA', 'CI/CD']
  },
  'Design': {
    description: 'UI/UX design principles, prototyping, and user-centered design thinking',
    types: ['UI/UX', 'Prototyping', 'Research', 'Tools']
  },
  'Marketing': {
    description: 'Digital marketing strategies, analytics, and brand development',
    types: ['Digital', 'Content', 'SEO', 'Social Media']
  }
};

// Calculate category statistics from courses
export const calculateCategoryStats = (): CategoryStats[] => {
  const categoryMap = new Map<string, CategoryStats>();

  ADMIN_COURSES.forEach((course) => {
    const categoryName = course.category || 'Uncategorized';
    
    if (!categoryMap.has(categoryName)) {
      const info = CATEGORY_INFO[categoryName] || {
        description: 'Explore various topics and skills',
        types: ['General']
      };
      
      categoryMap.set(categoryName, {
        id: categoryName.toLowerCase().replace(/\s+/g, '-'),
        name: categoryName,
        description: info.description,
        coursesCount: 0,
        studentsCount: 0,
        revenue: 0,
        courseTypes: info.types,
        trending: false
      });
    }

    const category = categoryMap.get(categoryName)!;
    
    // Only count published courses
    if (course.status === 'Published') {
      category.coursesCount++;
      category.studentsCount += course.studentCount;
      category.revenue += course.revenue;
    }
  });

  // Mark top 3 revenue categories as trending
  const categories = Array.from(categoryMap.values());
  const sortedByRevenue = [...categories].sort((a, b) => b.revenue - a.revenue);
  sortedByRevenue.slice(0, 3).forEach(cat => {
    const category = categories.find(c => c.id === cat.id);
    if (category) category.trending = true;
  });

  return categories;
};

export const CATEGORIES = calculateCategoryStats();

// Get overall stats
export const getCategoryOverallStats = () => {
  const totalCategories = CATEGORIES.length;
  const activeCourses = CATEGORIES.reduce((sum, cat) => sum + cat.coursesCount, 0);
  const totalRevenue = CATEGORIES.reduce((sum, cat) => sum + cat.revenue, 0);
  const trendingCount = CATEGORIES.filter(cat => cat.trending).length;

  return {
    totalCategories,
    activeCourses,
    totalRevenue,
    trendingCount
  };
};

// Sort categories
export const sortCategories = (
  categories: CategoryStats[],
  sortBy: 'latest' | 'oldest' | 'a-z' | 'z-a'
): CategoryStats[] => {
  const sorted = [...categories];
  
  switch (sortBy) {
    case 'a-z':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'z-a':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'latest':
      return sorted.sort((a, b) => b.revenue - a.revenue); // Sort by revenue as proxy for latest
    case 'oldest':
      return sorted.sort((a, b) => a.revenue - b.revenue);
    default:
      return sorted;
  }
};
