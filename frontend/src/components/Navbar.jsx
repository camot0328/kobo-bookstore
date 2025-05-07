import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { searchBooks } from "../api/searchBooks";
import koboLogo from "../assets/logo/kobo-logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);
      if (scrollY <= 80) setShowDropdown(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        const books = await searchBooks(query);
        navigate("/search", { state: { query, books } });
        setQuery("");
      } catch (error) {
        console.error("검색 실패:", error);
        alert("검색 중 문제가 발생했습니다.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleProfileClick = () => {
    const token = localStorage.getItem("accessToken");
    token
      ? navigate("/mypage")
      : (alert("로그인이 필요합니다."), navigate("/login"));
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("accessToken");
    token
      ? navigate("/cart")
      : (alert("로그인이 필요합니다."), navigate("/login"));
  };

  return (
    <div
      className={`navbar__container ${isScrolled ? "navbar--scrolled" : ""}`}
    >
      <div className="navbar__top">
        <div className="navbar__left">
          {isScrolled && (
            <div
              className={`navbar__menu-toggle ${showDropdown ? "navbar__menu-toggle--active" : ""}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="navbar__menu-icon">
                {showDropdown ? "✕" : "☰"}
              </span>
            </div>
          )}
          <img
            src={koboLogo}
            alt="KOBO 로고"
            className="navbar__logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="navbar__center">
          <input
            type="text"
            className="navbar__search-input"
            placeholder="검색어 입력"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="navbar__search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div className="navbar__right">
          {isLoggedIn ? (
            <button className="navbar__auth-button" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <button
              className="navbar__auth-button"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          )}

          <FaShoppingCart
            size={30}
            className="navbar__icon"
            onClick={handleCartClick}
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => {
              setIsCartHovered(false);
              setIsCartActive(false);
            }}
            onMouseDown={() => setIsCartActive(true)}
            onMouseUp={() => setIsCartActive(false)}
            style={{
              filter: isCartHovered ? "brightness(1.2)" : "none",
              transform: isCartActive
                ? "scale(0.95)"
                : isCartHovered
                  ? "scale(1.05)"
                  : "none",
              transition: "transform 0.1s ease, filter 0.2s ease",
            }}
          />

          <FaUserCircle
            size={34}
            color="#55b103"
            className="navbar__icon"
            onClick={handleProfileClick}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      </div>

      {!isScrolled && (
        <nav className="navbar__category">
          <ul className="navbar__category-list">
            <li className="navbar__category-item">
              <Link to="/new" className="navbar__category-link">
                신상품
              </Link>
            </li>
            <li className="navbar__category-item">
              <Link to="/domestic" className="navbar__category-link">
                국내도서
              </Link>
            </li>
            <li className="navbar__category-item">
              <Link to="/foreign" className="navbar__category-link">
                해외도서
              </Link>
            </li>
            <li className="navbar__category-item">
              <Link to="/authors" className="navbar__category-link">
                작가별도서
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {showDropdown && (
        <div className="navbar__dropdown">
          <ul className="navbar__dropdown-list">
            <li className="navbar__dropdown-item">
              <Link to="/new" className="navbar__dropdown-link">
                신상품
              </Link>
            </li>
            <li className="navbar__dropdown-item">
              <Link to="/domestic" className="navbar__dropdown-link">
                국내도서
              </Link>
            </li>
            <li className="navbar__dropdown-item">
              <Link to="/foreign" className="navbar__dropdown-link">
                해외도서
              </Link>
            </li>
            <li className="navbar__dropdown-item">
              <Link to="/authors" className="navbar__dropdown-link">
                작가별도서
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
