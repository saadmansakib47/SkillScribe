// File: lib/admin/instructorApplications.ts

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface Credential {
  type: 'cv' | 'certificate' | 'portfolio';
  url: string;
  name: string;
}

export interface InstructorApplication {
  id: number;
  name: string;
  email: string;
  applicationDate: string;
  status: ApplicationStatus;
  credentials: Credential[];
  appliedFor?: string;
  rejectionReason?: string;
}

// Mock instructor application data
export const INSTRUCTOR_APPLICATIONS: InstructorApplication[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    applicationDate: '2024-11-15',
    status: 'pending',
    credentials: [
      { type: 'cv', url: '/documents/cv-sarah.pdf', name: 'Sarah_Mitchell_CV.pdf' },
      { type: 'certificate', url: '/documents/cert-sarah.pdf', name: 'Teaching_Certificate.pdf' },
      { type: 'portfolio', url: 'https://sarahmitchell.com', name: 'Portfolio Website' }
    ],
    appliedFor: 'Web Development'
  },
  {
    id: 2,
    name: 'Robert Chen',
    email: 'robert.chen@email.com',
    applicationDate: '2024-11-14',
    status: 'pending',
    credentials: [
      { type: 'cv', url: '/documents/cv-robert.pdf', name: 'Robert_Chen_Resume.pdf' },
      { type: 'certificate', url: '/documents/cert-robert.pdf', name: 'AWS_Certification.pdf' }
    ],
    appliedFor: 'Cloud Computing'
  },
  {
    id: 3,
    name: 'Amanda Rodriguez',
    email: 'amanda.r@email.com',
    applicationDate: '2024-11-13',
    status: 'pending',
    credentials: [
      { type: 'cv', url: '/documents/cv-amanda.pdf', name: 'Amanda_Rodriguez_CV.pdf' },
      { type: 'portfolio', url: 'https://amandarodriguez.design', name: 'Design Portfolio' }
    ],
    appliedFor: 'UI/UX Design'
  },
  {
    id: 4,
    name: 'Michael Zhang',
    email: 'michael.zhang@email.com',
    applicationDate: '2024-11-12',
    status: 'pending',
    credentials: [
      { type: 'cv', url: '/documents/cv-michael.pdf', name: 'Michael_Zhang_CV.pdf' },
      { type: 'certificate', url: '/documents/cert-michael.pdf', name: 'Data_Science_Certificate.pdf' },
      { type: 'portfolio', url: 'https://github.com/mzhang', name: 'GitHub Portfolio' }
    ],
    appliedFor: 'Data Science'
  },
  {
    id: 5,
    name: 'Jennifer Walsh',
    email: 'jennifer.walsh@email.com',
    applicationDate: '2024-11-10',
    status: 'approved',
    credentials: [
      { type: 'cv', url: '/documents/cv-jennifer.pdf', name: 'Jennifer_Walsh_Resume.pdf' },
      { type: 'certificate', url: '/documents/cert-jennifer.pdf', name: 'Teaching_License.pdf' }
    ],
    appliedFor: 'Digital Marketing'
  },
  {
    id: 6,
    name: 'David Kumar',
    email: 'david.kumar@email.com',
    applicationDate: '2024-11-08',
    status: 'rejected',
    credentials: [
      { type: 'cv', url: '/documents/cv-david.pdf', name: 'David_Kumar_CV.pdf' }
    ],
    appliedFor: 'Mobile Development',
    rejectionReason: 'Insufficient teaching experience and missing required certifications.'
  }
];

// Helper functions
export function getApplicationById(id: number): InstructorApplication | undefined {
  return INSTRUCTOR_APPLICATIONS.find(app => app.id === id);
}

export function getApplicationsByStatus(status: ApplicationStatus): InstructorApplication[] {
  return INSTRUCTOR_APPLICATIONS.filter(app => app.status === status);
}

export function getPendingApplicationsCount(): number {
  return INSTRUCTOR_APPLICATIONS.filter(app => app.status === 'pending').length;
}
