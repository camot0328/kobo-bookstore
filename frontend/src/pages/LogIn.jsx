import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import axios from "axios"; // API 통신을 위한 axios 추가
import "../components/css/Login.css"; // 스타일 적용

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 호출될 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 막기

    try {
      // 🔥 서버에 로그인 요청
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      // 🔥 토큰과 유저 정보 저장
      const { accessToken, user } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ 먼저 메인 페이지로 이동
      navigate("/Home");

      // ✅ 짧은 지연 후 새로고침 → Navbar 로그인 상태 반영
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인 실패! 이메일과 비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>로그인</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <p className="login-link">
          아직 회원이 아니신가요? <a href="/register">회원가입</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
