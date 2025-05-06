import React from "react";
import { Link } from "react-router-dom";
import TossPaymentButton from "./TossPaymentButton";
import { generateOrderId } from "../utils/generateOrderId";
import { addCartItemToServer } from "../api/cartApi";

function BookList({ books }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  // 장바구니 핸들러 함수
  const handleAddToCart = (book) => {
    const cartItem = {
      isbn: book.isbn,
      title: book.title,
      price: book.sale_price,
      quantity: 1,
      thumbnail: book.thumbnail,
      addedAt: new Date().toISOString(),
    };

    if (user && token) {
      // 회원 → 서버에 저장
      addCartItemToServer({ ...cartItem, userId: user.id }, token)
        .then(() => alert("장바구니에 담았습니다."))
        .catch(() => alert("장바구니 저장 실패"));
    } else {
      // 비회원 → localStorage 저장
      addCartItemToGuest(cartItem);
      alert("비회원 장바구니에 담았습니다.");
    }
  };

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div
          key={index}
          className="book-item d-flex align-items-center justify-content-between p-3 border rounded mb-3"
        >
          {/* 책 이미지 */}
          <Link to={`/bookinfo/${book.isbn}`}>
            <img
              src={book.thumbnail}
              alt={book.title}
              style={{ width: "80px", height: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* 책 정보 */}
          <div className="flex-grow-1 px-3">
            <Link
              to={`/bookinfo/${book.isbn}`}
              className="text-decoration-none text-dark"
            >
              <h5 className="mb-1">{book.title}</h5>
            </Link>
            <p className="mb-1 text-muted">
              {book.authors.join(", ")} / {book.translators.join(", ")}
              <br />
              {book.publisher} / {book.datetime.slice(0, 10)}
              <br />
              가격: {book.price.toLocaleString()}원
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleAddToCart(book)}
            >
              장바구니
            </button>
            <TossPaymentButton
              amount={book.sale_price}
              orderId={generateOrderId(book.isbn)}
              orderName={book.title}
              customerName={user?.name || "비회원"}
              className="btn btn-primary btn-sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
