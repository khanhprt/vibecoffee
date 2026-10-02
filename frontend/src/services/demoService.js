export const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";
export const DEMO_TOKEN = "vibe-coffee-demo-admin";
const PROFILE_KEY = "vibe_demo_profile";

const defaultProfile = {
  id: "demo-admin",
  username: "admin",
  email: "admin@vibecoffee.demo",
  avatarUrl: null,
  bio: "Yeu ca phe, nhung goc quan xinh va nhung khoanh khac that chill.",
  totalPoints: 5860,
  level: "Legend",
  createdAt: "2026-01-01T00:00:00.000Z",
  _count: { checkins: 42, photos: 4, following: 18, followers: 128 }
};

export function getDemoProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY));
    return { ...defaultProfile, username: saved?.username || defaultProfile.username, bio: saved?.bio ?? defaultProfile.bio };
  } catch {
    return { ...defaultProfile };
  }
}

export function demoLogin({ email, password }) {
  if (email.trim().toLowerCase() !== "admin" || password !== "admin") {
    throw new Error("Tai khoan hoac mat khau khong dung. Tai khoan demo: admin / admin.");
  }
  return { user: getDemoProfile(), token: DEMO_TOKEN };
}

export function updateDemoProfile({ username, bio }) {
  const cleanUsername = username.trim();
  if (cleanUsername.length < 3 || cleanUsername.length > 30) {
    throw new Error("Ten dang nhap phai co tu 3 den 30 ky tu.");
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ username: cleanUsername, bio }));
  return getDemoProfile();
}
