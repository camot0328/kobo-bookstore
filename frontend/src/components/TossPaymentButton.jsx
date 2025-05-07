import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

/**
 * TossPaymentButton - 장바구니/단일 도서 결제 모두 지원
 *
 * - 단일 결제 시: book + quantity 사용
 * - 장바구니 결제 시: items 배열 사용
 */
function TossPaymentButton({
  orderId,
  orderName,
  customerName,
  className,
  book, // 단일 도서 객체 (단일 결제용)
  quantity, // 수량 (단일 결제용)
  items, // 장바구니 결제용
  amount, // 결제 금액 (공통)
}) {
  const handlePayment = async () => {
    try {
      const tossPayments = await loadTossPayments(
        import.meta.env.VITE_TOSS_CLIENT_KEY
      );

      // ✅ 주문 정보 localStorage 저장
      let orderItems = [];

      if (items && items.length > 0) {
        console.log("🛒 장바구니 결제 - items:", items);
        orderItems = items.map((item) => ({
          isbn: item.isbn,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
          thumbnail: item.thumbnail,
        }));
      } else if (book && quantity) {
        const singleItem = {
          isbn: book.isbn,
          title: book.title,
          price: book.price,
          quantity,
          thumbnail: book.thumbnail,
        };
        console.log("📗 단일 결제 - item:", singleItem);
        orderItems = [singleItem];
      } else {
        alert("결제할 상품 정보가 없습니다.");
        return;
      }

      // ✅ localStorage 저장 후 flush 보장
      await new Promise((resolve) => {
        localStorage.setItem("order_items", JSON.stringify(orderItems));
        setTimeout(resolve, 100); // flush 보장
      });

      // ✅ 결제창 호출
      const payment = tossPayments.payment({
        customerKey: "fake-customer-key",
      });

      await payment.requestPayment({
        method: "CARD",
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
      console.error("❌ Toss 결제 실패:", error);
      alert("결제 요청에 실패했습니다.");
    }
  };

  return (
    <button onClick={handlePayment} className={className}>
      결제하기
    </button>
  );
}

export default TossPaymentButton;
