import React, { useEffect, useState } from "react";
// import axios from "axios";
import "../styles/BookCarousel.css";
import defaultThumbnail from "../assets/default-book-image.png";
import { fetchBooks } from "../api/books";

function BookCarousel({ category, title }) {
  const [booksData, setBooksData] = useState([]); // 배열로 선언
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks(category);
      setBooksData(data);
      setCurrentIndex(0);
    };
    loadBooks(); // 함수 호출
  }, [category]);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const res = await axios.get(`/api/books?category=${category}`);
  //       if (Array.isArray(res.data)) {
  //         setBooksData(res.data); // 배열 그대로 저장
  //         setCurrentIndex(0);
  //       } else {
  //         console.error("도서 데이터가 배열이 아님:", res.data);
  //         setBooksData([]);
  //       }
  //     } catch (error) {
  //       console.error("도서 목록 가져오기 실패:", error);
  //       setBooksData([]);
  //     }
  //   };
  //   fetchBooks();
  // }, [category]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 6, 0));
  };

  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 6, booksData.length - 6));

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
              <div key={book.id || index} className="bookCoverWrapper">
                <img
                  src={book.thumbnail || defaultThumbnail}
                  alt={book.title}
                  className="bookCoverImage"
                />
                <div className="bookTitle">{book.title}</div>
              </div>
            ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex >= booksData.length - 6}
          className="nextIcon"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default BookCarousel;
