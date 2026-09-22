import { ZodError } from "zod";
import { fail } from "../utils/responses.js";

export function notFound(req, res) {
  return fail(res, "NOT_FOUND", `Khong tim thay ${req.originalUrl}`, 404);
}

export function errorHandler(error, req, res, next) {
  if (error instanceof ZodError) {
    return fail(res, "VALIDATION_ERROR", error.errors[0]?.message || "Du lieu khong hop le", 422);
  }

  console.error(error);
  return fail(res, "SERVER_ERROR", "Co loi xay ra", 500);
}
