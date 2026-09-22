import { prisma } from "../config/database.js";
import { fail, ok } from "../utils/responses.js";

export async function myVouchers(req, res, next) {
  try {
    const vouchers = await prisma.userVoucher.findMany({
      where: { userId: req.user.id },
      include: { voucher: true },
      orderBy: { claimedAt: "desc" }
    });
    return ok(res, vouchers);
  } catch (error) {
    return next(error);
  }
}

export async function useVoucher(req, res, next) {
  try {
    const voucher = await prisma.userVoucher.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!voucher) return fail(res, "VOUCHER_NOT_FOUND", "Khong tim thay voucher", 404);
    if (voucher.usedAt) return fail(res, "VOUCHER_USED", "Voucher da duoc su dung", 409);

    const updated = await prisma.userVoucher.update({
      where: { id: voucher.id },
      data: { usedAt: new Date() }
    });
    return ok(res, updated, "Dung voucher thanh cong");
  } catch (error) {
    return next(error);
  }
}
