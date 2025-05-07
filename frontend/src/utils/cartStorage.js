/**
 * 비회원(guest) 사용자의 장바구니 데이터를 localStorage에 저장하는 함수
 *
 * - 기존 장바구니(`guest_cart`)가 있으면 불러와서 수량을 증가시키고,
 * - 없거나 새로운 상품이면 새 항목으로 추가
 * - 최종 결과는 localStorage의 "guest_cart" 키에 JSON 문자열로 저장됨
 *
 * @param {Object} cartItem - 장바구니에 추가할 상품 객체
 * @param {string} cartItem.isbn - 상품 고유 ID (ISBN)
 * @param {string} cartItem.title - 상품 제목
 * @param {number} cartItem.price - 상품 가격
 * @param {number} cartItem.quantity - 수량 (기본적으로 1)
 * @param {string} cartItem.thumbnail - 상품 이미지 URL
 * @param {string} cartItem.addedAt - 장바구니 추가 시간 (ISO 문자열)
 *
 * @returns {void}
 */
export function addCartItemToGuest(cartItem) {
  const existing = JSON.parse(localStorage.getItem("guest_cart")) || [];
  const foundIndex = existing.findIndex((item) => item.isbn === cartItem.isbn);

  if (foundIndex !== -1) {
    existing[foundIndex].quantity += 1;
  } else {
    existing.push(cartItem);
  }

  localStorage.setItem("guest_cart", JSON.stringify(existing));
}
