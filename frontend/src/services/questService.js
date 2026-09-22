import api from "./api.js";

export async function getQuests() {
  const { data } = await api.get("/quests");
  return data.data;
}

export async function claimQuest(id) {
  const { data } = await api.post(`/quests/${id}/claim`);
  return data.data;
}
