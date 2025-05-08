import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/css/Register.css"; // ✅ 따로 만든 CSS 파일 적용

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  const validateName = (name) => /^[A-Za-z\uAC00-\uD7A3]+$/.test(name);
  const validatePhone = (phone) => /^\d{10,11}$/.test(phone);
  const validateBirth = (birth) => /^\d{4}-\d{2}-\d{2}$/.test(birth);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return alert("올바른 이메일 형식을 입력하세요.");
    if (!validatePassword(password))
      return alert("비밀번호는 8자 이상, 문자+숫자를 포함해야 합니다.");
    if (!validateName(name))
      return alert("이름은 한글 또는 영어 문자만 가능합니다.");
    if (!validatePhone(phone))
      return alert("휴대폰 번호는 숫자만 10~11자리 입력하세요.");
    if (!validateBirth(birth))
      return alert("생년월일은 YYYY-MM-DD 형식으로 입력하세요.");
    if (!address.trim()) return alert("주소를 입력하세요.");

    try {
      await axios.post("http://3.35.11.171:3001/register", {
        email,
        password,
        name,
        phone,
        birth,
        address,
      });
      alert("회원가입 성공!");
      navigate("/");
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1>회원가입</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="이메일"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 (8자 이상, 문자+숫자)"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="이름 (한글/영어만)"
            className="register-input"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              setName(
                isComposing
                  ? value
                  : value.replace(/[^A-Za-z\uAC00-\uD7A3]/g, "")
              );
            }}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={(e) => {
              setIsComposing(false);
              setName(e.target.value.replace(/[^A-Za-z\uAC00-\uD7A3]/g, ""));
            }}
            required
          />
          <input
            type="tel"
            placeholder="휴대폰 번호 (숫자만)"
            className="register-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            required
          />
          <input
            type="text"
            placeholder="생년월일 (YYYY-MM-DD)"
            className="register-input"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="주소"
            className="register-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" className="register-button">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
