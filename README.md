# Luxe — Premium Todo Management Platform

A luxury-editorial task management web app: React + Vite + Tailwind on the front end, Express + JWT + JSON storage on the back end.

## Design

Warm beige/brown palette (`#F7F3EE` background, `#5B2D1D` primary brown, `#C8A165` gold accent), Fraunces serif display type paired with Inter, rounded 20–28px cards, soft shadows, glassmorphism nav, and arch-shaped hero imagery inspired by the moodboard.

## Features

- JWT auth (signup / login / protected routes) with bcrypt password hashing
- Full task CRUD: categories, tags, priority, due dates, reminders, notes, recurring
- Complete / undo, favorite, duplicate, archive, restore, trash, bulk actions
- Search, filter, sort
- Dashboard: time-based greeting, daily quote, Daily Focus card, productivity score ring, upcoming tasks, recent activity
- Kanban board with drag-and-drop
- Luxury monthly calendar view
- Pomodoro focus timer (25/5/15) with session counter
- Analytics dashboard (Recharts): completion rate, weekly bar chart, category pie chart
- Command palette (`Ctrl/Cmd + K`): search, create task, navigate
- Mood check-in, XP/level system, and an achievements panel
- Fully responsive, mobile-first layout

## Project structure

```
server/            Express API (JWT auth, JSON-file storage)
  controllers/
  middleware/
  models/
  routes/
  utils/
  data/             auto-created JSON "database" files

client/             React + Vite frontend
  src/
    components/
    pages/
    layouts/
    hooks/
    services/
    utils/
```

## Running locally

### 1. Backend

```bash
cd server
npm install
npm run dev        # starts on http://localhost:5000
```

Environment variables live in `server/.env` (JWT secret, port, client URL) — already filled in with working defaults for local dev.

### 2. Frontend

```bash
cd client
npm install
npm run dev         # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so just open **http://localhost:5173**.

### 3. Build for production

```bash
cd client && npm run build
```

Outputs static files to `client/dist`, which you can serve with any static host (or point Express at it).

## Notes

- Data persists to JSON files under `server/data/` (created automatically on first run — no database setup needed).
- Passwords are hashed with bcrypt; JWTs expire after 7 days by default.
