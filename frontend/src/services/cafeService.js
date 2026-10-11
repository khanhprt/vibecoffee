import api from "./api.js";
import { createDemoCheckin, getDemoCafe, getDemoCafes, isDemoMode, issueDemoReceipt, toggleDemoFavorite } from "./demoService.js";

export async function getNearbyCafes(params) {
  if (isDemoMode) return getDemoCafes(params);
  const { data } = await api.get("/cafes/nearby", { params });
  return data.data;
}

export async function getCafe(id) {
  if (isDemoMode) return getDemoCafe(id);
  const { data } = await api.get(`/cafes/${id}`);
  return data.data;
}

export async function checkInCafe(payload) {
  if (isDemoMode) return createDemoCheckin(payload);
  const { data } = await api.post("/checkins", payload);
  return data.data;
}

export async function issueCafeReceipt(cafeId) {
  if (isDemoMode) return issueDemoReceipt(cafeId);
  const { data } = await api.post(`/cafes/${cafeId}/receipts`);
  return data.data;
}

export async function toggleFavorite(cafeId) {
  if (isDemoMode) return toggleDemoFavorite(cafeId);
  return { id: cafeId };
}
