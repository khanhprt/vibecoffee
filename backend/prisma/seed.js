import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@vibecoffee.app" },
    update: {},
    create: {
      username: "pinkwizard",
      email: "demo@vibecoffee.app",
      passwordHash,
      totalPoints: 1250,
      level: "Explorer"
    }
  });

  const cafe = await prisma.cafe.create({
    data: {
      name: "Pink Pixel Brew",
      address: "12 Nguyen Hue, Quan 1, TP.HCM",
      lat: 10.7731,
      lng: 106.7039,
      description: "Quan ca phe tone hong, hop check-in va lam viec nhe.",
      coverUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
      vibes: ["view-dep", "chill"],
      avgRating: 4.8
    }
  });

  await prisma.quest.createMany({
    data: [
      { code: "FIRST_SIP", title: "First Sip", description: "Check-in quan dau tien", type: "checkin_count", target: 1, rewardPoints: 10 },
      { code: "EXPLORER", title: "Explorer", description: "Ghe 5 quan khac nhau", type: "checkin_count", target: 5, rewardPoints: 50, rewardVoucher: "VIBE30" },
      { code: "EARLY_BIRD", title: "Early Bird", description: "Check-in truoc 9h sang", type: "early_checkin", target: 1, rewardPoints: 20 }
    ],
    skipDuplicates: true
  });

  await prisma.photo.create({
    data: {
      userId: user.id,
      cafeId: cafe.id,
      url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
      caption: "First vibe check"
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
