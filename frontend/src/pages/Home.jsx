import { useState } from "react";
import axios from "axios";

function Home() {
  const [query, setQuery] = useState(""); // 검색어 상태
  const [books, setBooks] = useState([]); // 검색 결과 저장

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://dapi.kakao.com/v3/search/book?query=${query}`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        }
      );
      setBooks(res.data.documents);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>도서 검색</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          검색
        </button>
      </div>

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

export default Home;
