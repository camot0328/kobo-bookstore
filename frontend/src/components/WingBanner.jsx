// src/component/WingBanner.jsx
function WingBanner() {
  return (
    <div
      style={{
        position: "fixed",
        top: "140px",
        right: "20px",
        zIndex: 1000,
        width: "120px",
        overflow: "hidden",
        border: "1px solid #d5d5d5",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <a
        href="https://event.kyobobook.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://contents.kyobobook.co.kr/advrcntr/IMAC/creatives/2025/04/24/75167/primium.png"
          alt="배너"
          style={{ width: "100%", marginBottom: "1rem", borderRadius: "5px" }}
        />
      </a>

      <a
        href="https://event.kyobobook.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          fontWeight: "bold",
          fontSize: "14px",
          color: "#0073e6",
          marginBottom: "0.5rem",
        }}
      >
        이벤트
      </a>

      <img
        src="https://contents.kyobobook.co.kr/display/c_200_200_ede9432f95394df8a4511672cf5f00b8.jpg"
        alt="이벤트1"
        style={{ width: "100%", marginBottom: "0.5rem", borderRadius: "5px" }}
      />
      <img
        src="https://contents.kyobobook.co.kr/display/200x200_a8ffe8264ad042d88a6e409d1ded3f7b.jpg"
        alt="이벤트2"
        style={{ width: "100%", borderRadius: "5px" }}
      />

      <a
        href="#"
        style={{
          display: "block",
          fontWeight: "bold",
          fontSize: "14px",
          marginTop: "1rem",
          color: "#333",
        }}
      >
        쿠폰/혜택
      </a>
    </div>
  );
}

export default WingBanner;
