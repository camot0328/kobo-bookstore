import React, { useEffect, useState } from "react";
// import axios from "axios";
import "../styles/BookCarousel.css";
import defaultThumbnail from "../assets/default-book-image.png";
import { fetchBooks } from "../api/books";
import iconLeft from "../assets/icon/png/angle-left.png";
import iconRight from "../assets/icon/png/angle-right.png";
import { Link } from "react-router-dom"; //Link 추가

function BookCarousel({ category, title }) {
  const [booksData, setBooksData] = useState([]); // 배열로 선언
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks(category);
      setBooksData(data);
      setCurrentIndex(0);
      console.log(data);
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
      <div className="bookCarouselContainer">
        <h2 className="carouselTitle">{title}</h2>

        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="prevButton"
        >
          <img src={iconLeft} />
        </button>

        <div className="bookListWrapper">
          {booksData.slice(currentIndex, currentIndex + 6).map((book) => (
            <div key={book.isbn} className="bookCoverWrapper">
              {/* ⭐ bookCoverWrapper 안에 Link 추가 */}
              <Link
                to={`/bookinfo/${book.isbn}`} // ⭐ isbn으로 이동
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={book.thumbnail || defaultThumbnail}
                  alt={book.title}
                  className="bookCoverImage"
                />
                <div className="bookTitle">{book.title}</div>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex >= booksData.length - 6}
          className="nextButton"
        >
          <img src={iconRight} />
        </button>
      </div>
    </div>
  );
}

export default BookCarousel;
