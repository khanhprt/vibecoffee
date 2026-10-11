import api from "./api.js";
import { getDemoCheckins, getDemoPhotos, getDemoProfile, isDemoMode, updateDemoProfile } from "./demoService.js";

export async function getMyProfile() {
  if (isDemoMode) return getDemoProfile();
  const { data } = await api.get("/profile/me");
  return data.data;
}

export async function getPhotos(userId) {
  if (isDemoMode) return getDemoPhotos(userId);
  const { data } = await api.get(`/profile/${userId}/photos`);
  return data.data;
}

export async function updateMyProfile(payload) {
  if (isDemoMode) return updateDemoProfile(payload);
  const { data } = await api.put("/profile/me", payload);
  return data.data;
}

export async function getMyCheckins() {
  if (isDemoMode) return getDemoCheckins();
  const { data } = await api.get("/checkins/me");
  return data.data;
}
