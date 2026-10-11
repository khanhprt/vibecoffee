# Vibe Coffee

Vibe Coffee is a full-stack coffee discovery app with map-based exploration, check-ins, quests, vouchers, and leaderboard features.

## GitHub Pages Demo

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes the frontend when frontend changes are pushed to `main`. No backend, database, or API secrets are needed for this UI demo.

1. On GitHub, open **Settings > Pages** and select **GitHub Actions** as the source.
2. Push these changes to `main` and wait for the **Deploy Frontend to GitHub Pages** workflow to finish. You can also run it manually from **Actions**.
3. Open `https://khanhprt.github.io/vibecoffee/` (or the URL shown by the deployment).

The demo automatically signs in to the demo account. If prompted, use username **admin** and password **admin**. Fake data, check-ins, favorites, quest rewards, and profile edits are stored in that browser and persist after a refresh; they are not shared between visitors. Registration is disabled in demo mode.

On Map, Vibe Check opens a receipt confirmation dialog. Choose **Lay hoa don mau** to generate a sample invoice for that cafe, enter its eight-character code, and confirm to earn 30 points. Each invoice code belongs to one cafe, expires after 24 hours, and can be redeemed once. This demo simulates cafe-issued invoices; it is not connected to a real checkout system.

Click a cafe name to open its street map. Leaflet 1.9.4 (BSD-2-Clause) uses OpenStreetMap tiles and the demo cafe latitude/longitude, with zoom controls and selectable pins. No API key is needed. Street-map tiles require an internet connection; cafe data and receipt actions still run locally. These are demo cafe locations, not verified business listings. OpenStreetMap attribution remains visible on the map. The app does not prefetch or package tiles for offline use.

The deployed app uses hash routes (for example, `/#/profile`) so refreshing or opening a page directly works on GitHub Pages. Asset paths follow the Pages base path, including when using a custom domain.

To run the same demo locally:

```bash
cd frontend
npm ci
npm run dev
```

To run the backend-connected demo without PostgreSQL, start the fake API and the normal frontend:

```bash
cd backend
npm ci
npm run dev:fake
```

```bash
cd frontend
npm ci
npm run dev:api
```

The fake API keeps data in memory while the process is running. Use `admin` / `admin` to sign in, then try map search, Vibe Check, quest rewards, leaderboard updates, and profile edits.

Or preview a production demo build:

```bash
npm run build:demo
npm run preview
```

Ordinary `npm run dev` / `npm run build` default to the frontend-only fake-data demo and hash routing, ready for GitHub Pages. The workflow deploys it automatically on pushes to `main` that change frontend files. Use `npm run dev:api` / `npm run build:api` to opt into the backend-connected app. Explicit `VITE_DEMO_MODE` / `VITE_ROUTER_MODE` values in your environment override those defaults. See `frontend/.env.example` for the available settings.

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
npm run dev:api
```
