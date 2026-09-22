import { prisma } from "../config/database.js";
import { fail } from "../utils/responses.js";
import { verifyToken } from "../utils/jwt.js";

export async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return fail(res, "UNAUTHORIZED", "Ban can dang nhap", 401);

    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return fail(res, "UNAUTHORIZED", "Token khong hop le", 401);

    req.user = user;
    return next();
  } catch {
    return fail(res, "UNAUTHORIZED", "Token khong hop le", 401);
  }
}
