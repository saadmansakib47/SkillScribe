export type Learner = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  location: string;
  enrolledCourses: number[];
  completedCourses: number[];
  inProgressCourses: number[];
  savedCourses: number[];
  courseProgress: { [courseId: number]: number };
  skills: string[];
  interests: string[];
  totalLearningHours: number;
  certificatesEarned: number;
  achievements: {
    id: number;
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
  }[];
};

// Mock learner data - In production, this would come from a database
export const LEARNERS: Learner[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: '/Asset/emily rose.jpg',
    bio: 'Passionate about learning new technologies and building innovative solutions. Currently focusing on full-stack development and data science.',
    joinedDate: '2024-01-15',
    location: 'New York, USA',
    enrolledCourses: [1, 3, 6, 4, 21],
    completedCourses: [6, 3],
    inProgressCourses: [1, 4, 21],
    savedCourses: [15, 16, 7, 8],
    courseProgress: { 1: 75, 4: 45, 21: 30, 6: 100, 3: 100 },
    skills: ['JavaScript', 'React', 'Python', 'HTML/CSS', 'Data Analysis'],
    interests: ['Web Development', 'Data Science', 'Machine Learning', 'Full Stack Development'],
    totalLearningHours: 145,
    certificatesEarned: 2,
    achievements: [
      {
        id: 1,
        title: 'Early Adopter',
        description: 'Joined SkillScribe in the first month',
        icon: '🚀',
        earnedDate: '2024-01-15',
      },
      {
        id: 2,
        title: 'Course Completer',
        description: 'Completed your first course',
        icon: '🎓',
        earnedDate: '2024-03-20',
      },
      {
        id: 3,
        title: 'Dedicated Learner',
        description: 'Spent 100+ hours learning',
        icon: '⭐',
        earnedDate: '2024-05-10',
      },
    ],
  },
  {
    id: 2,
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    avatar: '/Asset/rohan patel.jpg',
    bio: 'Software engineer transitioning into cloud architecture and DevOps. Love automating processes and building scalable systems.',
    joinedDate: '2024-02-20',
    location: 'San Francisco, USA',
    enrolledCourses: [11, 15, 18, 19],
    completedCourses: [11, 15],
    inProgressCourses: [18, 19],
    savedCourses: [16, 17, 20, 14],
    courseProgress: { 18: 55, 19: 68, 11: 100, 15: 100 },
    skills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS'],
    interests: ['Cloud Computing', 'DevOps', 'Microservices', 'System Design'],
    totalLearningHours: 98,
    certificatesEarned: 2,
    achievements: [
      {
        id: 1,
        title: 'Quick Learner',
        description: 'Completed a course in record time',
        icon: '⚡',
        earnedDate: '2024-03-15',
      },
      {
        id: 2,
        title: 'Streak Master',
        description: 'Learned for 30 days straight',
        icon: '🔥',
        earnedDate: '2024-04-01',
      },
    ],
  },
  {
    id: 3,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    avatar: '/Asset/sadia islam.jpg',
    bio: 'Designer learning to code. Passionate about creating beautiful and functional user experiences.',
    joinedDate: '2024-03-10',
    location: 'Barcelona, Spain',
    enrolledCourses: [3, 5, 7, 10],
    completedCourses: [5],
    inProgressCourses: [3, 7, 10],
    savedCourses: [1, 6, 15, 16],
    courseProgress: { 3: 85, 7: 40, 10: 22, 5: 100 },
    skills: ['UI/UX Design', 'Figma', 'HTML', 'CSS', 'JavaScript'],
    interests: ['Design', 'Frontend Development', 'User Experience', 'Web Design'],
    totalLearningHours: 67,
    certificatesEarned: 1,
    achievements: [
      {
        id: 1,
        title: 'Design Enthusiast',
        description: 'Completed first design course',
        icon: '🎨',
        earnedDate: '2024-04-15',
      },
    ],
  },
  {
    id: 4,
    name: 'David Miller',
    email: 'david.miller@email.com',
    avatar: '/Asset/jashim uddin.jpg',
    bio: 'Data scientist with a passion for machine learning and AI. Building intelligent systems that solve real-world problems.',
    joinedDate: '2024-01-28',
    location: 'Seattle, USA',
    enrolledCourses: [4, 21, 9, 13],
    completedCourses: [4, 13],
    inProgressCourses: [21, 9],
    savedCourses: [8, 10, 14],
    courseProgress: { 21: 92, 9: 38, 4: 100, 13: 100 },
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'SQL'],
    interests: ['Machine Learning', 'Data Science', 'AI', 'Deep Learning'],
    totalLearningHours: 187,
    certificatesEarned: 3,
    achievements: [
      {
        id: 1,
        title: 'Data Master',
        description: 'Completed all data science courses',
        icon: '📊',
        earnedDate: '2024-06-20',
      },
      {
        id: 2,
        title: 'Python Expert',
        description: 'Mastered Python programming',
        icon: '🐍',
        earnedDate: '2024-05-15',
      },
      {
        id: 3,
        title: 'AI Pioneer',
        description: 'Built 10+ ML models',
        icon: '🤖',
        earnedDate: '2024-07-10',
      },
    ],
  },
  {
    id: 5,
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    avatar: '/Asset/Kate weber.png',
    bio: 'QA engineer specializing in test automation. Ensuring software quality through comprehensive testing strategies.',
    joinedDate: '2024-04-05',
    location: 'London, UK',
    enrolledCourses: [2, 12, 15],
    completedCourses: [2],
    inProgressCourses: [12, 15],
    savedCourses: [16, 18, 19],
    courseProgress: { 12: 60, 15: 50, 2: 100 },
    skills: ['Selenium', 'Python', 'Test Automation', 'CI/CD', 'JavaScript'],
    interests: ['Software Testing', 'Quality Assurance', 'Automation', 'DevOps'],
    totalLearningHours: 54,
    certificatesEarned: 1,
    achievements: [
      {
        id: 1,
        title: 'QA Champion',
        description: 'Completed first testing certification',
        icon: '✅',
        earnedDate: '2024-06-01',
      },
      {
        id: 2,
        title: 'Bug Hunter',
        description: 'Found and reported 50+ bugs in practice labs',
        icon: '🐛',
        earnedDate: '2024-06-15',
      },
    ],
  },
  {
    id: 6,
    name: 'Liam O\'Brien',
    email: 'liam.obrien@email.com',
    avatar: '/Asset/rohan patel.jpg',
    bio: 'Backend developer focusing on building scalable APIs and microservices. Passionate about system architecture and performance.',
    joinedDate: '2024-02-14',
    location: 'Dublin, Ireland',
    enrolledCourses: [18, 19, 14, 11],
    completedCourses: [14, 11],
    inProgressCourses: [18, 19],
    savedCourses: [17, 20, 13],
    courseProgress: { 18: 70, 19: 45, 14: 100, 11: 100 },
    skills: ['Java', 'Go', 'Microservices', 'REST APIs', 'Docker'],
    interests: ['Backend Development', 'Microservices', 'Cloud Computing', 'System Architecture'],
    totalLearningHours: 132,
    certificatesEarned: 2,
    achievements: [
      {
        id: 1,
        title: 'API Master',
        description: 'Built 20+ REST APIs',
        icon: '🔌',
        earnedDate: '2024-05-20',
      },
      {
        id: 2,
        title: 'Cloud Native',
        description: 'Deployed 10+ microservices to cloud',
        icon: '☁️',
        earnedDate: '2024-07-01',
      },
    ],
  },
  {
    id: 7,
    name: 'Sophia Lee',
    email: 'sophia.lee@email.com',
    avatar: '/Asset/sadia islam.jpg',
    bio: 'Frontend developer specializing in React and modern JavaScript. Creating beautiful, accessible web experiences.',
    joinedDate: '2024-03-22',
    location: 'Toronto, Canada',
    enrolledCourses: [3, 15, 16, 6],
    completedCourses: [3, 6],
    inProgressCourses: [15, 16],
    savedCourses: [1, 7, 10],
    courseProgress: { 15: 88, 16: 35, 3: 100, 6: 100 },
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    interests: ['Frontend Development', 'React', 'TypeScript', 'UI Development'],
    totalLearningHours: 89,
    certificatesEarned: 2,
    achievements: [
      {
        id: 1,
        title: 'React Pro',
        description: 'Built 15+ React applications',
        icon: '⚛️',
        earnedDate: '2024-06-10',
      },
      {
        id: 2,
        title: 'TypeScript Guru',
        description: 'Mastered TypeScript type system',
        icon: '💙',
        earnedDate: '2024-07-15',
      },
    ],
  },
  {
    id: 8,
    name: 'Mohammed Hassan',
    email: 'mohammed.hassan@email.com',
    avatar: '/Asset/jashim uddin.jpg',
    bio: 'Systems programmer interested in low-level programming and performance optimization. Learning Rust and C++.',
    joinedDate: '2024-04-18',
    location: 'Dubai, UAE',
    enrolledCourses: [17, 20, 9],
    completedCourses: [9],
    inProgressCourses: [17, 20],
    savedCourses: [19, 14, 11],
    courseProgress: { 17: 52, 20: 78, 9: 100 },
    skills: ['C++', 'Rust', 'Systems Programming', 'Memory Management', 'Performance'],
    interests: ['Systems Programming', 'Performance', 'Low-level Programming', 'Embedded Systems'],
    totalLearningHours: 76,
    certificatesEarned: 1,
    achievements: [
      {
        id: 1,
        title: 'Systems Expert',
        description: 'Completed advanced systems course',
        icon: '⚙️',
        earnedDate: '2024-06-25',
      },
      {
        id: 2,
        title: 'Performance Optimizer',
        description: 'Optimized code for 50%+ performance gains',
        icon: '🚀',
        earnedDate: '2024-07-20',
      },
    ],
  },
  {
    id: 9,
    name: 'Isabella Martinez',
    email: 'isabella.martinez@email.com',
    avatar: '/Asset/emily rose.jpg',
    bio: 'Full-stack developer building end-to-end web applications. Love working with modern frameworks and databases.',
    joinedDate: '2024-02-08',
    location: 'Mexico City, Mexico',
    enrolledCourses: [1, 6, 13, 14, 15],
    completedCourses: [6, 13, 14],
    inProgressCourses: [1, 15],
    savedCourses: [16, 18, 4],
    courseProgress: { 1: 65, 15: 42, 6: 100, 13: 100, 14: 100 },
    skills: ['MERN Stack', 'PostgreSQL', 'Node.js', 'React', 'JavaScript'],
    interests: ['Full Stack Development', 'Web Development', 'Databases', 'Backend Development'],
    totalLearningHours: 156,
    certificatesEarned: 3,
    achievements: [
      {
        id: 1,
        title: 'Full Stack Hero',
        description: 'Deployed 5+ full-stack applications',
        icon: '🌟',
        earnedDate: '2024-05-30',
      },
      {
        id: 2,
        title: 'Database Wizard',
        description: 'Mastered SQL and database design',
        icon: '🗄️',
        earnedDate: '2024-06-18',
      },
      {
        id: 3,
        title: 'MERN Master',
        description: 'Expert in MongoDB, Express, React, Node.js',
        icon: '💚',
        earnedDate: '2024-07-25',
      },
    ],
  },
  {
    id: 10,
    name: 'James Anderson',
    email: 'james.anderson@email.com',
    avatar: '/Asset/rohan patel.jpg',
    bio: 'Career changer from finance to tech. Learning web development to build fintech applications. Excited about the journey!',
    joinedDate: '2024-05-12',
    location: 'Chicago, USA',
    enrolledCourses: [3, 6, 9, 13],
    completedCourses: [3],
    inProgressCourses: [6, 9],
    savedCourses: [1, 4, 15, 16],
    courseProgress: { 6: 58, 9: 25, 3: 100 },
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL'],
    interests: ['Web Development', 'Fintech', 'Backend Development', 'Career Change'],
    totalLearningHours: 42,
    certificatesEarned: 1,
    achievements: [
      {
        id: 1,
        title: 'Career Changer',
        description: 'Successfully pivoted to tech',
        icon: '🎯',
        earnedDate: '2024-06-05',
      },
      {
        id: 2,
        title: 'First Steps',
        description: 'Completed first coding course',
        icon: '👣',
        earnedDate: '2024-06-20',
      },
    ],
  },
];

// Helper function to get learner by ID
export function getLearnerById(id: number): Learner | undefined {
  return LEARNERS.find(learner => learner.id === id);
}

// Helper function to get current learner (in production, this would be based on authentication)
// For demo purposes, returns the first learner
export function getCurrentLearner(): Learner {
  return LEARNERS[0];
}
