export function formatPoints(points) {
  return new Intl.NumberFormat("vi-VN").format(points);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}
