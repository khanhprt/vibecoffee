import { prisma } from "../config/database.js";
import { haversineDistanceMeters } from "../utils/distance.js";

export async function findNearbyCafes({ lat, lng, radius = 2000, vibe }) {
  const cafes = await prisma.cafe.findMany({
    where: vibe ? { vibes: { has: vibe } } : undefined,
    orderBy: { createdAt: "desc" }
  });

  return cafes
    .map((cafe) => ({
      ...cafe,
      distanceMeters: haversineDistanceMeters({ lat, lng }, { lat: cafe.lat, lng: cafe.lng })
    }))
    .filter((cafe) => cafe.distanceMeters <= radius)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}

export function getCafeById(id) {
  return prisma.cafe.findUnique({
    where: { id },
    include: { photos: { take: 12, orderBy: { createdAt: "desc" } } }
  });
}
