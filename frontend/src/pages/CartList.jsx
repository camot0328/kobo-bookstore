import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TossPaymentButton from "../components/TossPaymentButton";
import { generateOrderIdByCart } from "../utils/generateOrderIdByCart";

function CartList() {
  const [user, setUser] = useState(null); // ✅ useState로 user 관리
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async (userId) => {
    try {
      const res = await axiosInstance.get(`/cart?userId=${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("장바구니 불러오기 실패:", err);
      alert("장바구니 정보를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setUser(savedUser); // ✅ user 상태로 저장
    fetchCartItems(savedUser.id);
  }, [navigate]);

  const handleDelete = async (itemId) => {
    if (!user) return;

    try {
      await axiosInstance.delete(`/cart/${itemId}`);
      alert("장바구니에서 삭제되었습니다.");
      fetchCartItems(user.id); // ✅ user 상태에서 id 재사용
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (!user) return null;

  if (!cartItems.length) {
    return <p>장바구니가 비어 있습니다.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h3>🛒 장바구니</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cartItems.map((item) => (
          <li
            key={item.id}
            style={{
              borderBottom: "1px solid #ddd",
              marginBottom: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <p>
              <strong>{item.title}</strong>
            </p>
            <p>
              가격: {item.price.toLocaleString()}원 × {item.quantity || 1}개
            </p>
            <button
              onClick={() => handleDelete(item.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <h4 style={{ marginTop: "2rem" }}>
        총 합계: {totalPrice.toLocaleString()}원
      </h4>

      <div style={{ marginTop: "2rem" }}>
        <TossPaymentButton
          amount={totalPrice}
          orderId={generateOrderIdByCart(user.id)}
          orderName={`장바구니 결제 - ${cartItems.length}건`}
          customerName={user.name}
          items={cartItems}
          className="btn btn-primary"
        />
      </div>
    </div>
  );
}

export default CartList;
