export function normalizeCafeSearch(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0111/g, "d").replace(/\u0110/g, "D").toLowerCase().trim();
}

export function filterCafes(cafes, { q = "", vibe = "all", district = "", maxDistance = 0, minRating = 0 } = {}) {
  const keyword = normalizeCafeSearch(q);
  const matches = cafes.filter((cafe) =>
    (!keyword || normalizeCafeSearch(`${cafe.name} ${cafe.address} ${cafe.description || ""}`).includes(keyword)) &&
    (vibe === "all" || !vibe || (vibe === "favorite" ? cafe.favorite : vibe === "nearby" ? cafe.distanceMeters <= 1000 : cafe.vibes.includes(vibe))) &&
    (!district || cafe.district === district) &&
    (!Number(maxDistance) || cafe.distanceMeters <= Number(maxDistance)) &&
    cafe.rating >= Number(minRating)
  );
  return vibe === "nearby" ? matches.sort((a, b) => a.distanceMeters - b.distanceMeters) : matches;
}
