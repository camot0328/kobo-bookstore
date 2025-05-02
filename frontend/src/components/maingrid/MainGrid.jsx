import LeftBanner from "./LeftBanner.jsx";
import RightBanner from "./RightBanner.jsx";
import BottomMenu from "./BottomMenu.jsx";
import AdBanner from "./AdBanner.jsx";
import "../../styles/MainGrid.css";

function MainGrid() {
  return (
    <div className="mainGrid">
      <LeftBanner />
      <RightBanner />
      <div className="bottomRow">
        <BottomMenu />
        <AdBanner />
      </div>
    </div>
  );
}

export default MainGrid;
