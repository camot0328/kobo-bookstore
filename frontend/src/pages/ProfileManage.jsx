import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProfileManage() {
  const [user, setUser] = useState(null); // 조회된 유저 정보
  const [editMode, setEditMode] = useState(false); // 수정모드 여부
  const navigate = useNavigate();

  // 수정 폼 입력 상태
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // 🔹 accessToken과 user정보(localStorage) 가져오기
    const token = localStorage.getItem("accessToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token && storedUser?.id) {
      // 🔹 서버에서 본인 정보 조회
      axios
        .get(`http://3.35.11.171:3001/600/users/${storedUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          // 🔹 수정 입력창 초기값 설정
          setEmail(res.data.email);
          setName(res.data.name);
          setPhone(res.data.phone);
          setBirth(res.data.birth);
          setAddress(res.data.address);
        })
        .catch((err) => {
          console.error("유저 정보 불러오기 실패:", err);
          alert("로그인이 만료되었거나 정보 조회 실패.");
        });
    } else {
      alert("로그인이 필요합니다.");
    }
  }, []);

  // 🔥 회원정보 수정 저장 처리
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      await axios.patch(
        `http://3.35.11.171:3001/600/users/${storedUser.id}`,
        { email, name, phone, birth, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("회원정보가 수정되었습니다!");

      // 수정 성공하면 화면 상태 갱신
      setUser({ ...user, email, name, phone, birth, address });
      setEditMode(false); // 수정모드 종료
    } catch (err) {
      console.error("회원정보 수정 실패:", err);
      alert("회원정보 수정에 실패했습니다.");
    }
  };

  // 🔥 회원 탈퇴 처리 함수
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      await axios.delete(`http://3.35.11.171:3001/600/users/${storedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("회원 탈퇴가 완료되었습니다.");

      // 🔹 localStorage 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // 🔹 로그인 페이지로 이동
      navigate("/");
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>마이페이지</h2>

      {user ? (
        <div style={{ marginTop: "20px" }}>
          {!editMode ? (
            <>
              {/* 보기 모드 */}
              <p>
                <strong>이메일:</strong> {user.email}
              </p>
              <p>
                <strong>이름:</strong> {user.name}
              </p>
              <p>
                <strong>휴대폰 번호:</strong> {user.phone}
              </p>
              <p>
                <strong>생년월일:</strong> {user.birth}
              </p>
              <p>
                <strong>주소:</strong> {user.address}
              </p>

              <button
                onClick={() => setEditMode(true)}
                style={{ marginTop: "20px", padding: "10px" }}
              >
                수정하기
              </button>
              {/* 🔥 회원 탈퇴 버튼 추가 */}
              <button
                onClick={handleDeleteAccount}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                회원 탈퇴
              </button>
            </>
          ) : (
            <>
              {/* 수정 모드 */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />

              {/* 저장/취소 버튼 */}
              <button
                onClick={handleSave}
                style={{ marginRight: "10px", padding: "10px" }}
              >
                저장
              </button>
              <button
                onClick={() => setEditMode(false)}
                style={{ padding: "10px" }}
              >
                취소
              </button>
            </>
          )}
        </div>
      ) : (
        <p>유저 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default ProfileManage;
