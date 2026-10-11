export function createReceipt(cafe, receipts = []) {
  let code;
  do {
    code = Array.from(crypto.getRandomValues(new Uint8Array(8)), value => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[value % 32]).join("");
  } while (receipts.some(receipt => receipt.code === code));
  const createdAt = new Date().toISOString();
  return {
    id: crypto.randomUUID(), cafeId: cafe.id, code, createdAt,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    usedAt: null, item: cafe.signature || "Ca phe sua", amount: 55000
  };
}

export function validateReceipt(receipts, cafeId, input) {
  const code = String(input || "").trim().toUpperCase();
  if (!/^[A-Z2-9]{8}$/.test(code)) throw new Error("Ma hoa don gom 8 ky tu chu va so.");
  const receipt = receipts.find(item => item.code === code);
  if (!receipt || receipt.cafeId !== cafeId) throw new Error("Ma hoa don khong hop le tai quan nay.");
  if (receipt.usedAt) throw new Error("Ma hoa don nay da duoc su dung.");
  if (Date.parse(receipt.expiresAt) <= Date.now()) throw new Error("Ma hoa don da het han. Vui long dung hoa don moi.");
  return receipt;
}
