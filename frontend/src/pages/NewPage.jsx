import { useEffect, useState } from "react";
import { searchBooks } from "../api/searchBooks";
import BookList from "../components/BookList.jsx";
import Pagination from "../components/Pagination.jsx";
import "../styles/NewPage.css";

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020];
const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const PAGE_SIZE = 20;

function NewPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [triggerSearch, setTriggerSearch] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await searchBooks(`${selectedYear}${selectedMonth}`);
        const filtered = result.filter(
          (book) => book.thumbnail && book.thumbnail !== ""
        );

        const startIdx = (currentPage - 1) * PAGE_SIZE;
        const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);

        setBooks(paginated);
        setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
      } catch (err) {
        console.error("연도/월별 도서 검색 실패:", err);
      }
    };

    fetchBooks();
  }, [currentPage, triggerSearch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setTriggerSearch((prev) => !prev);
  };

  return (
    <div className="new-page">
      <div className="new-page__sidebar">
        <h4 className="new-page__sidebar-title">출간 년도/월</h4>

        <select
          className="new-page__dropdown"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>

        <select
          className="new-page__dropdown"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}월
            </option>
          ))}
        </select>

        <button className="new-page__search-button" onClick={handleSearch}>
          조회
        </button>
      </div>

      <div className="new-page__results">
        <h5 className="new-page__results-title">{`${selectedYear}년 ${selectedMonth}월 도서 목록`}</h5>

        {books.length === 0 ? (
          <div className="new-page__no-results">
            <p className="new-page__no-results-title">
              선택한 조건에 맞는 상품이 없습니다.
            </p>
            <p className="new-page__no-results-sub">
              조건을 다시 선택 해보세요.
            </p>
          </div>
        ) : (
          <>
            <BookList books={books} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default NewPage;
