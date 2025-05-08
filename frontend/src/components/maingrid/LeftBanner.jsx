import React, { useState, useEffect } from "react";
import "../css/LeftBanner.css";

function LeftBanner() {
  const slides = [
    {
      image: "/main_img_00.jpg",
      link: "https://event.kyobobook.co.kr/detail/234236",
    },
    { image: "/main_img_01.png", link: "" },
    {
      image: "/main_img_02.jpg",
      link: "https://event.kyobobook.co.kr/detail/233178",
    },
    {
      image: "/main_img_03.jpg",
      link: "https://event.kyobobook.co.kr/detail/233177",
    },
    { image: "/main_img_04.png", link: "" },
    { image: "/main_img_05.png", link: "" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="leftBanner">
      {/* 이미지 */}
      {slides[currentSlide].link ? (
        <a
          href={slides[currentSlide].link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={slides[currentSlide].image}
            alt={`slide-${currentSlide}`}
            className="slideImage"
          />
        </a>
      ) : (
        <img
          src={slides[currentSlide].image}
          alt={`slide-${currentSlide}`}
          className="slideImage"
        />
      )}

      {/* 좌우 화살표 */}
      <button className="arrowButton left" onClick={handlePrev}>
        ❮
      </button>
      <button className="arrowButton right" onClick={handleNext}>
        ❯
      </button>

      {/* 인디케이터 */}
      <div className="indicatorDots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default LeftBanner;
