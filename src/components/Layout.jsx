import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Layout.css";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="layout">
      <header>
        <nav>
          <div className="logo"><Link to="/">Student Jobs</Link></div>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/add-job">Publier un job</Link></li>
            {user ? (
              <>
                {user.role === "admin" && <li><Link to="/admin/users">Admin</Link></li>}
                <li><button onClick={logout}>Déconnexion</button></li>
              </>
            ) : (
              <li><Link to="/login">Connexion</Link></li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Student Jobs - Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Layout;
