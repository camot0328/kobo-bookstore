import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BookInfo from "./pages/BookInfo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookinfo/:isbn" element={<BookInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
