import api from "./api.js";
import { claimDemoQuest, getDemoQuests, isDemoMode } from "./demoService.js";

export async function getQuests() {
  if (isDemoMode) return getDemoQuests();
  const { data } = await api.get("/quests");
  return data.data;
}

export async function claimQuest(id) {
  if (isDemoMode) return claimDemoQuest(id);
  const { data } = await api.post(`/quests/${id}/claim`);
  return data.data;
}
