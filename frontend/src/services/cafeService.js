import api from "./api.js";

export async function getNearbyCafes(params) {
  const { data } = await api.get("/cafes/nearby", { params });
  return data.data;
}

export async function getCafe(id) {
  const { data } = await api.get(`/cafes/${id}`);
  return data.data;
}
