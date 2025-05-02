// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/LogIn.jsx";
import Register from "./pages/Register.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BookInfo from "./pages/BookInfo.jsx";
import SuccessPage from "./pages/Success.jsx";
import OrderListPage from "./pages/Order.jsx";
import Mypage from "./pages/MyPage.jsx";
import ProfileManage from "./pages/ProfileManage.jsx";

// ✅ Layout과 네비바 제어 통합
function AppWithLayout() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div style={{ paddingTop: !shouldHideNavbar ? "60px" : 0 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookinfo/:isbn" element={<BookInfo />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<SuccessPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/profileManage" element={<ProfileManage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWithLayout />
    </Router>
  );
}

export default App;
