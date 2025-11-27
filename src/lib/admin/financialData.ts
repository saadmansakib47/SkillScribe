export interface CourseRevenue {
  id: number;
  courseName: string;
  instructor: string;
  students: number;
  totalRevenue: number;
  instructorShare: number; // 60%
  platformShare: number; // 40%
  category: string;
}

export interface MonthlyRevenue {
  month: string;
  totalRevenue: number;
  instructorPayment: number;
  platformRevenue: number;
}

export interface CategoryRevenue {
  month: string;
  "Web Development": number;
  "Programming": number;
  "Data Science": number;
  "Design": number;
  "Database": number;
  "Software Testing": number;
}

// Monthly revenue data for the year
export const monthlyRevenueData: MonthlyRevenue[] = [
  { month: "Jan", totalRevenue: 95000, instructorPayment: 57000, platformRevenue: 38000 },
  { month: "Feb", totalRevenue: 98000, instructorPayment: 58800, platformRevenue: 39200 },
  { month: "Mar", totalRevenue: 92000, instructorPayment: 55200, platformRevenue: 36800 },
  { month: "Apr", totalRevenue: 105000, instructorPayment: 63000, platformRevenue: 42000 },
  { month: "May", totalRevenue: 110000, instructorPayment: 66000, platformRevenue: 44000 },
  { month: "Jun", totalRevenue: 112000, instructorPayment: 67200, platformRevenue: 44800 },
  { month: "July", totalRevenue: 108000, instructorPayment: 64800, platformRevenue: 43200 },
  { month: "Aug", totalRevenue: 106000, instructorPayment: 63600, platformRevenue: 42400 },
  { month: "Sept", totalRevenue: 115000, instructorPayment: 69000, platformRevenue: 46000 },
  { month: "Oct", totalRevenue: 120000, instructorPayment: 72000, platformRevenue: 48000 },
  { month: "Nov", totalRevenue: 135000, instructorPayment: 81000, platformRevenue: 54000 },
];

// Course revenue breakdown
export const courseRevenueData: CourseRevenue[] = [
  {
    id: 1,
    courseName: "Web Development with MERN",
    instructor: "Sadia Islam",
    students: 128,
    totalRevenue: 35680,
    instructorShare: 21408,
    platformShare: 14272,
    category: "Web Development"
  },
  {
    id: 2,
    courseName: "Advanced React Patterns",
    instructor: "Morgan Lee",
    students: 96,
    totalRevenue: 28800,
    instructorShare: 17280,
    platformShare: 11520,
    category: "Web Development"
  },
  {
    id: 3,
    courseName: "Python Crash Course",
    instructor: "Karan Sharma",
    students: 245,
    totalRevenue: 24500,
    instructorShare: 14700,
    platformShare: 9800,
    category: "Programming"
  },
  {
    id: 4,
    courseName: "Data Science with Python",
    instructor: "Jashim Uddin",
    students: 156,
    totalRevenue: 39000,
    instructorShare: 23400,
    platformShare: 15600,
    category: "Data Science"
  },
  {
    id: 5,
    courseName: "Machine Learning with Python",
    instructor: "Jashim Uddin",
    students: 134,
    totalRevenue: 67000,
    instructorShare: 40200,
    platformShare: 26800,
    category: "Data Science"
  },
  {
    id: 6,
    courseName: "UI/UX Fundamentals",
    instructor: "John Hamilton",
    students: 189,
    totalRevenue: 26460,
    instructorShare: 15876,
    platformShare: 10584,
    category: "Design"
  },
  {
    id: 7,
    courseName: "Database Design",
    instructor: "Daniel Park",
    students: 87,
    totalRevenue: 30450,
    instructorShare: 18270,
    platformShare: 12180,
    category: "Database"
  },
  {
    id: 8,
    courseName: "PostgreSQL Mastery",
    instructor: "Rohan Patel",
    students: 102,
    totalRevenue: 40800,
    instructorShare: 24480,
    platformShare: 16320,
    category: "Database"
  },
  {
    id: 9,
    courseName: "Complete Software Testing Mastery",
    instructor: "Kate Weber",
    students: 178,
    totalRevenue: 35600,
    instructorShare: 21360,
    platformShare: 14240,
    category: "Software Testing"
  },
  {
    id: 10,
    courseName: "JavaScript ES6+ Deep Dive",
    instructor: "Karim Kabir",
    students: 203,
    totalRevenue: 56840,
    instructorShare: 34104,
    platformShare: 22736,
    category: "Programming"
  },
  {
    id: 11,
    courseName: "TypeScript Complete Guide",
    instructor: "Morgan Lee",
    students: 142,
    totalRevenue: 45440,
    instructorShare: 27264,
    platformShare: 18176,
    category: "Programming"
  },
  {
    id: 12,
    courseName: "Java Spring Boot Masterclass",
    instructor: "Karan Sharma",
    students: 98,
    totalRevenue: 41160,
    instructorShare: 24696,
    platformShare: 16464,
    category: "Programming"
  },
];

// Revenue by category per month
export const categoryRevenueData: CategoryRevenue[] = [
  { month: "Jan", "Web Development": 18000, "Programming": 22000, "Data Science": 25000, "Design": 12000, "Database": 10000, "Software Testing": 8000 },
  { month: "Feb", "Web Development": 19000, "Programming": 23000, "Data Science": 26000, "Design": 12500, "Database": 9500, "Software Testing": 8000 },
  { month: "Mar", "Web Development": 17500, "Programming": 21000, "Data Science": 24000, "Design": 11500, "Database": 10000, "Software Testing": 8000 },
  { month: "Apr", "Web Development": 21000, "Programming": 25000, "Data Science": 28000, "Design": 13000, "Database": 10000, "Software Testing": 8000 },
  { month: "May", "Web Development": 22000, "Programming": 26000, "Data Science": 30000, "Design": 13500, "Database": 10500, "Software Testing": 8000 },
  { month: "Jun", "Web Development": 22500, "Programming": 26500, "Data Science": 31000, "Design": 13500, "Database": 10500, "Software Testing": 8000 },
  { month: "July", "Web Development": 21500, "Programming": 25500, "Data Science": 29500, "Design": 13000, "Database": 10500, "Software Testing": 8000 },
  { month: "Aug", "Web Development": 21000, "Programming": 25000, "Data Science": 29000, "Design": 12500, "Database": 10500, "Software Testing": 8000 },
  { month: "Sept", "Web Development": 23000, "Programming": 27000, "Data Science": 31500, "Design": 14000, "Database": 11500, "Software Testing": 8000 },
  { month: "Oct", "Web Development": 24000, "Programming": 28000, "Data Science": 33000, "Design": 14500, "Database": 12500, "Software Testing": 8000 },
  { month: "Nov", "Web Development": 27000, "Programming": 32000, "Data Science": 37000, "Design": 16000, "Database": 14000, "Software Testing": 9000 },
];

// Filter helpers
export const timeFilters = [
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "this-year", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

export const categoryFilters = [
  { value: "all", label: "All Categories" },
  { value: "web-development", label: "Web Development" },
  { value: "programming", label: "Programming" },
  { value: "data-science", label: "Data Science" },
  { value: "design", label: "Design" },
  { value: "database", label: "Database" },
  { value: "software-testing", label: "Software Testing" },
];

export const instructorFilters = [
  { value: "all", label: "All Instructors" },
  { value: "sadia-islam", label: "Sadia Islam" },
  { value: "morgan-lee", label: "Morgan Lee" },
  { value: "karan-sharma", label: "Karan Sharma" },
  { value: "jashim-uddin", label: "Jashim Uddin" },
  { value: "john-hamilton", label: "John Hamilton" },
  { value: "daniel-park", label: "Daniel Park" },
  { value: "rohan-patel", label: "Rohan Patel" },
  { value: "kate-weber", label: "Kate Weber" },
  { value: "karim-kabir", label: "Karim Kabir" },
];

export const revenueTypeFilters = [
  { value: "all", label: "All Revenue" },
  { value: "course-sales", label: "Course Sales Only" },
  { value: "one-time", label: "One Time Purchase" },
  { value: "subscription", label: "Subscription" },
];

// Calculate totals
export const getTotalRevenue = () => {
  return courseRevenueData.reduce((sum, course) => sum + course.totalRevenue, 0);
};

export const getTotalInstructorPayments = () => {
  return courseRevenueData.reduce((sum, course) => sum + course.instructorShare, 0);
};

export const getTotalPlatformRevenue = () => {
  return courseRevenueData.reduce((sum, course) => sum + course.platformShare, 0);
};

export const getNetProfit = () => {
  const platformRevenue = getTotalPlatformRevenue();
  // Assuming 30% operational costs
  const operationalCosts = platformRevenue * 0.3;
  return platformRevenue - operationalCosts;
};
