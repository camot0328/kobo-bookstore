// src/components/SignUpButton.jsx
import { useNavigate } from "react-router-dom";

function SignUpButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <button
      onClick={handleClick}
      style={{ margin: "20px 0", padding: "10px 20px" }}
    >
      회원가입 하러가기
    </button>
  );
}

export default SignUpButton;
