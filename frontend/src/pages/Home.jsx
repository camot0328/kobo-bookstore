import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import { searchBooks } from "../api/searchBooks.js";
import BookCarousel from "../components/BookCarousel.jsx";
import MainGrid from "../components/maingrid/MainGrid.jsx";

function Home() {
  const [query, setQuery] = useState(""); // 검색어 상태
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const result = await searchBooks(query); // searchBooks 함수 사용
      navigate("/search", { state: { books: result, query } }); // 검색 결과와 검색어를 전달
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
      <MainGrid />
      {/* BookCarousel 컴포넌트 사용 */}
      <BookCarousel title="개발자가 찾는 추천도서" query={"개발" + "엔드"} />
      {/* 키워드 조합시 + 사용 */}
      <BookCarousel title="한강 작가 특별전!" query={"한강" + "작가"} />
      {/* 키워드 조합시 + 사용 */}
      <BookCarousel title="가장 많이찾는 경제도서" query={"세계" + "경제"} />
      {/* 키워드 조합시 + 사용 */}
      <BookCarousel title="봄을 맞이하며, 시집 추천해요" query={"시"} />
      {/* 키워드 조합시 + 사용  */}
    </div>
  );
}

export default Home;
