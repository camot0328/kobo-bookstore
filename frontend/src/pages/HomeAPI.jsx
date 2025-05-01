import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import { searchBooks } from "../api/searchBooks.js";
// import BookCarousel from "../components/BookCarousel.jsx";
import BookCarouselAPI from "../components/BookCarouselAPI.jsx";
import SignUpButton from "../components/SignUpButton.jsx";
import TossPaymentButton from "../components/TossPaymentButton.jsx";

function Home() {
  const [query, setQuery] = useState(""); // 검색어 상태
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const result = await searchBooks(query); // 검색어로 검색
      navigate("/search", { state: { books: result, query } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>도서 검색</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />

      {/* json-server의 books 엔드포인트에서 category 기준으로 데이터 조회 */}
      <BookCarouselAPI title="봄을 맞이하며, 시집 추천해요" category="시" />
      <BookCarouselAPI title="한강 작가 특별전" category="한강작가" />
      <BookCarouselAPI title="개발자가 찾는 추천도서" category="개발" />
      <BookCarouselAPI title="가장 많이 찾는 경제도서" category="세계경제" />

      <br />
      <SignUpButton />
      <TossPaymentButton
        amount={1000}
        orderId={`ORDER_${Date.now()}`}
        orderName="테스트 결제"
        customerName="홍길동"
      />
    </div>
  );
}

export default Home;
