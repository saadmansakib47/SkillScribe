import { LEARNERS } from './learners';

export type PostCategory = 'Discussion' | 'Question' | 'Announcement' | 'Resources';

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Post {
  id: number;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  category: PostCategory;
  content: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  saves: number;
}

// Helper function to generate realistic timestamps
const getRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date.toISOString();
};

// Generate mock posts from learners
export const POSTS: Post[] = [
  {
    id: 1,
    authorId: 1,
    authorName: LEARNERS[0].name,
    authorAvatar: LEARNERS[0].avatar,
    authorRole: 'Student • Web Development',
    category: 'Discussion',
    content: 'Just completed the JavaScript module! The async/await section was challenging but really rewarding. Anyone else finding promises tricky? Would love to discuss strategies for mastering this concept.',
    createdAt: getRandomDate(0),
    likes: 24,
    saves: 5,
    comments: [
      {
        id: 1,
        postId: 1,
        authorId: 5,
        authorName: LEARNERS[4].name,
        authorAvatar: LEARNERS[4].avatar,
        content: 'Great job! I found that building small projects really helped me understand promises better.',
        createdAt: getRandomDate(0),
        likes: 8,
      },
      {
        id: 2,
        postId: 1,
        authorId: 8,
        authorName: LEARNERS[7].name,
        authorAvatar: LEARNERS[7].avatar,
        content: 'Try the Promise.all() exercises in module 5, they helped me a lot!',
        createdAt: getRandomDate(0),
        likes: 5,
      },
      {
        id: 3,
        postId: 1,
        authorId: 3,
        authorName: LEARNERS[2].name,
        authorAvatar: LEARNERS[2].avatar,
        content: 'Instructor here! The key to understanding promises is to think of them as "I promise to give you a value later." Start by converting callback-based code to promises, then move to async/await. Also, practice error handling with .catch() and try/catch blocks.',
        createdAt: getRandomDate(0),
        likes: 15,
      },
      {
        id: 4,
        postId: 1,
        authorId: 1,
        authorName: LEARNERS[0].name,
        authorAvatar: LEARNERS[0].avatar,
        content: 'Thank you so much! That analogy really helps. I\'ll work on the callback conversion exercises.',
        createdAt: getRandomDate(0),
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    authorId: 3,
    authorName: LEARNERS[2].name,
    authorAvatar: LEARNERS[2].avatar,
    authorRole: 'Instructor • Data Science',
    category: 'Announcement',
    content: 'New course announcement! Starting next week, we\'ll be diving into Advanced Machine Learning techniques. Prerequisites: Python basics and Statistics 101. Early bird registration is now open!',
    createdAt: getRandomDate(0),
    likes: 24,
    saves: 12,
    comments: [
      {
        id: 5,
        postId: 2,
        authorId: 2,
        authorName: LEARNERS[1].name,
        authorAvatar: LEARNERS[1].avatar,
        content: 'Excited for this! Just finished the prerequisites.',
        createdAt: getRandomDate(0),
        likes: 3,
      },
      {
        id: 6,
        postId: 2,
        authorId: 5,
        authorName: LEARNERS[4].name,
        authorAvatar: LEARNERS[4].avatar,
        content: 'Will there be hands-on projects? I learn best by doing.',
        createdAt: getRandomDate(0),
        likes: 7,
      },
      {
        id: 7,
        postId: 2,
        authorId: 3,
        authorName: LEARNERS[2].name,
        authorAvatar: LEARNERS[2].avatar,
        content: 'Absolutely! Each module includes 2-3 real-world projects. We\'ll be working with datasets from Kaggle and building complete ML pipelines.',
        createdAt: getRandomDate(0),
        likes: 12,
      },
    ],
  },
  {
    id: 3,
    authorId: 7,
    authorName: LEARNERS[6].name,
    authorAvatar: LEARNERS[6].avatar,
    authorRole: 'Student • UI/UX Design',
    category: 'Question',
    content: 'What\'s the best way to approach responsive design? Should I start mobile-first or desktop-first? Looking for advice from experienced designers!',
    createdAt: getRandomDate(1),
    likes: 18,
    saves: 3,
    comments: [
      {
        id: 8,
        postId: 3,
        authorId: 4,
        authorName: LEARNERS[3].name,
        authorAvatar: LEARNERS[3].avatar,
        content: 'Mobile-first is generally the way to go! It helps you focus on the essentials.',
        createdAt: getRandomDate(1),
        likes: 7,
      },
      {
        id: 9,
        postId: 3,
        authorId: 9,
        authorName: LEARNERS[8].name,
        authorAvatar: LEARNERS[8].avatar,
        content: 'I agree with mobile-first. It\'s also better for performance optimization.',
        createdAt: getRandomDate(1),
        likes: 4,
      },
      {
        id: 10,
        postId: 3,
        authorId: 7,
        authorName: LEARNERS[6].name,
        authorAvatar: LEARNERS[6].avatar,
        content: 'Thanks! Does anyone have tips for testing responsive designs efficiently?',
        createdAt: getRandomDate(1),
        likes: 2,
      },
      {
        id: 11,
        postId: 3,
        authorId: 1,
        authorName: LEARNERS[0].name,
        authorAvatar: LEARNERS[0].avatar,
        content: 'Chrome DevTools has great device emulation. Also check out responsively.app - it shows multiple breakpoints at once!',
        createdAt: getRandomDate(1),
        likes: 9,
      },
    ],
  },
  {
    id: 4,
    authorId: 5,
    authorName: LEARNERS[4].name,
    authorAvatar: LEARNERS[4].avatar,
    authorRole: 'Student • Machine Learning',
    category: 'Resources',
    content: '📚 Just discovered an amazing resource for learning Python! "Automate the Boring Stuff" has practical projects that really help cement the concepts. Highly recommend checking it out!',
    createdAt: getRandomDate(1),
    likes: 32,
    saves: 15,
    comments: [
      {
        id: 12,
        postId: 4,
        authorId: 6,
        authorName: LEARNERS[5].name,
        authorAvatar: LEARNERS[5].avatar,
        content: 'Thanks for sharing! I\'ve been looking for something like this.',
        createdAt: getRandomDate(1),
        likes: 5,
      },
      {
        id: 13,
        postId: 4,
        authorId: 2,
        authorName: LEARNERS[1].name,
        authorAvatar: LEARNERS[1].avatar,
        content: 'This book is gold! The web scraping and Excel automation chapters are especially useful for data science work.',
        createdAt: getRandomDate(1),
        likes: 8,
      },
      {
        id: 14,
        postId: 4,
        authorId: 10,
        authorName: LEARNERS[9].name,
        authorAvatar: LEARNERS[9].avatar,
        content: 'I\'d also add "Python Crash Course" to this list. Great for beginners!',
        createdAt: getRandomDate(1),
        likes: 6,
      },
    ],
  },
  {
    id: 5,
    authorId: 2,
    authorName: LEARNERS[1].name,
    authorAvatar: LEARNERS[1].avatar,
    authorRole: 'Student • Data Science',
    category: 'Discussion',
    content: 'Having a blast with the Data Visualization course! Creating interactive dashboards is so satisfying. What tools do you all prefer - Tableau, Power BI, or Python libraries?',
    createdAt: getRandomDate(2),
    likes: 15,
    saves: 4,
    comments: [
      {
        id: 15,
        postId: 5,
        authorId: 3,
        authorName: LEARNERS[2].name,
        authorAvatar: LEARNERS[2].avatar,
        content: 'Python libraries like Plotly give you the most flexibility!',
        createdAt: getRandomDate(2),
        likes: 6,
      },
      {
        id: 16,
        postId: 5,
        authorId: 10,
        authorName: LEARNERS[9].name,
        authorAvatar: LEARNERS[9].avatar,
        content: 'I love Tableau for quick visualizations, but Python for custom work.',
        createdAt: getRandomDate(2),
        likes: 4,
      },
      {
        id: 17,
        postId: 5,
        authorId: 5,
        authorName: LEARNERS[4].name,
        authorAvatar: LEARNERS[4].avatar,
        content: 'For anyone starting out, I recommend Plotly + Dash. You can build entire web apps with just Python!',
        createdAt: getRandomDate(2),
        likes: 7,
      },
    ],
  },
  {
    id: 6,
    authorId: 4,
    authorName: LEARNERS[3].name,
    authorAvatar: LEARNERS[3].avatar,
    authorRole: 'Student • Mobile Development',
    category: 'Question',
    content: 'React Native vs Flutter - which one should I learn first? I want to build cross-platform mobile apps. Any advice from mobile developers here?',
    createdAt: getRandomDate(2),
    likes: 21,
    saves: 8,
    comments: [
      {
        id: 18,
        postId: 6,
        authorId: 1,
        authorName: LEARNERS[0].name,
        authorAvatar: LEARNERS[0].avatar,
        content: 'If you already know JavaScript, React Native is a great choice!',
        createdAt: getRandomDate(2),
        likes: 9,
      },
      {
        id: 19,
        postId: 6,
        authorId: 9,
        authorName: LEARNERS[8].name,
        authorAvatar: LEARNERS[8].avatar,
        content: 'Flutter has better performance and the hot reload feature is amazing. Dart is also easier to learn than you might think!',
        createdAt: getRandomDate(2),
        likes: 11,
      },
      {
        id: 20,
        postId: 6,
        authorId: 4,
        authorName: LEARNERS[3].name,
        authorAvatar: LEARNERS[3].avatar,
        content: 'I\'m leaning towards React Native since I\'m comfortable with JS. Thanks everyone!',
        createdAt: getRandomDate(2),
        likes: 4,
      },
    ],
  },
  {
    id: 7,
    authorId: 9,
    authorName: LEARNERS[8].name,
    authorAvatar: LEARNERS[8].avatar,
    authorRole: 'Student • Full Stack Development',
    category: 'Resources',
    content: '🎯 Free resource alert! Microsoft just released a comprehensive guide on TypeScript best practices. Perfect for anyone looking to level up their TS skills. Link in the course materials section!',
    createdAt: getRandomDate(3),
    likes: 28,
    saves: 20,
    comments: [
      {
        id: 21,
        postId: 7,
        authorId: 7,
        authorName: LEARNERS[6].name,
        authorAvatar: LEARNERS[6].avatar,
        content: 'This is gold! Thanks for sharing!',
        createdAt: getRandomDate(3),
        likes: 3,
      },
      {
        id: 22,
        postId: 7,
        authorId: 1,
        authorName: LEARNERS[0].name,
        authorAvatar: LEARNERS[0].avatar,
        content: 'Perfect timing! I just started learning TypeScript. The generics section was really helpful.',
        createdAt: getRandomDate(3),
        likes: 5,
      },
    ],
  },
  {
    id: 8,
    authorId: 6,
    authorName: LEARNERS[5].name,
    authorAvatar: LEARNERS[5].avatar,
    authorRole: 'Student • Graphic Design',
    category: 'Discussion',
    content: 'Just finished my first client project using skills from the Adobe Illustrator course! It\'s amazing how much you can learn in just a few weeks. Keep pushing forward everyone! 💪',
    createdAt: getRandomDate(3),
    likes: 35,
    saves: 7,
    comments: [
      {
        id: 23,
        postId: 8,
        authorId: 8,
        authorName: LEARNERS[7].name,
        authorAvatar: LEARNERS[7].avatar,
        content: 'Congratulations! That\'s a huge milestone!',
        createdAt: getRandomDate(3),
        likes: 5,
      },
      {
        id: 24,
        postId: 8,
        authorId: 2,
        authorName: LEARNERS[1].name,
        authorAvatar: LEARNERS[1].avatar,
        content: 'Awesome! Would love to see your work if you\'re willing to share!',
        createdAt: getRandomDate(3),
        likes: 4,
      },
      {
        id: 25,
        postId: 8,
        authorId: 6,
        authorName: LEARNERS[5].name,
        authorAvatar: LEARNERS[5].avatar,
        content: 'Thank you! I\'ll post it in the design showcase channel. Any tips for pricing freelance work?',
        createdAt: getRandomDate(3),
        likes: 3,
      },
      {
        id: 26,
        postId: 8,
        authorId: 7,
        authorName: LEARNERS[6].name,
        authorAvatar: LEARNERS[6].avatar,
        content: 'Start by researching market rates in your area. Don\'t undersell yourself - factor in revisions and communication time too!',
        createdAt: getRandomDate(3),
        likes: 8,
      },
    ],
  },
  {
    id: 9,
    authorId: 10,
    authorName: LEARNERS[9].name,
    authorAvatar: LEARNERS[9].avatar,
    authorRole: 'Student • Cloud Computing',
    category: 'Question',
    content: 'How do you handle debugging in production environments? I\'m working on my first deployment and want to make sure I\'m following best practices. Any tips?',
    createdAt: getRandomDate(4),
    likes: 16,
    saves: 6,
    comments: [
      {
        id: 27,
        postId: 9,
        authorId: 5,
        authorName: LEARNERS[4].name,
        authorAvatar: LEARNERS[4].avatar,
        content: 'Logging is your best friend! Set up proper logging from day one.',
        createdAt: getRandomDate(4),
        likes: 8,
      },
      {
        id: 28,
        postId: 9,
        authorId: 3,
        authorName: LEARNERS[2].name,
        authorAvatar: LEARNERS[2].avatar,
        content: 'Instructor here! Great question. Always use environment-specific logging levels. Use tools like Sentry or LogRocket for error tracking. Never log sensitive data. And most importantly - have monitoring and alerting set up BEFORE you deploy!',
        createdAt: getRandomDate(4),
        likes: 18,
      },
      {
        id: 29,
        postId: 9,
        authorId: 9,
        authorName: LEARNERS[8].name,
        authorAvatar: LEARNERS[8].avatar,
        content: 'Also recommend setting up a staging environment that mirrors production. Test thoroughly there first!',
        createdAt: getRandomDate(4),
        likes: 10,
      },
      {
        id: 30,
        postId: 9,
        authorId: 10,
        authorName: LEARNERS[9].name,
        authorAvatar: LEARNERS[9].avatar,
        content: 'This is incredibly helpful! Setting up Sentry now. Thank you!',
        createdAt: getRandomDate(4),
        likes: 4,
      },
    ],
  },
  {
    id: 10,
    authorId: 8,
    authorName: LEARNERS[7].name,
    authorAvatar: LEARNERS[7].avatar,
    authorRole: 'Student • Web Development',
    category: 'Resources',
    content: '🚀 Sharing my favorite VS Code extensions for web development: ES7 React snippets, Prettier, GitLens, and Live Server. These have saved me countless hours!',
    createdAt: getRandomDate(5),
    likes: 41,
    saves: 25,
    comments: [
      {
        id: 31,
        postId: 10,
        authorId: 1,
        authorName: LEARNERS[0].name,
        authorAvatar: LEARNERS[0].avatar,
        content: 'GitLens is a game changer! Adding it now.',
        createdAt: getRandomDate(5),
        likes: 6,
      },
      {
        id: 32,
        postId: 10,
        authorId: 4,
        authorName: LEARNERS[3].name,
        authorAvatar: LEARNERS[3].avatar,
        content: 'Don\'t forget Error Lens! It\'s amazing for catching errors early.',
        createdAt: getRandomDate(5),
        likes: 7,
      },
      {
        id: 33,
        postId: 10,
        authorId: 2,
        authorName: LEARNERS[1].name,
        authorAvatar: LEARNERS[1].avatar,
        content: 'I\'d add Auto Rename Tag and Path Intellisense to this list. Total productivity boosters!',
        createdAt: getRandomDate(5),
        likes: 9,
      },
    ],
  },
  {
    id: 11,
    authorId: 4,
    authorName: LEARNERS[3].name,
    authorAvatar: LEARNERS[3].avatar,
    authorRole: 'Student • Mobile Development',
    category: 'Question',
    content: 'Stuck on implementing authentication in my React app. Should I build it from scratch or use a service like Auth0 or Firebase? What are the pros and cons?',
    createdAt: getRandomDate(0),
    likes: 27,
    saves: 11,
    comments: [
      {
        id: 34,
        postId: 11,
        authorId: 9,
        authorName: LEARNERS[8].name,
        authorAvatar: LEARNERS[8].avatar,
        content: 'For learning purposes, build it yourself once to understand the concepts. For production, definitely use a service!',
        createdAt: getRandomDate(0),
        likes: 14,
      },
      {
        id: 35,
        postId: 11,
        authorId: 3,
        authorName: LEARNERS[2].name,
        authorAvatar: LEARNERS[2].avatar,
        content: 'Instructor perspective: Security is complex. Unless you\'re a security expert, use established services. They handle token management, password hashing, OAuth, etc. Firebase Auth is great for getting started quickly!',
        createdAt: getRandomDate(0),
        likes: 22,
      },
      {
        id: 36,
        postId: 11,
        authorId: 1,
        authorName: LEARNERS[0].name,
        authorAvatar: LEARNERS[0].avatar,
        content: 'I used NextAuth.js in my recent project. Super easy to set up and works great with Next.js!',
        createdAt: getRandomDate(0),
        likes: 8,
      },
      {
        id: 37,
        postId: 11,
        authorId: 4,
        authorName: LEARNERS[3].name,
        authorAvatar: LEARNERS[3].avatar,
        content: 'Thanks everyone! I\'ll start with Firebase Auth for this project.',
        createdAt: getRandomDate(0),
        likes: 3,
      },
    ],
  },
  {
    id: 12,
    authorId: 2,
    authorName: LEARNERS[1].name,
    authorAvatar: LEARNERS[1].avatar,
    authorRole: 'Student • Data Science',
    category: 'Discussion',
    content: 'Just had my first data science interview! They asked me to explain the difference between supervised and unsupervised learning. Felt confident thanks to this course. Anyone else preparing for interviews? Let\'s share tips!',
    createdAt: getRandomDate(1),
    likes: 38,
    saves: 14,
    comments: [
      {
        id: 38,
        postId: 12,
        authorId: 5,
        authorName: LEARNERS[4].name,
        authorAvatar: LEARNERS[4].avatar,
        content: 'Congrats on the interview! Did they ask any coding questions?',
        createdAt: getRandomDate(1),
        likes: 5,
      },
      {
        id: 39,
        postId: 12,
        authorId: 2,
        authorName: LEARNERS[1].name,
        authorAvatar: LEARNERS[1].avatar,
        content: 'Yes! They had me write a function to clean and preprocess a dataset. Practice your pandas operations!',
        createdAt: getRandomDate(1),
        likes: 12,
      },
      {
        id: 40,
        postId: 12,
        authorId: 3,
        authorName: LEARNERS[2].name,
        authorAvatar: LEARNERS[2].avatar,
        content: 'Great job! Pro tip for everyone: Always be ready to explain your thought process. Interviewers care more about how you approach problems than getting the perfect answer.',
        createdAt: getRandomDate(1),
        likes: 20,
      },
      {
        id: 41,
        postId: 12,
        authorId: 10,
        authorName: LEARNERS[9].name,
        authorAvatar: LEARNERS[9].avatar,
        content: 'I have an interview next week! This is super helpful. Thanks for sharing your experience!',
        createdAt: getRandomDate(1),
        likes: 6,
      },
    ],
  },
];

// Helper functions
export const getPostsByCategory = (category: PostCategory | 'All'): Post[] => {
  if (category === 'All') return POSTS;
  return POSTS.filter(post => post.category === category);
};

export const getPostById = (id: number): Post | undefined => {
  return POSTS.find(post => post.id === id);
};

export const getCommentsByPostId = (postId: number): Comment[] => {
  const post = POSTS.find(p => p.id === postId);
  return post?.comments || [];
};

// Format time ago
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return 'just now';
};
