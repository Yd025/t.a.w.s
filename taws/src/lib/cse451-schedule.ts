export const COURSE_TITLE = 'CSE 451: Introduction to Operating Systems';
export const COURSE_SUBTITLE = 'Spring 2026';

/** Shown in the deadlines panel — link to your course calendar feed when available. */
export const CALENDAR_SUBSCRIBE_HINT =
  'Subscribe to this calendar (Google, iCal, Outlook, etc.) from the course website.';

export interface Topic {
  id: string;
  title: string;
  week: number;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  courseCode: string;
  dueDate: Date;
  type: 'assignment' | 'quiz' | 'project' | 'reading' | 'lab' | 'exam';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ScheduleEvent {
  year: number;
  month: number;
  day: number;
  title: string;
  kind: 'deadline' | 'lecture' | 'lab' | 'exam' | 'section' | 'other';
}

function d(year: number, month: number, day: number): Date {
  return new Date(year, month, day);
}

/** Lecture / unit topics aligned with the Spring 2026 schedule. */
export const topics: Topic[] = [
  { id: '1', title: 'OS Overview', week: 1, completed: true },
  { id: '2', title: 'Kernel Mode & Process Abstraction', week: 1, completed: true },
  { id: '3', title: 'Kernel Mode Transfer / Upcalls', week: 2, completed: true },
  { id: '4', title: 'Interrupt Handling', week: 2, completed: true },
  { id: '5', title: 'Virtual Machines', week: 3, completed: true },
  { id: '6', title: 'Processes', week: 3, completed: true },
  { id: '7', title: 'Threads', week: 4, completed: true },
  { id: '8', title: 'Race Conditions & Locks', week: 4, completed: true },
  { id: '9', title: 'Condition Variables', week: 5, completed: true },
  { id: '10', title: 'Read/Write Locks', week: 5, completed: true },
  { id: '11', title: 'Deadlocks', week: 6, completed: true },
  { id: '12', title: 'CPU Scheduling', week: 6, completed: true },
  { id: '13', title: 'Address Translations', week: 7, completed: true },
  { id: '14', title: 'TLB + Superpages', week: 7, completed: true },
  { id: '15', title: 'Demand Paging', week: 8, completed: true },
  { id: '16', title: 'Page Replacement & Storage', week: 8, completed: false },
  { id: '17', title: 'Spinning Disks', week: 9, completed: false },
  { id: '18', title: 'File System Abstraction', week: 9, completed: false },
  { id: '19', title: 'File Layout', week: 10, completed: false },
  { id: '20', title: 'Transactional File Systems', week: 10, completed: false },
];

/** Major assignments and exams (CSE 451 Spring 2026). */
export const tasks: Task[] = [
  {
    id: 'lab-partner',
    title: 'Lab Partner Form',
    courseCode: 'CSE 451',
    dueDate: d(2026, 3, 3),
    type: 'lab',
    completed: true,
    priority: 'medium',
  },
  {
    id: 'lab1',
    title: 'Lab 1 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 3, 10),
    type: 'lab',
    completed: true,
    priority: 'high',
  },
  {
    id: 'pset1',
    title: 'PSet 1 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 3, 10),
    type: 'assignment',
    completed: true,
    priority: 'high',
  },
  {
    id: 'lab2-p1',
    title: 'Lab 2 Part 1 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 3, 27),
    type: 'lab',
    completed: true,
    priority: 'high',
  },
  {
    id: 'pset2',
    title: 'PSet 2 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 3, 24),
    type: 'assignment',
    completed: true,
    priority: 'high',
  },
  {
    id: 'lab2-p2-dd',
    title: 'Lab 2 Part 2 Design Doc Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 4, 30),
    type: 'lab',
    completed: true,
    priority: 'medium',
  },
  {
    id: 'midterm',
    title: 'Midterm Exam',
    courseCode: 'CSE 451',
    dueDate: d(2026, 4, 6),
    type: 'exam',
    completed: true,
    priority: 'high',
  },
  {
    id: 'lab2-p2',
    title: 'Lab 2 Part 2 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 4, 8),
    type: 'lab',
    completed: true,
    priority: 'high',
  },
  {
    id: 'lab3-dd',
    title: 'Lab 3 Design Doc Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 4, 14),
    type: 'lab',
    completed: true,
    priority: 'medium',
  },
  {
    id: 'pset3',
    title: 'PSet 3 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 4, 18),
    type: 'assignment',
    completed: false,
    priority: 'high',
  },
  {
    id: 'lab3',
    title: 'Lab 3 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 4, 22),
    type: 'lab',
    completed: false,
    priority: 'high',
  },
  {
    id: 'pset4',
    title: 'PSet 4 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 5, 1),
    type: 'assignment',
    completed: false,
    priority: 'high',
  },
  {
    id: 'lab4-dd',
    title: 'Lab 4 Design Doc Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 4, 28),
    type: 'lab',
    completed: false,
    priority: 'medium',
  },
  {
    id: 'lab4',
    title: 'Lab 4 Due',
    courseCode: 'CSE 451',
    dueDate: d(2026, 5, 5),
    type: 'lab',
    completed: false,
    priority: 'high',
  },
  {
    id: 'final',
    title: 'Final Exam (14:30–16:20)',
    courseCode: 'CSE 451',
    dueDate: d(2026, 5, 10),
    type: 'exam',
    completed: false,
    priority: 'high',
  },
];

/** Calendar markers: deadlines, lectures, and key section days. */
export const scheduleEvents: ScheduleEvent[] = [
  // March / early April
  { year: 2026, month: 2, day: 30, title: 'Lab Partner Form Out · Lab 1 Release', kind: 'lab' },
  { year: 2026, month: 3, day: 1, title: 'Lecture: OS Overview', kind: 'lecture' },
  { year: 2026, month: 3, day: 2, title: 'Section: GDB, Lab 1 Intro', kind: 'section' },
  { year: 2026, month: 3, day: 3, title: 'Lab Partner Form Due', kind: 'deadline' },
  { year: 2026, month: 3, day: 6, title: 'PSet 1 Release', kind: 'other' },
  { year: 2026, month: 3, day: 10, title: 'Lab 1 Due · PSet 1 Due', kind: 'deadline' },
  { year: 2026, month: 3, day: 13, title: 'Lab 2 Release', kind: 'lab' },
  { year: 2026, month: 3, day: 17, title: 'Lab 2 Part 1 DD Due · PSet 2 Release', kind: 'deadline' },
  { year: 2026, month: 3, day: 24, title: 'PSet 2 Due', kind: 'deadline' },
  { year: 2026, month: 3, day: 27, title: 'Lab 2 Part 1 Due', kind: 'deadline' },
  { year: 2026, month: 3, day: 30, title: 'Midterm Review · Lab 2 Part 2 DD Due', kind: 'section' },
  // May 2026
  { year: 2026, month: 4, day: 4, title: 'Lecture: Address Translations', kind: 'lecture' },
  { year: 2026, month: 4, day: 6, title: 'Midterm Exam', kind: 'exam' },
  { year: 2026, month: 4, day: 7, title: 'Section: Lab 3 · Lab 3 Release', kind: 'section' },
  { year: 2026, month: 4, day: 8, title: 'Lab 2 Part 2 Due · TLB + Superpages', kind: 'deadline' },
  { year: 2026, month: 4, day: 11, title: 'PSet 3 Release · Demand Paging', kind: 'lecture' },
  { year: 2026, month: 4, day: 14, title: 'Lab 3 DD Due · Section: Lab 3 OH', kind: 'deadline' },
  { year: 2026, month: 4, day: 15, title: 'Page Replacement Cont. & Storage', kind: 'lecture' },
  { year: 2026, month: 4, day: 18, title: 'PSet 3 Due · Midterm Walkthrough', kind: 'deadline' },
  { year: 2026, month: 4, day: 20, title: 'Lab 4 Release · Spinning Disks', kind: 'lab' },
  { year: 2026, month: 4, day: 21, title: 'Section: Lab 4', kind: 'section' },
  { year: 2026, month: 4, day: 22, title: 'Lab 3 Due · File System Abstraction', kind: 'deadline' },
  { year: 2026, month: 4, day: 25, title: 'Memorial Day · PSet 4 Release', kind: 'deadline' },
  { year: 2026, month: 4, day: 27, title: 'Lecture: File Layout', kind: 'lecture' },
  { year: 2026, month: 4, day: 28, title: 'Lab 4 DD Due · Section: Lab 4 OH', kind: 'deadline' },
  { year: 2026, month: 4, day: 29, title: 'Transactional File Systems', kind: 'lecture' },
  // June
  { year: 2026, month: 5, day: 1, title: 'PSet 4 Due', kind: 'deadline' },
  { year: 2026, month: 5, day: 5, title: 'Lab 4 Due · Course Wrap-up', kind: 'deadline' },
  { year: 2026, month: 5, day: 10, title: 'Final Exam 14:30–16:20', kind: 'exam' },
];

export const DEFAULT_CALENDAR_YEAR = 2026;
export const DEFAULT_CALENDAR_MONTH = 4;

export const chatSuggestions = [
  { text: 'Explain virtual memory and paging' },
  { text: 'Help me understand deadlocks' },
  { text: 'What should I study for the final?' },
];
