// File: lib/instructors.ts
import { COURSES } from './courses';

export type SocialLinks = {
  website?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
};

export type Instructor = {
  id: number;
  name: string;
  image: string;
  courseIds: number[];
  bio: string;
  expertise: string[];
  totalStudents: number;
  totalReviews: number;
  rating: number;
  totalTeachingHours: number;
  joinedDate: string;
  social?: SocialLinks;
  location?: string;
};

export const INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: 'Karim Kabir',
    image: '/Asset/karim.jpg',
    courseIds: [15, 6],
    bio: 'Experienced software engineer specializing in backend systems and clean architecture.',
    expertise: ['Backend Development', 'System Design'],
    totalStudents: 4200,
    totalReviews: 350,
    rating: 4.7,
    totalTeachingHours: 48,
    joinedDate: '2020-04-10',
    social: {},
    location: 'Bangladesh',
  },
  {
    id: 2,
    name: 'Daniel Park',
    image: '/Asset/daniel.jpg',
    courseIds: [14, 9],
    bio: 'Full‑stack developer and educator passionate about modern JavaScript technologies.',
    expertise: ['React', 'Node.js', 'Full‑Stack'],
    totalStudents: 6800,
    totalReviews: 510,
    rating: 4.8,
    totalTeachingHours: 62,
    joinedDate: '2019-11-20',
    social: {},
    location: 'South Korea',
  },
  {
    id: 3,
    name: 'Rohan Patel',
    image: '/Asset/rohan patel.jpg',
    courseIds: [13],
    bio: 'Cloud engineer focused on building scalable, distributed infrastructures.',
    expertise: ['AWS', 'DevOps'],
    totalStudents: 2300,
    totalReviews: 180,
    rating: 4.6,
    totalTeachingHours: 22,
    joinedDate: '2021-01-15',
    social: {},
    location: 'India',
  },
  {
    id: 4,
    name: 'Karan Sharma',
    image: '/Asset/karan.jpg',
    courseIds: [18, 8],
    bio: 'Cybersecurity trainer with hands‑on expertise in ethical hacking and digital forensics.',
    expertise: ['Cybersecurity', 'Ethical Hacking'],
    totalStudents: 5100,
    totalReviews: 390,
    rating: 4.7,
    totalTeachingHours: 55,
    joinedDate: '2020-08-05',
    social: {},
    location: 'India',
  },
  {
    id: 5,
    name: 'Morgan Lee',
    image: '/Asset/morgan lee.jpg',
    courseIds: [17, 16, 7],
    bio: 'UI/UX expert helping students craft beautiful, user‑centric digital experiences.',
    expertise: ['UI/UX', 'Product Design'],
    totalStudents: 8700,
    totalReviews: 720,
    rating: 4.9,
    totalTeachingHours: 68,
    joinedDate: '2018-06-12',
    social: {},
    location: 'USA',
  },
  {
    id: 6,
    name: 'Jashim Uddin',
    image: '/Asset/jashim uddin.jpg',
    courseIds: [21, 4],
    bio: 'Machine learning researcher with 8+ years of experience in AI and Deep Learning.',
    expertise: ['Machine Learning', 'Deep Learning'],
    totalStudents: 10200,
    totalReviews: 1850,
    rating: 4.8,
    totalTeachingHours: 80,
    joinedDate: '2017-09-03',
    social: {},
    location: 'Bangladesh',
  },
  {
    id: 7,
    name: 'Emily Rose',
    image: '/Asset/emily rose.jpg',
    courseIds: [20, 3],
    bio: 'Digital marketing strategist helping brands scale using data‑driven methods.',
    expertise: ['Marketing', 'Branding'],
    totalStudents: 5400,
    totalReviews: 410,
    rating: 4.7,
    totalTeachingHours: 46,
    joinedDate: '2019-03-18',
    social: {},
    location: 'UK',
  },
  {
    id: 8,
    name: 'Samira Khan',
    image: '/Asset/samira.jpg',
    courseIds: [19, 11],
    bio: 'Data analyst passionate about simplifying data for real‑world business impact.',
    expertise: ['Data Analysis', 'Power BI'],
    totalStudents: 3600,
    totalReviews: 290,
    rating: 4.6,
    totalTeachingHours: 40,
    joinedDate: '2020-10-09',
    social: {},
    location: 'Pakistan',
  },
  {
    id: 9,
    name: 'Kate Weber',
    image: '/Asset/kate.jpg',
    courseIds: [12, 2],
    bio: 'Creative designer with extensive experience in digital illustration and branding.',
    expertise: ['Illustration', 'Brand Identity'],
    totalStudents: 4400,
    totalReviews: 330,
    rating: 4.7,
    totalTeachingHours: 38,
    joinedDate: '2018-09-30',
    social: {},
    location: 'Germany',
  },
  {
    id: 10,
    name: 'John Hamilton',
    image: '/Asset/john.jpg',
    courseIds: [10, 5],
    bio: 'Experienced mobile app developer teaching practical iOS and Android workflows.',
    expertise: ['Flutter', 'Mobile Development'],
    totalStudents: 7200,
    totalReviews: 580,
    rating: 4.8,
    totalTeachingHours: 58,
    joinedDate: '2019-02-01',
    social: {},
    location: 'Canada',
  },
  {
    id: 11,
    name: 'Sadia Islam',
    image: '/Asset/sadia.jpg',
    courseIds: [1],
    bio: 'Beginner‑friendly programming instructor focusing on strong fundamentals.',
    expertise: ['Python', 'Programming'],
    totalStudents: 1900,
    totalReviews: 140,
    rating: 4.6,
    totalTeachingHours: 18,
    joinedDate: '2021-05-11',
    social: {},
    location: 'Bangladesh',
  },
];

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


