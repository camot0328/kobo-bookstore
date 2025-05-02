import axiosInstance from "./axiosInstance";

/**
 * 주어진 카테고리에 해당하는 도서 목록을 json-server에서 가져옵니다.
 * @param {string} category - 도서 카테고리
 * @returns {Promise<Array>} 도서 배열
 */
export async function fetchBooks(category) {
  if (!category) {
    console.warn("카테고리가 지정되지 않았습니다. 빈 배열을 반환합니다.");
    return [];
  }

  try {
    const response = await axiosInstance.get(`/books?category=${category}`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("도서 데이터가 배열 형식이 아님:", response.data);
      return [];
    }
  } catch (error) {
    console.error("도서 데이터 가져오기 실패:", error);
    return [];
  }
}
