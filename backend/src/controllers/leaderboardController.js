import { prisma } from "../config/database.js";
import { ok } from "../utils/responses.js";

export async function leaderboard(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      take: 50,
      orderBy: { totalPoints: "desc" },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        totalPoints: true,
        level: true
      }
    });
    return ok(res, { period: req.query.period || "all", region: req.query.region || null, users });
  } catch (error) {
    return next(error);
  }
}
