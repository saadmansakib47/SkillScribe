export type Review = {
  id: number;
  courseId: number;
  userName: string;
  rating: number; // 1-5
  date: string;
  text: string;
  instructorReply?: string;
};

// Sample reviews for different courses
const REVIEWS: Review[] = [
  // Course 1 - Web Development with MERN (4.8 rating - mostly high)
  {
    id: 1,
    courseId: 1,
    userName: 'Alice Brown',
    rating: 5,
    date: '5d ago',
    text: 'Perfect MERN stack course! The project-based approach helped me build a real fullstack app. The authentication module was especially well explained.',
    instructorReply: 'Thank you Alice! So happy to see you building real applications!',
  },
  {
    id: 2,
    courseId: 1,
    userName: 'Robert Taylor',
    rating: 5,
    date: '2w ago',
    text: 'Best MERN course available! Sadia explains everything clearly and the starter templates saved me so much time. Already deployed my first app!',
  },
  {
    id: 3,
    courseId: 1,
    userName: 'Jennifer Martinez',
    rating: 4,
    date: '3w ago',
    text: 'Excellent course with comprehensive coverage. The MongoDB section could use more advanced patterns, but overall fantastic!',
    instructorReply: 'Thanks for the feedback Jennifer! I\'ll add more advanced MongoDB content in the next update.',
  },
  {
    id: 4,
    courseId: 1,
    userName: 'Mark Stevens',
    rating: 5,
    date: '1mo ago',
    text: 'This course helped me land my first developer job! The deployment section was crucial. Thank you Sadia!',
  },
  {
    id: 5,
    courseId: 1,
    userName: 'Sophie Williams',
    rating: 4,
    date: '2mo ago',
    text: 'Great MERN stack course! The MongoDB integration was well explained. Would love to see more on testing strategies.',
  },

  // Course 2 - Manual and Automated Testing (4.7 rating - mostly high)
  {
    id: 6,
    courseId: 2,
    userName: 'James Anderson',
    rating: 5,
    date: '1w ago',
    text: 'Kate is an amazing instructor! The automation section with real CI pipeline examples was gold. Already implementing these at work.',
    instructorReply: 'Thanks James! Love hearing you\'re applying this in real projects!',
  },
  {
    id: 7,
    courseId: 2,
    userName: 'Lisa Thompson',
    rating: 5,
    date: '2w ago',
    text: 'Very practical testing course. The test scripts and templates are immediately useful. Perfect for QA engineers at any level.',
  },
  {
    id: 8,
    courseId: 2,
    userName: 'Kevin Park',
    rating: 4,
    date: '3w ago',
    text: 'Great balance between manual and automated testing. The frameworks comparison helped me choose the right tools for my team.',
  },
  {
    id: 9,
    courseId: 2,
    userName: 'Rachel Green',
    rating: 5,
    date: '1mo ago',
    text: 'Best testing course I\'ve taken! The hands-on labs really solidified my understanding. The bug reporting templates are fantastic!',
    instructorReply: 'So glad the labs helped Rachel! Keep testing and breaking things! 😊',
  },
  {
    id: 10,
    courseId: 2,
    userName: 'Brian Foster',
    rating: 4,
    date: '2mo ago',
    text: 'Solid testing course with good coverage. The Postman collections are super useful. Could use more on mobile testing.',
  },

  // Course 3 - HTML, CSS, JS Basics
  {
    id: 11,
    courseId: 3,
    userName: 'Daniel Harris',
    rating: 3,
    date: '3w ago',
    text: 'Decent beginner course. Covers the basics well but lacks depth in some areas. The boilerplate code is helpful though.',
  },
  {
    id: 12,
    courseId: 3,
    userName: 'Sophia Chen',
    rating: 4,
    date: '1mo ago',
    text: 'Great starting point for web development! The responsive design patterns were really useful. Built my first website!',
    instructorReply: 'Congratulations on your first website Sophia! Keep building!',
  },
  {
    id: 13,
    courseId: 3,
    userName: 'Tyler Brooks',
    rating: 2,
    date: '2mo ago',
    text: 'Course content is okay but presentation needs work. The CSS sections are good but JavaScript examples are too basic. Expected more depth.',
  },
  {
    id: 14,
    courseId: 3,
    userName: 'Christopher Lee',
    rating: 4,
    date: '4d ago',
    text: 'Solid introduction to frontend development. Emily explains concepts clearly. Would love more advanced JavaScript topics though.',
  },
  {
    id: 15,
    courseId: 3,
    userName: 'Amanda White',
    rating: 3,
    date: '1w ago',
    text: 'Good course for absolute beginners. The CSS Grid and Flexbox sections were excellent. Some JavaScript topics felt rushed.',
  },

  // Course 4 - Data Science with Python (3.9 rating - mix of 2-5)
  {
    id: 16,
    courseId: 4,
    userName: 'Alex Turner',
    rating: 5,
    date: '3w ago',
    text: 'Great introduction to data science! Jashim explains complex concepts well. The Jupyter notebooks are well-organized.',
    instructorReply: 'Thanks Alex! The notebooks are designed for easy follow-along. Keep learning!',
  },
  {
    id: 17,
    courseId: 4,
    userName: 'Rachel Kim',
    rating: 4,
    date: '1mo ago',
    text: 'Solid data science course! The feature engineering section was particularly helpful. Already applying these at work.',
  },
  {
    id: 18,
    courseId: 4,
    userName: 'Maya Rodriguez',
    rating: 3,
    date: '3d ago',
    text: 'Comprehensive content but pacing is uneven. The Pandas sections are excellent but machine learning feels rushed.',
  },
  {
    id: 19,
    courseId: 4,
    userName: 'Thomas Wright',
    rating: 4,
    date: '1w ago',
    text: 'Good course but quite challenging. Make sure you have Python basics down before starting. The modeling section was great!',
  },
  {
    id: 20,
    courseId: 4,
    userName: 'Emily Foster',
    rating: 3,
    date: '2w ago',
    text: 'Solid content but moves quite fast. The visualization examples are helpful. Could use more real-world case studies.',
  },

  // Course 5 - UI/UX Fundamentals (2.9 rating - mostly low)
  {
    id: 21,
    courseId: 5,
    userName: 'David Kumar',
    rating: 3,
    date: '6d ago',
    text: 'Basic UI/UX course. Good for complete beginners but lacks advanced design principles. The UI kit is useful though.',
  },
  {
    id: 22,
    courseId: 5,
    userName: 'Sarah Mitchell',
    rating: 3,
    date: '2w ago',
    text: 'Covers the fundamentals but feels outdated. The Figma section needs updating. Color theory part was good.',
  },
  {
    id: 23,
    courseId: 5,
    userName: 'Michael Zhang',
    rating: 2,
    date: '3w ago',
    text: 'Not what I expected. The course is too basic and some sections feel rushed. Would not recommend for intermediate designers.',
  },
  {
    id: 24,
    courseId: 5,
    userName: 'Jessica Brown',
    rating: 3,
    date: '1mo ago',
    text: 'Okay for absolute beginners. The wireframing templates are helpful but the course lacks depth in user research.',
  },
  {
    id: 25,
    courseId: 5,
    userName: 'Nathan Price',
    rating: 2,
    date: '2mo ago',
    text: 'Expected more from this course. Content feels rushed and some design principles are oversimplified. UI kit is the only highlight.',
  },

  // Course 6 - Web Development Bootcamp (4.9 rating - mostly high)
  {
    id: 26,
    courseId: 6,
    userName: 'Ryan Cooper',
    rating: 5,
    date: '4d ago',
    text: 'Absolutely amazing! Karim is an incredible teacher. Went from zero to deploying a fullstack app. Best bootcamp ever!',
    instructorReply: 'Thanks Ryan! Can\'t wait to see what you build next!',
  },
  {
    id: 27,
    courseId: 6,
    userName: 'Natalie King',
    rating: 5,
    date: '1w ago',
    text: 'Perfect for beginners! The Node.js section was especially helpful. The starter templates are production-ready.',
  },
  {
    id: 28,
    courseId: 6,
    userName: 'Brandon Lewis',
    rating: 5,
    date: '2w ago',
    text: 'This course changed my career! Started with zero coding knowledge and now I\'m building web apps. Thank you Karim!',
    instructorReply: 'That\'s incredible Brandon! Your dedication really shows!',
  },
  {
    id: 29,
    courseId: 6,
    userName: 'Olivia Martinez',
    rating: 4,
    date: '3w ago',
    text: 'Great value for money! The course is comprehensive and well-structured. Some sections could be updated but overall excellent.',
  },
  {
    id: 30,
    courseId: 6,
    userName: 'Jacob Thompson',
    rating: 5,
    date: '1mo ago',
    text: 'Phenomenal course! Karim\'s teaching style is engaging and easy to follow. The projects are practical and fun to build.',
    instructorReply: 'Thanks Jacob! Can\'t wait to see what you build next!',
  },

  // Course 7 - Advanced React Patterns (4.4 rating - good mix)
  {
    id: 31,
    courseId: 7,
    userName: 'Jason Lee',
    rating: 5,
    date: '5d ago',
    text: 'Excellent advanced React course! The hooks deep-dive and performance optimization sections are worth the price alone.',
    instructorReply: 'Thanks Jason! Glad the performance patterns helped!',
  },
  {
    id: 32,
    courseId: 7,
    userName: 'Michelle Garcia',
    rating: 4,
    date: '1w ago',
    text: 'Very solid advanced course. Morgan knows React inside out. The custom hooks section was particularly insightful.',
  },
  {
    id: 33,
    courseId: 7,
    userName: 'Patrick Wilson',
    rating: 3,
    date: '2w ago',
    text: 'Good patterns but too advanced for most. The context patterns are useful but explanations assume deep React knowledge.',
  },
  {
    id: 34,
    courseId: 7,
    userName: 'Laura Adams',
    rating: 4,
    date: '3w ago',
    text: 'Great course for intermediate to advanced developers. The profiling and code-splitting sections saved me hours of research.',
    instructorReply: 'Love hearing about performance wins Laura! Keep optimizing!',
  },
  {
    id: 35,
    courseId: 7,
    userName: 'Eric Martinez',
    rating: 5,
    date: '1mo ago',
    text: 'Morgan is a React expert! The advanced patterns and best practices transformed my codebase. Worth every penny!',
  },

  // Course 8 - Python Crash Course (4.6 rating - mostly high)
  {
    id: 36,
    courseId: 8,
    userName: 'Carlos Diaz',
    rating: 5,
    date: '3d ago',
    text: 'Perfect crash course! Karan covers a lot in short time without overwhelming. The decorators section finally clicked for me!',
    instructorReply: 'That\'s awesome Carlos! Decorators can be tricky but so powerful!',
  },
  {
    id: 37,
    courseId: 8,
    userName: 'Hannah Scott',
    rating: 5,
    date: '1w ago',
    text: 'Great for developers from other languages. Fast-paced but very efficient. The scripting examples are immediately useful.',
  },
  {
    id: 38,
    courseId: 8,
    userName: 'Derek Johnson',
    rating: 3,
    date: '2w ago',
    text: 'Moves way too fast. The generators and context managers sections need more examples. Good for review, not for learning.',
  },
  {
    id: 39,
    courseId: 8,
    userName: 'Victoria Chen',
    rating: 5,
    date: '1mo ago',
    text: 'Best Python course for busy people! Learned more in 8 hours than I did in weeks of self-study. Highly recommend!',
  },
  {
    id: 40,
    courseId: 8,
    userName: 'Isaiah Johnson',
    rating: 5,
    date: '2mo ago',
    text: 'Excellent crash course! Karan covers everything efficiently. The code examples are clean and practical.',
  },

  // Course 9 - Intro to Database (4.0 rating - good mix)
  {
    id: 41,
    courseId: 9,
    userName: 'Marcus Thompson',
    rating: 5,
    date: '7d ago',
    text: 'Excellent introduction to databases! The ER modeling section was crystal clear. Covers both SQL and NoSQL perfectly.',
  },
  {
    id: 42,
    courseId: 9,
    userName: 'Nina Patel',
    rating: 4,
    date: '2w ago',
    text: 'Solid fundamentals course. Daniel explains normalization really well. The NoSQL patterns section could be expanded.',
    instructorReply: 'Thanks Nina! I\'ll add more NoSQL content in future updates!',
  },
  {
    id: 43,
    courseId: 9,
    userName: 'Gregory Hall',
    rating: 3,
    date: '3w ago',
    text: 'Good for beginners but needs more depth. The SQL sections are okay but I expected more on performance tuning.',
  },
  {
    id: 44,
    courseId: 9,
    userName: 'Samantha Reed',
    rating: 4,
    date: '1mo ago',
    text: 'Very practical database course. The schema design examples are great. Good balance between relational and NoSQL.',
  },
  {
    id: 45,
    courseId: 9,
    userName: 'Adrian Scott',
    rating: 4,
    date: '2mo ago',
    text: 'Good introduction to databases! Daniel explains concepts clearly. The SQL practice queries were helpful.',
    instructorReply: 'Thanks Adrian! Practice makes perfect with SQL!',
  },

  // Course 10 - Design Thinking for Product Teams (4.1 rating - good mix)
  {
    id: 46,
    courseId: 10,
    userName: 'Andrew Kim',
    rating: 4,
    date: '4d ago',
    text: 'Great introduction to design thinking! The user research templates are immediately useful. Perfect for product managers.',
    instructorReply: 'Thanks Andrew! Hope you find success using these methods with your team!',
  },
  {
    id: 47,
    courseId: 10,
    userName: 'Rebecca Torres',
    rating: 4,
    date: '1w ago',
    text: 'Very practical course! The prototyping workshops were excellent. John provides great real-world examples.',
  },
  {
    id: 48,
    courseId: 10,
    userName: 'Steven Morris',
    rating: 3,
    date: '2w ago',
    text: 'Solid basics but could use more depth. The persona templates are helpful but the workshop section feels rushed.',
  },
  {
    id: 49,
    courseId: 10,
    userName: 'Ashley Cooper',
    rating: 5,
    date: '3w ago',
    text: 'Excellent course! Changed how our team approaches product development. The design templates package is fantastic!',
    instructorReply: 'Love hearing this Ashley! Design thinking really transforms teams!',
  },
  {
    id: 50,
    courseId: 10,
    userName: 'Marcus Rivera',
    rating: 4,
    date: '1mo ago',
    text: 'Great design thinking course! The empathy and research section was eye-opening. John provides excellent frameworks.',
  },

  // Course 11 - Node.js APIs and Microservices (3.3 rating - lower rated)
  {
    id: 51,
    courseId: 11,
    userName: 'Richard Foster',
    rating: 2,
    date: '6d ago',
    text: 'Disappointing course. Too advanced with poor explanations. The microservices patterns are covered too quickly without enough context.',
  },
  {
    id: 52,
    courseId: 11,
    userName: 'Jennifer Walsh',
    rating: 3,
    date: '1w ago',
    text: 'Good content but presentation could be better. The observability section was useful. Needs more beginner-friendly explanations.',
  },
  {
    id: 53,
    courseId: 11,
    userName: 'Paul Anderson',
    rating: 4,
    date: '2w ago',
    text: 'Solid advanced Node course. The communication patterns and sagas sections were excellent. Worth it for experienced developers.',
    instructorReply: 'Thanks Paul! This course is definitely aimed at developers with some backend experience.',
  },
  {
    id: 54,
    courseId: 11,
    userName: 'Christine Lee',
    rating: 3,
    date: '1mo ago',
    text: 'Covers important topics but the pacing is uneven. The database integration section was good. Could use more practical examples.',
  },
  {
    id: 55,
    courseId: 11,
    userName: 'Trevor Adams',
    rating: 3,
    date: '2mo ago',
    text: 'Advanced content but not well-structured. Some concepts are rushed. Better for experienced Node developers only.',
  },

  // Course 12 - Complete Software Testing Mastery
  {
    id: 56,
    courseId: 12,
    userName: 'Sarah Johnson',
    rating: 5,
    date: '1w ago',
    text: 'The course content is excellent and well-structured. The API testing with Postman section saved me so much time!',
  },
  {
    id: 57,
    courseId: 12,
    userName: 'Michael Chen',
    rating: 4,
    date: '2w ago',
    text: 'Outstanding course! The instructor explains complex testing concepts clearly. The CI integration examples are practical.',
    instructorReply: 'So glad you found the CI section helpful Michael!',
  },
  {
    id: 58,
    courseId: 12,
    userName: 'Emily Davis',
    rating: 5,
    date: '3w ago',
    text: 'Very comprehensive testing course. Perfect pace for learning. The test case templates are a huge timesaver!',
  },
  {
    id: 59,
    courseId: 12,
    userName: 'David Wilson',
    rating: 5,
    date: '1mo ago',
    text: 'This course exceeded my expectations! Kate is fantastic and very knowledgeable. Already using Selenium at work!',
  },
  {
    id: 60,
    courseId: 12,
    userName: 'Melissa Carter',
    rating: 3,
    date: '1mo ago',
    text: 'Decent course but automation section could be more in-depth. Manual testing is well covered. Would like more advanced topics.',
  },
];

/**
 * Get all reviews for a specific course, sorted by most recent first
 */
export function getReviewsForCourse(courseId: number): Review[] {
  return REVIEWS.filter((review) => review.courseId === courseId).sort(
    (a, b) => {
      // This is a simple sort by id descending (newer reviews have higher ids)
      // In a real app, you'd sort by actual date
      return b.id - a.id;
    }
  );
}

/**
 * Get a single review by id
 */
export function getReviewById(reviewId: number): Review | undefined {
  return REVIEWS.find((review) => review.id === reviewId);
}

/**
 * Add a new review (in a real app, this would make an API call)
 * Returns the new review with an assigned id
 */
export function addReview(
  courseId: number,
  userName: string,
  rating: number,
  text: string
): Review {
  const newReview: Review = {
    id: REVIEWS.length + 1,
    courseId,
    userName,
    rating,
    date: 'Just now',
    text,
  };
  
  REVIEWS.unshift(newReview); // Add to beginning of array
  return newReview;
}
