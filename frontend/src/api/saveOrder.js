import axiosInstance from "./axiosInstance";

export function saveOrder(orderData) {
  return axiosInstance.post("/660/orders", orderData);
}
