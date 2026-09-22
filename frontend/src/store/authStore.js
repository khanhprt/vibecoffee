import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("vibe_token"),
  setSession: ({ user, token }) => {
    localStorage.setItem("vibe_token", token);
    set({ user, token });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("vibe_token");
    set({ user: null, token: null });
  }
}));
