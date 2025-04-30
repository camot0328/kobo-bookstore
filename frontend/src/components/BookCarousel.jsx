import React, { useEffect, useState } from "react";
import "../styles/BookCarousel.css"; // CSS 파일을 import합니다.

function BookCarousel({ query, title }) {
  const [booksData, setBooksData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // ★ 추가: 현재 보여줄 책 인덱스
  const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://dapi.kakao.com/v3/search/book?target=title&query=${encodeURIComponent(query)}&sort=latest&size=30`,
          { headers: { Authorization: `KakaoAK ${apiKey}` } }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.documents && data.documents.length > 0) {
          const formattedBooks = [];
          const titlesSet = new Set();

          data.documents.forEach((doc) => {
            if (!titlesSet.has(doc.title)) {
              titlesSet.add(doc.title);
              formattedBooks.push({
                title: doc.title,
                imageUrl: doc.thumbnail,
              });
            }
          });
          setBooksData(formattedBooks);
          setCurrentIndex(0); // 새로 검색하면 첫 번째 책부터 보여줘
        } else {
          console.log("검색 결과가 없습니다.");
          setBooksData([]);
        }
      } catch (error) {
        console.error("책 정보 API 호출 중 오류 발생:", error);
        setBooksData([]);
      }
    };
    fetchBooks();
  }, [apiKey, query]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 6, 0)); // 0 아래로는 못 내려가게
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 6, booksData.length - 6)
    ); // 마지막 이상은 못 가게
  };

  return (
    <div className="bookCarouselWrapper">
      <h2 className="carouselTitle">{title}</h2>
      <div className="bookCarouselContainer">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="nextIcon"
        >
          {"<"}
        </button>
        <div className="bookListWrapper">
          {booksData
            .slice(currentIndex, currentIndex + 6)
            .map((book, index) => (
              <div key={index} className="bookCoverWrapper">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="bookCoverImage"
                />
                <div className="bookTitle">{book.title}</div>
              </div>
            ))}
        </div>
        <button
          className="nextIcon"
          onClick={handleNext}
          disabled={currentIndex === booksData.length - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default BookCarousel;
