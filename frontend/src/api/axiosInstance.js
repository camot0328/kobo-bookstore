/**
 * 프로젝트 전역에서 사용하는 Axios 인스턴스
 *
 * - 기본 URL을 '/api'로 설정하여 모든 요청이 /api로 시작되도록 구성
 *   (Vite의 proxy 설정이 이 경로를 실제 백엔드로 프록시 처리함)
 * - 기본 요청 헤더로 'Content-Type: application/json' 지정
 * - 요청 타임아웃은 5초 (5000ms)
 *
 * 이 인스턴스를 사용하면 각 요청마다 반복적으로 baseURL, headers 설정 없이 axios 요청 가능
 *
 * @see https://axios-http.com/docs/instance
 *
 * @example
 * import axiosInstance from './axiosInstance';
 * axiosInstance.get('/books'); // 실제로는 백엔드에 /api/books 요청
 */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // 무조건 /api로 시작 (Vite proxy가 알아서 백엔드로 넘김)
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
