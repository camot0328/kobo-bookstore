/**
 * 프로젝트 전역에서 사용하는 Axios 인스턴스
 *
 * - 모든 요청은 /api로 시작 (Vite proxy가 백엔드로 프록시)
 * - Content-Type은 application/json
 * - 요청 타임아웃은 5초
 * - 로그인된 경우, 요청 헤더에 Authorization 자동 추가
 */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// 요청 시 accessToken 자동 주입
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
