export const cafeMapTileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export function getCafeMapPoint(cafe) {
  return [Number(cafe.lat), Number(cafe.lng)];
}
