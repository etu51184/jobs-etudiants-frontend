import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./Layout.css";

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <header>Student Jobs</header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-job">Post Job</Link>
        {!user && <Link to="/login">Login</Link>}
        {user && user.role === "admin" && (
          <Link to="/admin/users">Admin</Link>
        )}
        {user && (
          <button onClick={handleLogout} style={{ border: "none", background: "none", color: "#007bff", cursor: "pointer" }}>
            Logout
          </button>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;