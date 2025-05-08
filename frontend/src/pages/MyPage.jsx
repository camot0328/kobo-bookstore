import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WingBanner from "../components/WingBanner";
import ProfileManage from "./ProfileManage";
import CartList from "./CartList";
import OrderHistory from "./OrderHistory";

// ✅ 회원정보 컴포넌트 import
function Mypage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("order");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token && storedUser?.id) {
      axios
        .get(`http://3.35.11.171:3001/600/users/${storedUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          alert("로그인이 필요합니다.");
          navigate("/");
        });
    } else {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <WingBanner />
      {/* 🔵 상단 프로필 섹션 */}
      <div
        style={{
          backgroundColor: "#C0E8E0",
          padding: "3rem 2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {user && (
          <>
            <img
              src="/bokyoungp.png"
              alt="프로필 사진"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #5999F3",
                marginRight: "2rem",
              }}
            />
            <div>
              <h2 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
                {user.name} 님
              </h2>
              <p style={{ margin: 0, color: "#555" }}>{user.email}</p>
            </div>
          </>
        )}
      </div>

      {/* 🔵 하단 콘텐츠 섹션 */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: "3rem 2rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* 탭 버튼 */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {["order", "cart", "wishlist", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? "#5999F3" : "#eee",
                color: activeTab === tab ? "#fff" : "#333",
                padding: "0.7rem 1.5rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: activeTab === tab ? "bold" : "normal",
                transition: "all 0.3s ease",
              }}
            >
              {
                {
                  order: "주문내역",
                  cart: "장바구니",
                  wishlist: "찜 목록",
                  profile: "회원정보",
                }[tab]
              }
            </button>
          ))}
        </div>

        {/* 탭별 내용 */}
        <div
          style={{
            backgroundColor: "#fafafa",
            padding: "2rem",
            borderRadius: "10px",
            minHeight: "300px",
            fontSize: "1.2rem",
            color: "#333",
          }}
        >
          {activeTab === "order" && <OrderHistory />}
          {activeTab === "cart" && <CartList />}
          {activeTab === "wishlist" && <p>찜 목록 준비 중입니다.</p>}
          {activeTab === "profile" && <ProfileManage />}
        </div>
      </div>
    </div>
  );
}

export default Mypage;
