import api from "./api.js";
import { demoLogin, DEMO_TOKEN, getDemoProfile, isDemoMode } from "./demoService.js";

export async function login(payload) {
  if (isDemoMode) return demoLogin(payload);
  const { data } = await api.post("/auth/login", payload);
  return data.data;
}

export async function register(payload) {
  if (isDemoMode) throw new Error("Ban demo su dung tai khoan admin / admin.");
  const { data } = await api.post("/auth/register", payload);
  return data.data;
}

export async function me() {
  if (isDemoMode) {
    if (localStorage.getItem("vibe_demo_token") !== DEMO_TOKEN) throw new Error("Demo session expired.");
    return getDemoProfile();
  }
  const { data } = await api.get("/auth/me");
  return data.data;
}

export async function logout() {
  if (isDemoMode) return;
  await api.post("/auth/logout");
}
