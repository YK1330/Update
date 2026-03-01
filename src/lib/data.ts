// ─── Types ───────────────────────────────────────────────────────────
export type Role = "student" | "counselor" | "admin";
export type EnquiryStatus = "new" | "contacted" | "follow-up" | "converted" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
  avatar?: string;
}

export interface Course {
  id: string;
  name: string;
  department: string;
  duration: string;
  fees: string;
  eligibility: string;
  description: string;
  syllabus: string[];
  seats: number;
  image?: string;
}

export interface Enquiry {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  courseId: string;
  message: string;
  status: EnquiryStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  notes: EnquiryNote[];
  documents?: string[];
}

export interface EnquiryNote {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────
export const COURSES: Course[] = [
  {
    id: "c1", name: "B.Tech Computer Science", department: "Engineering",
    duration: "4 Years", fees: "₹1,20,000/year", eligibility: "10+2 with PCM (Min 60%)",
    description: "A comprehensive program covering software development, algorithms, data structures, artificial intelligence, and more.",
    syllabus: ["Data Structures & Algorithms", "Operating Systems", "Database Management", "Computer Networks", "Machine Learning", "Web Development", "Cloud Computing", "Cyber Security"],
    seats: 120,
  },
  {
    id: "c2", name: "B.Tech Electronics", department: "Engineering",
    duration: "4 Years", fees: "₹1,10,000/year", eligibility: "10+2 with PCM (Min 60%)",
    description: "Study of electronic circuits, communication systems, signal processing, and embedded systems.",
    syllabus: ["Circuit Theory", "Digital Electronics", "Signal Processing", "Communication Systems", "VLSI Design", "Embedded Systems", "Control Systems", "IoT"],
    seats: 60,
  },
  {
    id: "c3", name: "BBA", department: "Management",
    duration: "3 Years", fees: "₹80,000/year", eligibility: "10+2 any stream (Min 50%)",
    description: "Foundation in business administration, marketing, finance, and entrepreneurship.",
    syllabus: ["Principles of Management", "Business Economics", "Financial Accounting", "Marketing Management", "Human Resource Management", "Business Law", "Entrepreneurship", "Strategic Management"],
    seats: 90,
  },
  {
    id: "c4", name: "MBA", department: "Management",
    duration: "2 Years", fees: "₹1,50,000/year", eligibility: "Graduation with valid entrance score",
    description: "Advanced management program with specializations in Finance, Marketing, HR, and IT.",
    syllabus: ["Organizational Behavior", "Managerial Economics", "Financial Management", "Marketing Strategy", "Operations Management", "Business Analytics", "International Business", "Leadership & Ethics"],
    seats: 60,
  },
  {
    id: "c5", name: "B.Sc Nursing", department: "Health Sciences",
    duration: "4 Years", fees: "₹95,000/year", eligibility: "10+2 with PCB (Min 55%)",
    description: "Professional nursing education with clinical training and hands-on patient care experience.",
    syllabus: ["Anatomy & Physiology", "Microbiology", "Pharmacology", "Medical-Surgical Nursing", "Community Health Nursing", "Pediatric Nursing", "Psychiatric Nursing", "Research Methodology"],
    seats: 50,
  },
  {
    id: "c6", name: "B.Com (Hons)", department: "Commerce",
    duration: "3 Years", fees: "₹60,000/year", eligibility: "10+2 Commerce (Min 50%)",
    description: "In-depth study of accounting, taxation, auditing, and corporate finance.",
    syllabus: ["Financial Accounting", "Cost Accounting", "Corporate Law", "Taxation", "Auditing", "Business Statistics", "Financial Markets", "E-Commerce"],
    seats: 120,
  },
];

export const DEPARTMENTS = [...new Set(COURSES.map(c => c.department))];

export const MOCK_USERS: User[] = [
  { id: "u1", name: "Admin User", email: "admin@college.edu", phone: "9999900000", role: "admin", password: "admin123" },
  { id: "u2", name: "Priya Sharma", email: "priya@college.edu", phone: "9999900001", role: "counselor", password: "counselor123" },
  { id: "u3", name: "Rahul Verma", email: "rahul@college.edu", phone: "9999900002", role: "counselor", password: "counselor123" },
  { id: "u4", name: "Ankit Singh", email: "ankit@student.com", phone: "9876543210", role: "student", password: "student123" },
  { id: "u5", name: "Neha Patel", email: "neha@student.com", phone: "9876543211", role: "student", password: "student123" },
];

export const MOCK_ENQUIRIES: Enquiry[] = [
  { id: "e1", studentName: "Ankit Singh", email: "ankit@student.com", phone: "9876543210", courseId: "c1", message: "I want to know more about placements.", status: "contacted", assignedTo: "u2", createdAt: "2026-01-15T10:00:00Z", updatedAt: "2026-01-18T14:00:00Z", notes: [{ id: "n1", text: "Called the student, interested in campus placements info.", author: "Priya Sharma", createdAt: "2026-01-18T14:00:00Z" }] },
  { id: "e2", studentName: "Neha Patel", email: "neha@student.com", phone: "9876543211", courseId: "c3", message: "Is there any scholarship available for BBA?", status: "new", createdAt: "2026-02-10T09:30:00Z", updatedAt: "2026-02-10T09:30:00Z", notes: [] },
  { id: "e3", studentName: "Rohan Das", email: "rohan@gmail.com", phone: "9876543212", courseId: "c4", message: "What is the admission process for MBA?", status: "follow-up", assignedTo: "u3", createdAt: "2026-01-20T11:00:00Z", updatedAt: "2026-02-05T16:00:00Z", notes: [{ id: "n2", text: "Sent admission brochure via email.", author: "Rahul Verma", createdAt: "2026-01-22T10:00:00Z" }, { id: "n3", text: "Follow-up call scheduled for next week.", author: "Rahul Verma", createdAt: "2026-02-05T16:00:00Z" }] },
  { id: "e4", studentName: "Simran Kaur", email: "simran@gmail.com", phone: "9876543213", courseId: "c5", message: "Can I get hostel facility?", status: "converted", assignedTo: "u2", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2026-01-10T12:00:00Z", notes: [{ id: "n4", text: "Admission confirmed. Hostel allotted.", author: "Priya Sharma", createdAt: "2026-01-10T12:00:00Z" }] },
  { id: "e5", studentName: "Amit Joshi", email: "amit@gmail.com", phone: "9876543214", courseId: "c2", message: "I want to transfer from another college.", status: "rejected", assignedTo: "u3", createdAt: "2025-11-15T14:00:00Z", updatedAt: "2025-12-20T10:00:00Z", notes: [{ id: "n5", text: "Transfer not possible mid-session.", author: "Rahul Verma", createdAt: "2025-12-20T10:00:00Z" }] },
  { id: "e6", studentName: "Kavita Rao", email: "kavita@gmail.com", phone: "9876543215", courseId: "c6", message: "What are the career prospects after B.Com?", status: "new", createdAt: "2026-02-12T13:00:00Z", updatedAt: "2026-02-12T13:00:00Z", notes: [] },
  { id: "e7", studentName: "Vikram Mehta", email: "vikram@gmail.com", phone: "9876543216", courseId: "c1", message: "Do you have AI/ML specialization?", status: "contacted", assignedTo: "u2", createdAt: "2026-02-01T10:00:00Z", updatedAt: "2026-02-08T11:00:00Z", notes: [{ id: "n6", text: "Informed about AI electives in 3rd year.", author: "Priya Sharma", createdAt: "2026-02-08T11:00:00Z" }] },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "not1", userId: "u4", title: "Enquiry Received", message: "Your enquiry for B.Tech CS has been received.", read: true, createdAt: "2026-01-15T10:05:00Z" },
  { id: "not2", userId: "u4", title: "Status Updated", message: "A counselor has been assigned to your enquiry.", read: false, createdAt: "2026-01-18T14:05:00Z" },
];

// ─── Server-backed in-memory store (no browser storage) ─────────────
let usersCache: User[] | null = null;
let enquiriesCache: Enquiry[] | null = null;
let notificationsCache: Notification[] | null = null;
let currentUserCache: User | null = null;
let initPromise: Promise<void> | null = null;

export function initDB() {
  if (initPromise) return initPromise;

  // Load data from local server with proper error handling and synchronization
  initPromise = Promise.all([
    fetch("http://localhost:4000/api/users")
      .then((r) => r.json())
      .then((data) => { usersCache = data; })
      .catch(() => { usersCache = MOCK_USERS; }),
    fetch("http://localhost:4000/api/enquiries")
      .then((r) => r.json())
      .then((data) => { enquiriesCache = data; })
      .catch(() => { enquiriesCache = MOCK_ENQUIRIES; }),
    fetch("http://localhost:4000/api/notifications")
      .then((r) => r.json())
      .then((data) => { notificationsCache = data; })
      .catch(() => { notificationsCache = MOCK_NOTIFICATIONS; }),
  ]).then(() => { });

  return initPromise;
}

// Users
export function getUsers(): User[] { return usersCache ?? MOCK_USERS; }
export function getCounselors(): User[] { return getUsers().filter(u => u.role === "counselor"); }
export function getUserById(id: string) { return getUsers().find(u => u.id === id); }
export function addUser(user: User) {
  const prev = getUsers();
  usersCache = [...prev, user];

  fetch("http://localhost:4000/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) })
    .then(async (res) => {
      if (!res.ok) {
        usersCache = prev;
        const txt = await res.text().catch(() => res.statusText);
        throw new Error(txt || 'Failed to create user');
      }
      const saved = await res.json();
      usersCache = getUsers().map(u => (u.id === user.id ? saved : u));
    })
    .catch((err) => { usersCache = prev; console.error('addUser failed:', err); });
}
export function updateUser(id: string, data: Partial<User>) {
  const prev = getUsers();
  usersCache = getUsers().map(u => u.id === id ? { ...u, ...data } : u);

  fetch(`http://localhost:4000/api/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    .then(async (res) => {
      if (!res.ok) {
        usersCache = prev;
        const txt = await res.text().catch(() => res.statusText);
        throw new Error(txt || 'Failed to update user');
      }
      const saved = await res.json();
      usersCache = getUsers().map(u => (u.id === saved.id ? saved : u));
    })
    .catch((err) => { usersCache = prev; console.error('updateUser failed:', err); });
}
export function deleteUser(id: string) {
  const prev = getUsers();
  usersCache = prev.filter(u => u.id !== id);

  fetch(`http://localhost:4000/api/users/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok && res.status !== 204) {
        usersCache = prev;
        throw new Error('Failed to delete user');
      }
    })
    .catch((err) => { usersCache = prev; console.error('deleteUser failed:', err); });
}

// Auth (client-only persistence: stored in-memory, not in browser storage)
export function login(email: string, password: string): User | null {
  const user = getUsers().find(u => u.email === email && u.password === password);
  if (user) currentUserCache = user;
  // optional: validate against server in background (non-blocking)
  fetch("http://localhost:4000/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }).catch(() => { });
  return user || null;
}
export function logout() { currentUserCache = null; }
export function getCurrentUser(): User | null { return currentUserCache; }

export async function registerStudent(userData: Omit<User, 'id'>): Promise<User> {
  const newUser = { ...userData, id: `u${Date.now()}` } as User;
  const prev = getUsers();
  usersCache = [...prev, newUser];

  try {
    const res = await fetch("http://localhost:4000/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newUser) });
    if (!res.ok) {
      usersCache = prev;
      const data = await res.json().catch(() => null);
      throw new Error((data && data.error) || 'Failed to register student');
    }
    const saved = await res.json();
    usersCache = getUsers().map(u => (u.id === newUser.id ? saved : u));
    return saved;
  } catch (err) {
    usersCache = prev;
    console.error('registerStudent failed:', err);
    throw err;
  }
}

// Enquiries
export function getEnquiries(): Enquiry[] { return enquiriesCache ?? MOCK_ENQUIRIES; }
export function getEnquiryById(id: string) { return getEnquiries().find(e => e.id === id); }

// Generate unique note ID
function generateNoteId(): string {
  return `n${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function addEnquiry(enquiry: Enquiry): Promise<Enquiry> {
  const prev = getEnquiries();
  const newEnquiry = { ...enquiry };
  // Ensure notes have unique IDs
  if (newEnquiry.notes && newEnquiry.notes.length > 0) {
    newEnquiry.notes = newEnquiry.notes.map(n => ({ ...n, id: n.id || generateNoteId() }));
  }
  enquiriesCache = [...prev, newEnquiry];

  try {
    const res = await fetch("http://localhost:4000/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEnquiry) });
    if (!res.ok) {
      enquiriesCache = prev;
      const txt = await res.text().catch(() => res.statusText);
      throw new Error(txt || 'Failed to create enquiry');
    }
    const saved: Enquiry = await res.json();
    enquiriesCache = getEnquiries().map(e => (e.id === enquiry.id ? saved : e));
    return saved;
  } catch (err) {
    enquiriesCache = prev;
    console.error('addEnquiry failed:', err);
    throw err;
  }
}
export async function updateEnquiry(id: string, data: Partial<Enquiry>): Promise<Enquiry> {
  const prev = getEnquiries();
  // Ensure notes have unique IDs before sending to server
  const updateData = { ...data };
  if (updateData.notes && updateData.notes.length > 0) {
    updateData.notes = updateData.notes.map(n => ({
      ...n,
      id: n.id || generateNoteId()
    }));
  }

  // optimistic local update (kept small) — will be reverted on failure
  enquiriesCache = getEnquiries().map(e => e.id === id ? { ...e, ...updateData, updatedAt: new Date().toISOString() } : e);

  try {
    const res = await fetch(`http://localhost:4000/api/enquiries/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updateData) });
    if (!res.ok) {
      enquiriesCache = prev;
      const txt = await res.text().catch(() => res.statusText);
      throw new Error(txt || 'Failed to update enquiry');
    }
    const saved: Enquiry = await res.json();
    enquiriesCache = getEnquiries().map(e => (e.id === saved.id ? saved : e));
    return saved;
  } catch (err) {
    enquiriesCache = prev;
    console.error('updateEnquiry failed:', err);
    throw err;
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  const prev = getEnquiries();
  enquiriesCache = prev.filter(e => e.id !== id);

  try {
    const res = await fetch(`http://localhost:4000/api/enquiries/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) {
      enquiriesCache = prev;
      const txt = await res.text().catch(() => res.statusText);
      throw new Error(txt || 'Failed to delete enquiry');
    }
  } catch (err) {
    enquiriesCache = prev;
    console.error('deleteEnquiry failed:', err);
    throw err;
  }
}

export async function addEnquiryNote(enquiryId: string, noteData: Omit<EnquiryNote, "id">): Promise<EnquiryNote> {
  const newNote = { ...noteData, id: generateNoteId() };

  // Optimistic update
  const prev = getEnquiries();
  enquiriesCache = getEnquiries().map(e => {
    if (e.id === enquiryId) {
      return { ...e, notes: [...e.notes, newNote] };
    }
    return e;
  });

  try {
    const res = await fetch(`http://localhost:4000/api/enquiries/${enquiryId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    if (!res.ok) {
      enquiriesCache = prev;
      const txt = await res.text().catch(() => res.statusText);
      throw new Error(txt || 'Failed to sync note to server');
    }
    const savedNote = await res.json();
    return savedNote;
  } catch (err) {
    enquiriesCache = prev;
    console.error('addEnquiryNote failed:', err);
    throw err;
  }
}

export function getEnquiriesByEmail(email: string): Enquiry[] {
  return getEnquiries().filter(e => e.email.toLowerCase() === email.toLowerCase());
}

// Notifications
export function getNotifications(userId: string): Notification[] {
  return (notificationsCache ?? MOCK_NOTIFICATIONS).filter(n => n.userId === userId);
}
export function addNotification(notification: Notification) {
  const prev = notificationsCache ?? MOCK_NOTIFICATIONS;
  notificationsCache = [...prev, notification];

  fetch("http://localhost:4000/api/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(notification) })
    .then(async (res) => {
      if (!res.ok) {
        notificationsCache = prev;
        const txt = await res.text().catch(() => res.statusText);
        throw new Error(txt || 'Failed to create notification');
      }
      const saved = await res.json();
      notificationsCache = (notificationsCache ?? MOCK_NOTIFICATIONS).map(n => (n.id === notification.id ? saved : n));
    })
    .catch((err) => { notificationsCache = prev; console.error('addNotification failed:', err); });
}
export function markNotificationRead(id: string) {
  const prev = notificationsCache ?? MOCK_NOTIFICATIONS;
  notificationsCache = prev.map(n => n.id === id ? { ...n, read: true } : n);

  fetch(`http://localhost:4000/api/notifications/${id}/mark-read`, { method: "PUT" })
    .then((res) => { if (!res.ok) { notificationsCache = prev; throw new Error('Failed to mark read'); } })
    .catch((err) => { notificationsCache = prev; console.error('markNotificationRead failed:', err); });
}

// Stats
export function getStats() {
  const enqs = getEnquiries();
  return {
    total: enqs.length,
    new: enqs.filter(e => e.status === "new").length,
    contacted: enqs.filter(e => e.status === "contacted").length,
    followUp: enqs.filter(e => e.status === "follow-up").length,
    converted: enqs.filter(e => e.status === "converted").length,
    rejected: enqs.filter(e => e.status === "rejected").length,
  };
}

export const STATUS_COLORS: Record<EnquiryStatus, string> = {
  new: "bg-info text-info-foreground",
  contacted: "bg-primary text-primary-foreground",
  "follow-up": "bg-warning text-warning-foreground",
  converted: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};

export const STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "follow-up": "Follow-up",
  converted: "Converted",
  rejected: "Rejected",
};
