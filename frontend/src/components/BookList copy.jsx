import React from "react";
import { Link } from "react-router-dom";
import TossPaymentButton from "./TossPaymentButton";
import { generateOrderId } from "../utils/generateOrderId";
import { handleAddToCart } from "../utils/cartHandler";

function BookList({ books }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  return (
    <div className="book-list">
      {books.map((book, index) => {
        const orderId = generateOrderId(book.isbn);
        const customerName = user?.name || "비회원";

        return (
          <div
            key={index}
            className="book-item d-flex align-items-center justify-content-between p-3 border rounded mb-3"
          >
            {/* 왼쪽: 책 이미지 */}
            <Link to={`/bookinfo/${book.isbn}`}>
              <img
                src={book.thumbnail}
                alt={book.title}
                style={{ width: "80px", height: "auto", objectFit: "contain" }}
              />
            </Link>

            {/* 가운데: 책 정보 */}
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
                가격: {book.sale_price.toLocaleString()}원
              </p>
            </div>

            {/* 오른쪽: 버튼 */}
            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleAddToCart(book, user, token)}
              >
                장바구니
              </button>

              <TossPaymentButton
                amount={book.sale_price}
                orderId={orderId}
                orderName={book.title}
                customerName={customerName}
                className="btn btn-primary btn-sm"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
