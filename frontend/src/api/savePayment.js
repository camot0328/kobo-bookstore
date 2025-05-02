import axiosInstance from "./axiosInstance";

export function savePayment(paymentData) {
  return axiosInstance.post("/orders", paymentData);
}
