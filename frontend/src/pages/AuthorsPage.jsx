import { useEffect, useState } from "react";
import { searchBooks } from "../api/searchBooks";
import BookList from "../components/BookList.jsx";
import Pagination from "../components/Pagination.jsx";
import "../styles/AuthorsPage.css";

const PAGE_SIZE = 20;

const authorGroups = {
  "추리/스릴러": [
    "히가시노 게이고",
    "정유정",
    "아서 코난 도일",
    "애거서 크리스티",
  ],
  "한국 소설": ["김영하", "한강", "조남주", "정세랑"],
  "해외 소설": [
    "무라카미 하루키",
    "베르나르 베르베르",
    "조지 오웰",
    "조앤 K. 롤링",
  ],
  "인문/철학": ["유시민", "정재승", "마이클 샌델", "알랭 드 보통"],
  "IT/컴퓨터": ["조엘 스폴스키", "폴 그레이엄"],
};

function AuthorsPage() {
  const [selectedAuthor, setSelectedAuthor] = useState("히가시노 게이고");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await searchBooks(selectedAuthor);
      const filtered = result.filter(
        (book) =>
          book.thumbnail &&
          book.authors &&
          book.authors.length === 1 &&
          book.authors[0] === selectedAuthor
      );

      const startIdx = (currentPage - 1) * PAGE_SIZE;
      const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);

      setBooks(paginated);
      setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
    };

    fetchBooks();
  }, [selectedAuthor, currentPage]);

  const handleAuthorChange = (author) => {
    setSelectedAuthor(author);
    setCurrentPage(1);
  };

  return (
    <div className="search-page">
      <div className="search-sidebar">
        {Object.entries(authorGroups).map(([genre, authors]) => (
          <div key={genre} className="filter-group">
            <h5 className="filter-title">{genre}</h5>
            {authors.map((author) => (
              <label key={author} className="filter-label">
                <input
                  type="radio"
                  className="filter-radio"
                  name="author"
                  value={author}
                  checked={selectedAuthor === author}
                  onChange={() => handleAuthorChange(author)}
                />
                {author}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="search-results">
        <h5 className="results-title">{selectedAuthor}의 도서 목록</h5>
        {books.length > 0 ? (
          <>
            <BookList books={books} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="no-results">
            <p className="no-results-title">선택한 작가의 책이 없습니다.</p>
            <p className="no-results-sub">다른 작가를 선택해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorsPage;
