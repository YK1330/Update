Local dev server (Express + Prisma + SQLite)

1) Install server deps
   cd server
   npm install

2) Generate Prisma client + migrate + seed
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed

3) Start dev server
   npm run dev

Server runs on http://localhost:4000 and exposes simple REST endpoints used by the frontend (`/api/users`, `/api/enquiries`, `/api/notifications`, `/api/auth/login`, `/api/stats`).

Notes:
- Authentication is a simple credential check (no sessions) — the frontend keeps `currentUser` in memory per your selection.
- No browser storage (localStorage/cookies) is used by the app anymore; data is persisted in SQLite.
