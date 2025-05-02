import axiosInstance from "./axiosInstance";

// 유저 목록 가져오기
export const fetchUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

// 장바구니 목록 가져오기
export const fetchCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data;
};

// 도서 목록 가져오기
export const fetchBooks = async () => {
  const res = await axiosInstance.get("/books");
  return res.data;
};
