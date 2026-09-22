import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import cafeRoutes from "./routes/cafeRoutes.js";
import checkinRoutes from "./routes/checkinRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import questRoutes from "./routes/questRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => res.json({ ok: true, name: "vibe-coffee-api" }));

app.use("/api/auth", authRoutes);
app.use("/api/cafes", cafeRoutes);
app.use("/api/checkins", checkinRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/vouchers", voucherRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
