import { useLocation } from "react-router-dom";
import { useState } from "react";
import { searchBooks } from "../api/searchBooks.js";
import SearchBar from "../components/SearchBar.jsx";
import "../styles/SearchPage.css"; // CSS 파일을 임포트

function SearchPage() {
  const [query, setQuery] = useState(""); // 검색어 상태
  const [books, setBooks] = useState([]); // 검색된 책 목록 상태 추가
  const location = useLocation();
  const initialBooks = location.state ? location.state.books : []; // 이전 페이지에서 전달된 검색 결과

  // 페이지 처음 로드 시 이전에 검색된 결과가 있으면 그것을 books 상태에 저장
  useState(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  const handleSearch = async () => {
    try {
      const result = await searchBooks(query); // searchBooks 함수 사용
      setBooks(result); // 검색된 책 목록 상태에 저장
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>도서 검색 결과</h1>
      {/* SearchBar 컴포넌트 사용 */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {/* 검색 결과 출력 */}
      <ul>
        {books.map((book, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <img
              src={book.thumbnail}
              alt={book.title}
              width="50"
              style={{ marginRight: "10px" }}
            />
            {book.title} - {book.authors.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
