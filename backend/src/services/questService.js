import { prisma } from "../config/database.js";

export async function listQuestsForUser(userId) {
  const quests = await prisma.quest.findMany({
    where: { isActive: true },
    include: { progress: { where: { userId } } }
  });

  return quests.map((quest) => ({
    ...quest,
    userProgress: quest.progress[0] || null,
    progress: undefined
  }));
}

export async function updateCheckinQuests(userId) {
  const quests = await prisma.quest.findMany({ where: { isActive: true, type: "checkin_count" } });

  await Promise.all(
    quests.map((quest) =>
      prisma.questProgress.upsert({
        where: { userId_questId: { userId, questId: quest.id } },
        create: {
          userId,
          questId: quest.id,
          progress: 1,
          completed: quest.target <= 1
        },
        update: {
          progress: { increment: 1 }
        }
      })
    )
  );
}
