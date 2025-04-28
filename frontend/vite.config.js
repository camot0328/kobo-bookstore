import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true }, // React 앱은 3000번 포트에서 실행
  proxy: {
    "/api": {
      target: "http://localhost:3001", // JSON Server가 돌아가는 백엔드 주소
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""), // 요청 경로에서 /api를 제거
    },
  },
});
