import { ZodError } from "zod";
import { fail } from "../utils/responses.js";

export function notFound(req, res) {
  return fail(res, "NOT_FOUND", `Khong tim thay ${req.originalUrl}`, 404);
}

export function errorHandler(error, req, res, next) {
  if (error instanceof ZodError) {
    return fail(res, "VALIDATION_ERROR", error.errors[0]?.message || "Du lieu khong hop le", 422);
  }

  if (error?.code === "P2002") {
    return fail(res, "ACCOUNT_EXISTS", "Email hoac ten dang nhap da duoc su dung", 409);
  }

  if (["P1000", "P1001", "P1003"].includes(error?.code)) {
    return fail(res, "DATABASE_UNAVAILABLE", "Khong the ket noi PostgreSQL", 503);
  }

  console.error(error);
  return fail(res, "SERVER_ERROR", "Co loi xay ra", 500);
}
