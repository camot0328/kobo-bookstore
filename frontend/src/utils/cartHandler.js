/**
 * 책 정보를 기반으로 로그인 상태에 따라 장바구니에 추가하는 함수
 *
 * @param {Object} book - 카카오 API로부터 받은 책 객체
 * @param {Object|null} user - 로그인한 사용자 객체 (없으면 비회원 처리)
 * @param {string|null} token - 로그인된 사용자의 JWT 토큰
 * @returns {Promise<void>}
 */
import { addCartItemToServer } from "../api/cartApi";
import { addCartItemToGuest } from "./cartStorage";
export function handleAddToCart(book, user, token) {
  const cartItem = {
    isbn: book.isbn,
    title: book.title,
    price: book.sale_price,
    quantity: 1,
    thumbnail: book.thumbnail,
    addedAt: new Date().toISOString(),
  };

  if (user && token) {
    return addCartItemToServer({ ...cartItem, userId: user.id }, token)
      .then(() => alert("장바구니에 담았습니다."))
      .catch(() => alert("장바구니 저장 실패"));
  } else {
    addCartItemToGuest(cartItem);
    alert("장바구니에 담았습니다. (비회원)");
    return Promise.resolve(); // 일관된 반환을 위해
  }
}
