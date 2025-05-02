import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

function TossPaymentButton({
  amount,
  orderId,
  orderName,
  customerName,
  className,
}) {
  const handlePayment = async () => {
    try {
      // 1. Toss SDK 로드
      const tossPayments = await loadTossPayments(
        import.meta.env.VITE_TOSS_CLIENT_KEY
      );

      // 2. Toss '결제창(payment)' 초기화
      const payment = tossPayments.payment({
        customerKey: "fake-customer-key-123",
      });

      // 3. 결제 요청
      await payment.requestPayment({
        method: "CARD", // 무조건 대문자 "CARD"
        amount: {
          currency: "KRW",
          value: amount,
        },
        orderId,
        orderName,
        customerName,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/success`,
      });
    } catch (error) {
      console.error("토스 결제 실패:", error);
    }
  };

  return (
    <button onClick={handlePayment} className={className}>
      결제하기
    </button>
  );
}

export default TossPaymentButton;
