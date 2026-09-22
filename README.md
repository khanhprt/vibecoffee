# Vibe Coffee

Vibe Coffee is a full-stack coffee discovery app with map-based exploration, check-ins, quests, vouchers, and leaderboard features.

## Project Structure

```txt
.
├── backend/          # Express + Prisma + PostgreSQL API
├── frontend/         # Vite + React + Chakra UI + TailwindCSS app
├── package.json      # Convenience scripts only (no dependencies)
└── vibe-coffee-spec.md
```

Root stays intentionally small. Application code should live in `frontend/` and `backend/`. Each side has its own `package.json` and installs its own `node_modules` inside its folder.

## Local Development

Install dependencies for each side (installs into `backend/node_modules` and `frontend/node_modules` separately):

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

Or from the root:

```bash
npm run install:all
```

Make sure PostgreSQL is running and `backend/.env` points to it, then prepare the database:

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```
