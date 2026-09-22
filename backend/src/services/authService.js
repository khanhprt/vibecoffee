import bcrypt from "bcrypt";
import { prisma } from "../config/database.js";
import { signToken } from "../utils/jwt.js";

const publicUserSelect = {
  id: true,
  username: true,
  email: true,
  avatarUrl: true,
  bio: true,
  totalPoints: true,
  level: true,
  createdAt: true
};

export async function registerUser({ username, email, password }) {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { username, email, passwordHash },
    select: publicUserSelect
  });

  return { user, token: signToken(user) };
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  const publicUser = await prisma.user.findUnique({ where: { id: user.id }, select: publicUserSelect });
  return { user: publicUser, token: signToken(user) };
}

export function toPublicUser(user) {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}
