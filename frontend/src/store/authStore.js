import { create } from "zustand";
import { isDemoMode } from "../services/demoService.js";

const tokenKey = isDemoMode ? "vibe_demo_token" : "vibe_token";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem(tokenKey),
  setSession: ({ user, token }) => {
    localStorage.setItem(tokenKey, token);
    set({ user, token });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem(tokenKey);
    set({ user: null, token: null });
  }
}));
