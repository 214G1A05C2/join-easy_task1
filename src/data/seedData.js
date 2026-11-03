/**
 * Seed data for Joineazy Assignment & Review Dashboard
 */

export const INITIAL_USERS = [
  {
    id: 'usr-admin-1',
    email: 'admin1@joineazy.com',
    name: 'Dr. Robert Vance',
    role: 'admin',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-admin-2',
    email: 'admin2@joineazy.com',
    name: 'Prof. Elena Rostova',
    role: 'admin',
    department: 'Information Technology & Design',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-std-1',
    email: 'student1@joineazy.com',
    name: 'Alex Johnson',
    role: 'student',
    studentId: 'JE-2024-001',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-std-2',
    email: 'student2@joineazy.com',
    name: 'Priya Sharma',
    role: 'student',
    studentId: 'JE-2024-002',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-std-3',
    email: 'student3@joineazy.com',
    name: 'Liam Chen',
    role: 'student',
    studentId: 'JE-2024-003',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-std-4',
    email: 'student4@joineazy.com',
    name: 'Sophia Rodriguez',
    role: 'student',
    studentId: 'JE-2024-004',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-std-5',
    email: 'student5@joineazy.com',
    name: 'David Kim',
    role: 'student',
    studentId: 'JE-2024-005',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

export const DEMO_PASSWORD = 'demo123';

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-1',
    title: 'React Fundamentals',
    description: 'Implement a comprehensive React single page application with modern Hooks, component composition, prop drilling mitigation, and custom hooks.',
    dueDate: '2026-11-20',
    driveLink: 'https://drive.google.com/drive/my-drive',
    createdBy: 'admin1@joineazy.com',
    creatorName: 'Dr. Robert Vance',
    assignedTo: [
      'student1@joineazy.com',
      'student2@joineazy.com',
      'student3@joineazy.com',
      'student4@joineazy.com',
      'student5@joineazy.com',
    ],
    submissions: {
      'student1@joineazy.com': {
        status: 'Submitted',
        submittedAt: '2026-11-01T14:30:00.000Z',
      },
      'student2@joineazy.com': {
        status: 'Submitted',
        submittedAt: '2026-11-02T10:15:00.000Z',
      },
    },
    createdAt: '2026-10-25T08:00:00.000Z',
  },
  {
    id: 'asg-2',
    title: 'Database Management System',
    description: 'Design relational database schemas with 3rd Normal Form (3NF), write complex SQL joins, indexing strategies, and ACID transaction scripts.',
    dueDate: '2026-10-28', // Past date -> overdue for non-submitted
    driveLink: 'https://drive.google.com/drive/my-drive',
    createdBy: 'admin1@joineazy.com',
    creatorName: 'Dr. Robert Vance',
    assignedTo: [
      'student1@joineazy.com',
      'student2@joineazy.com',
      'student3@joineazy.com',
    ],
    submissions: {
      'student1@joineazy.com': {
        status: 'Submitted',
        submittedAt: '2026-10-26T17:45:00.000Z',
      },
      // student2 and student3 are Overdue because dueDate < now and not submitted
    },
    createdAt: '2026-10-15T09:30:00.000Z',
  },
  {
    id: 'asg-3',
    title: 'Python Programming',
    description: 'Build algorithmic data pipelines using Pandas, NumPy, and multiprocessing. Write comprehensive unit test suites covering edge cases.',
    dueDate: '2026-11-25',
    driveLink: 'https://drive.google.com/drive/my-drive',
    createdBy: 'admin2@joineazy.com',
    creatorName: 'Prof. Elena Rostova',
    assignedTo: [
      'student1@joineazy.com',
      'student2@joineazy.com',
      'student3@joineazy.com',
      'student4@joineazy.com',
      'student5@joineazy.com',
    ],
    submissions: {
      'student4@joineazy.com': {
        status: 'Submitted',
        submittedAt: '2026-11-02T16:20:00.000Z',
      },
    },
    createdAt: '2026-10-28T11:00:00.000Z',
  },
  {
    id: 'asg-4',
    title: 'UI/UX Design',
    description: 'Design responsive desktop and mobile design system components in Figma adhering to WCAG 2.1 AA accessibility standards.',
    dueDate: '2026-10-31', // Past date -> overdue for non-submitted
    driveLink: 'https://drive.google.com/drive/my-drive',
    createdBy: 'admin2@joineazy.com',
    creatorName: 'Prof. Elena Rostova',
    assignedTo: [
      'student1@joineazy.com',
      'student4@joineazy.com',
      'student5@joineazy.com',
    ],
    submissions: {
      'student5@joineazy.com': {
        status: 'Submitted',
        submittedAt: '2026-10-30T19:10:00.000Z',
      },
      // student1 and student4 are Overdue
    },
    createdAt: '2026-10-18T14:15:00.000Z',
  },
  {
    id: 'asg-5',
    title: 'Frontend Development Project',
    description: 'Develop a modern, highly interactive SaaS assignment review dashboard using React, Tailwind CSS, Lucide icons, and client persistence.',
    dueDate: '2026-11-18',
    driveLink: 'https://drive.google.com/drive/my-drive',
    createdBy: 'admin1@joineazy.com',
    creatorName: 'Dr. Robert Vance',
    assignedTo: [
      'student2@joineazy.com',
      'student3@joineazy.com',
      'student5@joineazy.com',
    ],
    submissions: {
      'student2@joineazy.com': {
        status: 'Submitted',
        submittedAt: '2026-11-03T08:50:00.000Z',
      },
      // student3 and student5 are Pending
    },
    createdAt: '2026-10-29T13:00:00.000Z',
  },
];
