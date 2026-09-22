import { Router } from "express";
import { cafeCheckins, createCheckin, myCheckins } from "../controllers/checkinController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createCheckin);
router.get("/me", authMiddleware, myCheckins);
router.get("/cafe/:cafeId", cafeCheckins);

export default router;
