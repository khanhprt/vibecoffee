import { Router } from "express";
import { myVouchers, useVoucher } from "../controllers/voucherController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, myVouchers);
router.post("/:id/use", authMiddleware, useVoucher);

export default router;
