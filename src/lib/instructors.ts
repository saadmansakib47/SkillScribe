export type Instructor = {
  id: number;
  name: string;
  image: string;        // Image path (from /public/Asset/)
  courseIds: number[];  // Courses taught by this instructor
};

export const INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: "Karim Kabir",
    image: "/Asset/karim.jpg",
    courseIds: [15, 6],
  },
  {
    id: 2,
    name: "Daniel Park",
    image: "/Asset/daniel.jpg",
    courseIds: [14, 9],
  },
  {
    id: 3,
    name: "Rohan Patel",
    image: "/Asset/rohan patel.jpg",
    courseIds: [13],
  },
  {
    id: 4,
    name: "Karan Sharma",
    image: "/Asset/karan.jpg",
    courseIds: [18, 8],
  },
  {
    id: 5,
    name: "Morgan Lee",
    image: "/Asset/morgan lee.jpg",
    courseIds: [17, 16, 7],
  },
  {
    id: 6,
    name: "Jashim Uddin",
    image: "/Asset/jashim uddin.jpg",
    courseIds: [21, 4],
  },
  {
    id: 7,
    name: "Emily Rose",
    image: "/Asset/emily rose.jpg",
    courseIds: [20, 3],
  },
  {
    id: 8,
    name: "Samira Khan",
    image: "/Asset/samira.jpg",
    courseIds: [19, 11],
  },
  {
    id: 9,
    name: "Kate Weber",
    image: "/Asset/kate.jpg",
    courseIds: [12, 2],
  },
  {
    id: 10,
    name: "John Hamilton",
    image: "/Asset/john.jpg",
    courseIds: [10, 5],
  },
  {
    id: 11,
    name: "Sadia Islam",
    image: "/Asset/sadia.jpg",
    courseIds: [1],
  },
];
