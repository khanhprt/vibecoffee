# Vibe Coffee

Vibe Coffee is a full-stack coffee discovery app with map-based exploration, check-ins, quests, vouchers, and leaderboard features.

## GitHub Pages Demo

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes the frontend when frontend changes are pushed to `main`. No backend, database, or API secrets are needed for this UI demo.

1. On GitHub, open **Settings > Pages** and select **GitHub Actions** as the source.
2. Push these changes to `main` and wait for the **Deploy Frontend to GitHub Pages** workflow to finish. You can also run it manually from **Actions**.
3. Open `https://khanhprt.github.io/vibecoffee/` (or the URL shown by the deployment).

Sign in with username **admin** and password **admin**. The demo opens Profile after login. Profile edits and the session are stored only in that browser; they are not shared between visitors. This is a public UI test account, not a backend administrator account. Registration is disabled in demo mode.

The deployed app uses hash routes (for example, `/#/profile`) so refreshing or opening a page directly works on GitHub Pages. Asset paths follow the Pages base path, including when using a custom domain.

To run the same demo locally:

```bash
cd frontend
npm ci
npm run dev:demo
```

Or preview a production demo build:

```bash
npm run build:demo
npm run preview
```

Demo mode defaults to frontend-only login and hash routing. Explicit `VITE_DEMO_MODE` / `VITE_ROUTER_MODE` values in your environment override those defaults; the deployment workflow sets both explicitly. Ordinary `npm run dev` / `npm run build` preserve the backend-connected app. See `frontend/.env.example` for the available settings.

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
