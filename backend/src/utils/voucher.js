export function buildVoucherCode(prefix = "VIBE") {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${suffix}`;
}
