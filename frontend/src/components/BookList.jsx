import React from "react";
import { Link } from "react-router-dom";

function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div
          key={index}
          className="book-item d-flex align-items-center justify-content-between p-3 border rounded mb-3"
        >
          {/* 왼쪽: 책 이미지 (클릭 시 상세로) */}
          <Link to={`/bookinfo/${book.isbn}`}>
            <img
              src={book.thumbnail}
              alt={book.title}
              style={{ width: "80px", height: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* 가운데: 책 정보 (제목 클릭 시 상세로) */}
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

          {/* 오른쪽: 버튼 (장바구니/바로구매) */}
          <div className="d-flex flex-column gap-2">
            <button className="btn btn-outline-primary btn-sm">장바구니</button>
            <button className="btn btn-primary btn-sm">바로구매</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
