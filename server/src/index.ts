import express = require("express");
import cors = require("cors");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// Allow requests from development and production origins
const isDev = process.env.NODE_ENV !== 'production';
const corsOptions = isDev 
  ? { origin: true } // Allow all origins in development
  : { 
      origin: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:8081').split(','),
      credentials: true
    };
app.use(cors(corsOptions));
app.use(express.json());

// --- Health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- Users
app.get("/api/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  res.json(user);
});

app.post("/api/users", async (req, res) => {
  try {
    const u = await prisma.user.create({ data: req.body });
    res.status(201).json(u);
  } catch (err: any) {
    console.error(err);
    // handle unique constraint on email
    if (err.code === 'P2002') return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Failed to create user', details: String(err) });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const u = await prisma.user.update({ where: { id: req.params.id }, data: req.body });
    res.json(u);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update user', details: String(err) });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // detach user from any assigned enquiries before deleting
    await prisma.enquiry.updateMany({ where: { assignedToId: id }, data: { assignedToId: null } });
    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete user', details: String(err) });
  }
});

// --- Auth (simple validation only)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });
  // Note: no session issued; client keeps user in memory per project choice.
  res.json(user);
});

// --- Courses
app.get("/api/courses", async (_req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
});

// --- Enquiries
app.get("/api/enquiries", async (_req, res) => {
  const enqs = await prisma.enquiry.findMany({ include: { notes: true } });
  res.json(enqs);
});

app.get("/api/enquiries/:id", async (req, res) => {
  const enq = await prisma.enquiry.findUnique({ where: { id: req.params.id }, include: { notes: true } });
  res.json(enq);
});

app.post("/api/enquiries", async (req, res) => {
  const body = { ...req.body } as any;

  // Convert incoming timestamps to Date and prepare notes for nested create.
  if (body.createdAt) body.createdAt = new Date(body.createdAt);
  if (body.updatedAt) body.updatedAt = new Date(body.updatedAt);

  // Prisma expects relation inputs as nested objects. Accept `notes: []` from client
  // and convert to `notes: { create: [...] }` when non-empty, otherwise omit.
  const notes = Array.isArray(body.notes) ? body.notes : undefined;
  if (notes) delete body.notes;

  const data: any = { ...body };
  if (notes && notes.length) {
    data.notes = { create: notes.map((n: any) => ({ id: n.id, text: n.text, author: n.author, createdAt: new Date(n.createdAt) })) };
  }

  const created = await prisma.enquiry.create({ data, include: { notes: true } });
  res.status(201).json(created);
});

app.put("/api/enquiries/:id", async (req, res) => {
  try {
    const body = { ...req.body } as any;

    // allow client to send `assignedTo` (id string) — convert to assignedToId
    if (body.assignedTo) {
      body.assignedToId = body.assignedTo;
      delete body.assignedTo;
    }

    // ignore or handle notes array separately (use POST /api/enquiries/:id/notes)
    const notes = Array.isArray(body.notes) ? body.notes : undefined;
    if (notes) delete body.notes;

    if (body.updatedAt) body.updatedAt = new Date(body.updatedAt);

    const updated = await prisma.enquiry.update({ where: { id: req.params.id }, data: body, include: { notes: true } });

    // if notes were supplied, create any new notes now and return the refreshed record
    if (notes && notes.length) {
      for (const n of notes) {
        await prisma.enquiryNote.create({ data: { id: n.id || `n${Date.now()}`, text: n.text, author: n.author || 'system', createdAt: n.createdAt ? new Date(n.createdAt) : new Date(), enquiryId: req.params.id } });
      }
      const refreshed = await prisma.enquiry.findUnique({ where: { id: req.params.id }, include: { notes: true } });
      return res.json(refreshed);
    }

    res.json(updated);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update enquiry', details: String(err) });
  }
});

app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // remove any notes for the enquiry first to avoid relational constraints
    await prisma.enquiryNote.deleteMany({ where: { enquiryId: id } });
    await prisma.enquiry.delete({ where: { id } });
    res.status(204).end();
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete enquiry', details: String(err) });
  }
});

app.post("/api/enquiries/:id/notes", async (req, res) => {
  try {
    // Generate unique note ID with timestamp and random component
    const id = req.body.id || `n${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const note = await prisma.enquiryNote.create({ 
      data: { 
        id,
        text: req.body.text,
        author: req.body.author || 'system',
        enquiryId: req.params.id,
        createdAt: req.body.createdAt ? new Date(req.body.createdAt) : new Date()
      } 
    });
    res.status(201).json(note);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create note', details: String(err) });
  }
});

// --- Notifications
app.get("/api/notifications", async (req, res) => {
  const { userId } = req.query;
  const notifs = userId 
    ? await prisma.notification.findMany({ where: { userId: String(userId) } })
    : await prisma.notification.findMany();
  res.json(notifs);
});

app.post("/api/notifications", async (req, res) => {
  const created = await prisma.notification.create({ data: req.body });
  res.status(201).json(created);
});

app.put("/api/notifications/:id/mark-read", async (req, res) => {
  const updated = await prisma.notification.update({ where: { id: req.params.id }, data: { read: true } });
  res.json(updated);
});

// --- Stats
app.get("/api/stats", async (_req, res) => {
  const enqs = await prisma.enquiry.findMany();
  const total = enqs.length;
  const counts = enqs.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  res.json({ total, counts });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
