/**
 * 로그인한 사용자의 장바구니 데이터를 서버에 저장하는 함수
 *
 * - axiosInstance를 통해 인증 헤더를 포함한 POST 요청을 보냄
 * - json-server-auth와 같은 인증 서버에 요청 시 `Authorization` 헤더 필수
 * - 장바구니 항목은 서버의 `/api/cart`에 저장됨
 *
 * @param {Object} cartItem - 서버에 저장할 장바구니 항목 객체
 * @param {string} cartItem.isbn - 상품 고유 ID (ISBN)
 * @param {string} cartItem.title - 상품 제목
 * @param {number} cartItem.price - 상품 가격
 * @param {number} cartItem.quantity - 수량
 * @param {string} cartItem.thumbnail - 상품 이미지 URL
 * @param {string} cartItem.addedAt - 장바구니 추가 시각 (ISO 8601 문자열)
 *
 * @param {string} token - 로그인한 사용자의 JWT 액세스 토큰
 *
 * @returns {Promise<import('axios').AxiosResponse>} 서버 응답 Promise 객체
 */
import axiosInstance from "./axiosInstance";

export function addCartItemToServer(cartItem, token) {
  return axiosInstance.post("/api/cart", cartItem, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
