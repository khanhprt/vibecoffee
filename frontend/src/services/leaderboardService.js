import api from "./api.js";
import { getDemoLeaderboard, isDemoMode } from "./demoService.js";

export async function getLeaderboard(params = {}) {
  if (isDemoMode) return getDemoLeaderboard(params);
  const { data } = await api.get("/leaderboard", { params });
  return data.data;
}
