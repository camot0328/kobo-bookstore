import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import kakao from "../api/kakao";
import "../styles/BookInfo.css";

function BookInfo() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const userId = "user123";

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const isbn13 = isbn.split(" ").pop();
        const res = await kakao.get("/search/book", {
          params: { query: isbn13, target: "isbn" },
        });
        if (res.data.documents.length > 0) {
          const bookData = res.data.documents[0];
          bookData.price = bookData.price;
          setBook(bookData);
        }
      } catch (err) {
        console.error("도서 조회 실패", err);
      }
    };
    fetchBook();
  }, [isbn]);

  useEffect(() => {
    if (!book) return;
    const viewed = JSON.parse(localStorage.getItem("recentBooks")) || {};
    const list = viewed[userId] || [];
    if (!list.find((b) => b.isbn === book.isbn)) {
      const updated = [
        ...list,
        {
          isbn: book.isbn,
          title: book.title,
          thumbnail: book.thumbnail,
        },
      ].slice(-5);
      viewed[userId] = updated;
      localStorage.setItem("recentBooks", JSON.stringify(viewed));
    }
  }, [book]);

  if (!book)
    return (
      <div className="bookInfo-loading">도서 정보를 불러오는 중입니다...</div>
    );

  const recentBooks =
    JSON.parse(localStorage.getItem("recentBooks") || "{}")[userId] || [];

  return (
    <div className="bookinfo-container">
      <div className="bookInfo-image">
        <img src={book.thumbnail} alt={book.title} />
      </div>

      <div className="bookInfo-main">
        <h2 className="bookInfo-title">{book.title}</h2>
        <p className="bookInfo-text">
          저자: {book.authors.length > 0 ? book.authors.join(", ") : "-"}
        </p>
        <p className="bookInfo-text">
          역자:{" "}
          {book.translators.length > 0 ? book.translators.join(", ") : "-"}
        </p>
        <p className="bookInfo-text">출판사: {book.publisher}</p>
        <p className="bookInfo-text">발행일: {book.datetime.slice(0, 10)}</p>
        <div className="bookInfo-description">
          <h4>책 소개</h4>
          <p>{book.contents || "책 설명이 없습니다."}</p>
        </div>
        <div className="bookInfo-quantity">
          <label>수량:</label>
          <div className="quantity-controls">
            <button
              type="button"
              className="quantity-btn"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
            <button
              type="button"
              className="quantity-btn"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <p className="bookInfo-price-total">
            {(book.price * quantity).toLocaleString()}원
          </p>
        </div>
        <div className="bookInfo-buttons">
          <button className="bookInfo-btn-outline-primary">장바구니</button>
          <button className="bookInfo-btn-primary">바로구매</button>
        </div>
      </div>

      {/* 최근 본 항목 고정 위치 */}
      <div className="bookInfo-recent-fixed">
        {recentBooks.map((b, idx) => (
          <a
            key={idx}
            href={`/bookinfo/${b.isbn}`}
            className="bookInfo-recent-item"
          >
            <img src={b.thumbnail} alt={b.title} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default BookInfo;
