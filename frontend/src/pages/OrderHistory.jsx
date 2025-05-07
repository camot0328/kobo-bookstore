import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axiosInstance
      .get(`/660/orders?userId=${user.id}`)
      .then((res) => {
        console.log("📦 주문 목록 raw 응답:", res.data);
        const filtered = res.data.filter(
          (order) => order.status === "결제완료"
        );
        console.log("✅ 필터링 후:", filtered);
        setOrders(filtered);
      })
      .catch((err) => {
        console.error("주문 내역 조회 실패:", err);
        alert("주문 내역을 불러올 수 없습니다.");
      });
  }, []);

  if (!orders.length) {
    return <p>주문 내역이 없습니다.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h3>📦 주문 내역</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {orders.map((order) => (
          <li
            key={order.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <p>
              <strong>주문번호:</strong> {order.orderId}
            </p>
            <p>
              <strong>주문일:</strong>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "날짜 정보 없음"}
            </p>
            <p>
              <strong>상품:</strong>{" "}
              {order.items?.length
                ? order.items.map((item) => item.title).join(", ")
                : "상품 정보 없음"}
            </p>
            <p>
              <strong>총 금액:</strong> {order.amount.toLocaleString()}원
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
