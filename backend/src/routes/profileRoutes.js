import { Router } from "express";
import { createPhoto, me, photos, profileByUsername, updateMe, uploadAvatar } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/me", authMiddleware, me);
router.put("/me", authMiddleware, updateMe);
router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);
router.get("/:username", profileByUsername);
router.get("/:id/photos", photos);
router.post("/photos", authMiddleware, createPhoto);

export default router;
