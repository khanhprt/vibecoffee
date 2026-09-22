import { loginSchema, registerSchema } from "../validators/schemas.js";
import { loginUser, registerUser, toPublicUser } from "../services/authService.js";
import { fail, ok } from "../utils/responses.js";

export async function register(req, res, next) {
  try {
    const payload = registerSchema.parse(req.body);
    const session = await registerUser(payload);
    return ok(res, session, "Dang ky thanh cong", 201);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const payload = loginSchema.parse(req.body);
    const session = await loginUser(payload);
    if (!session) return fail(res, "INVALID_CREDENTIALS", "Email hoac mat khau khong dung", 401);
    return ok(res, session, "Dang nhap thanh cong");
  } catch (error) {
    return next(error);
  }
}

export function logout(req, res) {
  return ok(res, null, "Dang xuat thanh cong");
}

export function me(req, res) {
  return ok(res, toPublicUser(req.user));
}
