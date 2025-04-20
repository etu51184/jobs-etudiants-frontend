import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate("/auth");
    }
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">Jobs Étudiants</Link>
          </div>
          <div className="navbar-links">
            <Link to="/">Accueil</Link>
            <Link to="/post">Publier une annonce</Link>
            {!username && <Link to="/auth">Connexion</Link>}
            {username && (
              <>
                <span className="username">Bienvenue, {username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Se déconnecter
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
