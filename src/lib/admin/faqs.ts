export type FAQCategory = 'general' | 'technical' | 'billing' | 'account' | 'courses';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: FAQCategory;
  createdAt: string;
  updatedAt: string;
}

export const FAQS: FAQ[] = [
  {
    id: 1,
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the login page and click on "Forgot Password". Enter your email address and we will send you a link to reset your password. The link will be valid for 24 hours.',
    category: 'account',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway.',
    category: 'billing',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: 3,
    question: 'How long do I have access to a course?',
    answer: 'Once you purchase a course, you have lifetime access to all course materials including videos, assignments, and resources. You can learn at your own pace and revisit the content anytime.',
    category: 'courses',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: 4,
    question: 'Can I get a refund for a course?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with the course, you can request a full refund within 30 days of purchase. Please note that the refund policy does not apply if you have completed more than 50% of the course.',
    category: 'billing',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: 5,
    question: 'How do I become an instructor?',
    answer: 'To become an instructor, click on "Become an Instructor" in the top menu. Fill out the application form with your details, expertise, and teaching experience. Upload your CV, teaching certificates, and portfolio. Our team will review your application within 3-5 business days.',
    category: 'general',
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19'
  },
  {
    id: 6,
    question: 'What are the system requirements?',
    answer: 'Our platform works on all modern browsers (Chrome, Firefox, Safari, Edge). For the best experience, we recommend using the latest version of Google Chrome. You will need a stable internet connection with at least 5 Mbps speed for video streaming.',
    category: 'technical',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 7,
    question: 'How do I download course materials?',
    answer: 'Course materials such as PDFs, slides, and resources can be downloaded from the course page. Look for the download icon next to each resource. Some courses may have restrictions on downloading videos for copyright protection.',
    category: 'courses',
    createdAt: '2024-01-21',
    updatedAt: '2024-01-21'
  },
  {
    id: 8,
    question: 'Can I access courses on mobile devices?',
    answer: 'Yes, our platform is fully responsive and works seamlessly on mobile devices and tablets. You can access your courses, watch videos, and complete assignments on any device. We also have mobile apps available for iOS and Android.',
    category: 'technical',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22'
  }
];

export const getCategoryLabel = (category: FAQCategory): string => {
  const labels: Record<FAQCategory, string> = {
    general: 'General',
    technical: 'Technical',
    billing: 'Billing',
    account: 'Account',
    courses: 'Courses'
  };
  return labels[category];
};

export const getCategoryColor = (category: FAQCategory): string => {
  const colors: Record<FAQCategory, string> = {
    general: 'bg-blue-100 text-blue-800',
    technical: 'bg-purple-100 text-purple-800',
    billing: 'bg-green-100 text-green-800',
    account: 'bg-orange-100 text-orange-800',
    courses: 'bg-pink-100 text-pink-800'
  };
  return colors[category];
};
