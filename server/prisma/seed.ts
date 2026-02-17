import { PrismaClient } from "@prisma/client";

// Copied mock data from the frontend so the seed can run independently
const COURSES = [
  { id: "c1", name: "B.Tech Computer Science", department: "Engineering", duration: "4 Years", fees: "₹1,20,000/year", eligibility: "10+2 with PCM (Min 60%)", description: "A comprehensive program covering software development, algorithms, data structures, artificial intelligence, and more.", syllabus: ["Data Structures & Algorithms", "Operating Systems", "Database Management", "Computer Networks", "Machine Learning", "Web Development", "Cloud Computing", "Cyber Security"], seats: 120 },
  { id: "c2", name: "B.Tech Electronics", department: "Engineering", duration: "4 Years", fees: "₹1,10,000/year", eligibility: "10+2 with PCM (Min 60%)", description: "Study of electronic circuits, communication systems, signal processing, and embedded systems.", syllabus: ["Circuit Theory", "Digital Electronics", "Signal Processing", "Communication Systems", "VLSI Design", "Embedded Systems", "Control Systems", "IoT"], seats: 60 },
  { id: "c3", name: "BBA", department: "Management", duration: "3 Years", fees: "₹80,000/year", eligibility: "10+2 any stream (Min 50%)", description: "Foundation in business administration, marketing, finance, and entrepreneurship.", syllabus: ["Principles of Management", "Business Economics", "Financial Accounting", "Marketing Management", "Human Resource Management", "Business Law", "Entrepreneurship", "Strategic Management"], seats: 90 },
  { id: "c4", name: "MBA", department: "Management", duration: "2 Years", fees: "₹1,50,000/year", eligibility: "Graduation with valid entrance score", description: "Advanced management program with specializations in Finance, Marketing, HR, and IT.", syllabus: ["Organizational Behavior", "Managerial Economics", "Financial Management", "Marketing Strategy", "Operations Management", "Business Analytics", "International Business", "Leadership & Ethics"], seats: 60 },
  { id: "c5", name: "B.Sc Nursing", department: "Health Sciences", duration: "4 Years", fees: "₹95,000/year", eligibility: "10+2 with PCB (Min 55%)", description: "Professional nursing education with clinical training and hands-on patient care experience.", syllabus: ["Anatomy & Physiology", "Microbiology", "Pharmacology", "Medical-Surgical Nursing", "Community Health Nursing", "Pediatric Nursing", "Psychiatric Nursing", "Research Methodology"], seats: 50 },
  { id: "c6", name: "B.Com (Hons)", department: "Commerce", duration: "3 Years", fees: "₹60,000/year", eligibility: "10+2 Commerce (Min 50%)", description: "In-depth study of accounting, taxation, auditing, and corporate finance.", syllabus: ["Financial Accounting", "Cost Accounting", "Corporate Law", "Taxation", "Auditing", "Business Statistics", "Financial Markets", "E-Commerce"], seats: 120 },
];

const MOCK_USERS = [
  { id: "u1", name: "Admin User", email: "admin@college.edu", phone: "9999900000", role: "admin", password: "admin123" },
  { id: "u2", name: "Priya Sharma", email: "priya@college.edu", phone: "9999900001", role: "counselor", password: "counselor123" },
  { id: "u3", name: "Rahul Verma", email: "rahul@college.edu", phone: "9999900002", role: "counselor", password: "counselor123" },
  { id: "u4", name: "Ankit Singh", email: "ankit@student.com", phone: "9876543210", role: "student", password: "student123" },
  { id: "u5", name: "Neha Patel", email: "neha@student.com", phone: "9876543211", role: "student", password: "student123" },
];

const MOCK_ENQUIRIES = [
  { id: "e1", studentName: "Ankit Singh", email: "ankit@student.com", phone: "9876543210", courseId: "c1", message: "I want to know more about placements.", status: "contacted", assignedTo: "u2", createdAt: "2026-01-15T10:00:00Z", updatedAt: "2026-01-18T14:00:00Z", notes: [{ id: "n1", text: "Called the student, interested in campus placements info.", author: "Priya Sharma", createdAt: "2026-01-18T14:00:00Z" }] },
  { id: "e2", studentName: "Neha Patel", email: "neha@student.com", phone: "9876543211", courseId: "c3", message: "Is there any scholarship available for BBA?", status: "new", createdAt: "2026-02-10T09:30:00Z", updatedAt: "2026-02-10T09:30:00Z", notes: [] },
  { id: "e3", studentName: "Rohan Das", email: "rohan@gmail.com", phone: "9876543212", courseId: "c4", message: "What is the admission process for MBA?", status: "follow-up", assignedTo: "u3", createdAt: "2026-01-20T11:00:00Z", updatedAt: "2026-02-05T16:00:00Z", notes: [{ id: "n2", text: "Sent admission brochure via email.", author: "Rahul Verma", createdAt: "2026-01-22T10:00:00Z" }, { id: "n3", text: "Follow-up call scheduled for next week.", author: "Rahul Verma", createdAt: "2026-02-05T16:00:00Z" }] },
  { id: "e4", studentName: "Simran Kaur", email: "simran@gmail.com", phone: "9876543213", courseId: "c5", message: "Can I get hostel facility?", status: "converted", assignedTo: "u2", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2026-01-10T12:00:00Z", notes: [{ id: "n4", text: "Admission confirmed. Hostel allotted.", author: "Priya Sharma", createdAt: "2026-01-10T12:00:00Z" }] },
  { id: "e5", studentName: "Amit Joshi", email: "amit@gmail.com", phone: "9876543214", courseId: "c2", message: "I want to transfer from another college.", status: "rejected", assignedTo: "u3", createdAt: "2025-11-15T14:00:00Z", updatedAt: "2025-12-20T10:00:00Z", notes: [{ id: "n5", text: "Transfer not possible mid-session.", author: "Rahul Verma", createdAt: "2025-12-20T10:00:00Z" }] },
  { id: "e6", studentName: "Kavita Rao", email: "kavita@gmail.com", phone: "9876543215", courseId: "c6", message: "What are the career prospects after B.Com?", status: "new", createdAt: "2026-02-12T13:00:00Z", updatedAt: "2026-02-12T13:00:00Z", notes: [] },
  { id: "e7", studentName: "Vikram Mehta", email: "vikram@gmail.com", phone: "9876543216", courseId: "c1", message: "Do you have AI/ML specialization?", status: "contacted", assignedTo: "u2", createdAt: "2026-02-01T10:00:00Z", updatedAt: "2026-02-08T11:00:00Z", notes: [{ id: "n6", text: "Informed about AI electives in 3rd year.", author: "Priya Sharma", createdAt: "2026-02-08T11:00:00Z" }] },
];

const MOCK_NOTIFICATIONS = [
  { id: "not1", userId: "u4", title: "Enquiry Received", message: "Your enquiry for B.Tech CS has been received.", read: true, createdAt: "2026-01-15T10:05:00Z" },
  { id: "not2", userId: "u4", title: "Status Updated", message: "A counselor has been assigned to your enquiry.", read: false, createdAt: "2026-01-18T14:05:00Z" },
];

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  await prisma.notification.deleteMany();
  await prisma.enquiryNote.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Users
  for (const u of MOCK_USERS) {
    await prisma.user.create({ data: { ...u } });
  }

  // Courses
  for (const c of COURSES) {
    await prisma.course.create({ data: { ...c, syllabus: JSON.stringify(c.syllabus) } });
  }

  // Enquiries and notes
  for (const e of MOCK_ENQUIRIES) {
    const { notes = [], ...enq } = e as any;
    await prisma.enquiry.create({
      data: {
        id: enq.id,
        studentName: enq.studentName,
        email: enq.email,
        phone: enq.phone,
        courseId: enq.courseId,
        message: enq.message,
        status: enq.status,
        assignedToId: enq.assignedTo ?? null,
        documents: enq.documents ? JSON.stringify(enq.documents) : null,
        createdAt: new Date(enq.createdAt),
        updatedAt: new Date(enq.updatedAt),
      },
    });
    for (const n of notes) {
      await prisma.enquiryNote.create({ data: { ...n, enquiryId: e.id, createdAt: new Date(n.createdAt) } });
    }
  }

  for (const n of MOCK_NOTIFICATIONS) {
    await prisma.notification.create({ data: { ...n, createdAt: new Date(n.createdAt) } });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
