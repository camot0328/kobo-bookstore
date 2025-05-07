import { useState } from "react";
import { getRecommendedBooks } from "../api/gptRecommend";
import { searchBooks } from "../api/searchBooks";
import BookList from "../components/BookList.jsx";
import "../styles/RecommendPage.css";

function RecommendPage() {
  const [userInput, setUserInput] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const recommended = await getRecommendedBooks(userInput);

      const searchResults = await Promise.all(
        recommended.map(async (book) => {
          const results = await searchBooks(book.title);
          if (results.length > 0) return results[0];
          return null;
        })
      );

      const filtered = searchResults.filter(Boolean).slice(0, 3);
      setBooks(filtered);
    } catch (err) {
      console.error("추천 실패:", err);
      setError("추천 도서를 불러오는 중 문제가 발생했어요.");
    }

    setLoading(false);
  };

  return (
    <div className="recommend-page">
      <h2 className="recommend-page__title">AI 도서 추천</h2>
      <p className="recommend-page__sub">
        지금 기분이나 상황을 입력하면 GPT가 어울리는 책을 추천해줘요.
      </p>

      <div className="recommend-page__input-group">
        <input
          type="text"
          className="recommend-page__input"
          placeholder="예: 요즘 불안하고 지쳐요. 마음이 편해지는 책이 필요해요."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="recommend-page__button" onClick={handleRecommend}>
          추천받기
        </button>
      </div>

      {loading && <p>추천 중입니다... 잠시만 기다려주세요.</p>}
      {error && <p className="recommend-page__error">{error}</p>}

      {books.length > 0 && (
        <>
          <h3 className="recommend-page__result-title">📖 추천 도서 목록</h3>
          <BookList books={books} />
        </>
      )}
    </div>
  );
}

export default RecommendPage;
