import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function OrderListPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("주문 목록 불러오기 실패", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>📦 주문 내역</h2>

      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>주문번호</th>
              <th>결제금액</th>
              <th>결제수단</th>
              <th>상태</th>
              <th>승인일시</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{order.amount.toLocaleString()}원</td>
                <td>{order.method || "카드"}</td>
                <td>{order.status}</td>
                <td>{new Date(order.approvedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderListPage;
