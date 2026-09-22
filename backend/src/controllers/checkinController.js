import { prisma } from "../config/database.js";
import { checkinSchema } from "../validators/schemas.js";
import { getCafeById } from "../services/cafeService.js";
import { addPoints } from "../services/pointsService.js";
import { updateCheckinQuests } from "../services/questService.js";
import { haversineDistanceMeters } from "../utils/distance.js";
import { fail, ok } from "../utils/responses.js";

export async function createCheckin(req, res, next) {
  try {
    const payload = checkinSchema.parse(req.body);
    const cafe = await getCafeById(payload.cafeId);
    if (!cafe) return fail(res, "CAFE_NOT_FOUND", "Khong tim thay quan", 404);

    const distance = haversineDistanceMeters(payload, cafe);
    if (distance > 50) return fail(res, "TOO_FAR", "Ban can o trong ban kinh 50m de check-in", 422);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const existing = await prisma.checkin.findFirst({
      where: {
        userId: req.user.id,
        cafeId: cafe.id,
        createdAt: { gte: startOfDay }
      }
    });
    if (existing) return fail(res, "ALREADY_CHECKED_IN", "Moi quan chi check-in 1 lan moi ngay", 409);

    const checkin = await prisma.checkin.create({
      data: {
        userId: req.user.id,
        cafeId: cafe.id,
        lat: payload.lat,
        lng: payload.lng,
        photoUrl: payload.photoUrl,
        points: 10
      }
    });

    await addPoints(req.user.id, 10);
    await updateCheckinQuests(req.user.id);
    return ok(res, checkin, "Check-in thanh cong");
  } catch (error) {
    return next(error);
  }
}

export async function myCheckins(req, res, next) {
  try {
    const checkins = await prisma.checkin.findMany({
      where: { userId: req.user.id },
      include: { cafe: true },
      orderBy: { createdAt: "desc" }
    });
    return ok(res, checkins);
  } catch (error) {
    return next(error);
  }
}

export async function cafeCheckins(req, res, next) {
  try {
    const checkins = await prisma.checkin.findMany({
      where: { cafeId: req.params.cafeId },
      include: { user: { select: { id: true, username: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" }
    });
    return ok(res, checkins);
  } catch (error) {
    return next(error);
  }
}
