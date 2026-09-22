import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, "Username chi gom chu, so va dau gach duoi"),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(72)
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1)
});

export const cafeSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(3),
  lat: z.number(),
  lng: z.number(),
  description: z.string().optional(),
  coverUrl: z.string().url().optional(),
  vibes: z.array(z.string()).default([])
});

export const checkinSchema = z.object({
  cafeId: z.string().uuid(),
  lat: z.number(),
  lng: z.number(),
  photoUrl: z.string().url().optional()
});

export const profileUpdateSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  bio: z.string().max(240).optional(),
  avatarUrl: z.string().url().optional()
});
