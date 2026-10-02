import api from "./api.js";
import { getDemoProfile, isDemoMode, updateDemoProfile } from "./demoService.js";

export async function getMyProfile() {
  if (isDemoMode) return getDemoProfile();
  const { data } = await api.get("/profile/me");
  return data.data;
}

export async function getPhotos(userId) {
  if (isDemoMode) return [];
  const { data } = await api.get(`/profile/${userId}/photos`);
  return data.data;
}

export async function updateMyProfile(payload) {
  if (isDemoMode) return updateDemoProfile(payload);
  const { data } = await api.put("/profile/me", payload);
  return data.data;
}
