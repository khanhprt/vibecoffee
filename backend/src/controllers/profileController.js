import { prisma } from "../config/database.js";
import { profileUpdateSchema } from "../validators/schemas.js";
import { fail, ok } from "../utils/responses.js";

const profileSelect = {
  id: true,
  username: true,
  avatarUrl: true,
  bio: true,
  totalPoints: true,
  level: true,
  createdAt: true,
  _count: {
    select: {
      checkins: true,
      photos: true,
      followers: true,
      following: true
    }
  }
};

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: profileSelect
    });
    return ok(res, user);
  } catch (error) {
    return next(error);
  }
}

export async function profileByUsername(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
      select: profileSelect
    });
    if (!user) return fail(res, "PROFILE_NOT_FOUND", "Khong tim thay profile", 404);
    return ok(res, user);
  } catch (error) {
    return next(error);
  }
}

export async function updateMe(req, res, next) {
  try {
    const payload = profileUpdateSchema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: payload,
      select: profileSelect
    });
    return ok(res, user, "Cap nhat profile thanh cong");
  } catch (error) {
    return next(error);
  }
}

export async function uploadAvatar(req, res, next) {
  try {
    const avatarUrl = req.body.avatarUrl;
    if (!avatarUrl) return fail(res, "AVATAR_REQUIRED", "Can truyen avatarUrl hoac tich hop Cloudinary upload", 422);
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { avatarUrl },
      select: profileSelect
    });
    return ok(res, user, "Cap nhat avatar thanh cong");
  } catch (error) {
    return next(error);
  }
}

export async function photos(req, res, next) {
  try {
    const photos = await prisma.photo.findMany({
      where: { userId: req.params.id },
      orderBy: { createdAt: "desc" }
    });
    return ok(res, photos);
  } catch (error) {
    return next(error);
  }
}

export async function createPhoto(req, res, next) {
  try {
    const photo = await prisma.photo.create({
      data: {
        userId: req.user.id,
        cafeId: req.body.cafeId || null,
        url: req.body.url,
        caption: req.body.caption
      }
    });
    return ok(res, photo, "Dang anh thanh cong", 201);
  } catch (error) {
    return next(error);
  }
}
