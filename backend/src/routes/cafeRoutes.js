import { Router } from "express";
import { create, detail, list, nearby, update } from "../controllers/cafeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/nearby", nearby);
router.get("/", list);
router.get("/:id", detail);
router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);

export default router;
