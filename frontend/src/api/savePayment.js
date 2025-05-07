import axiosInstance from "./axiosInstance";

// 결제 정보는 /payments로 저장
export function savePayment(paymentData) {
  return axiosInstance.post("/payments", paymentData);
}
