import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { savePayment } from "../api/savePayment";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const orderId = searchParams.get("orderId") || `ORDER_${Date.now()}`;

    if (localStorage.getItem(`order_saved_${orderId}`)) return;

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

    savePayment(paymentData)
      .then((res) => {
        setResponseData(res.data);
        localStorage.setItem(`order_saved_${orderId}`, "true");
      })
      .catch((err) => {
        setResponseData({
          error: "결제 내역 저장 실패",
          detail: err.message,
        });
        navigate("/fail");
      });
  }, [searchParams, navigate]);

  // ✅ countdown 타이머 처리
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <>
      <div className="box_section" style={{ width: "600px" }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제성공"
        />
        <h2>결제를 완료했어요</h2>
        <p>{countdown}초 후 홈으로 이동합니다...</p>

        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right">
            {Number(searchParams.get("amount")).toLocaleString()}원
          </div>
        </div>

        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right">
            {searchParams.get("orderId")}
          </div>
        </div>

        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div
            className="p-grid-col text--right"
            style={{ whiteSpace: "initial", width: "250px" }}
          >
            {searchParams.get("paymentKey")}
          </div>
        </div>

        <div className="p-grid-col" style={{ marginTop: "20px" }}>
          <Link to="/">
            <button className="button p-grid-col5">홈으로 돌아가기</button>
          </Link>
        </div>
      </div>

      <div
        className="box_section"
        style={{ width: "600px", textAlign: "left", marginTop: "30px" }}
      >
        <b>저장된 주문 정보</b>
        <div style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
