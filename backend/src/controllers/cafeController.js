import { prisma } from "../config/database.js";
import { cafeSchema } from "../validators/schemas.js";
import { findNearbyCafes, getCafeById } from "../services/cafeService.js";
import { fail, ok } from "../utils/responses.js";

export async function nearby(req, res, next) {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const radius = Number(req.query.radius || 2000);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return fail(res, "INVALID_LOCATION", "Can truyen lat va lng hop le", 422);
    }

    const cafes = await findNearbyCafes({ lat, lng, radius, vibe: req.query.vibe });
    return ok(res, cafes);
  } catch (error) {
    return next(error);
  }
}

export async function list(req, res, next) {
  try {
    const where = req.query.vibe ? { vibes: { has: req.query.vibe } } : undefined;
    const cafes = await prisma.cafe.findMany({ where, orderBy: { createdAt: "desc" } });
    return ok(res, cafes);
  } catch (error) {
    return next(error);
  }
}

export async function detail(req, res, next) {
  try {
    const cafe = await getCafeById(req.params.id);
    if (!cafe) return fail(res, "CAFE_NOT_FOUND", "Khong tim thay quan", 404);
    return ok(res, cafe);
  } catch (error) {
    return next(error);
  }
}

export async function create(req, res, next) {
  try {
    const payload = cafeSchema.parse(req.body);
    const cafe = await prisma.cafe.create({ data: payload });
    return ok(res, cafe, "Tao quan thanh cong", 201);
  } catch (error) {
    return next(error);
  }
}

export async function update(req, res, next) {
  try {
    const payload = cafeSchema.partial().parse(req.body);
    const cafe = await prisma.cafe.update({ where: { id: req.params.id }, data: payload });
    return ok(res, cafe, "Cap nhat quan thanh cong");
  } catch (error) {
    return next(error);
  }
}
