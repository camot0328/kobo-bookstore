import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { searchBooks } from "../api/searchBooks";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };
  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const books = await searchBooks(query); // 검색 API 호출
        navigate("/search", { state: { query, books } }); // 검색 결과와 검색어 전달
        setQuery("");
      } catch (error) {
        console.error("검색 실패:", error);
        alert("검색 중 문제가 발생했습니다.");
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleProfileClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/mypage");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/cart");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        backgroundColor: "#ffffff", // ✅ 배경 흰색
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        zIndex: 999,
      }}
    >
      {/* 왼쪽: 햄버거 + 로고 */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ fontSize: "24px", cursor: "pointer" }}>☰</div>
        <img
          src="/logo-kobo.png"
          alt="KOBO 로고"
          onClick={() => navigate("/")}
          style={{
            height: "100px", // ✅ 로고 크게
            cursor: "pointer",
            objectFit: "contain",
          }}
        />
      </div>

      {/* 가운데: 검색창 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="검색어 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "300px",
            height: "30px",
            backgroundColor: "#fff",
            padding: "0 10px",
            border: "1px solid #ccc",
            borderRadius: "4px 0 0 4px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            height: "32px",
            padding: "0 12px",
            backgroundColor: "#55b103",
            color: "#fff",
            border: "none",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
          }}
        >
          🔍
        </button>
      </div>

      {/* 오른쪽: 로그인/로그아웃 + 장바구니 + 프로필 */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#fff",
              color: "#55b103",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "2px solid #55b103",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            style={{
              backgroundColor: "#fff",
              color: "#55b103",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "2px solid #55b103",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            로그인
          </button>
        )}

        {/* 장바구니 아이콘 */}
        <FaShoppingCart
          size={30}
          onClick={handleCartClick}
          style={{
            cursor: "pointer",
            color: "#55b103", // ✅ 연두색으로 변경
            transition: "transform 0.1s ease, filter 0.2s ease",
            ...(isCartHovered && {
              filter: "brightness(1.2)",
              transform: "scale(1.05)",
            }),
            ...(isCartActive && {
              transform: "scale(0.95)",
            }),
          }}
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => {
            setIsCartHovered(false);
            setIsCartActive(false);
          }}
          onMouseDown={() => setIsCartActive(true)}
          onMouseUp={() => setIsCartActive(false)}
        />

        {/* 프로필 아이콘 */}
        <FaUserCircle
          size={34}
          color="#55b103" // ✅ 연두색으로 변경
          style={{
            cursor: "pointer",
            transition: "transform 0.1s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={handleProfileClick}
        />
      </div>
    </nav>
  );
}

export default Navbar;
