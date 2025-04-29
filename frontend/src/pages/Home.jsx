import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import { searchBooks } from "../api/searchBooks.js";
import BookCarousel from "../components/BookCarousel.jsx";

function Home() {
  const [query, setQuery] = useState(""); // 검색어 상태
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const result = await searchBooks(query); // searchBooks 함수 사용
      navigate("/search", { state: { books: result } }); // 검색 결과를 SearchPage로 전달하고 이동
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>도서 검색</h1>
      {/* SearchBar 컴포넌트 사용 */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {/* BookCarousel 컴포넌트 사용 */}
      <br />
      <h3>개발자가 찾는 추천도서</h3>
      <BookCarousel query={"개발" + "엔드"} /> {/* 키워드 조합시 + 사용 */}
      <br />
      <h3>한강 작가 특별전!</h3>
      <BookCarousel query={"한강" + "작가"} /> {/* 키워드 조합시 + 사용 */}
      <br />
      <h3>떠오르는 경제도서</h3>
      <BookCarousel query={"세계" + "경제"} /> {/* 키워드 조합시 + 사용 */}
      <br />
      <h3>봄을 맞이하며, 시집 추천해요</h3>
      <BookCarousel query={"시"} /> {/* 키워드 조합시 + 사용 */}
    </div>
  );
}

export default Home;
