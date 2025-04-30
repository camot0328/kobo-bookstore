import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchBooks } from "../api/searchBooks.js";
import SearchBar from "../components/SearchBar.jsx";
import BookList from "../components/BookList.jsx";
import "../styles/SearchPage.css";

function SearchPage() {
  const [query, setQuery] = useState(""); // 검색바 입력값
  const [searchedQuery, setSearchedQuery] = useState(""); // 실제 검색에 사용되는 값
  const [filterFields, setFilterFields] = useState([]); // 기본값: "상품명"
  const [priceRange, setPriceRange] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [books, setBooks] = useState([]); // API에서 가져온 결과 목록
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const location = useLocation();
  const initialBooks = location.state ? location.state.books : [];

  // 처음 화면 로드 시 받은 books 세팅
  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  // location.state에서 검색어 가져오기
  useEffect(() => {
    if (location.state && location.state.query) {
      setSearchedQuery(location.state.query); // 초기 검색어 설정
      setQuery(location.state.query); // 검색창에도 동일한 값 설정
    }
  }, [location.state]);

  // 검색 실행 (버튼 클릭 시 호출)
  const handleSearch = async () => {
    try {
      const result = await searchBooks(query); // 검색바 입력값으로 API 호출
      setBooks(result); // 검색 결과 저장
      setSearchedQuery(query); // 검색어 업데이트
      setCurrentPage(1); // 페이지 초기화
    } catch (err) {
      console.error(err);
    }
  };

  // 필터 핸들러
  const handleFieldChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilterFields((prev) => [...prev, value]);
    } else {
      setFilterFields((prev) => prev.filter((field) => field !== value));
    }
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    setCurrentPage(1);
  };

  const handlePublishDateChange = (e) => {
    setPublishDate(e.target.value);
    setCurrentPage(1);
  };

  // books 필터링
  const filteredBooks = books.filter((book) => {
    let match = true;

    // 검색 조건 (searchedQuery 사용)
    if (searchedQuery.trim()) {
      // 필터 조건이 없으면 모든 결과를 포함
      if (filterFields.length === 0) {
        match = true;
      } else {
        // 필터 조건이 있을 경우, 선택된 조건 중 하나라도 만족하면 포함
        match = filterFields.some((field) => {
          const lowerQuery = searchedQuery.toLowerCase().trim(); // 대소문자 및 공백 처리
          if (field === "상품명")
            return book.title?.toLowerCase().includes(lowerQuery);
          if (field === "저자/역자")
            return (
              book.authors.join(", ").toLowerCase().includes(lowerQuery) ||
              book.translators.join(", ").toLowerCase().includes(lowerQuery)
            );
          if (field === "출판사")
            return book.publisher?.toLowerCase().includes(lowerQuery);
          return false;
        });
      }
    }

    // 가격 필터
    if (priceRange && priceRange !== "전체") {
      const price = book.sale_price || book.price;
      if (priceRange === "~1만원" && price > 10000) match = false;
      if (priceRange === "1만원~5만원" && (price < 10000 || price > 50000))
        match = false;
      if (priceRange === "5만원~10만원" && (price < 50000 || price > 100000))
        match = false;
      if (priceRange === "10만원~" && price < 100000) match = false;
    }

    // 발행일 필터
    if (publishDate && book.datetime) {
      const publishedDate = new Date(book.datetime);
      const now = new Date();
      const monthsAgo = {
        "3개월 이내": 3,
        "6개월 이내": 6,
        "1년 이내": 12,
        "3년 이내": 36,
        "5년 이내": 60,
      }[publishDate];

      if (publishDate !== "전체" && monthsAgo) {
        const pastDate = new Date();
        pastDate.setMonth(now.getMonth() - monthsAgo);
        if (publishedDate < pastDate) match = false;
      }
    }

    return match;
  });

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="my-4">도서 검색 결과</h1>

        {/* 검색 바 */}
        <div className="search-header">
          <SearchBar
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch} // 버튼 클릭 시 검색 실행
          />
        </div>
      </div>

      {/* 검색결과 영역 */}
      <div className="search-content">
        {/* 왼쪽: 필터 영역 */}
        <div className="search-sidebar">
          <h2 className="filter-title">검색조건</h2>
          <div className="filter-group">
            {["상품명", "저자/역자", "출판사"].map((field, idx) => (
              <div className="filter-item" key={idx}>
                <input
                  type="checkbox"
                  className="filter-checkbox" /* 체크박스에만 적용 */
                  id={`field-${idx}`}
                  value={field}
                  onChange={handleFieldChange}
                  checked={filterFields.includes(field)}
                />
                <label className="filter-label" htmlFor={`field-${idx}`}>
                  {field}
                </label>
              </div>
            ))}
          </div>

          <h2 className="filter-title">가격</h2>
          <div className="filter-group">
            {["전체", "~1만원", "1만원~5만원", "5만원~10만원", "10만원~"].map(
              (price, idx) => (
                <div className="filter-item" key={idx}>
                  <input
                    type="radio"
                    className="filter-radio" /* 라디오 버튼에만 적용 */
                    name="price"
                    id={`price-${idx}`}
                    value={price}
                    onChange={handlePriceChange}
                    checked={priceRange === price}
                  />
                  <label className="filter-label" htmlFor={`price-${idx}`}>
                    {price}
                  </label>
                </div>
              )
            )}
          </div>

          <h2 className="filter-title">발행일</h2>
          <div className="filter-group">
            {[
              "전체",
              "3개월 이내",
              "6개월 이내",
              "1년 이내",
              "3년 이내",
              "5년 이내",
            ].map((date, idx) => (
              <div className="filter-item" key={idx}>
                <input
                  type="radio"
                  className="filter-radio"
                  name="publishDate"
                  id={`date-${idx}`}
                  value={date}
                  onChange={handlePublishDateChange}
                  checked={publishDate === date}
                />
                <label className="filter-label" htmlFor={`date-${idx}`}>
                  {date}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽: 결과 영역 */}
      <div className="search-results">
        <h5 className="results-title">
          {`"${searchedQuery}"에 대한 검색 결과입니다.`}
        </h5>

        <BookList books={currentBooks} />

        {/* 페이지네이션 */}
        <div className="pagination-container">
          <nav>
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(filteredBooks.length / itemsPerPage) },
                (_, index) => (
                  <li
                    key={index}
                    className={`pagination-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="pagination-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
