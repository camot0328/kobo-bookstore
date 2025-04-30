import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import kakao from "../api/kakao"; // kakao Axios 인스턴스 사용

function BookInfo() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await kakao.get("/search/book", {
          params: {
            query: isbn,
            target: "isbn",
          },
        });
        setBook(res.data.documents[0]);
      } catch (err) {
        console.error("도서 상세 조회 실패", err);
      }
    };
    fetchBook();
  }, [isbn]);

  if (!book)
    return (
      <div className="container mt-5">도서 정보를 불러오는 중입니다...</div>
    );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={book.thumbnail} alt={book.title} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <p>저자: {book.authors.join(", ")}</p>
          <p>역자: {book.translators.join(", ")}</p>
          <p>출판사: {book.publisher}</p>
          <p>발행일: {book.datetime.slice(0, 10)}</p>
          <p>가격: {book.sale_price.toLocaleString()}원</p>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-outline-primary">장바구니</button>
            <button className="btn btn-primary">바로구매</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookInfo;
