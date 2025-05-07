import axiosInstance from "./axiosInstance";

export function saveOrder(orderData) {
  return axiosInstance.post("/orders", orderData); // ✅ OK (→ /api/orders → routes.json → /660/orders)
}
