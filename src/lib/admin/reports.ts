export type ReportStatus = 'Pending Review' | 'In Progress' | 'Resolved';
export type ReportCategory = 'Course Issue' | 'Content Issue' | 'Instructor Issue' | 'Technical Issue' | 'Certificate Issue';
export type ReportPriority = 'High' | 'Medium' | 'Low' | 'Urgent';

export interface UserReport {
  id: string;
  title: string;
  description: string;
  userName: string;
  userAvatar?: string;
  dateSubmitted: string;
  status: ReportStatus;
  category: ReportCategory;
  priority: ReportPriority;
  relatedCourse?: string;
}

export const USER_REPORTS: UserReport[] = [
  {
    id: 'RPT-1234-7826',
    title: 'Course video not loading properly',
    description: 'The video player in Module 3, Lesson 5 of "Advanced Python Programming" keeps buffering and won\'t play beyond 2:45 mark. I\'ve tried different browsers but facing the same issue.',
    userName: 'Emma Watson',
    dateSubmitted: 'Nov 25, 2025',
    status: 'Pending Review',
    category: 'Technical Issue',
    priority: 'Urgent',
    relatedCourse: 'Advanced Python Programming'
  },
  {
    id: 'RPT-5678-9012',
    title: 'Inappropriate content in course discussion',
    description: 'The video player in Module 3, Lesson 5 of "Advanced Python Programming" keeps buffering and won\'t play beyond 2:45 mark. I\'ve tried different browsers but facing the same issue. The content in the discussion forum of "Web Development Bootcamp". This violates community guidelines and needs to be removed as it\'s not related to the course.',
    userName: 'Oliver Brown',
    dateSubmitted: 'Nov 24, 2025',
    status: 'In Progress',
    category: 'Content Issue',
    priority: 'High',
    relatedCourse: 'Web Development Bootcamp'
  },
  {
    id: 'RPT-3456-2341',
    title: 'Instructor not responding to questions',
    description: 'I\'ve posted 3 questions in the Q&A section over the past week but the instructor hasn\'t responded. Other students are also waiting for answers.',
    userName: 'Sophia Martinez',
    dateSubmitted: 'Nov 23, 2025',
    status: 'In Progress',
    category: 'Instructor Issue',
    priority: 'Medium',
    relatedCourse: 'Data Science Fundamentals'
  },
  {
    id: 'RPT-7890-4567',
    title: 'Certificate has incorrect name',
    description: 'I completed the "JavaScript Mastery" course and received my certificate, but my name is misspelled. Can this be corrected and resent?',
    userName: 'James Wilson',
    dateSubmitted: 'Nov 23, 2025',
    status: 'Resolved',
    category: 'Certificate Issue',
    priority: 'Low',
    relatedCourse: 'JavaScript Mastery'
  },
  {
    id: 'RPT-2345-6789',
    title: 'Quiz answers are incorrect',
    description: 'In Module 2 Quiz of "Advanced Python Programming", Question 7\'s marked correct answer is actually wrong. The system is marking correct answers as incorrect.',
    userName: 'Isabella Garcia',
    dateSubmitted: 'Nov 22, 2025',
    status: 'Resolved',
    category: 'Course Issue',
    priority: 'High',
    relatedCourse: 'Advanced Python Programming'
  },
  {
    id: 'RPT-8901-2345',
    title: 'Cannot download course materials',
    description: 'The download button for PDF resources in Module 4 is not working. Getting a 404 error every time I try.',
    userName: 'Liam Johnson',
    dateSubmitted: 'Nov 22, 2025',
    status: 'Pending Review',
    category: 'Technical Issue',
    priority: 'Medium',
    relatedCourse: 'Machine Learning Basics'
  },
  {
    id: 'RPT-4567-8901',
    title: 'Course content is outdated',
    description: 'The React course is teaching class components and lifecycle methods, but these are largely deprecated. The course needs to be updated with modern hooks-based approach.',
    userName: 'Ava Anderson',
    dateSubmitted: 'Nov 21, 2025',
    status: 'In Progress',
    category: 'Content Issue',
    priority: 'Medium',
    relatedCourse: 'React for Beginners'
  },
  {
    id: 'RPT-6789-0123',
    title: 'Audio quality issues in lectures',
    description: 'Several videos in Module 5 have very poor audio quality with background noise and echo. Makes it difficult to understand the instructor.',
    userName: 'Noah Davis',
    dateSubmitted: 'Nov 21, 2025',
    status: 'Pending Review',
    category: 'Technical Issue',
    priority: 'High',
    relatedCourse: 'Database Design Fundamentals'
  },
  {
    id: 'RPT-9012-3456',
    title: 'Payment processed but no course access',
    description: 'I purchased "Full Stack Development" course 3 days ago, payment was deducted but I still don\'t have access to the course content.',
    userName: 'Mia Thompson',
    dateSubmitted: 'Nov 20, 2025',
    status: 'In Progress',
    category: 'Course Issue',
    priority: 'Urgent',
    relatedCourse: 'Full Stack Development'
  },
  {
    id: 'RPT-1357-2468',
    title: 'Instructor using inappropriate language',
    description: 'In the live session on Nov 18, the instructor used unprofessional language that was offensive to several students.',
    userName: 'Ethan White',
    dateSubmitted: 'Nov 19, 2025',
    status: 'Resolved',
    category: 'Instructor Issue',
    priority: 'Urgent',
    relatedCourse: 'Digital Marketing Masterclass'
  },
  {
    id: 'RPT-2468-1357',
    title: 'Broken links in course resources',
    description: 'Multiple external links provided in the course materials are broken and returning 404 errors. This includes important reference materials.',
    userName: 'Charlotte Miller',
    dateSubmitted: 'Nov 19, 2025',
    status: 'Pending Review',
    category: 'Content Issue',
    priority: 'Low',
    relatedCourse: 'SEO Fundamentals'
  },
  {
    id: 'RPT-3579-4680',
    title: 'Certificate not generating after completion',
    description: 'I completed all modules and passed the final exam with 95%, but the certificate generation button is not working.',
    userName: 'Benjamin Taylor',
    dateSubmitted: 'Nov 18, 2025',
    status: 'In Progress',
    category: 'Certificate Issue',
    priority: 'High',
    relatedCourse: 'Cloud Computing Essentials'
  },
  {
    id: 'RPT-4680-5791',
    title: 'Code examples not working as shown',
    description: 'The code examples in Module 6 are throwing errors when run exactly as shown in the video. Seems like there are missing dependencies or outdated syntax.',
    userName: 'Amelia Harris',
    dateSubmitted: 'Nov 17, 2025',
    status: 'Resolved',
    category: 'Course Issue',
    priority: 'Medium',
    relatedCourse: 'Node.js Development'
  },
  {
    id: 'RPT-5791-6802',
    title: 'Subtitles are out of sync',
    description: 'All videos in Module 2 have subtitles that are 3-4 seconds ahead of the actual audio. Makes it very confusing to follow along.',
    userName: 'Lucas Martin',
    dateSubmitted: 'Nov 16, 2025',
    status: 'Pending Review',
    category: 'Technical Issue',
    priority: 'Low',
    relatedCourse: 'iOS Development with Swift'
  },
  {
    id: 'RPT-6802-7913',
    title: 'Plagiarized content in course',
    description: 'I noticed that several sections of this course are directly copied from another online resource without attribution. This is concerning.',
    userName: 'Harper Lewis',
    dateSubmitted: 'Nov 15, 2025',
    status: 'In Progress',
    category: 'Content Issue',
    priority: 'Urgent',
    relatedCourse: 'UI/UX Design Principles'
  }
];
