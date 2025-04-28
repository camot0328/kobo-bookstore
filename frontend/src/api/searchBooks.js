import kakao from "./kakao";

export const searchBooks = async (query) => {
  try {
    const response = await kakao.get("/search/book", {
      params: { query },
    });
    return response.data.documents; // 책 리스트 반환
  } catch (error) {
    console.error("Kakao API 호출 오류:", error);
    throw error;
  }
};
