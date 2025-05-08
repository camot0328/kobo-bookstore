import axios from "axios";

const kakao = axios.create({
  baseURL: "https://dapi.kakao.com/v3", // 카카오 API
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`, // 카카오 API 인증 헤더
  },
});

export default kakao;
