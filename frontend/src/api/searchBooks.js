import kakao from "./kakao";

// 책 검색 함수
export async function searchBooks(query) {
  // navigate : 주로 버튼 클릭이나 특정 동작 후 페이지 이동을 처리할 때 사용
  try {
    const response = await kakao.get("/search/book", {
      params: {
        query: query,
        size: 30,
      },
    });

    return response.data.documents; // 책 리스트 반환
  } catch (error) {
    console.error("책 검색 실패:", error);
    throw error;
  }
}
