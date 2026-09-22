import { prisma } from "../config/database.js";

export async function addPoints(userId, points) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { totalPoints: { increment: points } }
  });

  return user;
}
