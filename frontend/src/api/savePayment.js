import axiosInstance from "./axiosInstance";

export function savePayment(paymentData) {
  return axiosInstance.post("/660/payments", paymentData);
}
