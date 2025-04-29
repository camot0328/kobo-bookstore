import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import { searchBooks } from "../api/searchBooks.js";

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
    </div>
  );
}

export default Home;
