import React, { useState, useEffect } from "react";

function LeftBanner() {
  const slides = [
    { title: "축하만 해도", subtitle: "시드니 왕복 항공권!" },
    { title: "이벤트", subtitle: "최대 50% 할인!" },
    { title: "신간 안내", subtitle: "베스트셀러 업데이트" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // ⭐ 자동 슬라이드 효과 (5초마다 다음 슬라이드로)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5초

    return () => clearInterval(interval); // 언마운트시 정리
  }, [slides.length]);

  // 수동 이전 버튼
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // 수동 다음 버튼
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="leftBanner">
      <h3>
        {slides[currentSlide].title}
        <br />
        {slides[currentSlide].subtitle}
      </h3>
      <p>교보eBook 19주년</p>
      <div className="slideButtons">
        <button onClick={handlePrev}>◀</button>
        <button onClick={handleNext}>▶</button>
      </div>
    </div>
  );
}

export default LeftBanner;
