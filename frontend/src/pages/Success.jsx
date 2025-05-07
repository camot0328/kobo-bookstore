import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { savePayment } from "../api/savePayment";
import { saveOrder } from "../api/saveOrder";
import { clearCartByUserId } from "../api/cartApi";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("accessToken");
    const orderId = searchParams.get("orderId") || `ORDER_${Date.now()}`;

    if (!user || !token) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    if (localStorage.getItem(`order_saved_${orderId}`)) {
      console.log("⚠️ 이미 저장된 주문입니다.");
      return;
    }

    const paymentData = {
      paymentKey: searchParams.get("paymentKey") || "fake_payment_key_123",
      orderId,
      orderName: "도서 결제",
      amount: Number(searchParams.get("amount")) || 10000,
      currency: "KRW",
      method: "카드",
      status: "DONE",
      approvedAt: new Date().toISOString(),
      customerEmail: user?.email || "guest@example.com",
      customerId: user?.id || null,
    };

    let savedItems = [];
    try {
      const raw = localStorage.getItem("order_items");
      savedItems = JSON.parse(raw || "[]");
      if (!Array.isArray(savedItems) || savedItems.length === 0) {
        throw new Error("order_items가 배열이 아니거나 비어 있음");
      }
    } catch (err) {
      console.error("❌ order_items 파싱 실패:", err);
      alert("주문 상품 정보를 불러올 수 없습니다.");
      navigate("/");
      return;
    }

    const orderData = {
      orderId,
      userId: user.id,
      items: savedItems,
      amount: paymentData.amount,
      createdAt: new Date().toISOString(),
      status: "결제완료",
    };

    console.log("✅ 저장 시작: ", { paymentData, orderData });

    savePayment(paymentData)
      .then((res) => {
        setResponseData(res.data);
        return saveOrder(orderData);
      })
      .then(() => {
        localStorage.setItem(`order_saved_${orderId}`, "true");
        localStorage.removeItem("order_items");
        return clearCartByUserId(user.id);
      })
      .then(() => {
        alert("결제가 완료되었습니다.");
        navigate("/mypage");
      })
      .catch((err) => {
        console.error("❌ 결제 또는 주문 처리 실패:", err);
        setResponseData({
          error: "처리 실패",
          detail: err.message,
        });
        navigate("/fail");
      });
  }, [searchParams, navigate]);

  return (
    <div
      className="success-container"
      style={{
        maxWidth: "600px",
        margin: "60px auto",
        padding: "40px",
        borderRadius: "16px",
        backgroundColor: "#f0f4f8",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <img
        width="80"
        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        alt="결제성공"
        style={{ marginBottom: "20px" }}
      />
      <h2 style={{ color: "#1c64f2", marginBottom: "10px" }}>
        결제를 완료했어요
      </h2>
      <p style={{ fontSize: "16px", marginBottom: "30px", color: "#555" }}>
        도서 결제가 정상적으로 처리되었습니다.
      </p>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "left",
          fontSize: "15px",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>💳 결제 금액:</strong>{" "}
          {Number(searchParams.get("amount")).toLocaleString()}원
        </p>
        <p>
          <strong>🧾 주문 번호:</strong> {searchParams.get("orderId")}
        </p>
      </div>

      <Link to="/mypage">
        <button
          className="btn btn-primary"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            backgroundColor: "#1c64f2",
            color: "#fff",
            border: "none",
          }}
        >
          마이페이지로 이동
        </button>
      </Link>

      {/* 개발용: 결제 응답 데이터 */}
      {responseData && (
        <div
          style={{
            marginTop: "40px",
            textAlign: "left",
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            fontSize: "14px",
            overflowX: "auto",
          }}
        >
          <strong>저장된 결제 정보</strong>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SuccessPage;
