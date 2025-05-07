/**
 * isbn을 기반으로 고유한 주문 ID를 생성하는 함수
 * 토스 결제 요청 시 필수로 포함해야 하는 orderId 필드에 사용됨
 *
 * - Toss는 orderId에 허용 문자와 최대 길이(64자) 제한이 있음
 * - 고유성을 확보하기 위해 isbn + UUID 조합 사용
 * - isbn이 없을 경우, UUID만을 사용해 주문 ID를 생성함 (order-noisbn-UUID 형식)
 *
 * @param {string} isbn - 카카오 도서 API 응답값 중 isbn
 * @returns {string} 고유한 주문 ID 문자열
 */
export function generateOrderId(isbn) {
  const uuid = crypto.randomUUID();

  if (!isbn) return `order-noisbn-${uuid}`;

  const raw = isbn.replace(/\s+/g, ""); // 공백 제거
  const sanitized = raw.replace(/[^a-zA-Z0-9-_]/g, ""); // Toss 허용 문자만 필터링

  const base = `order-${sanitized}-${uuid}`;
  return base.slice(0, 64); // Toss 제한: 최대 64자
}
