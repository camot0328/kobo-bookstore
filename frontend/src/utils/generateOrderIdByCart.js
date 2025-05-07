export function generateOrderIdByCart(userId) {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);
  return `ORD_${timestamp}_uid${userId}`;
}
