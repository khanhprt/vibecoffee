import { Router } from "express";
import { claimQuest, listQuests, myQuests } from "../controllers/questController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", listQuests);
router.get("/me", authMiddleware, myQuests);
router.post("/:id/claim", authMiddleware, claimQuest);

export default router;
