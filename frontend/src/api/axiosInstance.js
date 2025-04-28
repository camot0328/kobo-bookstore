import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // 무조건 /api로 시작 (Vite proxy가 알아서 백엔드로 넘김)
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
