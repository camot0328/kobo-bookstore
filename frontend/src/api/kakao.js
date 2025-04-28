import axios from "axios";

const kakao = axios.create({
  baseURL: "https://dapi.kakao.com/v3",
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});

export default kakao;
