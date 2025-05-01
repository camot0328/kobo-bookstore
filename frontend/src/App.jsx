import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./pages/Home.jsx";
import HomeAPI from "./pages/HomeAPI.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BookInfo from "./pages/BookInfo.jsx";
import Footer from "./components/Footer.jsx";
import OrderListPage from "./pages/Order.jsx";
import SuccessPage from "./pages/Success.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<HomeAPI />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookinfo/:isbn" element={<BookInfo />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/fail" element={<SuccessPage />} />
        <Route path="/orders" element={<OrderListPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
