import axiosInstance from "./axiosInstance";

// ✅ 장바구니 전체 조회 (userId 기준)
export async function getCartItemsByUserId(userId) {
  const res = await axiosInstance.get(`/660/cart?userId=${userId}`);
  return res.data;
}

// ✅ 장바구니에 항목 추가
export function addCartItemToServer(cartItem) {
  return axiosInstance.post("/660/cart", cartItem);
}

// ✅ 장바구니 항목 개별 삭제
export function deleteCartItem(itemId) {
  return axiosInstance.delete(`/660/cart/${itemId}`);
}

// ✅ 장바구니 비우기 (유저 전체)
export async function clearCartByUserId(userId) {
  const items = await getCartItemsByUserId(userId);
  const deletePromises = items.map((item) => deleteCartItem(item.id));
  await Promise.all(deletePromises);
}
