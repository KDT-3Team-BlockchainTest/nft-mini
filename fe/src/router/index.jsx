import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import MarketplacePage from "../pages/marketplace/MarketplacePage";
import CreatePage from "../pages/create/CreatePage";
import MyPage from "../pages/mypage/MyPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import AdminPage from "../pages/admin/AdminPage";
import ArtworkDetailPage from "../pages/artwork/ArtworkDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/marketplace",
    element: <MarketplacePage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/artworks/:artworkId",
    element: <ArtworkDetailPage />,
  },
]);

export default router;
