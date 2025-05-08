import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import kakao from "../api/kakao";
import "../styles/BookInfo.css";
import TossPaymentButton from "../components/TossPaymentButton";
import { generateOrderId } from "../utils/generateOrderId";
import { addCartItemToServer } from "../api/cartApi";
import { addCartItemToGuest } from "../utils/cartStorage";

function BookInfo() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 장바구니 핸들러 함수
  const handleAddToCart = (book) => {
    if (!user || !token) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
      return;
    }

    const cartItem = {
      isbn: book.isbn,
      title: book.title,
      price: book.price,
      quantity,
      thumbnail: book.thumbnail,
      addedAt: new Date().toISOString(),
    };

    addCartItemToServer({ ...cartItem, userId: user.id }, token)
      .then(() => alert("장바구니에 담았습니다."))
      .catch(() => alert("장바구니 저장 실패"));
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const isbn13 = isbn.split(" ").pop();
        const res = await kakao.get("/search/book", {
          params: { query: isbn13, target: "isbn" },
        });
        if (res.data.documents.length > 0) {
          const bookData = res.data.documents[0];
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
    const list = viewed[user] || [];
    if (!list.find((b) => b.isbn === book.isbn)) {
      const updated = [
        ...list,
        {
          isbn: book.isbn,
          title: book.title,
          thumbnail: book.thumbnail,
        },
      ].slice(-5);
      viewed[user] = updated;
      localStorage.setItem("recentBooks", JSON.stringify(viewed));
    }
  }, [book]);

  if (!book)
    return (
      <div className="bookInfo-loading">도서 정보를 불러오는 중입니다...</div>
    );

  const recentBooks =
    JSON.parse(localStorage.getItem("recentBooks") || "{}")[user] || [];

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
          <button
            className="bookInfo-btn-outline-primary"
            onClick={() => handleAddToCart(book)}
          >
            장바구니
          </button>
          {user ? (
            <TossPaymentButton
              book={book}
              quantity={quantity}
              amount={book.price * quantity}
              orderId={generateOrderId(book.isbn)}
              orderName={book.title}
              customerName={user.name}
              className="btn btn-primary btn-sm"
            />
          ) : (
            <button
              onClick={() => {
                alert("로그인이 필요합니다.");
                window.location.href = "/login"; // 또는 navigate("/login")
              }}
              className="btn btn-primary btn-sm"
            >
              로그인 후 결제
            </button>
          )}
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
