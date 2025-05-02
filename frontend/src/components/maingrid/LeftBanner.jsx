import React, { useState, useEffect } from "react";

function LeftBanner() {
  const slides = [
    {
      title: "축하만 해도",
      subtitle: "시드니 왕복 항공권!",
      color: "yellow",
      textColor: "black",
    },
    {
      title: "이벤트",
      subtitle: "최대 50% 할인!",
      color: "#3f51b5",
      textColor: "white",
    },
    {
      title: "신간 안내",
      subtitle: "베스트셀러 업데이트",
      color: "#009688",
      textColor: "white",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // ⭐ 추가: 자동 슬라이드 켜짐 여부

  // ⭐ 자동 슬라이드 효과 (5초마다 다음 슬라이드로)
  useEffect(() => {
    if (!isPlaying) return; // 일시정지일 때는 실행 안 함
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  // 수동 이전 버튼
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // 수동 다음 버튼
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // ⭐ play/pause 토글
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      className="leftBanner"
      style={{ backgroundColor: slides[currentSlide].color }}
    >
      <h3
        className="slidesTitle"
        style={{ color: slides[currentSlide].textColor }}
      >
        {slides[currentSlide].title}
        <br />
        {slides[currentSlide].subtitle}
      </h3>
      <div className="slideButtons">
        {/* ▶/❚❚ 버튼 */}
        <button className="playPauseButton" onClick={togglePlay}>
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <button onClick={handlePrev}>◀</button>
        <button onClick={handleNext}>▶</button>
        <p style={{ color: slides[currentSlide].textColor }}>전체보기</p>
      </div>
    </div>
  );
}

export default LeftBanner;
