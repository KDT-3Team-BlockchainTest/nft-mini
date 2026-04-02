import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const guestNavItems = [
  { key: "home", label: "홈", icon: "⌂", path: "/" },
  { key: "marketplace", label: "마켓플레이스", icon: "▦", path: "/marketplace" },
];

const memberNavItems = [
  { key: "home", label: "홈", icon: "⌂", path: "/" },
  { key: "marketplace", label: "마켓플레이스", icon: "▦", path: "/marketplace" },
  { key: "create", label: "생성", icon: "+", path: "/create" },
  { key: "mypage", label: "마이페이지", icon: "○", path: "/mypage" },
];

const adminNavItems = [
  { key: "admin", label: "관리자", icon: "◇", path: "/admin" },
];

export default function Header({
  activeMenu = "home",
  isLoggedIn: isLoggedInProp,
  userRole: userRoleProp,
  userName: userNameProp,
  onWalletClick,
  onLogout,
}) {
  const navigate = useNavigate();
  const { isLoggedIn: authLoggedIn, user, logout } = useAuth();
  const isLoggedIn = isLoggedInProp ?? authLoggedIn;
  const userRole = userRoleProp ?? user?.role ?? "GUEST";
  const userName = userNameProp ?? user?.nickname ?? "내 계정";

  const navItems = [
    ...(isLoggedIn ? memberNavItems : guestNavItems),
    ...(isLoggedIn && userRole === "ADMIN" ? adminNavItems : []),
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    logout().then(() => navigate("/"));
  };

  const handleWalletConnect = async () => {
    if (onWalletClick) {
      onWalletClick();
      return;
    }

    window.alert("지갑 연결은 Stage 2 블록체인 연동 단계에서 지원합니다.");
  };

  return (
    <header className="header">
      <div className="header__inner">
        <button
          type="button"
          className="header__brand header__brand-button"
          onClick={() => navigate("/")}
        >
          <div className="header__logo">N</div>
          <span className="header__brand-text">NexusArt</span>
        </button>

        <nav className="header__nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`header__nav-item ${
                activeMenu === item.key ? "is-active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="header__nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="header__actions">
          {!isLoggedIn ? (
            <button
              type="button"
              className="header__text-btn"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          ) : (
            <>
              <button
                type="button"
                className="header__text-btn"
                onClick={() => navigate("/mypage")}
              >
                {userName}
              </button>
              <button
                type="button"
                className="header__outline-btn"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          )}

          <button
            type="button"
            className="header__wallet-btn"
            onClick={handleWalletConnect}
          >
            <span className="header__wallet-icon">□</span>
            <span>지갑 연결</span>
          </button>
        </div>
      </div>
    </header>
  );
}
