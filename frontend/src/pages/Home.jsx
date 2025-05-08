import BookCarousel from "../components/BookCarousel.jsx";
import MainGrid from "../components/maingrid/MainGrid.jsx";
import "../styles/Home.css";
import WingBanner from "../components/WingBanner.jsx";

function Home() {
  return (
    <div className="homeWrapper">
      <MainGrid />
      <BookCarousel title="봄을 맞이하며, 시집 추천해요" category="시" />
      <BookCarousel title="한강 작가 특별전" category="한강작가" />
      <BookCarousel title="개발자가 찾는 추천도서" category="개발" />
      <BookCarousel title="가장 많이 찾는 경제도서" category="세계경제" />
      <WingBanner />
    </div>
  );
}

export default Home;
