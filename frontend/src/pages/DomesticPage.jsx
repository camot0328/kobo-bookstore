import { useEffect, useState } from "react";
import { searchBooks } from "../api/searchBooks";
import BookList from "../components/BookList.jsx";
import Pagination from "../components/Pagination.jsx";
import "../styles/DomesticPage.css";

const PAGE_SIZE = 20;

const initialConsonantGroups = {
  "가~나": [
    "가",
    "갸",
    "거",
    "겨",
    "고",
    "교",
    "구",
    "규",
    "그",
    "기",
    "까",
    "꺄",
    "꺼",
    "껴",
    "꼬",
    "꾜",
    "꾸",
    "뀨",
    "끄",
    "끼",
    "나",
    "냐",
    "너",
    "녀",
    "노",
    "뇨",
    "누",
    "뉴",
    "느",
    "니",
    "따",
    "떄",
    "또",
    "뚜",
    "뜨",
    "띠",
  ],
  "다~라": [
    "다",
    "댜",
    "더",
    "뎌",
    "도",
    "됴",
    "두",
    "듀",
    "드",
    "디",
    "라",
    "랴",
    "러",
    "려",
    "로",
    "료",
    "루",
    "류",
    "르",
    "리",
    "따",
    "때",
    "떠",
    "뗘",
    "또",
    "뚀",
    "뚜",
    "뜌",
    "뜨",
    "띠",
  ],
  "마~바": [
    "마",
    "먀",
    "머",
    "며",
    "모",
    "묘",
    "무",
    "뮤",
    "므",
    "미",
    "바",
    "뱌",
    "버",
    "벼",
    "보",
    "뵤",
    "부",
    "뷰",
    "브",
    "비",
    "빠",
    "뺘",
    "뻐",
    "뼈",
    "뽀",
    "뾰",
    "뿌",
    "쀼",
    "쁘",
    "삐",
  ],
  "사~아": [
    "사",
    "샤",
    "서",
    "셔",
    "소",
    "쇼",
    "수",
    "슈",
    "스",
    "시",
    "아",
    "야",
    "어",
    "여",
    "오",
    "요",
    "우",
    "유",
    "으",
    "이",
    "싸",
    "쌰",
    "써",
    "쎠",
    "쏘",
    "쑈",
    "쑤",
    "쓔",
    "쓰",
    "씨",
  ],
  "자~차": [
    "자",
    "쟈",
    "저",
    "져",
    "조",
    "죠",
    "주",
    "쥬",
    "즈",
    "지",
    "차",
    "챠",
    "처",
    "쳐",
    "초",
    "쵸",
    "추",
    "츄",
    "츠",
    "치",
    "짜",
    "쨔",
    "쩌",
    "쪄",
    "쪼",
    "쬬",
    "쭈",
    "쮸",
    "쯔",
    "찌",
  ],
  "카~타": [
    "카",
    "캬",
    "커",
    "켜",
    "코",
    "쿄",
    "쿠",
    "큐",
    "크",
    "키",
    "타",
    "탸",
    "터",
    "텨",
    "토",
    "툐",
    "투",
    "튜",
    "트",
    "티",
  ],
  "파~하": [
    "파",
    "퍄",
    "퍼",
    "펴",
    "포",
    "표",
    "푸",
    "퓨",
    "프",
    "피",
    "하",
    "햐",
    "허",
    "혀",
    "호",
    "효",
    "후",
    "휴",
    "흐",
    "히",
  ],
  "숫자(1~9)": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  "영어(A~Z)": Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  ),
};

function DomesticPage() {
  const [selectedGroup, setSelectedGroup] = useState("가~나");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const keywords = initialConsonantGroups[selectedGroup];
      const query = keywords[0];

      const result = await searchBooks(query);

      const filtered = result.filter((book) => {
        const rawTitle = book.title || "";
        const cleanTitle = rawTitle.replace(/<[^>]+>/g, "");
        return keywords.some((syllable) => cleanTitle.startsWith(syllable));
      });

      const startIdx = (currentPage - 1) * PAGE_SIZE;
      const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);

      setBooks(paginated);
      setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
    };

    fetchBooks();
  }, [selectedGroup, currentPage]);

  return (
    <div className="domestic-page">
      <div className="domestic-page__sidebar">
        <h4 className="domestic-page__sidebar-title">도서 초성 선택</h4>
        {Object.keys(initialConsonantGroups).map((group) => (
          <label key={group} className="domestic-page__filter-label">
            <input
              type="radio"
              className="domestic-page__filter-radio"
              name="initial"
              value={group}
              checked={selectedGroup === group}
              onChange={() => {
                setSelectedGroup(group);
                setCurrentPage(1);
              }}
            />
            {group}
          </label>
        ))}
      </div>

      <div className="domestic-page__results">
        <h5 className="domestic-page__results-title">
          "{selectedGroup}" 그룹 도서 목록
        </h5>
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
          <div className="domestic-page__no-results">
            <p className="domestic-page__no-results-title">
              해당 초성의 책이 없습니다.
            </p>
            <p className="domestic-page__no-results-sub">
              다른 초성을 선택해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DomesticPage;
