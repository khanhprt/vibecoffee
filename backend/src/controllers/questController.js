import { prisma } from "../config/database.js";
import { listQuestsForUser } from "../services/questService.js";
import { addPoints } from "../services/pointsService.js";
import { fail, ok } from "../utils/responses.js";

export async function listQuests(req, res, next) {
  try {
    const quests = req.user
      ? await listQuestsForUser(req.user.id)
      : await prisma.quest.findMany({ where: { isActive: true } });
    return ok(res, quests);
  } catch (error) {
    return next(error);
  }
}

export async function myQuests(req, res, next) {
  try {
    const quests = await listQuestsForUser(req.user.id);
    return ok(res, quests);
  } catch (error) {
    return next(error);
  }
}

export async function claimQuest(req, res, next) {
  try {
    const progress = await prisma.questProgress.findUnique({
      where: { userId_questId: { userId: req.user.id, questId: req.params.id } },
      include: { quest: true }
    });

    if (!progress || !progress.completed) return fail(res, "QUEST_NOT_COMPLETE", "Nhiem vu chua hoan thanh", 422);
    if (progress.claimedAt) return fail(res, "QUEST_ALREADY_CLAIMED", "Ban da nhan thuong", 409);

    const updated = await prisma.questProgress.update({
      where: { id: progress.id },
      data: { claimedAt: new Date() }
    });
    await addPoints(req.user.id, progress.quest.rewardPoints);
    return ok(res, updated, "Nhan thuong thanh cong");
  } catch (error) {
    return next(error);
  }
}
