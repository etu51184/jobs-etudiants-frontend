import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLang } from "../contexts/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import "./Layout.css";

const Layout = () => {
  const { user, logout } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <header>{t('welcome')}</header>
      <nav>
        <Link to="/">{t("home")}</Link>
        <Link to="/add-job">{t("postJob")}</Link>
        {!user && <Link to="/login">{t("login")}</Link>}
        {user && user.role === "admin" && <Link to="/admin/users">{t("userList")}</Link>}
        {user && (
          <button
            onClick={handleLogout}
            style={{ border: "none", background: "none", color: "#00cc66", cursor: "pointer" }}
          >
            {t("logout")}
          </button>
        )}
        <LanguageSwitcher />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
