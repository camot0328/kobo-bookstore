export function generateOrderId(isbn) {
  if (!isbn) return `order-noisbn-${Date.now()}`;

  const raw = isbn.replace(/\s+/g, ""); // 공백 제거
  const sanitized = raw.replace(/[^a-zA-Z0-9-_]/g, ""); // Toss 허용 문자만

  const base = `order-${sanitized}-${Date.now()}`;
  return base.slice(0, 64); // Toss 제한: 64자 이하
}
