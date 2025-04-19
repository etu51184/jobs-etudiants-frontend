// src/components/Layout.jsx
import { Link, Outlet } from 'react-router-dom';
import '../App.css';

function Layout() {
  return (
    <>
      <div className="nav-bar">
        <h1 className="logo">Student Jobs in Namur</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/auth">Login / Sign up</Link>
          <Link to="/post">Post a Job</Link>
        </nav>
      </div>

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;